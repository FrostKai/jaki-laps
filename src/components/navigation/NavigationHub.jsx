import ProjectNode from './ProjectNode'

const projects = [
  { 
    name: 'Sonara', 
    status: 'ONLINE', 
    type: 'Flagship Project', 
    radius: 3.5, 
    speed: 0.12, 
    angle: 0, 
    offset: 0.2, 
    isFlagship: true 
  },
  { 
    name: 'AGV Xora', 
    status: 'ACTIVE', 
    type: 'Robotics & Automation', 
    radius: 5.5, 
    speed: -0.08, 
    angle: Math.PI / 1.5, 
    offset: -0.4, 
    isFlagship: false 
  },
  { 
    name: 'CoolingHelm', 
    status: 'DEVELOPMENT', 
    type: 'IoT + Flutter', 
    radius: 5.5, 
    speed: 0.07, 
    angle: Math.PI * 1.5, 
    offset: 0.3, 
    isFlagship: false 
  },
  { 
    name: 'PesonaJava', 
    status: 'COMPLETED', 
    type: 'Tourism Discovery Platform', 
    radius: 4.5, 
    speed: -0.05, 
    angle: Math.PI, 
    offset: -0.2, 
    isFlagship: false 
  }
]

const NavigationHub = () => {
  return (
    <group>
      {projects.map((project) => (
        <ProjectNode
          key={project.name}
          {...project}
          orbitRadius={project.radius}
          orbitSpeed={project.speed}
          initialAngle={project.angle}
          verticalOffset={project.offset}
        />
      ))}
    </group>
  )
}

export default NavigationHub
