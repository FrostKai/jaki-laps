import { useState, useEffect } from 'react'
import useStore from '../../store/useStore'
import { IoChevronForwardOutline, IoTerminalOutline, IoSpeedometerOutline, IoChevronBackOutline, IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5'

const ProjectTerminal = ({ project }) => {
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  const hackMode = useStore((state) => state.hackMode)
  const addLog = useStore((state) => state.addLog)
  const [booting, setBooting] = useState(true)
  const [bootLogs, setBootLogs] = useState([])
  const [activeSubTab, setActiveSubTab] = useState('specs') // 'specs' | 'source'
  const [copied, setCopied] = useState(false)

  // Simulation of boot sequence logs when a project is loaded
  useEffect(() => {
    setBooting(true)
    setBootLogs([])
    
    const logsList = [
      `[INIT] Establishing connection tunnel to PX-${project.name.toUpperCase()}...`,
      `[LOAD] Loading project descriptor files...`,
      `[SYNC] Syncing remote telemetry nodes...`,
      `[RESOLVE] Tech stack verified: ${project.tech?.join(', ')}`,
      `[OK] Secure neural pipeline established.`
    ]

    let currentLogIndex = 0
    const logInterval = setInterval(() => {
      if (currentLogIndex < logsList.length) {
        setBootLogs((prev) => [...prev, logsList[currentLogIndex]])
        currentLogIndex++
      } else {
        clearInterval(logInterval)
        setBooting(false)
        addLog(`[SYS_INFO] Interface loaded for project: ${project.name}`)
      }
    }, 250)

    return () => clearInterval(logInterval)
  }, [project, addLog])

  // Copy Code action
  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    addLog(`[SYS_ACTION] Copied mock code block for ${project.name}`)
  }

  // Get status pill color
  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE': return 'text-[#00F5FF] border-[#00F5FF]/30 bg-[#00F5FF]/10'
      case 'ACTIVE': return 'text-[#7DF9FF] border-[#7DF9FF]/30 bg-[#7DF9FF]/10'
      case 'DEVELOPMENT': return 'text-amber-400 border-amber-400/30 bg-amber-400/10'
      case 'COMPLETED': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
      default: return 'text-white/60 border-white/20 bg-white/5'
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6 pointer-events-auto">
      {/* Top action header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition-colors font-scifi"
        >
          <IoChevronBackOutline /> RETURN TO CONSOLE_STATUS
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('specs')}
            className={`px-3 py-1 text-xs border rounded transition-all duration-200 font-scifi flex items-center gap-1.5 ${
              activeSubTab === 'specs'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            <IoSpeedometerOutline /> DIAGNOSTICS
          </button>
          <button
            onClick={() => setActiveSubTab('source')}
            className={`px-3 py-1 text-xs border rounded transition-all duration-200 font-scifi flex items-center gap-1.5 ${
              activeSubTab === 'source'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            <IoTerminalOutline /> SOURCE_CODE
          </button>
        </div>
      </div>

      {booting ? (
        // Simulated Boot Sequence UI
        <div className="flex-1 flex flex-col justify-center items-center font-mono border border-primary/10 bg-bg/10 backdrop-blur-xl rounded p-6">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
          <div className="w-full max-w-md space-y-2 text-left text-xs leading-relaxed text-primary/70">
            {bootLogs.map((log, idx) => (
              <div key={idx} className="animate-fade-in flex items-start gap-1">
                <span className="text-secondary select-none">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Main Loaded Interface
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Project Details Panel (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-white/5 bg-bg/10 backdrop-blur-md p-5 rounded relative overflow-hidden">
            {/* Top outline glowing element */}
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${hackMode ? 'from-danger' : 'from-primary'} to-transparent`} />
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold font-scifi tracking-wider text-white uppercase">
                    {project.name}
                  </h2>
                  <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 border rounded-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-accent/80 font-mono tracking-widest mt-1">
                  {project.tagline?.toUpperCase()}
                </p>
              </div>

              <p className="text-xs text-white/70 font-mono leading-relaxed pb-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="space-y-2">
                <div className="text-[10px] text-white/40 font-mono tracking-widest">SYSTEM_STACK</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech?.map((t, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-white/80 hover:border-primary/40 transition-colors`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch simulation */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  addLog(`[SYS_ACTION] Initializing deploy matrix for ${project.name}...`)
                  alert(`Connecting proxy tunnel to live node for ${project.name}... (Simulation Complete)`)
                }}
                className={`w-full py-2.5 px-4 border text-center font-scifi font-bold text-xs rounded transition-all duration-300 flex items-center justify-center gap-2 ${
                  hackMode
                    ? 'border-danger/40 bg-danger/10 text-danger hover:bg-danger/25'
                    : 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/25'
                }`}
              >
                LAUNCH DEPLOYMENT LINK <IoChevronForwardOutline />
              </a>
            </div>
          </div>

          {/* Sub-Tab Viewer (Right 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col border border-white/5 bg-bg/10 backdrop-blur-md rounded overflow-hidden">
            
            {activeSubTab === 'specs' ? (
              // Diagnostics Tab
              <div className="flex-1 p-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-scifi text-primary tracking-widest border-b border-white/10 pb-2 mb-4">
                    REALTIME_UPLINK_DIAGNOSTICS
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(project.stats || {}).map(([key, val]) => (
                      <div key={key} className="p-3 border border-white/5 bg-white/5 rounded-sm">
                        <div className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                          {key.replace(/([A-Z])/g, '_$1')}
                        </div>
                        <div className="text-lg font-bold font-scifi text-white/90 mt-1">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pulse simulator */}
                <div className="border border-white/5 bg-white/5 p-4 rounded-sm flex items-center justify-between">
                  <div className="font-mono text-xs text-white/50">
                    <p className="text-white font-bold mb-1">DATA STREAM INTEGRITY</p>
                    <p className="text-[10px]">ECC Parity: VALID</p>
                    <p className="text-[10px]">Signal Strength: -42dBm</p>
                  </div>
                  <div className="w-32 h-10 flex items-center">
                    {/* Simulated pulse wave */}
                    <div className="flex items-end justify-between w-full h-full">
                      {[40, 20, 80, 50, 30, 90, 60, 20, 40, 10, 70, 40].map((h, i) => (
                        <div 
                          key={i} 
                          className={`w-[4px] rounded-t-sm transition-all duration-300 ${hackMode ? 'bg-danger/80' : 'bg-primary/80 animate-pulse'}`}
                          style={{ 
                            height: `${h}%`,
                            animationDelay: `${i * 100}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              // Source Code Tab
              <div className="flex-1 flex flex-col overflow-hidden h-[360px] lg:h-auto">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center text-xs font-mono">
                  <span className="text-white/60">PROJECT_ROOT // {project.name.toLowerCase().replace(' ', '_')}_src</span>
                  <button
                    onClick={handleCopyCode}
                    className="text-white/40 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <IoCheckmarkOutline className="text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <IoCopyOutline />
                        <span className="text-[10px]">COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-auto font-mono text-[11px] leading-relaxed text-white/80 bg-bg/20 select-text scrollbar-thin">
                  <pre className="whitespace-pre">{project.codeSnippet}</pre>
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  )
}

export default ProjectTerminal
