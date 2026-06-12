import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './components/Experience'
import useStore from './store/useStore'
import LoadingScreen from './components/loading/LoadingScreen'
import CommandHUD from './components/hud/CommandHUD'

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
      {isLoaded && uiVisible && <CommandHUD />}
    </div>
  )
}

export default App

