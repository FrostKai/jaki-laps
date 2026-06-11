import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const CoreSphere = () => {
  const meshRef = useRef()
  const outerRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Floating Motion
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2 + 1.5
    
    // Breathing Effect (Scale)
    const scale = 1 + Math.sin(time * 1.5) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
    
    // Slow Rotation
    meshRef.current.rotation.y += 0.005
    meshRef.current.rotation.z += 0.002

    // Pulse Emission
    meshRef.current.material.emissiveIntensity = 2 + Math.sin(time * 3) * 1
  })

  return (
    <group ref={outerRef}>
      {/* Inner Core */}
      <mesh ref={meshRef} position={[0, 1.5, 0]}>
        <icosahedronGeometry args={[1, 15]} />
        <meshStandardMaterial 
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* Outer Energy Layer */}
      <Sphere args={[1.2, 32, 32]} position={[0, 1.5, 0]}>
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Subtle Rim Glow */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#7DF9FF" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export default CoreSphere
