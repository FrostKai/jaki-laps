import { useState, useEffect, useRef } from 'react'
import useStore from '../../store/useStore'
import { IoWarningOutline, IoFlameOutline, IoPulseOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'

const SystemStatus = () => {
  const { logs, hackMode, setHackMode } = useStore()
  const [cpuHistory, setCpuHistory] = useState([45, 48, 42, 50, 47, 52, 49, 44, 48, 55, 51, 58])
  const [ramLoad, setRamLoad] = useState(62)
  const [uptime, setUptime] = useState(0)
  const logsEndRef = useRef(null)

  // System Uptime Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // CPU Load simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuHistory((prev) => {
        const base = hackMode ? 85 : 45
        const variance = Math.floor(Math.random() * 16) - 8
        const nextVal = Math.min(Math.max(base + variance, 5), 100)
        return [...prev.slice(1), nextVal]
      })
      setRamLoad((prev) => {
        const base = hackMode ? 92 : 62
        const variance = Math.floor(Math.random() * 4) - 2
        return Math.min(Math.max(base + variance, 10), 100)
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [hackMode])

  // Scroll logs to bottom on update
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  // Format Uptime
  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0')
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  }

  // Create SVG path from CPU history
  const svgWidth = 240
  const svgHeight = 60
  const points = cpuHistory
    .map((val, idx) => {
      const x = (idx / (cpuHistory.length - 1)) * svgWidth
      const y = svgHeight - (val / 100) * svgHeight
      return `${x},${y}`
    })
    .join(' ')

  const currentCpu = cpuHistory[cpuHistory.length - 1]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pointer-events-auto">
      {/* Diagnostics Panel (Left 7 Columns) */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        
        {/* Core Status Header */}
        <div className={`border p-4 rounded flex items-center justify-between relative overflow-hidden group transition-all duration-300 bg-bg/15 backdrop-blur-xl ${hackMode ? 'animate-pulse-reactor-red border-danger/30' : 'animate-pulse-reactor border-primary/30'}`}>
          {/* Shimmer Effect */}
          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <div>
            <div className="text-[10px] text-white/40 tracking-wider font-mono">SYS_CORE_UPLINK</div>
            <div className="text-xl font-bold font-scifi text-primary flex items-center gap-2">
              {hackMode ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-danger animate-ping" />
                  <span className="text-danger">OVERLOAD_MODE</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span>SECURE_UPLINK</span>
                </>
              )}
            </div>
          </div>
          
          <div className="text-right font-mono">
            <div className="text-[10px] text-white/40">SYS_UPTIME</div>
            <div className="text-lg text-white font-bold">{formatUptime(uptime)}</div>
          </div>
        </div>

        {/* Realtime Telemetry Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* CPU Load Card */}
          <div className="border border-white/5 bg-bg/10 backdrop-blur-md p-4 rounded flex flex-col justify-between h-36">
            <div className="flex justify-between items-center text-[10px] text-white/40 font-mono">
              <span>CPU_LOAD</span>
              <IoPulseOutline className={hackMode ? "text-danger animate-pulse" : "text-primary"} />
            </div>
            
            <div className="my-2">
              <span className="text-2xl font-bold font-scifi">{currentCpu}%</span>
              <span className="text-[8px] text-white/30 ml-2">8_CORES</span>
            </div>

            {/* Sparkline */}
            <div className="w-full h-10 mt-1">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke={hackMode ? "#FF4D6D" : "#00F5FF"}
                  strokeWidth="2"
                  points={points}
                />
              </svg>
            </div>
          </div>

          {/* RAM Load Card */}
          <div className="border border-white/5 bg-bg/10 backdrop-blur-md p-4 rounded flex flex-col justify-between h-36">
            <div className="flex justify-between items-center text-[10px] text-white/40 font-mono">
              <span>RAM_ALLOC</span>
              <IoShieldCheckmarkOutline className="text-secondary" />
            </div>

            <div className="my-2">
              <span className="text-2xl font-bold font-scifi">{ramLoad}%</span>
              <span className="text-[8px] text-white/30 ml-2">{(16 * (ramLoad / 100)).toFixed(1)} / 16.0 GB</span>
            </div>

            {/* Progress fill */}
            <div className="w-full bg-white/5 h-2 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${hackMode ? 'bg-danger' : 'bg-secondary'}`}
                style={{ width: `${ramLoad}%` }}
              />
            </div>
            <div className="text-[8px] text-white/30 font-mono text-right">CACHE: 4.2 GB</div>
          </div>
        </div>

        {/* Reactor Controller */}
        <div className="border border-white/5 bg-bg/10 backdrop-blur-md p-4 rounded flex flex-col space-y-4">
          <div className="text-xs font-scifi tracking-widest text-primary border-b border-white/10 pb-2 flex items-center justify-between">
            <span>REACTOR_CORE_REGULATOR</span>
            {hackMode && (
              <span className="text-danger flex items-center gap-1 text-[10px] font-mono animate-pulse">
                <IoWarningOutline /> STABILITY: CRITICAL
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>REACTOR OUTPUT</span>
                <span>{hackMode ? '999.4 GW' : '121.6 GW'}</span>
              </div>
              <div className="h-3 bg-white/5 border border-white/10 rounded overflow-hidden p-0.5 relative">
                <div 
                  className={`h-full transition-all duration-500 rounded-sm ${hackMode ? 'bg-gradient-to-r from-danger via-amber-500 to-danger animate-pulse' : 'bg-gradient-to-r from-secondary to-primary'}`}
                  style={{ width: hackMode ? '100%' : '78%' }}
                />
              </div>
            </div>

            <button
              onClick={() => setHackMode(!hackMode)}
              className={`px-4 py-2 border font-scifi font-bold text-xs rounded transition-all duration-300 flex items-center gap-2 ${
                hackMode
                  ? 'border-danger/40 bg-danger/10 text-danger hover:bg-danger/20 hover:border-danger'
                  : 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary'
              }`}
            >
              <IoFlameOutline className={hackMode ? "animate-bounce" : ""} />
              {hackMode ? 'RESTORE SAFE_MODE' : 'OVERLOAD REACTOR'}
            </button>
          </div>

          <p className="text-[10px] text-white/40 font-mono leading-relaxed">
            {hackMode 
              ? 'WARNING: Reactor frequency has been overdriven. Quantum core containment fields are operating at maximum load. High risk of local disruption.' 
              : 'AI core cooling systems fully functional. Electromagnetic containment shield operating at normal levels. Particle emission rates stabilized.'}
          </p>
        </div>

      </div>

      {/* Terminal Logs (Right 5 Columns) */}
      <div className="lg:col-span-5 flex flex-col border border-white/5 bg-bg/15 backdrop-blur-xl rounded overflow-hidden h-[360px] lg:h-auto">
        <div className="bg-white/5 px-4 py-2 text-xs font-mono text-white/60 border-b border-white/5 flex justify-between items-center">
          <span>SYSTEM_LOG_FEED</span>
          <span className="text-[9px] text-accent/50">STREAMING</span>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] space-y-2 select-text scrollbar-thin">
          {logs.map((log, idx) => {
            let color = 'text-white/60'
            if (log.startsWith('!!')) color = 'text-danger font-bold'
            else if (log.startsWith('[SYS_BOOT]')) color = 'text-white/30'
            else if (log.includes('established')) color = 'text-accent'
            else if (log.includes('Navigation')) color = 'text-secondary'

            return (
              <div key={idx} className={`${color} leading-tight`}>
                {log}
              </div>
            )
          })}
          <div ref={logsEndRef} />
        </div>
        
        <div className="p-3 bg-white/5 border-t border-white/5 text-[9px] font-mono text-white/30 flex justify-between items-center">
          <span>OPERATOR_LEVEL: ALPHA</span>
          <span>CHANNEL: SECURE_01</span>
        </div>
      </div>
    </div>
  )
}

export default SystemStatus
