import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './components/Experience'
import useStore from './store/useStore'
import LoadingScreen from './components/loading/LoadingScreen'

function App() {
  const isLoaded = useStore((state) => state.isLoaded)
  const uiVisible = useStore((state) => state.uiVisible)

  return (
    <div className="w-full h-screen bg-bg relative">
      {!isLoaded && <LoadingScreen />}

      {/* 3D Scene */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      {isLoaded && uiVisible && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 animate-fade-in">
          <header className="flex justify-between items-center pointer-events-auto">
            <h1 className="text-primary text-2xl font-bold tracking-widest uppercase">
              Jaki Labs <span className="text-white/20">|</span> Foundation
            </h1>
            <nav className="space-x-6 text-sm">
              <a href="#" className="text-accent hover:text-white transition-colors">STATUS: ACTIVE</a>
              <a href="#" className="text-accent hover:text-white transition-colors">CORE: READY</a>
            </nav>
          </header>

          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-4 opacity-50" />
              <p className="text-secondary text-xs tracking-[0.5em] uppercase animate-pulse">
                Neural Interface Active
              </p>
            </div>
          </main>

          <footer className="flex justify-between items-end pointer-events-auto">
            <div className="text-[10px] text-white/30 font-mono">
              <p>COORD: 0.0.0</p>
              <p>PHASE: 01_FOUNDATION</p>
            </div>
            <div className="flex space-x-4">
               {/* Placeholder for future world navigation */}
               <div className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary/40 text-[8px]">
                 W_01
               </div>
               <div className="w-10 h-10 border border-white/5 flex items-center justify-center text-white/10 text-[8px]">
                 W_02
               </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}

export default App
