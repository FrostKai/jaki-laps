import { PerspectiveCamera, Environment } from '@react-three/drei'
import CommandCenter from './environment/CommandCenter'
import AICore from './ai-core/AICore'
import CameraRig from './camera/CameraRig'

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault fov={45} />
      
      {/* Cinematic Camera Control */}
      <CameraRig />
      
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
