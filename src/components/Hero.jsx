import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiDownload, FiArrowDown } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './Hero.scss'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const socialRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 }) // Start after header animation

    // Animate hero elements
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        socialRef.current.children,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )

    // Typing effect for subtitle
    const typeText = () => {
      const text = 'Full Stack Developer & UI/UX Designer'
      const element = subtitleRef.current.querySelector('.typing-text')
      let i = 0

      const typing = setInterval(() => {
        element.textContent = text.slice(0, i)
        i++
        if (i > text.length) {
          clearInterval(typing)
        }
      }, 50)
    }

    setTimeout(typeText, 4000)

    // Floating animation for scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 5,
    })

    return () => tl.kill()
  }, [])

  const handleDownloadCV = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/Deep_shah_resume.pdf'
    link.download = 'Deep_Shah_Resume.pdf'
    link.click()
  }

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" ref={heroRef} className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              Hi, I'm <span className="text-gradient">Deep Shah</span>
            </h1>

            <div ref={subtitleRef} className="hero-subtitle">
              <span className="typing-text"></span>
              <span className="cursor">|</span>
            </div>

            <p ref={descriptionRef} className="hero-description">
              I create exceptional digital experiences through innovative web
              development and thoughtful design. Passionate about building
              scalable applications that make a difference.
            </p>

            <div ref={buttonsRef} className="hero-buttons">
              <button className="btn btn-primary" onClick={handleDownloadCV}>
                <FiDownload />
                Download CV
              </button>
              <button className="btn" onClick={scrollToAbout}>
                View My Work
              </button>
            </div>
          </div>

          <div className="hero-side">
            <div ref={socialRef} className="social-links">
              <a
                href="https://github.com/deep-shah28"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/deep-shah-b75503180/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scroll-indicator"
          onClick={scrollToAbout}
        >
          <span>Scroll Down</span>
          <FiArrowDown />
        </div>
      </div>
    </section>
  )
}

export default Hero
