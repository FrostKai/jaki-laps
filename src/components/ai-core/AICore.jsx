import CoreSphere from './CoreSphere'
import CoreParticles from './CoreParticles'
import CoreLighting from './CoreLighting'

const AICore = () => {
  return (
    <group position={[0, 0, 0]}>
      <CoreLighting />
      <CoreSphere />
      <CoreParticles />
    </group>
  )
}

export default AICore
