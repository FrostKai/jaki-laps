import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

const CoreSphere = () => {
  const meshRef = useRef()
  const shellRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const pulseRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Floating Motion for the whole group
    const floatY = Math.sin(time * 0.5) * 0.15 + 1.5
    
    // Layer 1 & 2: Core & Shell
    if (meshRef.current) {
      meshRef.current.position.y = floatY
      meshRef.current.material.emissiveIntensity = 5 + Math.sin(time * 5) * 2
      const scale = 1 + Math.sin(time * 2) * 0.03
      meshRef.current.scale.set(scale, scale, scale)
    }

    if (shellRef.current) {
      shellRef.current.position.y = floatY
      shellRef.current.rotation.y -= 0.01
    }

    // Layer 3: Rotating Energy Rings
    if (ring1Ref.current) {
      ring1Ref.current.position.y = floatY
      ring1Ref.current.rotation.x = time * 0.5
      ring1Ref.current.rotation.y = time * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.position.y = floatY
      ring2Ref.current.rotation.y = time * -0.8
      ring2Ref.current.rotation.z = time * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.position.y = floatY
      ring3Ref.current.rotation.z = time * 0.4
      ring3Ref.current.rotation.x = time * -0.3
    }

    // Layer 6: Pulse Waves
    if (pulseRef.current) {
      pulseRef.current.position.y = floatY
      const pulseCycle = (time % 3) / 3 // 3 second cycle
      const pulseScale = pulseCycle * 10
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale)
      pulseRef.current.material.opacity = (1 - pulseCycle) * 0.3
    }
  })

  return (
    <group>
      {/* Layer 1: Inner Energy Core (Intense Cyan) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={10}
        />
      </mesh>

      {/* Layer 2: Energy Shell (Distorted/Transparent) */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={1}
          distort={0.5}
          speed={3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Layer 3: Rotating Energy Rings */}
      <Torus ref={ring1Ref} args={[1.5, 0.02, 16, 100]}>
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} />
      </Torus>
      <Torus ref={ring2Ref} args={[1.8, 0.015, 16, 100]}>
        <meshBasicMaterial color="#7DF9FF" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring3Ref} args={[2.2, 0.01, 16, 100]}>
        <meshBasicMaterial color="#6C63FF" transparent opacity={0.3} />
      </Torus>

      {/* Layer 6: Energy Pulse Waves (Expanding Rings) */}
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 64]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default CoreSphere
