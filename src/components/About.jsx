import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createClient } from '@supabase/supabase-js'
import profileImg from '../PASSPORT SIZE PHOTO.jpg'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const supabase = createClient(
  'https://ldmmhqdaghbgcptujhoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbW1ocWRhZ2hiZ2NwdHVqaG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzczMTEsImV4cCI6MjA5MjQ1MzMxMX0.8gPA2M34Z0tOtjbUfQ85RbvO5m345zCM2gAkUx3y2BA'
)

const BASE = 60467

function countUp(el, from, to, duration = 2) {
  if (!el) return
  gsap.killTweensOf({ v: 0 })
  const obj = { v: from }
  gsap.to(obj, {
    v: to, duration, ease: 'power2.out',
    onUpdate() { if (el) el.textContent = Math.floor(obj.v).toLocaleString() }
  })
}

export default function About() {
  const visualRef  = useRef(null)
  const textRef    = useRef(null)
  const vcRef      = useRef(null)
  const liveCount  = useRef(BASE)   // always holds latest count
  const animated   = useRef(false)  // has scroll animation fired?

  // initialise from localStorage so no flicker
  const [ready, setReady] = useState(false)

  // ── run once: increment / fetch + subscribe realtime + poll ──
  useEffect(() => {
    let channel, poll
    const KEY = 'rkg_visited'

    const applyCount = (n) => {
      if (n === liveCount.current) return
      const prev = liveCount.current
      liveCount.current = n
      localStorage.setItem(KEY, String(n))
      setReady(true)
      // if section already scrolled into view → animate live
      if (animated.current) countUp(vcRef.current, prev, n, 1.5)
      else vcRef.current && (vcRef.current.textContent = n.toLocaleString())
    }

    const fetchLatest = async () => {
      const { data } = await supabase
        .from('visitors').select('count').eq('id', 1).single()
      if (data) applyCount(data.count)
    }

    const init = async () => {
      const seen = localStorage.getItem(KEY)

      // show stored value immediately — no blank/…
      const stored = seen ? Number(seen) : BASE
      liveCount.current = stored
      if (vcRef.current) vcRef.current.textContent = stored.toLocaleString()
      setReady(true)

      if (!seen) {
        // first visit — increment
        const { data } = await supabase.rpc('increment_visitors')
        if (data != null) applyCount(data)
      } else {
        await fetchLatest()
      }

      // realtime
      channel = supabase
        .channel('vc-live')
        .on('postgres_changes', {
          event: 'UPDATE', schema: 'public',
          table: 'visitors', filter: 'id=eq.1'
        }, (payload) => applyCount(payload.new.count))
        .subscribe()

      // poll every 30s as fallback (reduced from 8s for performance)
      poll = setInterval(fetchLatest, 30000)
    }

    init()
    return () => {
      if (channel) supabase.removeChannel(channel)
      if (poll) clearInterval(poll)
    }
  }, [])

  // ── image protection ──
  useEffect(() => {
    const nc = e => e.preventDefault()
    const nd = e => e.preventDefault()
    document.addEventListener('contextmenu', nc)
    document.addEventListener('dragstart', nd)
    return () => {
      document.removeEventListener('contextmenu', nc)
      document.removeEventListener('dragstart', nd)
    }
  }, [])

  // ── GSAP scroll animations ──
  useEffect(() => {
    gsap.fromTo(visualRef.current,
      { x: -80, opacity: 0 },
      { scrollTrigger: { trigger: visualRef.current, start: 'top 75%' },
        x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' })

    gsap.fromTo(textRef.current.querySelectorAll('.anim'),
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: textRef.current, start: 'top 70%' },
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' })

    // other stat counters
    textRef.current.querySelectorAll('.stat-num[data-target]').forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          const t = +el.dataset.target
          const o = { v: 0 }
          gsap.to(o, { v: t, duration: 2, ease: 'power2.out',
            onUpdate() { el.textContent = Math.floor(o.v) } })
        }
      })
    })

    // visitor counter — animate from BASE to real count on scroll
    ScrollTrigger.create({
      trigger: vcRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animated.current = true
        const target = liveCount.current
        countUp(vcRef.current, BASE, target, 2)
      }
    })
  }, [])

  return (
    <section className="about section" id="about">
      <div className="section-num">01</div>
      <div className="about-grid">
        <div ref={visualRef} className="about-visual">
          <div className="avatar-wrap">
            <div className="avatar-hex">
              <div
                className="glitch-img-wrap"
                style={{ '--profile-bg': `url(${profileImg})` }}
                onContextMenu={e => e.preventDefault()}
                draggable={false}
              >
                <div className="profile-bg-layer" />
                <div className="glitch-layer gl-r" />
                <div className="glitch-layer gl-b" />
                <div className="glitch-scan" />
                <div className="img-shield" onContextMenu={e => e.preventDefault()} />
              </div>
            </div>
            <svg className="orbit-svg" viewBox="0 0 380 380">
              <circle className="orbit-ring" cx="190" cy="190" r="170" />
              <circle className="orbit-dot" cx="360" cy="190" r="8" />
            </svg>
            <div className="floating-chips">
              <div className="chip c1"><i className="fas fa-code" /> BCA</div>
              <div className="chip c2"><i className="fas fa-music" /> Artist</div>
              <div className="chip c3"><i className="fas fa-chart-line" /> Digital Marketer</div>
              <div className="chip c4"><i className="fas fa-pen" /> Writer</div>
              <div className="chip c5"><i className="fas fa-pencil-ruler" /> UI/UX Designer</div>
            </div>
          </div>
        </div>

        <div ref={textRef} className="about-text">
          <p className="section-eyebrow anim">About Me</p>
          <h2 className="section-title anim">Who Am I?</h2>

          {/* ── Personal Details ── */}
          <div className="about-personal anim">
            <div className="personal-item">
              <span className="personal-label">Name</span>
              <span className="personal-value">Rozario Rajkumar</span>
            </div>
            <div className="personal-item">
              <span className="personal-label">Date of Birth</span>
              <span className="personal-value">07 October 2004</span>
            </div>
            <div className="personal-item">
              <span className="personal-label">Age</span>
              <span className="personal-value">{(() => {
                const dob = new Date('2004-10-07')
                const today = new Date()
                let age = today.getFullYear() - dob.getFullYear()
                const m = today.getMonth() - dob.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
                return age
              })()} years old</span>
            </div>
          </div>
          <p className="about-para anim">I'm a <span className="highlight">BCA 3rd year student</span>, <span className="highlight">Certified Digital Marketer</span> and <span className="highlight">Certified UI/UX Designer</span> — worlds that most people keep separate, but I live all at once.</p>
          <p className="about-para anim">In <span className="highlight">tech</span>, I build web applications and write clean code across C, C++, Java, Python and JavaScript. I love turning ideas into real products that people actually use.</p>
          <p className="about-para anim">In <span className="highlight">digital marketing</span>, I understand how brands grow online — SEO, social media strategy, content creation, audience targeting and online branding. I don't just build products, I know how to get them seen.</p>
          <p className="about-para anim">In <span className="highlight">UI/UX design</span>, I craft interfaces that are intuitive, visually sharp and user-first — wireframes, prototypes, design systems and experiences that feel effortless to use.</p>
          <p className="about-para anim">And through it all, I write <span className="highlight">music lyrics</span> — storytelling is the thread that connects everything I do. <span className="highlight">Watch this space.</span></p>
          <div className="about-stats anim">
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-target="3">0</span>
                <span className="stat-suffix">rd</span>
              </div>
              <span className="stat-label">Year of BCA</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-target="38">0</span>
                <span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Lyrics Written</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-target="3">0</span>
                <span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Projects Done</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-target="100">0</span>
                <span className="stat-suffix">%</span>
              </div>
              <span className="stat-label">Dedication</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" ref={vcRef}>{BASE.toLocaleString()}</span>
                <span className="stat-suffix">+</span>
              </div>
              <span className="stat-label"><span className="vc-live-dot" /> Visitors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
