import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ProgressBar = ({ progress }) => {
  const barRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power2.out"
    })
  }, [progress])

  return (
    <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
      <div 
        ref={barRef}
        className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#00F5FF]"
      />
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"
      />
    </div>
  )
}

export default ProgressBar
