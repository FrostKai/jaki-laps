import { Float } from '@react-three/drei'

const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Primary Atmospheric Light */}
      <rectAreaLight
        width={10}
        height={0.5}
        intensity={5}
        color="#00F5FF"
        position={[0, 7.9, -5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      
      {/* Accent Neon Lights */}
      <pointLight position={[-10, 5, -5]} intensity={2} color="#6C63FF" />
      <pointLight position={[10, 5, -5]} intensity={2} color="#7DF9FF" />
      
      {/* Subtle Glow Points */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 4, -8]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00F5FF" />
          <pointLight intensity={1} distance={5} color="#00F5FF" />
        </mesh>
      </Float>
    </>
  )
}

export default Lighting
