import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const links = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = document.querySelectorAll('section[id]')
      let cur = 'home'
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="glitch logo-text" data-text="ROZARIO">ROZARIO</span>
      </div>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l}`}
              className={active === l ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
