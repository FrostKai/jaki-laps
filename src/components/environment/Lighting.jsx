import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Lighting = () => {
  const beamRef1 = useRef()
  const beamRef2 = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Animate volumetric beams
    if (beamRef1.current) {
        beamRef1.current.material.opacity = 0.05 + Math.sin(time * 0.5) * 0.02
        beamRef1.current.rotation.y = time * 0.1
    }
    if (beamRef2.current) {
        beamRef2.current.material.opacity = 0.05 + Math.cos(time * 0.4) * 0.02
        beamRef2.current.rotation.y = -time * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Cinematic Volumetric-style Beams (Simulated) */}
      <mesh ref={beamRef1} position={[-10, 4, -8]} rotation={[0.2, 0, 0.2]}>
        <cylinderGeometry args={[0, 4, 15, 32, 1, true]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh ref={beamRef2} position={[10, 4, -8]} rotation={[0.2, 0, -0.2]}>
        <cylinderGeometry args={[0, 4, 15, 32, 1, true]} />
        <meshBasicMaterial color="#6C63FF" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      
      {/* High-contrast Accent Lights */}
      <pointLight position={[-15, 8, -5]} intensity={10} color="#00F5FF" />
      <pointLight position={[15, 8, -5]} intensity={10} color="#6C63FF" />
      
      {/* Floor Spotlight for core reflections */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={5}
        color="#00F5FF"
        castShadow
      />
    </>
  )
}

export default Lighting
