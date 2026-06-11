const Ceiling = () => {
  return (
    <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#050816" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

export default Ceiling
