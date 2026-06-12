import { create } from 'zustand'

const useStore = create((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  activeWorld: 'foundation',
  setActiveWorld: (world) => set({ activeWorld: world }),
  uiVisible: true,
  setUiVisible: (visible) => set({ uiVisible: visible }),
  
  // Advanced Futuristic HUD States
  selectedProject: null,
  setSelectedProject: (project) => set((state) => {
    const newLog = project 
      ? `[SYS_INFO] Neural link established with ${project.name.toUpperCase()} (ID: PX-${Math.floor(Math.random() * 9000 + 1000)})`
      : '[SYS_INFO] Primary uplink active. Core telemetry restored.';
    return { 
      selectedProject: project,
      logs: [newLog, ...state.logs].slice(0, 50)
    }
  }),
  
  activeTab: 'dashboard', // 'dashboard' | 'projects' | 'skills' | 'contact'
  setActiveTab: (tab) => set((state) => ({ 
    activeTab: tab,
    logs: [`[SYS_NAV] Navigation path routed to: ${tab.toUpperCase()}`, ...state.logs].slice(0, 50)
  })),
  
  hackMode: false,
  setHackMode: (val) => set((state) => ({ 
    hackMode: val, 
    logs: [
      val 
        ? '!! SYSTEM INTRUSION DETECTED !! OVERRIDE SHIELDS. CORE FREQUENCY SHIFTED TO RED ALERT.' 
        : '[SYS_INFO] Standard cyber defense restored. Main protocols active.', 
      ...state.logs
    ].slice(0, 50)
  })),
  
  logs: [
    '[SYS_BOOT] Command Center initialized.',
    '[SYS_BOOT] Core reactor: ACTIVE at 98.7% capacity.',
    '[SYS_BOOT] Neural sync rate: 99.99%',
    '[SYS_BOOT] All orbit nodes broadcasting beacon.',
    '[SYS_READY] Welcome, Operator. System ready for input.'
  ],
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 50) })),
  clearLogs: () => set({ logs: [] }),
}))

export default useStore
