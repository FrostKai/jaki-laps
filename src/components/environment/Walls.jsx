import { DoubleSide } from 'three'

const Walls = () => {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 3, -10]} receiveShadow>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-15, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[15, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Decorative Panels / Neon Strips */}
      <mesh position={[0, 3, -9.95]}>
        <planeGeometry args={[30, 0.05]} />
        <meshBasicMaterial color="#00F5FF" />
      </mesh>
      <mesh position={[0, 6, -9.95]}>
        <planeGeometry args={[30, 0.05]} />
        <meshBasicMaterial color="#00F5FF" />
      </mesh>
    </group>
  )
}

export default Walls
