import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import CommandCenter from './environment/CommandCenter'
import AICore from './ai-core/AICore'

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={45} />
      <OrbitControls 
        enableDamping 
        maxPolarAngle={Math.PI / 2} 
        minDistance={5} 
        maxDistance={25}
        target={[0, 2, 0]}
      />
      
      <color attach="background" args={['#050816']} />
      
      {/* Structural Environment */}
      <CommandCenter />
      
      {/* Central Visual Masterpiece */}
      <AICore />
      
      {/* Global Environment for subtle reflections */}
      <Environment preset="night" />
    </>
  )
}

export default Experience
