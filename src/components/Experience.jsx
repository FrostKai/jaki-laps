import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableDamping />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F5FF" />
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6C63FF" wireframe />
      </mesh>
      
      <gridHelper args={[20, 20, "#00F5FF", "#050816"]} rotation={[Math.PI / 2, 0, 0]} />
    </>
  )
}

export default Experience
