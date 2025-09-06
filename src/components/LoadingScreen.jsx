import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.scss'

const LoadingScreen = () => {
  const loadingRef = useRef(null)
  const textRef = useRef(null)
  const progressRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(loadingRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => setIsLoading(false),
          })
        }, 500)
      },
    })

    // Animate loading text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    // Animate progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power2.inOut' },
      '-=0.3'
    )

    return () => tl.kill()
  }, [])

  if (!isLoading) return null

  return (
    <div ref={loadingRef} className="loading-screen">
      <div className="loading-content">
        <div ref={textRef} className="loading-text">
          <span className="text-gradient">Deep Shah</span>
          <p>Loading Portfolio...</p>
        </div>
        <div className="progress-container">
          <div ref={progressRef} className="progress-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
