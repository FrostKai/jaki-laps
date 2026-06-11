import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import ProjectLabel from './ProjectLabel'

const ProjectNode = ({ name, status, type, orbitRadius, orbitSpeed, initialAngle, verticalOffset, isFlagship }) => {
  const nodeRef = useRef()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Calculate Orbit Position
    const angle = initialAngle + time * orbitSpeed
    const x = Math.cos(angle) * orbitRadius
    const z = Math.sin(angle) * orbitRadius
    const y = 1.5 + Math.sin(time * 0.5 + initialAngle) * verticalOffset
    
    nodeRef.current.position.set(x, y, z)
    
    // Look at camera for label readability
    nodeRef.current.rotation.y = state.camera.rotation.y

    // Subtle pulsing
    const pulse = 1 + Math.sin(time * 2) * 0.05
    if (meshRef.current) {
        meshRef.current.scale.setScalar((hovered ? 1.3 : 1) * (isFlagship ? 1.5 : 1) * pulse)
    }
  })

  return (
    <group 
      ref={nodeRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Holographic Node Sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[isFlagship ? 0.25 : 0.15, 32, 32]} />
          <meshStandardMaterial 
            color={isFlagship ? "#00F5FF" : (hovered ? "#00F5FF" : "#6C63FF")}
            emissive={isFlagship ? "#00F5FF" : (hovered ? "#00F5FF" : "#6C63FF")}
            emissiveIntensity={isFlagship ? (hovered ? 8 : 4) : (hovered ? 4 : 2)}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Orbiting Ring for Node */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[isFlagship ? 0.3 : 0.2, isFlagship ? 0.32 : 0.22, 32]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        {/* Labels */}
        <ProjectLabel 
            name={name} 
            status={status} 
            type={type} 
            hovered={hovered} 
        />
      </Float>
    </group>
  )
}

export default ProjectNode
