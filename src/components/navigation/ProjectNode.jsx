import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import ProjectLabel from './ProjectLabel'
import useStore from '../../store/useStore'
import { projectsData } from '../../store/projectData'

const ProjectNode = ({ name, status, type, orbitRadius, orbitSpeed, initialAngle, verticalOffset, isFlagship }) => {
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  const setActiveTab = useStore((state) => state.setActiveTab)
  
  const nodeRef = useRef()
  const diamondRef = useRef()
  const frameRef = useRef()
  const scanRingRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Cursor style pointer on hover
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'auto'
    }
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])
  
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

    // Diamond Rotation
    if (diamondRef.current) {
        diamondRef.current.rotation.y += (hovered ? 0.05 : 0.02)
        diamondRef.current.rotation.z += 0.01
    }

    // Frame Rotation
    if (frameRef.current) {
        frameRef.current.rotation.z -= 0.01
    }

    // Scan Ring
    if (scanRingRef.current) {
        scanRingRef.current.position.y = Math.sin(time * 3) * 0.3
    }
  })

  return (
    <group 
      ref={nodeRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        const projectKey = name.toLowerCase()
        const projectInfo = projectsData[projectKey]
        if (projectInfo) {
          setSelectedProject(projectInfo)
          setActiveTab('projects')
        }
      }}
    >
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Layer 1: Diamond Core */}
        <mesh ref={diamondRef} scale={(hovered ? 1.4 : 1) * (isFlagship ? 1.2 : 1)}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial 
            color={isFlagship ? "#00F5FF" : (hovered ? "#00F5FF" : "#6C63FF")}
            emissive={isFlagship ? "#00F5FF" : (hovered ? "#00F5FF" : "#6C63FF")}
            emissiveIntensity={hovered ? 10 : 3}
            metalness={1}
            roughness={0}
          />
        </mesh>
        
        {/* Layer 2: Hexagonal Frame */}
        <mesh ref={frameRef} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.3, 6]} />
            <meshBasicMaterial 
                color={hovered ? "#00F5FF" : "#6C63FF"} 
                transparent 
                opacity={0.2} 
                wireframe 
            />
        </mesh>

        {/* Layer 3: Scanning Ring */}
        <mesh ref={scanRingRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.36, 32]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={hovered ? 0.8 : 0.2} side={THREE.DoubleSide} />
        </mesh>

        {/* Labels */}
        <ProjectLabel 
            name={name} 
            status={status} 
            type={type} 
            hovered={hovered} 
            isFlagship={isFlagship}
        />
      </Float>
    </group>
  )
}

export default ProjectNode

