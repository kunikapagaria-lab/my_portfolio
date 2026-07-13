const JourneyScene3D = () => {
  return (
    <>
      <mesh position={[-2.14, 0, 0.025]}>
        <planeGeometry args={[4.26, 5.8]} />
        <meshBasicMaterial color="#faf6e8" />
      </mesh>
      <mesh position={[2.14, 0, 0.025]}>
        <planeGeometry args={[4.26, 5.8]} />
        <meshBasicMaterial color="#faf6e8" />
      </mesh>
    </>
  );
};

export default JourneyScene3D;
