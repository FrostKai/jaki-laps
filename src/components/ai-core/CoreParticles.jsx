import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CoreParticles = () => {
  const pointsRef = useRef()
  const count = 150

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const pha = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
      const phi = THREE.MathUtils.randFloat(0, Math.PI)
      const distance = THREE.MathUtils.randFloat(1.5, 3)
      
      pos[i * 3] = distance * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta) + 1.5
      pos[i * 3 + 2] = distance * Math.cos(phi)
      
      pha[i] = Math.random() * Math.PI * 2
    }
    return [pos, pha]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const array = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const phase = phases[i]
      
      // Subtle Orbiting/Drifting
      array[i3] += Math.sin(time + phase) * 0.002
      array[i3 + 1] += Math.cos(time + phase) * 0.002
      array[i3 + 2] += Math.sin(time * 0.5 + phase) * 0.002
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += 0.001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00F5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default CoreParticles
