import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Torus, Ring, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

const CoreSphere = () => {
  const meshRef = useRef()
  const shellRef = useRef()
  const reactorRingsRef = useRef()
  const holoLayersRef = useRef()
  const shockwaveRef = useRef()
  const beamRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Core Floating Y
    const floatY = Math.sin(time * 0.5) * 0.12 + 1.5

    // 1. Quantum Core & Shell
    if (meshRef.current) {
      meshRef.current.position.y = floatY
      meshRef.current.material.emissiveIntensity = 10 + Math.sin(time * 10) * 5
      meshRef.current.rotation.y += 0.01
    }
    if (shellRef.current) {
      shellRef.current.position.y = floatY
      shellRef.current.rotation.x = time * 0.2
    }

    // 2. Multi-layer Reactor Rings
    if (reactorRingsRef.current) {
      reactorRingsRef.current.position.y = floatY
      reactorRingsRef.current.children.forEach((child, i) => {
        child.rotation.x = time * (i + 1) * 0.4
        child.rotation.z = time * (i + 1) * 0.6
      })
    }

    // 3. Holographic Data Discs
    if (holoLayersRef.current) {
      holoLayersRef.current.position.y = floatY
      holoLayersRef.current.children.forEach((child, i) => {
        child.rotation.z = time * (i + 0.5) * 0.3
        const s = 1 + Math.sin(time * 2 + i) * 0.05
        child.scale.set(s, s, s)
      })
    }

    // 4. Energy Beam (Full length)
    if (beamRef.current) {
      const beamScale = 1 + Math.sin(time * 15) * 0.05
      beamRef.current.scale.set(beamScale, 1, beamScale)
      beamRef.current.material.opacity = 0.15 + Math.sin(time * 8) * 0.05
    }

    // 5. Dynamic Shockwave
    if (shockwaveRef.current) {
      shockwaveRef.current.position.y = floatY
      const cycle = (time % 2.5) / 2.5
      shockwaveRef.current.scale.setScalar(cycle * 12)
      shockwaveRef.current.material.opacity = (1 - cycle) * 0.4
    }
  })

  return (
    <group>
      {/* 4. Main Energy Column (Beam) */}
      <mesh ref={beamRef} position={[0, 3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 12, 16, 1, true]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner Glow Beam */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 12, 8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.1} />
      </mesh>

      {/* 1. Quantum Energy Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial 
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={15}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={3}
          distort={0.7}
          speed={5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 2. Precision Reactor Rings */}
      <group ref={reactorRingsRef}>
        <Torus args={[0.8, 0.015, 16, 100]}><meshBasicMaterial color="#00F5FF" /></Torus>
        <Torus args={[0.95, 0.01, 16, 100]}><meshBasicMaterial color="#7DF9FF" transparent opacity={0.5} /></Torus>
        <Torus args={[1.1, 0.005, 16, 100]}><meshBasicMaterial color="#6C63FF" /></Torus>
      </group>

      {/* 3. Holographic Interface Layers */}
      <group ref={holoLayersRef}>
        <Ring args={[0.7, 1.4, 64]} position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.08} side={THREE.DoubleSide} wireframe />
        </Ring>
        <Ring args={[0.7, 1.4, 64]} position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#6C63FF" transparent opacity={0.08} side={THREE.DoubleSide} wireframe />
        </Ring>
        {/* Fine Data Ring */}
        <Ring args={[1.5, 1.52, 64]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.2} side={THREE.DoubleSide} />
        </Ring>
      </group>

      {/* 5. Energy Shockwave */}
      <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 64]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default CoreSphere
