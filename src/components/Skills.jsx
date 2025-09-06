import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJsSquare,
  FaDocker,
  FaAws,
  FaGitAlt,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiNextdotjs,
  SiExpress,
  SiKubernetes,
  SiJest,
  SiWebpack,
  SiVite,
} from 'react-icons/si'
import './Skills.scss'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const skillsGridRef = useRef(null)
  const experienceRef = useRef(null)

  const coreSkills = [
    { name: 'JavaScript', icon: FaJsSquare, years: 4, category: 'language' },
    { name: 'TypeScript', icon: SiTypescript, years: 3, category: 'language' },
    { name: 'Python', icon: FaPython, years: 3, category: 'language' },
    { name: 'React', icon: FaReact, years: 4, category: 'frontend' },
    { name: 'Next.js', icon: SiNextdotjs, years: 2, category: 'frontend' },
    { name: 'Node.js', icon: FaNodeJs, years: 4, category: 'backend' },
    { name: 'Express', icon: SiExpress, years: 3, category: 'backend' },
    { name: 'GraphQL', icon: SiGraphql, years: 2, category: 'backend' },
    { name: 'MongoDB', icon: SiMongodb, years: 3, category: 'database' },
    { name: 'PostgreSQL', icon: SiPostgresql, years: 2, category: 'database' },
    { name: 'Git', icon: FaGitAlt, years: 4, category: 'tools' },
    { name: 'Jest', icon: SiJest, years: 3, category: 'tools' },
    { name: 'Webpack', icon: SiWebpack, years: 3, category: 'tools' },
    { name: 'Vite', icon: SiVite, years: 3, category: 'tools' },
  ]

  const expertise = [
    {
      area: 'Full-Stack Development',
      description: 'End-to-end application development with modern frameworks',
    },
    {
      area: 'System Architecture',
      description: 'Designing scalable and maintainable software systems',
    },
    {
      area: 'API Development',
      description: 'RESTful and GraphQL APIs with proper documentation',
    },
    {
      area: 'Database Design',
      description: 'Optimized database schemas and query performance',
    },
    {
      area: 'DevOps & Deployment',
      description: 'CI/CD pipelines and cloud infrastructure management',
    },
    {
      area: 'Performance Optimization',
      description: 'Code splitting, lazy loading, and performance monitoring',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate experience cards
      gsap.fromTo(
        experienceRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Animate skill items with magnetic effect
      const skillItems = skillsGridRef.current.querySelectorAll('.skill-item')

      skillItems.forEach((item, index) => {
        // Initial animation
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Hover animations
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -8,
            scale: 1.05,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out',
          })

          gsap.to(item.querySelector('.skill-glow'), {
            opacity: 0.6,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out',
          })

          gsap.to(item.querySelector('.skill-glow'), {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })

      // Floating animation for skill icons
      skillItems.forEach(item => {
        const icon = item.querySelector('.skill-icon')
        gsap.to(icon, {
          y: -3,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: Math.random() * 2,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getExperienceLevel = years => {
    if (years >= 4) return 'Expert'
    if (years >= 3) return 'Advanced'
    if (years >= 2) return 'Proficient'
    return 'Intermediate'
  }

  const getCategoryColor = category => {
    const colors = {
      language: '#00d4ff',
      frontend: '#61dafb',
      backend: '#68d391',
      database: '#f6ad55',
      devops: '#fc8181',
      tools: '#b794f6',
    }
    return colors[category] || '#00d4ff'
  }

  return (
    <section id="skills" ref={sectionRef} className="skills section">
      <div className="container">
        <div className="skills-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="skills-subtitle">
            4+ years of experience building scalable applications and leading
            development teams
          </p>
        </div>

        <div className="expertise-grid" ref={experienceRef}>
          {expertise.map((item, index) => (
            <div key={index} className="expertise-card">
              <h3>{item.area}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="skills-section">
          <h3 className="skills-section-title">Core Technologies</h3>
          <div className="skills-grid" ref={skillsGridRef}>
            {coreSkills.map((skill, index) => (
              <div
                key={index}
                className="skill-item"
                data-category={skill.category}
              >
                <div className="skill-glow"></div>
                <div className="skill-content">
                  <div
                    className="skill-icon"
                    style={{ color: getCategoryColor(skill.category) }}
                  >
                    <skill.icon />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-experience">
                      {skill.years}+ years
                    </span>
                    <span className="skill-level">
                      {getExperienceLevel(skill.years)}
                    </span>
                  </div>
                </div>
                <div className="skill-border"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
