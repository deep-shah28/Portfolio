import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiCode, FiUsers, FiAward, FiCoffee } from 'react-icons/fi'
import './About.scss'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)
  const imageRef = useRef(null)

  const stats = [
    { icon: FiCode, number: 20, label: 'Projects Completed', suffix: '+' },
    { icon: FiUsers, number: 15, label: 'Happy Clients', suffix: '+' },
    { icon: FiAward, number: 4, label: 'Years Experience', suffix: '+' },
    { icon: FiCoffee, number: 500, label: 'Cups of Coffee', suffix: '+' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content on scroll
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animate image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animate stats with counter effect
      stats.forEach((stat, index) => {
        const statElement = statsRef.current?.children[index]
        if (!statElement) return
        
        const numberElement = statElement.querySelector('.stat-number')
        
        gsap.fromTo(
          statElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
        
        // Counter animation
        if (numberElement) {
          gsap.fromTo(
            { value: 0 },
            {
              value: stat.number,
              duration: 2,
              delay: 0.5 + index * 0.1,
              ease: 'power2.out',
              onUpdate: function() {
                numberElement.textContent = Math.floor(this.targets()[0].value)
              },
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about section">
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">About</h2>
          <div className="section-subtitle">Building digital experiences that matter</div>
        </div>
        
        <div className="about-content">
          <div ref={contentRef} className="about-main">
            <div className="about-text">
              <h3 className="about-title">
                Senior Full-Stack Developer
                <span className="title-accent">with 4+ years of expertise</span>
              </h3>
              
              <div className="about-description">
                <p>
                  I architect and develop scalable web applications using modern technologies. 
                  My expertise spans from interactive frontends with React and advanced animations 
                  to robust backend systems with Node.js and cloud infrastructure.
                </p>
                <p>
                  I've successfully delivered 20+ projects ranging from e-commerce platforms with 
                  payment integrations to complex 3D visualization systems using Unreal Engine and Azure Maps.
                </p>
              </div>

              <div className="expertise-tags">
                <span className="tag">Full-Stack Architecture</span>
                <span className="tag">React & Node.js</span>
                <span className="tag">3D Visualization</span>
                <span className="tag">Payment Systems</span>
                <span className="tag">Cloud Integration</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.number}{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
