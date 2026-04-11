import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

const skills = [
  { icon: 'fa-code', title: 'Web Development', desc: 'HTML, CSS, JavaScript — building interfaces that feel alive.', pct: 80 },
  { icon: 'fa-microchip', title: 'Programming', desc: 'C, C++, Java, Python — logic is my second language.', pct: 75 },
  { icon: 'fa-pen-nib', title: 'Lyric Writing', desc: 'Wordplay, metaphors, storytelling — every line has a purpose.', pct: 90 },
  { icon: 'fa-brain', title: 'Creative Thinking', desc: 'Connecting tech and art in ways nobody expects.', pct: 95 },
]

export default function Skills() {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll('.skill-card')

    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' }
    )

    ScrollTrigger.create({
      trigger: gridRef.current, start: 'top 75%', once: true,
      onEnter: () => {
        gridRef.current.querySelectorAll('.skill-fill').forEach(f => {
          f.style.width = f.dataset.width + '%'
        })
      }
    })

    // glow + tilt
    cards.forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
        gsap.to(card, {
          rotateX: ((e.clientY - r.top) / r.height - 0.5) * -10,
          rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10,
          duration: 0.4, ease: 'power2.out', transformPerspective: 800
        })
      }
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })
  }, [])

  return (
    <section className="skills section" id="skills">
      <div className="section-num">02</div>
      <div className="skills-header">
        <p className="section-eyebrow">What I Do</p>
        <h2 className="section-title">Skills &amp; Stack</h2>
      </div>
      <div ref={gridRef} className="skills-grid">
        {skills.map((s, i) => (
          <div key={i} className="skill-card">
            <div className="card-glow" />
            <div className="skill-icon-wrap"><i className={`fas ${s.icon}`} /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="skill-bar">
              <div className="skill-fill" data-width={s.pct} />
            </div>
            <span className="skill-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
