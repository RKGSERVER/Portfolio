import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'C',          img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'C++',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'HTML5',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Git',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'VS Code',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Linux',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'PHP',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
]

const achievements = [
  { icon: '🎓', title: 'BCA 3rd Year',             desc: 'Pursuing Bachelor of Computer Applications with consistent academic performance.',                                    tag: 'Education'   },
  { icon: '📊', title: 'Certified Digital Marketer',desc: 'Certified in Digital Marketing — SEO, social media, content strategy and online branding.',                         tag: 'Certificate' },
  { icon: '🎨', title: 'Certified UI/UX Designer',  desc: 'Certified in UI/UX Design — wireframes, prototypes, design systems and user-first experiences.',                     tag: 'Certificate' },
  { icon: '💻', title: 'Full Stack Projects',        desc: 'Built and deployed multiple web applications using modern tech stacks.',                                             tag: 'Development' },
  { icon: '🏆', title: 'Python Competition',         desc: 'Secured 2nd position in a competition, solving real-world problems under pressure.',                                 tag: 'Competition' },
  { icon: '🎵', title: '38+ Lyrics Written',         desc: 'Crafted over 38 original lyric pieces — storytelling through every bar.',                                           tag: 'Music'       },
  { icon: '📚', title: '6+ Languages Learned',       desc: 'Mastered C, C++, Java, Python, React, Node, Express, HTML/CSS, JavaScript across 3 years.',                        tag: 'Skills'      },
  { icon: '🚀', title: 'Self-Taught Artist',         desc: 'Independently developing music artistry alongside a full-time degree.',                                              tag: 'Growth'      },
]

// Timeline rows: [leftCard, dotVariant, rightCard]
// null = empty side
const timelineRows = [
  {
    left:  { tag: 'Ongoing',     tagClass: 'active-tag', title: 'BCA — Bachelor of Computer Applications', body: '3rd year student mastering software development, data structures, databases, and system design.', cardClass: '' },
    dot:   'pulse',
    right: { tag: 'The Beginning', tagClass: '', title: 'Found My Voice', body: 'Started writing lyrics — discovering style, flow, and storytelling. Every great artist starts with a blank page.', cardClass: '' },
  },
  {
    left:  { tag: 'Projects', tagClass: '', title: 'Web & Software Projects', body: 'Built multiple projects using HTML/CSS/JS, Java, Python, React, Node, Express — always pushing the creative boundary.', cardClass: '' },
    dot:   'green',
    right: { tag: '● Live Now', tagClass: 'live', title: 'Deep in the Writing Phase', body: 'Building a catalog of original lyrics. Music production is in progress — the composer is being found, the sound is being shaped.', cardClass: 'active' },
  },
  {
    left:  { tag: 'Certified', tagClass: 'active-tag', title: 'Digital Marketer & UI/UX Designer', body: 'Dual certified — bridging the gap between brand strategy and user experience design.', cardClass: '' },
    dot:   'orange',
    right: { tag: 'Coming Soon 🔥', tagClass: 'soon', title: 'First Drop', body: 'When the beat meets the bars — the world will hear it. Stay locked in.', cardClass: 'upcoming' },
  },
]

export default function Experience() {
  const sectionRef  = useRef(null)
  const timelineRef = useRef(null)
  const lyricRef    = useRef(null)
  const achieveRef  = useRef(null)
  const techRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── spine draw animation ──
      gsap.fromTo('.timeline-spine',
        { scaleY: 0, transformOrigin: 'top center' },
        { scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
          scaleY: 1, duration: 1.4, ease: 'power3.out' }
      )

      // ── timeline rows stagger ──
      gsap.fromTo('.tl-row',
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: timelineRef.current, start: 'top 72%' },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power4.out' }
      )

      // ── left cards slide from left ──
      gsap.fromTo('.tl-card-wrap:not(.right):not(.empty) .tl-card',
        { x: -40, opacity: 0 },
        { scrollTrigger: { trigger: timelineRef.current, start: 'top 70%' },
          x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power4.out', delay: 0.1 }
      )

      // ── right cards slide from right ──
      gsap.fromTo('.tl-card-wrap.right .tl-card',
        { x: 40, opacity: 0 },
        { scrollTrigger: { trigger: timelineRef.current, start: 'top 70%' },
          x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power4.out', delay: 0.1 }
      )

      // ── dots pop in ──
      gsap.fromTo('.tl-dot',
        { scale: 0, opacity: 0 },
        { scrollTrigger: { trigger: timelineRef.current, start: 'top 72%' },
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(2)', delay: 0.3 }
      )

      // ── lyric lines ──
      ScrollTrigger.create({
        trigger: lyricRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          lyricRef.current.querySelectorAll('.lyric-line').forEach((l, i) => {
            setTimeout(() => l.classList.add('visible'), i * 300)
          })
        }
      })

      // ── achievement cards ──
      gsap.fromTo(achieveRef.current.querySelectorAll('.achieve-card'),
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: achieveRef.current, start: 'top 75%' },
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power4.out' }
      )

      // ── tech icons spring in ──
      gsap.fromTo(techRef.current.querySelectorAll('.tech-item'),
        { scale: 0.5, opacity: 0 },
        { scrollTrigger: { trigger: techRef.current, start: 'top 80%' },
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)' }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="experience section" id="experience">
      <div className="section-num">03</div>

      <div className="exp-header">
        <p className="section-eyebrow">My Journey</p>
        <h2 className="section-title">Experience</h2>
      </div>

      {/* ── Vertical Timeline ── */}
      <div ref={timelineRef} className="timeline-wrap">
        <div className="timeline-spine" />

        {/* category labels */}
        <div className="timeline-cats">
          <div className="timeline-cat"><i className="fas fa-laptop-code" /> Tech</div>
          <div className="timeline-cat right"><i className="fas fa-music" /> Music</div>
        </div>

        {timelineRows.map((row, i) => (
          <div key={i} className="tl-row">
            {/* left card */}
            <div className={`tl-card-wrap${!row.left ? ' empty' : ''}`}>
              {row.left && (
                <div className={`tl-card ${row.left.cardClass}`}>
                  <span className={`tl-tag ${row.left.tagClass}`}>{row.left.tag}</span>
                  <h3>{row.left.title}</h3>
                  <p>{row.left.body}</p>
                </div>
              )}
            </div>

            {/* center node */}
            <div className="tl-node">
              <div className={`tl-dot ${row.dot}`} />
            </div>

            {/* right card */}
            <div className={`tl-card-wrap right${!row.right ? ' empty' : ''}`}>
              {row.right && (
                <div className={`tl-card ${row.right.cardClass}`}>
                  <span className={`tl-tag ${row.right.tagClass}`}>{row.right.tag}</span>
                  <h3>{row.right.title}</h3>
                  <p>{row.right.body}</p>
                </div>
              )}
            </div>
          </div>
        ))}
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
                <img src={t.img} alt={t.name} loading="lazy"
                  draggable={false} onContextMenu={e => e.preventDefault()} />
              </div>
              <span className="tech-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
