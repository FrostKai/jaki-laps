import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const CoreLighting = () => {
  const cyanLightRef = useRef()
  const purpleLightRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Pulsing intensity driven by energy core
    const pulseFactor = Math.sin(time * 3) * 0.5 + 1.5
    
    cyanLightRef.current.intensity = 5 * pulseFactor
    purpleLightRef.current.intensity = 3 * pulseFactor
  })

  return (
    <>
      <pointLight
        ref={cyanLightRef}
        position={[0, 1.5, 0]}
        color="#00F5FF"
        distance={15}
        decay={2}
      />
      <pointLight
        ref={purpleLightRef}
        position={[0, 2, 2]}
        color="#6C63FF"
        distance={10}
        decay={2}
      />
    </>
  )
}

export default CoreLighting
