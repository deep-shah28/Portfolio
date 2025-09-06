import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FiMenu, FiX } from 'react-icons/fi'
import './Header.scss'

const Header = () => {
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 }) // Start after loading screen

    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
      .fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        navRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )

    return () => tl.kill()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)

    if (!isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }

  const handleNavClick = href => {
    setIsMobileMenuOpen(false)
    gsap.to(mobileMenuRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power2.in',
    })

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header ref={headerRef} className="header">
      <div className="container">
        <div className="header-content">
          <div ref={logoRef} className="logo">
            <span className="text-gradient">DS</span>
          </div>

          <nav ref={navRef} className="nav desktop-nav">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link"
                onClick={e => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu">
        <nav className="mobile-nav">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="mobile-nav-link"
              onClick={e => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
