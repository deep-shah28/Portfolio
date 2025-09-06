import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub, FiCode, FiStar } from 'react-icons/fi'
import './Projects.scss'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const projectsRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "Cazami E-Commerce Platform",
      description: "A comprehensive e-commerce platform where users can earn money by uploading reels and shop with their earnings. Features advanced payment integration with Stripe and multi-panel architecture.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "Stripe", "MongoDB", "Express"],
      highlights: ["💳 Stripe Integration", "🎬 Reel Upload System", "👥 Multi-Panel Design", "💰 Earning System"],
      featured: true,
      category: "Full Stack",
      duration: "Feb 2023 - Dec 2024"
    },
    {
      id: 2,
      title: "UPM 3D Visualization Platform",
      description: "Advanced web application integrating React frontend with Unreal Engine's 3D visualization and Azure Maps for interactive mapping solutions with gaming-grade graphics.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Unreal Engine", "Azure Maps", "REST APIs"],
      highlights: ["🎮 3D Rendering", "🗺️ Azure Maps API", "⚡ Real-time Visualization", "🔄 Interactive Mapping"],
      featured: true,
      category: "Advanced Tech",
      duration: "Mar 2024 - May 2024"
    },
    {
      id: 3,
      title: "MOM Dashboard",
      description: "Custom React-based meeting management dashboard with interactive data visualizations, real-time updates, and automated report generation for efficient meeting tracking.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Chart.js", "Node.js", "WebSocket"],
      highlights: ["📊 Data Visualization", "⚡ Real-time Updates", "🤖 Auto Reports", "📈 Metrics Tracking"],
      featured: true,
      category: "Dashboard",
      duration: "May 2024"
    },
    {
      id: 4,
      title: "Job Founders Platform",
      description: "Comprehensive job finding platform with three distinct panels for candidates, companies, and mediators. Streamlines the entire recruitment process with advanced matching algorithms.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MySQL", "Express", "JWT"],
      highlights: ["👥 3-Panel System", "🎯 Job Matching", "🔐 Secure Auth", "📋 Recruitment Flow"],
      featured: false,
      category: "Platform",
      duration: "Jan 2023 - Feb 2024"
    },
    {
      id: 5,
      title: "MOM View Factory Management",
      description: "Role-based admin panel for factory machine management with comprehensive user permissions and real-time monitoring of industrial equipment.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      highlights: ["🏭 Machine Monitoring", "👑 Role-based Access", "⚡ Real-time Data", "🔧 Equipment Control"],
      featured: false,
      category: "Industrial",
      duration: "Feb 2024 - May 2024"
    },
    {
      id: 6,
      title: "Pocomos Pest Control System",
      description: "Professional pest control management software designed to streamline operations and improve efficiency for pest management professionals in the industry.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "PostgreSQL", "Express"],
      highlights: ["🐛 Pest Management", "📅 Schedule System", "📊 Analytics Dashboard", "⚡ Workflow Automation"],
      featured: false,
      category: "Business Software",
      duration: "Oct 2021 - Feb 2023"
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.fromTo(
        projectsRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (e, isEntering) => {
    const card = e.currentTarget
    const image = card.querySelector('.project-image')
    const overlay = card.querySelector('.project-overlay')

    if (isEntering) {
      gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' })
      if (image) {
        gsap.to(image, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
      }
      if (overlay) {
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }
    } else {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
      if (image) {
        gsap.to(image, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      }
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="projects section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div ref={projectsRef} className="projects-grid">
          {projects.map(project => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              onMouseEnter={e => handleCardHover(e, true)}
              onMouseLeave={e => handleCardHover(e, false)}
            >
              {project.featured && (
                <div className="featured-badge">
                  <FiStar />
                  Featured
                </div>
              )}

              <div className="project-image-container">
                <div className="project-image">
                  <div className="image-placeholder">
                    <FiCode />
                  </div>
                </div>
                <div className="project-overlay">
                  <div className="project-highlights">
                    <h4 className="highlights-title">Key Features</h4>
                    <div className="highlights-grid">
                      {project.highlights.map((highlight, index) => (
                        <div key={index} className="highlight-item">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
