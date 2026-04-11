
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

// ── Tech stack — PNG images from devicons CDN ───────────────────────────────
const techStack = [
  { name: 'C',          img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'C++',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'HTML5',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'MySQL',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Git',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'VS Code',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Node.js',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Linux',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'React',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'PHP',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
]

// ── Achievements data ────────────────────────────────────────────────────────
const achievements = [
  { icon: '🎓', title: 'BCA 3rd Year', desc: 'Pursuing Bachelor of Computer Applications with consistent academic performance.', tag: 'Education' },
  { icon: '📊', title: 'Certified Digital Marketer', desc: 'Holds a certified Digital Marketing certificate — SEO, social media, content strategy and online branding.', tag: 'Certificate' },
  { icon: '🎮', title: 'Esport Player', desc: 'Competitive esport player — strategic thinking, fast reflexes, and team coordination at a high level.', tag: 'Esports' },
  { icon: '💻', title: 'Full Stack Projects', desc: 'Built and deployed multiple web applications using modern tech stacks.', tag: 'Development' },
  { icon: '🏆', title: 'Python Competition', desc: 'Secured 2nd position on Competition, solving real-world problems under pressure.', tag: 'Competition' },
  { icon: '🎵', title: '38+ Lyrics Written', desc: 'Crafted over 32 original lyric pieces — storytelling through every bar.', tag: 'Music' },
  { icon: '📚', title: '6+ Languages Learned', desc: 'Mastered C, C++, Java, Python, React, Node, Express, HTML/CSS, JavaScript across 3 years.', tag: 'Skills' },
  { icon: '🚀', title: 'Self-Taught Artist', desc: 'Independently developing music artistry alongside a full-time degree.', tag: 'Growth' },
  { icon: '🛠️', title: '3+ Projects Done', desc: 'Designed, built and shipped 3+ real-world projects — from concept to deployment.', tag: 'Projects' },
]

export default function Experience() {
  const gridRef = useRef(null)
  const lyricRef = useRef(null)
  const achieveRef = useRef(null)
  const techRef = useRef(null)

  useEffect(() => {
    // timeline cards
    gsap.fromTo(gridRef.current.querySelectorAll('[data-side="left"]'),
      { x: -60, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
        x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power4.out' }
    )
    gsap.fromTo(gridRef.current.querySelectorAll('[data-side="right"]'),
      { x: 60, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
        x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power4.out' }
    )

    // lyric lines
    ScrollTrigger.create({
      trigger: lyricRef.current, start: 'top 75%', once: true,
      onEnter: () => {
        lyricRef.current.querySelectorAll('.lyric-line').forEach((l, i) => {
          setTimeout(() => l.classList.add('visible'), i * 350)
        })
      }
    })

    // achievement cards
    gsap.fromTo(achieveRef.current.querySelectorAll('.achieve-card'),
      { y: 50, opacity: 0 },
      { scrollTrigger: { trigger: achieveRef.current, start: 'top 75%' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' }
    )

    // tech icons
    gsap.fromTo(techRef.current.querySelectorAll('.tech-item'),
      { scale: 0.6, opacity: 0 },
      { scrollTrigger: { trigger: techRef.current, start: 'top 80%' },
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)' }
    )
  }, [])

  return (
    <section className="experience section" id="experience">
      <div className="section-num">03</div>

      {/* ── Timeline ── */}
      <div className="exp-header">
        <p className="section-eyebrow">My Journey</p>
        <h2 className="section-title">Experience</h2>
      </div>

      <div ref={gridRef} className="exp-grid">
        <div className="exp-col">
          <div className="exp-col-label"><i className="fas fa-laptop-code" /> Tech</div>
          <div className="exp-item" data-side="left">
            <div className="exp-card">
              <span className="exp-tag">Ongoing</span>
              <h3>BCA — Bachelor of Computer Applications</h3>
              <p>3rd year student mastering software development, data structures, databases, and system design.</p>
            </div>
          </div>
          <div className="exp-item" data-side="left">
            <div className="exp-card">
              <span className="exp-tag">Projects</span>
              <h3>Web &amp; Software Projects</h3>
              <p>Built multiple projects using HTML/CSS/JS, Java, Python, React, Node, Express — always pushing the creative boundary.</p>
            </div>
          </div>
        </div>

        <div className="exp-center-line">
          <div className="exp-center-dot pulse" />
        </div>

        <div className="exp-col">
          <div className="exp-col-label"><i className="fas fa-music" /> Music</div>
          <div className="exp-item" data-side="right">
            <div className="exp-card">
              <span className="exp-tag">The Beginning</span>
              <h3>Found My Voice</h3>
              <p>Started writing lyrics — discovering style, flow, and storytelling. Every great artist starts with a blank page.</p>
            </div>
          </div>
          <div className="exp-item" data-side="right">
            <div className="exp-card active-card">
              <span className="exp-tag live">● Live Now</span>
              <h3>Deep in the Writing Phase</h3>
              <p>Building a catalog of original lyrics. Music production is in progress — the composer is being found, the sound is being shaped.</p>
            </div>
          </div>
          <div className="exp-item" data-side="right">
            <div className="exp-card upcoming-card">
              <span className="exp-tag soon">Coming Soon 🔥</span>
              <h3>First Drop</h3>
              <p>When the beat meets the bars — the world will hear it. Stay locked in.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lyrics ── */}
      <div className="lyrics-section">
        <div className="lyrics-label">Original Lyrics</div>
        <div ref={lyricRef} className="lyric-card">
          <div className="lyric-bg-quote">"</div>
          <div className="lyric-lines">
            <p className="lyric-line">Pressure on me — I walk water, no doubt</p>
            <p className="lyric-line">Fire in my chest like the Word pouring out</p>
            <p className="lyric-line">They false preach, I see snakes in the crowd</p>
            <p className="lyric-line">Code so cold, make the demons log out</p>
            <p className="lyric-line">Chosen one — hear the gospel, I'm loud 🔥</p>
          </div>
          <div className="lyric-wave">
            {Array.from({ length: 15 }).map((_, i) => <span key={i} />)}
          </div>
        </div>
      </div>

      {/* ── Achievements ── */}
      <div ref={achieveRef} className="achievements-section">
        <div className="sub-section-header">
          <p className="section-eyebrow">What I've Done</p>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="achieve-grid">
          {achievements.map((a, i) => (
            <div key={i} className="achieve-card">
              <div className="achieve-icon">{a.icon}</div>
              <div className="achieve-tag">{a.tag}</div>
              <h3 className="achieve-title">{a.title}</h3>
              <p className="achieve-desc">{a.desc}</p>
              <div className="achieve-line" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div ref={techRef} className="tech-section">
        <div className="sub-section-header">
          <p className="section-eyebrow">Languages &amp; Tools</p>
          <h2 className="section-title">Tech Stack</h2>
        </div>
        <div className="tech-grid">
          {techStack.map((t, i) => (
            <div key={i} className="tech-item" title={t.name}>
              <div className="tech-icon-wrap">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </div>
              <span className="tech-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
