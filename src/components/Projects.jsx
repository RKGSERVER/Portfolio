import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Anime World',
    tag: 'Web App',
    desc: 'A full anime discovery platform with search, genres, trending and watchlist features.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#ff3c00',
    preview: 'https://rkgserver.github.io/Anime-World/',
  },
  {
    id: 2,
    title: 'DelishDash',
    tag: 'MERN Stack',
    desc: 'A full-stack food delivery app built with MongoDB, Express, React and Node.js.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#ff9500',
    preview: 'https://github.com/RKGSERVER',
  },
  {
    id: 3,
    title: 'Flappy Bird Game',
    tag: 'Game',
    desc: 'A browser-based Flappy Bird clone with smooth physics and score tracking.',
    tech: ['HTML5 Canvas', 'JavaScript'],
    color: '#00e676',
    preview: 'https://rkgserver.github.io/Flappy-Bird/',
  },
  {
    id: 4,
    title: 'Rainworld Website',
    tag: 'Frontend',
    desc: 'An immersive rain-themed website with animated effects and atmospheric design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#00b0ff',
    preview: 'https://rkgserver.github.io/Rainworld/',
  },
  {
    id: 5,
    title: 'AI Jarvis',
    tag: 'AI / Python',
    desc: 'A voice-activated AI assistant built with Python — speech recognition, commands and responses.',
    tech: ['Python', 'SpeechRecognition', 'pyttsx3'],
    color: '#e040fb',
    preview: 'https://github.com/RKGSERVER',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)
  const [active, setActive]       = useState(null)   // open project
  const [minimised, setMinimised] = useState(false)
  const windowRef  = useRef(null)

  // scroll entrance
  useEffect(() => {
    gsap.fromTo(gridRef.current.querySelectorAll('.proj-card'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power4.out' }
    )
  }, [])

  // glitch open
  const openProject = (proj) => {
    setActive(proj)
    setMinimised(false)
    requestAnimationFrame(() => {
      if (!windowRef.current) return
      gsap.fromTo(windowRef.current,
        { scale: 0.85, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power4.out',
          onStart() {
            windowRef.current.classList.add('glitch-in')
            setTimeout(() => windowRef.current?.classList.remove('glitch-in'), 400)
          }
        }
      )
    })
  }

  // glitch close
  const closeProject = () => {
    if (!windowRef.current) return
    windowRef.current.classList.add('glitch-out')
    gsap.to(windowRef.current, {
      scale: 0.85, opacity: 0, filter: 'blur(8px)',
      duration: 0.4, ease: 'power4.in',
      onComplete() {
        windowRef.current?.classList.remove('glitch-out')
        setActive(null)
        setMinimised(false)
      }
    })
  }

  const toggleMinimise = () => {
    if (!windowRef.current) return
    if (!minimised) {
      gsap.to(windowRef.current.querySelector('.proj-win-body'), {
        height: 0, opacity: 0, duration: 0.3, ease: 'power3.in'
      })
    } else {
      gsap.to(windowRef.current.querySelector('.proj-win-body'), {
        height: 'auto', opacity: 1, duration: 0.3, ease: 'power3.out'
      })
    }
    setMinimised(m => !m)
  }

  const maximise = () => {
    if (!windowRef.current) return
    windowRef.current.classList.toggle('proj-win-max')
  }

  return (
    <section ref={sectionRef} className="projects section" id="projects">
      <div className="section-num">03</div>

      <div className="projects-header">
        <p className="section-eyebrow">What I Built</p>
        <h2 className="section-title">Projects</h2>
      </div>

      <div ref={gridRef} className="proj-grid">
        {projects.map(proj => (
          <div key={proj.id} className="proj-card" style={{ '--proj-color': proj.color }}>
            <div className="proj-card-top">
              <span className="proj-tag">{proj.tag}</span>
              <div className="proj-dots">
                <span /><span /><span />
              </div>
            </div>
            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-desc">{proj.desc}</p>
            <div className="proj-tech">
              {proj.tech.map(t => <span key={t} className="proj-tech-tag">{t}</span>)}
            </div>
            <button className="proj-btn" onClick={() => openProject(proj)}>
              <span>View Project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* ── OS-style preview window ── */}
      {active && (
        <div className="proj-overlay" onClick={e => e.target === e.currentTarget && closeProject()}>
          <div ref={windowRef} className="proj-win">

            {/* title bar */}
            <div className="proj-win-bar" style={{ '--proj-color': active.color }}>
              <div className="proj-win-controls">
                {/* close */}
                <button className="pwc pwc-close" onClick={closeProject} title="Close">
                  <svg width="8" height="8" viewBox="0 0 10 10">
                    <path d="M1 1l8 8M9 1l-8 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* minimise */}
                <button className="pwc pwc-min" onClick={toggleMinimise} title="Minimise">
                  <svg width="8" height="2" viewBox="0 0 10 2">
                    <path d="M0 1h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* maximise */}
                <button className="pwc pwc-max" onClick={maximise} title="Maximise">
                  <svg width="8" height="8" viewBox="0 0 10 10">
                    <rect x="1" y="1" width="8" height="8" rx="1"
                      stroke="#fff" strokeWidth="1.5" fill="none"/>
                  </svg>
                </button>
              </div>
              <span className="proj-win-title">{active.title}</span>
              <span className="proj-win-tag">{active.tag}</span>
            </div>

            {/* body */}
            <div className="proj-win-body">
              <iframe
                src={active.preview}
                title={active.title}
                className="proj-win-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
              <div className="proj-win-footer">
                <div className="proj-win-tech">
                  {active.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <a href={active.preview} target="_blank" rel="noreferrer" className="proj-win-open">
                  Open in new tab ↗
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
