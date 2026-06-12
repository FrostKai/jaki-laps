import { useState, useEffect } from 'react'
import useStore from '../../store/useStore'
import { projectsData } from '../../store/projectData'
import SystemStatus from './SystemStatus'
import ProjectTerminal from './ProjectTerminal'
import SkillTree from './SkillTree'
import ContactTerminal from './ContactTerminal'
import { IoGridOutline, IoLayersOutline, IoChatbubbleEllipsesOutline, IoSparkles, IoWarningOutline, IoPulseOutline } from 'react-icons/io5'

const CommandHUD = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedProject, 
    setSelectedProject, 
    hackMode 
  } = useStore()

  // Live Packet Stream simulation state
  const [packetStream, setPacketStream] = useState([
    { id: 1, text: 'SECURE_LINK: established', tag: 'OK' },
    { id: 2, text: 'FREQ_MOD: locked 94.2GHz', tag: 'SYNC' },
    { id: 3, text: 'AICORE_EMISSION: stable', tag: 'CORE' }
  ])

  // Project List
  const projectsList = Object.values(projectsData)

  // Generate real-time telemetry packet streams
  useEffect(() => {
    const packetTypes = [
      { text: 'TELEMETRY: sync node_', tag: 'SYNC' },
      { text: 'PACKET_IN: 1.4 KB from node_', tag: 'RECV' },
      { text: 'SIGNAL_STR: -42dBm node_', tag: 'PING' },
      { text: 'CORE_TEMP: 24.5C ', tag: 'TEMP' },
      { text: 'PARITY_CHECK: 0x82FA ', tag: 'ECC' }
    ]
    const nodes = ['sonar', 'xora', 'helm', 'java']

    const timer = setInterval(() => {
      const type = packetTypes[Math.floor(Math.random() * packetTypes.length)]
      const node = nodes[Math.floor(Math.random() * nodes.length)]
      const newPacket = {
        id: Date.now(),
        text: `${type.text}${node}`,
        tag: type.tag
      }
      setPacketStream((prev) => [newPacket, ...prev.slice(0, 3)])
    }, 1800)

    return () => clearInterval(timer)
  }, [])

  // Dynamic Pulse Reactor Classes synced with AI Core
  const pulseBorderClass = hackMode 
    ? 'animate-pulse-reactor-red border-danger/30' 
    : 'animate-pulse-reactor border-primary/30'

  return (
    <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 transition-all duration-500 z-50 overflow-hidden animate-flicker`}>
      
      {/* Global Scanline Sweeper Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100] opacity-40">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent absolute top-0 left-0 animate-scanline" />
      </div>

      {/* Subtle background red alert overlay for Hack Mode */}
      {hackMode && (
        <div className="absolute inset-0 pointer-events-none bg-danger/[0.03] z-0 animate-pulse" />
      )}

      {/* TOP HEADER */}
      <header className={`pointer-events-auto w-full md:absolute md:top-6 md:left-6 md:right-6 md:w-[calc(100%-3rem)] bg-bg/25 backdrop-blur-md px-4 py-2.5 border rounded-md transition-all duration-500 flex justify-between items-center z-10 ${pulseBorderClass}`}>
        <div className="flex items-center gap-2">
          <h1 className="text-white text-sm md:text-base font-bold font-scifi tracking-widest uppercase">
            JAKI LABS <span className={hackMode ? "text-danger" : "text-primary"}>// COMMAND_CENTER_OS v7.5</span>
          </h1>
          {hackMode && (
            <span className="text-danger flex items-center gap-1 text-[9px] font-mono animate-pulse bg-danger/10 px-2 py-0.5 border border-danger/30 rounded-sm">
              <IoWarningOutline /> SYSTEM OVERLOAD
            </span>
          )}
        </div>
        
        <div className="text-[10px] font-mono flex items-center space-x-4">
          <span className="text-white/40 hidden md:inline">NODE_UPLINK: ACTIVE</span>
          <span className={hackMode ? 'text-danger font-bold animate-pulse' : 'text-accent'}>
            {hackMode ? 'EMERGENCY_COOLDOWN_ACTIVE' : 'SYS_STATUS: OPTIMAL'}
          </span>
        </div>
      </header>

      {/* MAIN LAYOUT WITH FLOATING PANELS */}
      {/* 
        On medium and large screens, we use absolute positioning for left and right panels.
        This leaves the center 100% clear, revealing the pulsing AI Core in the 3D scene.
      */}
      <div className="flex-1 my-4 flex flex-col md:block pointer-events-none relative">
        
        {/* SIDEBAR (Left Floating Panel) */}
        <div className={`pointer-events-auto w-full md:absolute md:left-2 md:top-14 md:bottom-12 md:w-76 lg:w-80 bg-bg/20 backdrop-blur-xl p-4 rounded-md transition-all duration-500 border flex flex-col justify-between overflow-y-auto scrollbar-thin z-10 ${pulseBorderClass}`}>
          
          {/* Navigation Links */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] text-white/30 font-mono tracking-widest">SYSTEM_UPLINK_PATHS</div>
              <div className="space-y-1">
                
                {/* Dashboard Tab */}
                <button
                  onClick={() => {
                    setActiveTab('dashboard')
                    setSelectedProject(null)
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-scifi tracking-wider rounded-sm transition-all duration-200 flex items-center justify-between ${
                    activeTab === 'dashboard' && !selectedProject
                      ? (hackMode ? 'bg-danger/10 text-danger border-l-2 border-danger' : 'bg-primary/10 text-primary border-l-2 border-primary')
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-l border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <IoGridOutline /> SYSTEM_DASHBOARD
                  </span>
                  {activeTab === 'dashboard' && !selectedProject && (
                    <span className={`w-1.5 h-1.5 rounded-full ${hackMode ? 'bg-danger' : 'bg-primary'} animate-pulse`} />
                  )}
                </button>

                {/* Skill Tree Tab */}
                <button
                  onClick={() => {
                    setActiveTab('skills')
                    setSelectedProject(null)
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-scifi tracking-wider rounded-sm transition-all duration-200 flex items-center justify-between ${
                    activeTab === 'skills'
                      ? (hackMode ? 'bg-danger/10 text-danger border-l-2 border-danger' : 'bg-primary/10 text-primary border-l-2 border-primary')
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-l border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <IoLayersOutline /> SKILL_MATRIX
                  </span>
                  {activeTab === 'skills' && (
                    <span className={`w-1.5 h-1.5 rounded-full ${hackMode ? 'bg-danger' : 'bg-primary'} animate-pulse`} />
                  )}
                </button>

                {/* Contact Tab */}
                <button
                  onClick={() => {
                    setActiveTab('contact')
                    setSelectedProject(null)
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-scifi tracking-wider rounded-sm transition-all duration-200 flex items-center justify-between ${
                    activeTab === 'contact'
                      ? (hackMode ? 'bg-danger/10 text-danger border-l-2 border-danger' : 'bg-primary/10 text-primary border-l-2 border-primary')
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-l border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <IoChatbubbleEllipsesOutline /> CONTACT_CORE
                  </span>
                  {activeTab === 'contact' && (
                    <span className={`w-1.5 h-1.5 rounded-full ${hackMode ? 'bg-danger' : 'bg-primary'} animate-pulse`} />
                  )}
                </button>
              </div>
            </div>

            {/* Project Quick Links with Pulsing Node Lights */}
            <div className="space-y-2">
              <div className="text-[8px] text-white/30 font-mono tracking-widest">ORBITAL_OBJECT_DEVICES</div>
              <div className="space-y-1">
                {projectsList.map((p) => {
                  const isProjSelected = selectedProject?.name.toLowerCase() === p.name.toLowerCase()
                  return (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedProject(p)
                        setActiveTab('projects')
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono rounded-sm transition-all duration-200 flex items-center justify-between relative overflow-hidden group ${
                        isProjSelected
                          ? (hackMode ? 'bg-danger/10 text-danger border-r-2 border-danger font-bold' : 'bg-primary/10 text-primary border-r-2 border-primary font-bold')
                          : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                      }`}
                    >
                      {/* Hover Slide Shimmer */}
                      <span className="absolute inset-y-0 left-0 w-0.5 bg-primary/40 group-hover:w-full transition-all duration-300 -z-10 opacity-5" />

                      <span className="truncate flex items-center gap-2">
                        {/* Blinking Pulse Light */}
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          p.status === 'ONLINE' || p.status === 'ACTIVE' 
                            ? 'bg-accent animate-ping' 
                            : p.status === 'COMPLETED' 
                              ? 'bg-emerald-400' 
                              : 'bg-amber-400'
                        }`} />
                        <span>{p.name.toUpperCase()}</span>
                      </span>
                      
                      <span className={`text-[8px] tracking-tighter ml-2 font-mono opacity-80 ${
                        p.status === 'ONLINE' || p.status === 'ACTIVE' 
                          ? 'text-accent' 
                          : p.status === 'COMPLETED' 
                            ? 'text-emerald-400' 
                            : 'text-amber-400'
                      }`}>
                        {p.status}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* New Live System Activity Telemetry Layer */}
          <div className="mt-6 border-t border-white/5 pt-4 space-y-3">
            <div className="text-[8px] text-white/30 font-mono tracking-widest flex items-center justify-between">
              <span>REALTIME_NETWORK_FEED</span>
              <IoPulseOutline className="animate-pulse text-accent" />
            </div>
            
            <div className="space-y-1.5 font-mono text-[9px]">
              {packetStream.map((packet) => (
                <div key={packet.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-1 rounded-sm text-white/60">
                  <span className="truncate text-white/40">{packet.text}</span>
                  <span className={`text-[8px] scale-[0.8] px-1 border rounded-sm ${
                    packet.tag === 'OK' || packet.tag === 'SYNC' ? 'text-accent border-accent/20 bg-accent/5' : 'text-secondary border-secondary/20 bg-secondary/5'
                  }`}>
                    {packet.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-white/5 pt-3 mt-4 space-y-1.5 font-mono text-[9px] text-white/20">
            <div className="flex justify-between">
              <span>GRID_CELL:</span>
              <span className="text-white/40 font-bold">X-42.Y-8.Z-91</span>
            </div>
            <div className="flex justify-between">
              <span>SYNC_STABILITY:</span>
              <span className="text-emerald-400 font-bold">99.99%</span>
            </div>
          </div>

        </div>

        {/* ACTIVE MODULE CONTAINER (Right Floating Panel) */}
        {/* 
          Main content display floats on the right, keeping the center open.
          Provides maximum glassmorphism, transparent backdrop blur, and reactor pulses.
        */}
        <div className={`pointer-events-auto w-full flex-1 md:absolute md:right-2 md:top-14 md:bottom-12 md:w-[calc(100%-21rem)] lg:w-[480px] xl:w-[560px] bg-bg/20 backdrop-blur-xl p-4 md:p-6 rounded-md transition-all duration-500 border flex flex-col justify-stretch overflow-y-auto scrollbar-thin z-10 ${pulseBorderClass}`}>
          {selectedProject ? (
            <ProjectTerminal project={selectedProject} />
          ) : activeTab === 'dashboard' ? (
            <SystemStatus />
          ) : activeTab === 'skills' ? (
            <SkillTree />
          ) : activeTab === 'contact' ? (
            <ContactTerminal />
          ) : (
            <SystemStatus />
          )}
        </div>

      </div>

      {/* FOOTER */}
      <footer className={`pointer-events-auto w-full md:absolute md:bottom-6 md:left-6 md:right-6 md:w-[calc(100%-3rem)] bg-bg/25 backdrop-blur-md px-4 py-2.5 border rounded-md transition-all duration-500 flex justify-between items-center z-10 ${pulseBorderClass}`}>
        <div>
          <span className="font-mono text-[9px] text-white/30">OPERATOR_ACCESS_LEVEL: MAIN_VISITOR</span>
        </div>
        <div className="flex items-center gap-1.5 text-accent text-[9px] font-mono">
          <IoSparkles className="animate-spin-slow text-primary" />
          <span>PHASE_07.5: CINEMATIC_HUD_ACTIVE</span>
        </div>
      </footer>

    </div>
  )
}

export default CommandHUD
