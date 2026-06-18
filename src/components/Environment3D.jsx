import React from 'react';

const Environment3D = () => {
  return (
    <>
      {/* Ambient Light for base illumination */}
      <ambientLight intensity={0.8} color="#eef3ff" />

      {/* Directional Spotlight mapping a desk lamp */}
      <spotLight
        position={[8, 12, 10]}
        angle={0.4}
        penumbra={1}
        intensity={2.5}
      />

      {/* Point light for subtle warm ambient accents on the book front */}
      <pointLight position={[-6, 2, 8]} intensity={1.2} color="#ffeecb" />
    </>
  );
};

export default Environment3D;
