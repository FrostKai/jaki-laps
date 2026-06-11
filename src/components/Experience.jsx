import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import CommandCenter from './environment/CommandCenter'
import AICore from './ai-core/AICore'

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      <OrbitControls 
        enableDamping 
        maxPolarAngle={Math.PI / 1.8} 
        minDistance={3} 
        maxDistance={20}
        target={[0, 1.5, 0]}
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
