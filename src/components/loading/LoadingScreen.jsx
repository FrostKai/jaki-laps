import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import useStore from '../../store/useStore'
import ProgressBar from './ProgressBar'
import TypingText from './TypingText'

const messages = [
  "Loading Assets...",
  "Initializing Systems...",
  "Starting AI Core...",
  "Connecting Neural Network...",
  "Welcome Operator..."
]

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const setLoaded = useStore((state) => state.setLoaded)
  const screenRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress >= 100) setMsgIndex(4)
    else if (progress >= 75) setMsgIndex(3)
    else if (progress >= 50) setMsgIndex(2)
    else if (progress >= 25) setMsgIndex(1)
    else setMsgIndex(0)
  }, [progress])

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setLoaded(true)
      })
      
      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power4.inOut"
      })
      tl.to(screenRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      })
    }
  }, [progress, setLoaded])

  return (
    <div 
      ref={screenRef}
      className="fixed inset-0 z-[999] bg-bg flex items-center justify-center flex-col"
    >
      <div ref={contentRef} className="flex flex-col items-center space-y-8">
        {/* Futuristic Logo Placeholder */}
        <div className="relative">
          <div className="w-16 h-16 border-2 border-primary/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 bg-primary rounded-sm rotate-45 animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <TypingText text={messages[msgIndex]} />
          <div className="flex justify-center">
            <ProgressBar progress={progress} />
          </div>
          <div className="text-[10px] text-primary/40 font-mono tracking-tighter">
            SYSTEM_STATUS: {progress}%
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 text-[8px] text-white/5 font-mono pointer-events-none">
        BOOT_SEQUENCE_ALPHA_7
      </div>
      <div className="absolute bottom-10 right-10 text-[8px] text-white/5 font-mono pointer-events-none">
        LATENCY: 0.002ms
      </div>
    </div>
  )
}

export default LoadingScreen
