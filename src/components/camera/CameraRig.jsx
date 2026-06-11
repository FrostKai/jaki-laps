import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store/useStore'

const CameraRig = () => {
  const controlsRef = useRef()
  const isLoaded = useStore((state) => state.isLoaded)
  
  // Target positions for Intro
  const introPos = new THREE.Vector3(0, 10, 30)
  const mainPos = new THREE.Vector3(0, 4, 15)
  const defaultTarget = new THREE.Vector3(0, 2, 0)

  // Initial Camera Setup
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
      // INTRO PHASE: Manual Lerp
      controls.object.position.lerp(introPos, 0.05)
      controls.target.lerp(defaultTarget, 0.05)
      controls.update()
      return
    }

    // ACTIVE PHASE: Hybrid Cinematic
    
    // 1. Idle Drift (Subtle movement of the target)
    const driftX = Math.sin(time * 0.2) * 0.4
    const driftY = Math.cos(time * 0.3) * 0.2
    
    // 2. Mouse Parallax (Influence the target)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    let mouseX = 0
    let mouseY = 0
    
    if (!isMobile) {
      mouseX = (state.mouse.x * 1.5)
      mouseY = (state.mouse.y * 0.8)
    }

    // Apply Cinematic Offsets to Target
    const targetOffset = new THREE.Vector3(
      defaultTarget.x + driftX + mouseX,
      defaultTarget.y + driftY + mouseY,
      defaultTarget.z
    )
    
    controls.target.lerp(targetOffset, 0.05)
    
    // Ensure the camera continues to move into the "main" distance if it hasn't reached it
    // OrbitControls will manage the distance based on user zoom, but we can nudge it initially
    if (controls.object.position.distanceTo(mainPos) > 5 && time < 10) {
        controls.object.position.lerp(mainPos, 0.01)
    }

    controls.update()
  })

  return (
    <OrbitControls 
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={8}
      maxDistance={25}
      // Strict Rotation Limits to preserve composition
      minAzimuthAngle={-Math.PI / 12} // ~15 degrees left
      maxAzimuthAngle={Math.PI / 12}  // ~15 degrees right
      minPolarAngle={Math.PI / 2.5}   // Avoid looking too far up
      maxPolarAngle={Math.PI / 1.8}   // Avoid looking too far down
    />
  )
}

export default CameraRig
