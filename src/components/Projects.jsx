import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Anime World',
    tag: 'Full Stack',
    desc: 'A full anime discovery platform with search, genres, trending and watchlist features.',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
    color: '#ff3c00',
    preview: 'https://rkgserver.github.io/Anime-World/',
    github: 'https://github.com/RKGSERVER/Anime-World',
  },
  {
    id: 2,
    title: 'DelishDash',
    tag: 'MERN Stack',
    desc: 'A full-stack food delivery app built with MongoDB, Express, React and Node.js.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#ff9500',
    preview: 'https://github.com/RKGSERVER',
    github: 'https://github.com/RKGSERVER',
  },
  {
    id: 3,
    title: 'Flappy Bird Game',
    tag: 'Game',
    desc: 'A browser-based Flappy Bird clone with smooth physics and score tracking.',
    tech: ['HTML5 Canvas', 'JavaScript'],
    color: '#00e676',
    preview: 'https://rkgserver.github.io/Flappy-Bird/',
    github: 'https://github.com/RKGSERVER/Flappy-Bird',
  },
  {
    id: 4,
    title: 'Rainworld Website',
    tag: 'Full Stack',
    desc: 'An immersive rain-themed full stack website with animated effects, backend API, and atmospheric design.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Bootstrap', 'JavaScript'],
    color: '#00b0ff',
    preview: 'https://rkgserver.github.io/Rainworld/',
    github: 'https://github.com/RKGSERVER/Rainworld',
  },
  {
    id: 5,
    title: 'AI Jarvis',
    tag: 'AI / Python',
    desc: 'A voice-activated AI assistant built with Python — speech recognition, commands and responses.',
    tech: ['Python', 'SpeechRecognition', 'pyttsx3'],
    color: '#e040fb',
    preview: 'https://github.com/RKGSERVER',
    github: 'https://github.com/RKGSERVER',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)
  const windowRef  = useRef(null)
  const [active, setActive]   = useState(null)
  const [big, setBig]         = useState(false)

  useEffect(() => {
    gsap.fromTo(gridRef.current.querySelectorAll('.proj-card'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power4.out' }
    )
  }, [])

  const openProject = (proj) => {
    setActive(proj)
    setBig(false)
    requestAnimationFrame(() => {
      if (!windowRef.current) return
      windowRef.current.classList.add('glitch-in')
      gsap.fromTo(windowRef.current,
        { scale: 0.88, opacity: 0, filter: 'blur(6px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)',
          duration: 0.45, ease: 'power4.out',
          onComplete() { windowRef.current?.classList.remove('glitch-in') }
        }
      )
    })
  }

  const closeProject = () => {
    if (!windowRef.current) return
    windowRef.current.classList.add('glitch-out')
    gsap.to(windowRef.current, {
      scale: 0.88, opacity: 0, filter: 'blur(6px)',
      duration: 0.35, ease: 'power4.in',
      onComplete() {
        windowRef.current?.classList.remove('glitch-out')
        setActive(null)
        setBig(false)
      }
    })
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
            <div className="proj-actions">
              <button className="proj-btn" onClick={() => openProject(proj)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Preview
              </button>
              <a className="proj-btn proj-btn-ghost" href={proj.github} target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    fill="currentColor"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── Preview Window ── */}
      {active && (
        <div className="proj-overlay" onClick={e => e.target === e.currentTarget && closeProject()}>
          <div ref={windowRef} className={`proj-win${big ? ' proj-win-big' : ''}`}>

            {/* ── Title Bar ── */}
            <div className="proj-win-bar" style={{ '--proj-color': active.color }}>

              {/* left: close only */}
              <div className="proj-win-left">
                <button className="pwc pwc-close" onClick={closeProject}>
                  <svg width="7" height="7" viewBox="0 0 10 10">
                    <path d="M1 1l8 8M9 1l-8 8" stroke="#5a0000" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* center: title */}
              <span className="proj-win-title">{active.title}</span>

              {/* right: resize + open in new tab */}
              <div className="proj-win-right">
                {/* resize toggle */}
                <button className="proj-win-resize" onClick={() => setBig(b => !b)}>
                  {big ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M8 3v5H3M21 8h-5V3M16 21v-5h5M3 16h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                {/* open in new tab */}
                <a className="proj-win-newtab" href={active.preview} target="_blank" rel="noreferrer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── iframe ── */}
            <div className="proj-win-body">
              <iframe
                src={active.preview}
                title={active.title}
                className="proj-win-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
            </div>

            {/* ── Footer ── */}
            <div className="proj-win-footer">
              <div className="proj-win-tech">
                {active.tech.map(t => <span key={t}>{t}</span>)}
              </div>
              <span className="proj-win-tag-sm" style={{ color: active.color, borderColor: active.color }}>
                {active.tag}
              </span>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
