import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import {
  FiMail, FiSend,
  FiUser,
  FiMessageSquare,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi'
import './Contact.scss'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const contactInfoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact info
      gsap.fromTo(
        contactInfoRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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

      // Animate form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // EmailJS configuration from environment variables
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Deep Shah', // Your name
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )

      if (response.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Show success animation
        gsap.fromTo(
          formRef.current,
          { scale: 1 },
          {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          }
        )
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  const handleInputFocus = e => {
    const label = e.target.previousElementSibling
    if (label) {
      gsap.to(label, {
        y: -10,
        scale: 0.9,
        color: 'var(--accent-color)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleInputBlur = e => {
    const label = e.target.previousElementSibling
    if (label && !e.target.value) {
      gsap.to(label, {
        y: 0,
        scale: 1,
        color: 'var(--text-secondary)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div ref={contactInfoRef} className="contact-info">
            <div className="contact-intro">
              <h3>Ready to Build Something Amazing?</h3>
              <p>
                Let's turn your ideas into reality! I specialize in creating
                high-quality, scalable solutions that deliver exceptional user
                experiences and drive business growth.
              </p>
              <div className="contact-highlights">
                <div className="highlight-badge">
                  <span className="badge-icon">⚡</span>
                  <span>Quick Response</span>
                </div>
                <div className="highlight-badge">
                  <span className="badge-icon">🎯</span>
                  <span>Quality Delivery</span>
                </div>
                <div className="highlight-badge">
                  <span className="badge-icon">🚀</span>
                  <span>Modern Solutions</span>
                </div>
              </div>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-container">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <div className="input-container">
                <FiMessageSquare className="input-icon" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div className="input-container">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </button>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="form-status success">
                <FiCheck />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="form-status error">
                <FiAlertCircle />
                <span>Failed to send message. Please try again or contact me directly.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
