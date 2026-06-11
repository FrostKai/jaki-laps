import { Text } from '@react-three/drei'

const ProjectLabel = ({ name, status, type, hovered }) => {
  return (
    <group position={[0, 0.5, 0]}>
      {/* Project Name */}
      <Text
        fontSize={0.2}
        color={hovered ? "#00F5FF" : "#FFFFFF"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#050816"
        font="https://fonts.gstatic.com/s/orbitron/v31/yY7Hc09SNo59p73MpkZ8u7mEkkQ2.woff"
      >
        {name.toUpperCase()}
      </Text>

      {/* Status */}
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.08}
        color={hovered ? "#00F5FF" : "#7DF9FF"}
        anchorX="center"
        anchorY="middle"
        opacity={0.8}
        font="https://fonts.gstatic.com/s/orbitron/v31/yY7Hc09SNo59p73MpkZ8u7mEkkQ2.woff"
      >
        {status}
      </Text>

      {/* Type */}
      <Text
        position={[0, -0.35, 0]}
        fontSize={0.07}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        opacity={0.5}
        font="https://fonts.gstatic.com/s/orbitron/v31/yY7Hc09SNo59p73MpkZ8u7mEkkQ2.woff"
      >
        {type}
      </Text>
    </group>
  )
}

export default ProjectLabel
