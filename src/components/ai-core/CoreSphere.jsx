import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Torus, Ring } from '@react-three/drei'
import * as THREE from 'three'

const CoreSphere = () => {
  const meshRef = useRef()
  const shellRef = useRef()
  const reactorRingsRef = useRef()
  const holoLayersRef = useRef()
  const shockwaveRef = useRef()
  const platformRef = useRef()
  const beamRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Core Floating Y
    const floatY = Math.sin(time * 0.5) * 0.1 + 1.5

    // 1. Core & Shell (More Cyan/Purple, less white)
    if (meshRef.current) {
      meshRef.current.position.y = floatY
      meshRef.current.material.emissiveIntensity = 8 + Math.sin(time * 8) * 4
    }
    if (shellRef.current) {
      shellRef.current.position.y = floatY
    }

    // 2. Reactor Rings (Compact & Fast)
    if (reactorRingsRef.current) {
      reactorRingsRef.current.position.y = floatY
      reactorRingsRef.current.children.forEach((child, i) => {
        child.rotation.x = time * (i + 1) * 0.5
        child.rotation.y = time * (i + 1) * 0.8
      })
    }

    // 3. Holographic Discs (Horizontal)
    if (holoLayersRef.current) {
      holoLayersRef.current.position.y = floatY
      holoLayersRef.current.children.forEach((child, i) => {
        child.rotation.z = time * (i + 1) * 0.2
        child.scale.setScalar(1 + Math.sin(time + i) * 0.05)
      })
    }

    // 4. Energy Beam (Vertical)
    if (beamRef.current) {
      beamRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1
      beamRef.current.material.opacity = 0.2 + Math.sin(time * 5) * 0.1
    }

    // 5. Shockwave System
    if (shockwaveRef.current) {
      shockwaveRef.current.position.y = floatY
      const cycle = (time % 2) / 2
      shockwaveRef.current.scale.setScalar(cycle * 8)
      shockwaveRef.current.material.opacity = (1 - cycle) * 0.5
    }

    // 7. Hexagonal Platform
    if (platformRef.current) {
      platformRef.current.rotation.z = time * 0.1
    }
  })

  return (
    <group>
      {/* 4. Vertical Energy Beam */}
      <mesh ref={beamRef} position={[0, 4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.2} />
      </mesh>

      {/* 7. Hexagonal Energy Platform */}
      <mesh ref={platformRef} position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 6]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.1} wireframe />
      </mesh>

      {/* 1. Improved Energy Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={10}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh ref={shellRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={2}
          distort={0.6}
          speed={4}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 2. Concentric Reactor Rings (Reduced Size) */}
      <group ref={reactorRingsRef}>
        <Torus args={[0.7, 0.02, 16, 100]}><meshBasicMaterial color="#00F5FF" /></Torus>
        <Torus args={[0.85, 0.015, 16, 100]}><meshBasicMaterial color="#7DF9FF" /></Torus>
        <Torus args={[1.0, 0.01, 16, 100]}><meshBasicMaterial color="#6C63FF" /></Torus>
      </group>

      {/* 3. Holographic Layers (Data Discs) */}
      <group ref={holoLayersRef}>
        <Ring args={[0.6, 1.2, 64]} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.1} side={THREE.DoubleSide} />
        </Ring>
        <Ring args={[0.6, 1.2, 64]} position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#6C63FF" transparent opacity={0.1} side={THREE.DoubleSide} />
        </Ring>
      </group>

      {/* 5. Shockwave System */}
      <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.45, 64]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default CoreSphere
