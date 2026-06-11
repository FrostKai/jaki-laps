import Floor from './Floor'
import Walls from './Walls'
import Ceiling from './Ceiling'
import Lighting from './Lighting'

const CommandCenter = () => {
  return (
    <group>
      <Lighting />
      <Floor />
      <Walls />
      <Ceiling />
    </group>
  )
}

export default CommandCenter
