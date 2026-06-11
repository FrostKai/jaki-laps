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
       
      >
        {type}
      </Text>
    </group>
  )
}

export default ProjectLabel
