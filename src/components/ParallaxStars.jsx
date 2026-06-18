import React, { useEffect, useRef } from 'react';

const ParallaxStars = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    const starCount = 150;

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize stars
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          // depth factor: 0.1 (far, slow) to 1.0 (near, fast)
          depth: Math.random() * 0.9 + 0.1,
          baseAlpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // Spawn mouse trail particles
      if (Math.random() < 0.3) {
        spawnParticle(e.clientX, e.clientY);
      }
    };

    // Spawn a single particle for the mouse trail
    const spawnParticle = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;
      particlesRef.current.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // Drift slightly upwards
        size: Math.random() * 2.5 + 1,
        color: `hsla(${Math.random() * 40 + 35}, 100%, 80%, ${Math.random() * 0.6 + 0.4})`, // warm golden glow
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
      });
    };

    // Initialize
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Lerp helper
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse coordinates (lerp)
      const mouse = mouseRef.current;
      mouse.x = lerp(mouse.x, mouse.targetX, 0.08);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.08);

      // Reference center of screen to calculate offset
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const offsetX = (mouse.x - centerX) / centerX;
      const offsetY = (mouse.y - centerY) / centerY;

      // 1. Draw Starfield
      stars.forEach((star) => {
        // Calculate parallax displacement based on depth
        // Multiply by 40 to determine maximum pixel shift
        const dx = offsetX * star.depth * -45;
        const dy = offsetY * star.depth * -45;

        // Apply position + parallax shift with wrapping
        let sx = (star.x + dx) % canvas.width;
        let sy = (star.y + dy) % canvas.height;
        if (sx < 0) sx += canvas.width;
        if (sy < 0) sy += canvas.height;

        // Twinkle effect
        star.phase += star.twinkleSpeed;
        const alpha = star.baseAlpha + Math.sin(star.phase) * 0.25;

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(alpha, 1.0))})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for closer/larger stars
        if (star.depth > 0.7 && Math.random() < 0.15) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // 2. Draw & Update Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        // size scales down with life
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default ParallaxStars;
