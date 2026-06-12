import { useState } from 'react'
import useStore from '../../store/useStore'
import { IoHardwareChipOutline, IoCodeOutline, IoLayersOutline, IoHardwareChip } from 'react-icons/io5'

const skillNodes = [
  {
    id: 'frontend',
    title: 'FRONTEND ENGINE',
    subtitle: 'NODE_01 // VISUAL & CREATIVE',
    icon: <IoLayersOutline />,
    skills: [
      { name: 'React / Next.js', level: 'EXPERT' },
      { name: 'Three.js / WebGL', level: 'ADVANCED' },
      { name: 'R3F / Drei', level: 'ADVANCED' },
      { name: 'GSAP / Framer Motion', level: 'EXPERT' },
      { name: 'TailwindCSS', level: 'EXPERT' },
      { name: 'GLSL Shaders', level: 'INTERMEDIATE' }
    ]
  },
  {
    id: 'backend',
    title: 'BACKEND NETWORK',
    subtitle: 'NODE_02 // SYSTEM LOGIC',
    icon: <IoCodeOutline />,
    skills: [
      { name: 'Node.js / Express', level: 'ADVANCED' },
      { name: 'PostgreSQL / SQL', level: 'ADVANCED' },
      { name: 'Firebase / Supabase', level: 'EXPERT' },
      { name: 'WebSockets', level: 'ADVANCED' },
      { name: 'REST / GraphQL', level: 'ADVANCED' },
      { name: 'Docker / deployment', level: 'INTERMEDIATE' }
    ]
  },
  {
    id: 'iot',
    title: 'IoT & HARDWARE',
    subtitle: 'NODE_03 // PHYSICAL INTERACTION',
    icon: <IoHardwareChipOutline />,
    skills: [
      { name: 'C++ / Arduino (ESP32)', level: 'ADVANCED' },
      { name: 'BLE / MQTT / Serial', level: 'ADVANCED' },
      { name: 'Flutter (Mobile Dashboard)', level: 'EXPERT' },
      { name: 'Raspberry Pi / Linux', level: 'ADVANCED' },
      { name: 'Sensor Integration', level: 'ADVANCED' },
      { name: 'Schematics & Wiring', level: 'INTERMEDIATE' }
    ]
  },
  {
    id: 'robotics',
    title: 'ROBOTICS & AUTONOMY',
    subtitle: 'NODE_04 // INTELLIGENCE & CONTROL',
    icon: <IoHardwareChip />,
    skills: [
      { name: 'ROS2 Navigation', level: 'ADVANCED' },
      { name: 'Python Control Loops', level: 'ADVANCED' },
      { name: 'OpenCV / Vision', level: 'INTERMEDIATE' },
      { name: 'LiDAR / Mapping', level: 'ADVANCED' },
      { name: 'A* / Pathfinding', level: 'ADVANCED' },
      { name: 'Behavior Trees / FSM', level: 'INTERMEDIATE' }
    ]
  }
]

const SkillTree = () => {
  const hackMode = useStore((state) => state.hackMode)
  const addLog = useStore((state) => state.addLog)
  const [hoveredNode, setHoveredNode] = useState(null)

  const handleSkillHover = (skillName) => {
    // Only log occasionally to avoid flooding
    if (Math.random() < 0.2) {
      addLog(`[SYS_SCAN] Scanning competency node: ${skillName.toUpperCase()}`)
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6 pointer-events-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-xl font-bold font-scifi tracking-widest text-white uppercase">
          SKILL_MATRIX_BLUEPRINT
        </h2>
        <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-0.5">
          Neural competency map of developer qualifications and system node loads.
        </p>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* SVG Decorative Neural Wiring Lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line 
              x1="50%" y1="10%" x2="50%" y2="90%" 
              stroke={hackMode ? "#FF4D6D" : "#00F5FF"} 
              strokeWidth="1" 
              strokeDasharray="4 8"
            />
            <line 
              x1="10%" y1="50%" x2="90%" y2="50%" 
              stroke={hackMode ? "#FF4D6D" : "#00F5FF"} 
              strokeWidth="1" 
              strokeDasharray="4 8"
            />
            <circle 
              cx="50%" cy="50%" r="6" 
              fill={hackMode ? "#FF4D6D" : "#00F5FF"} 
              className="animate-pulse" 
            />
          </svg>
        </div>

        {skillNodes.map((node) => {
          const isNodeHovered = hoveredNode === node.id
          return (
            <div
              key={node.id}
              className={`border transition-all duration-300 p-4 rounded relative flex flex-col justify-between ${
                isNodeHovered 
                  ? (hackMode ? 'border-danger/80 shadow-[0_0_15px_rgba(255,77,109,0.15)] bg-bg/20 backdrop-blur-md' : 'border-primary/80 shadow-[0_0_15px_rgba(0,245,255,0.15)] bg-bg/20 backdrop-blur-md')
                  : 'border-white/5 bg-bg/5 backdrop-blur-sm'
              }`}
              onMouseEnter={() => {
                setHoveredNode(node.id)
                addLog(`[SYS_NAV] Diagnostic connection opened: ${node.title}`)
              }}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div>
                {/* Node Title & Sub */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <div>
                    <h3 className="text-sm font-bold font-scifi text-white tracking-wider flex items-center gap-2">
                      <span className={isNodeHovered ? (hackMode ? "text-danger" : "text-primary") : "text-white/40"}>
                        {node.icon}
                      </span>
                      {node.title}
                    </h3>
                    <div className="text-[8px] text-white/30 font-mono tracking-widest mt-0.5">
                      {node.subtitle}
                    </div>
                  </div>
                  <span className={`text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded-sm border ${
                    isNodeHovered
                      ? (hackMode ? 'text-danger border-danger/30 bg-danger/10' : 'text-primary border-primary/30 bg-primary/10')
                      : 'text-white/30 border-white/10'
                  }`}>
                    UPLINK_OK
                  </span>
                </div>

                {/* Skills chips */}
                <div className="grid grid-cols-2 gap-2">
                  {node.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => handleSkillHover(skill.name)}
                      className="group/skill border border-white/5 bg-white/5 p-2 rounded-sm flex items-center justify-between hover:border-primary/30 transition-all duration-200"
                    >
                      <span className="text-[10px] text-white/70 font-mono group-hover/skill:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className={`text-[8px] font-mono px-1 rounded-sm border ${
                        skill.level === 'EXPERT' 
                          ? 'text-accent border-accent/20 bg-accent/5' 
                          : skill.level === 'ADVANCED'
                            ? 'text-secondary border-secondary/20 bg-secondary/5'
                            : 'text-white/40 border-white/10'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Node statistics */}
              <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-white/30">
                <span>SECTOR_LOAD: {Math.floor(Math.random() * 20 + 20)}%</span>
                <span>INTEGRATION: 100%</span>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillTree
