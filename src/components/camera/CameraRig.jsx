import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../../store/useStore'

const CameraRig = () => {
  const group = useRef()
  const isLoaded = useStore((state) => state.isLoaded)
  
  // Target positions
  const introPos = new THREE.Vector3(0, 10, 30)
  const mainPos = new THREE.Vector3(0, 4, 15)
  const targetLookAt = new THREE.Vector3(0, 2, 0)

  useFrame((state) => {
    if (!isLoaded) {
      // Keep camera at intro position while loading
      state.camera.position.lerp(introPos, 0.1)
      state.camera.lookAt(targetLookAt)
      return
    }

    // 1. Smooth Intro Animation & Idle Drift
    const time = state.clock.getElapsedTime()
    
    // Calculate base position (Lerp from intro to main)
    const currentBasePos = new THREE.Vector3().lerpVectors(introPos, mainPos, 0.1)
    
    // 2. Idle Motion (Subtle drift)
    const driftX = Math.sin(time * 0.2) * 0.5
    const driftY = Math.cos(time * 0.3) * 0.3
    
    // 3. Mouse Parallax (Desktop only)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    let mouseX = 0
    let mouseY = 0
    
    if (!isMobile) {
      mouseX = (state.mouse.x * 2) // Strength of parallax
      mouseY = (state.mouse.y * 1)
    }

    // Combine all movements
    const targetX = mainPos.x + driftX + mouseX
    const targetY = mainPos.y + driftY + mouseY
    const targetZ = mainPos.z
    
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)
    
    // Always focus on AI Core area
    state.camera.lookAt(targetLookAt)
  })

  return <group ref={group} />
}

export default CameraRig
