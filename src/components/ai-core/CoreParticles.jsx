import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CoreParticles = () => {
  const pointsRef = useRef()
  const count = 200

  // Layer 5: Particle Orbit System
  const [particles] = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      data.push({
        orbit: THREE.MathUtils.randFloat(1.2, 4),
        speed: THREE.MathUtils.randFloat(0.5, 2),
        angle: Math.random() * Math.PI * 2,
        verticalOffset: THREE.MathUtils.randFloat(-1, 1),
        yBase: 1.5
      })
    }
    return [data]
  }, [count])

  const positions = useMemo(() => new Float32Array(count * 3), [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((p, i) => {
      const i3 = i * 3
      const currentAngle = p.angle + time * p.speed
      
      positions[i3] = Math.cos(currentAngle) * p.orbit
      positions[i3 + 1] = p.yBase + Math.sin(time * 0.5 + p.angle) * p.verticalOffset
      positions[i3 + 2] = Math.sin(currentAngle) * p.orbit
    })
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00F5FF"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default CoreParticles
