import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store/useStore'

const CameraRig = () => {
  const controlsRef = useRef()
  const isLoaded = useStore((state) => state.isLoaded)
  
  // Premium Positioning
  const introPos = new THREE.Vector3(0, 15, 40)
  const mainPos = new THREE.Vector3(0, 4, 18)
  const defaultTarget = new THREE.Vector3(0, 1.5, 0)

  // Initial Setup
  useEffect(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object
      camera.position.copy(introPos)
      controlsRef.current.target.copy(defaultTarget)
    }
  }, [])

  useFrame((state) => {
    if (!controlsRef.current) return

    const time = state.clock.getElapsedTime()
    const controls = controlsRef.current

    if (!isLoaded) {
      controls.object.position.lerp(introPos, 0.05)
      controls.target.lerp(defaultTarget, 0.05)
      controls.update()
      return
    }

    // 1. Premium Idle Drift
    const driftX = Math.sin(time * 0.15) * 0.6
    const driftY = Math.cos(time * 0.2) * 0.3
    
    // 2. Cinematic Parallax
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    let mouseX = 0
    let mouseY = 0
    
    if (!isMobile) {
      mouseX = (state.mouse.x * 2.5)
      mouseY = (state.mouse.y * 1.2)
    }

    const targetOffset = new THREE.Vector3(
      defaultTarget.x + driftX + mouseX,
      defaultTarget.y + driftY + mouseY,
      defaultTarget.z
    )
    
    // Smooth transition into target focus
    controls.target.lerp(targetOffset, 0.03)
    
    // Gradual movement into main position during first 15 seconds
    if (time < 15) {
        controls.object.position.lerp(mainPos, 0.005)
    }

    controls.update()
  })

  return (
    <OrbitControls 
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.04}
      minDistance={10}
      maxDistance={30}
      minAzimuthAngle={-Math.PI / 10} 
      maxAzimuthAngle={Math.PI / 10}  
      minPolarAngle={Math.PI / 2.6}   
      maxPolarAngle={Math.PI / 1.7}   
    />
  )
}

export default CameraRig
