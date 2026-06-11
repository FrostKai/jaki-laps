import { useEffect, useState } from 'react'

const TypingText = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayedText('')
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [index, text, speed, onComplete])

  return (
    <span className="font-mono text-primary tracking-[0.2em] uppercase text-xs">
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  )
}

export default TypingText
