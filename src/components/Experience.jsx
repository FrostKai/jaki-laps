import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import CommandCenter from './environment/CommandCenter'

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
      <OrbitControls 
        enableDamping 
        maxPolarAngle={Math.PI / 2} 
        minDistance={2} 
        maxDistance={15}
      />
      
      <color attach="background" args={['#050816']} />
      
      <CommandCenter />
      
      {/* Global Environment for subtle reflections */}
      <Environment preset="night" />
    </>
  )
}

export default Experience
