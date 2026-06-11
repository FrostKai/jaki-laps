import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const CoreLighting = () => {
  const cyanLightRef = useRef()
  const purpleLightRef = useRef()
  const areaLightRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Intense pulsing for reactor feel
    const pulseFactor = Math.sin(time * 5) * 0.8 + 2
    
    cyanLightRef.current.intensity = 15 * pulseFactor
    purpleLightRef.current.intensity = 8 * pulseFactor
  })

  return (
    <>
      {/* Primary Reactor Light - Cyan */}
      <pointLight
        ref={cyanLightRef}
        position={[0, 1.5, 0]}
        color="#00F5FF"
        distance={25}
        decay={1.5}
        castShadow
      />
      
      {/* Secondary Energy Light - Purple */}
      <pointLight
        ref={purpleLightRef}
        position={[0, 3, 3]}
        color="#6C63FF"
        distance={15}
        decay={2}
      />

      {/* Floor Glow Accent */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#00F5FF"
        target-position={[0, -2, 0]}
      />
    </>
  )
}

export default CoreLighting
