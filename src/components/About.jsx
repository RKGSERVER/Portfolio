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

function animateNum(el, from, to, duration = 2) {
  if (!el) return
  const obj = { v: from }
  gsap.killTweensOf(obj)
  gsap.to(obj, {
    v: to, duration, ease: 'power2.out',
    onUpdate() { if (el) el.textContent = Math.floor(obj.v).toLocaleString() }
  })
}

export default function About() {
  const visualRef    = useRef(null)
  const textRef      = useRef(null)
  const vcRef        = useRef(null)
  const scrolledIn   = useRef(false)
  const currentCount = useRef(0)

  const [visitorCount, setVisitorCount] = useState(null)

  const updateCount = (newCount) => {
    if (newCount === currentCount.current) return
    const prev = currentCount.current
    currentCount.current = newCount
    setVisitorCount(newCount)
    localStorage.setItem('rkg_visited', String(newCount))
    // if section already visible, animate immediately
    if (scrolledIn.current) {
      animateNum(vcRef.current, prev, newCount)
    }
  }

  // ── Supabase: increment + realtime + polling fallback ──
  useEffect(() => {
    let channel
    let pollInterval
    const KEY = 'rkg_visited'

    const fetchCount = async () => {
      const { data } = await supabase
        .from('visitors').select('count').eq('id', 1).single()
      if (data && data.count !== currentCount.current) {
        updateCount(data.count)
      }
    }

    const run = async () => {
      const seen = localStorage.getItem(KEY)

      if (!seen) {
        // first visit — increment
        const { data } = await supabase.rpc('increment_visitors')
        if (data != null) {
          currentCount.current = data
          setVisitorCount(data)
          localStorage.setItem(KEY, String(data))
        }
      } else {
        // returning visitor — just fetch
        await fetchCount()
      }

      // ── Realtime subscription ──
      channel = supabase
        .channel('visitors-live')
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'visitors',
          filter: 'id=eq.1'
        }, payload => {
          updateCount(payload.new.count)
        })
        .subscribe((status) => {
          console.log('Realtime status:', status)
        })

      // ── Polling fallback every 10s (in case realtime fails) ──
      pollInterval = setInterval(fetchCount, 10000)
    }

    run()
    return () => {
      if (channel) supabase.removeChannel(channel)
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [])

  // ── Image protection ──
  useEffect(() => {
    const noContext = e => e.preventDefault()
    const noDrag    = e => e.preventDefault()
    document.addEventListener('contextmenu', noContext)
    document.addEventListener('dragstart',   noDrag)
    return () => {
      document.removeEventListener('contextmenu', noContext)
      document.removeEventListener('dragstart',   noDrag)
    }
  }, [])

  // ── GSAP scroll animations ──
  useEffect(() => {
    gsap.fromTo(visualRef.current,
      { x: -80, opacity: 0 },
      { scrollTrigger: { trigger: visualRef.current, start: 'top 75%' },
        x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
    gsap.fromTo(textRef.current.querySelectorAll('.anim'),
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: textRef.current, start: 'top 70%' },
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' }
    )
    textRef.current.querySelectorAll('.stat-num[data-target]').forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          const target = +el.dataset.target
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target, duration: 2, ease: 'power2.out',
            onUpdate() { el.textContent = Math.floor(obj.v) }
          })
        }
      })
    })
  }, [])

  // ── Visitor counter scroll trigger ──
  useEffect(() => {
    if (visitorCount === null) return
    const st = ScrollTrigger.create({
      trigger: vcRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        scrolledIn.current = true
        const target = currentCount.current
        const from = Math.max(0, target - 200) // animate from near the real number
        animateNum(vcRef.current, from, target)
      }
    })
    return () => st.kill()
  }, [visitorCount !== null])

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
              <div className="chip c3"><i className="fas fa-pen" /> Writer</div>
              <div className="chip c4"><i className="fas fa-chart-line" /> Digital Marketer</div>
            </div>
          </div>
        </div>

        <div ref={textRef} className="about-text">
          <p className="section-eyebrow anim">About Me</p>
          <h2 className="section-title anim">Who Am I?</h2>
          <p className="about-para anim">I'm a <span className="highlight">BCA 3rd year student</span> and <span className="highlight">Certified Digital Marketer</span> — two worlds that most people keep separate, but I live both at once.</p>
          <p className="about-para anim">In <span className="highlight">tech</span>, I build web applications and write clean code across C, C++, Java, Python and JavaScript. I love turning ideas into real products that people actually use.</p>
          <p className="about-para anim">In <span className="highlight">digital marketing</span>, I understand how brands grow online — SEO, social media strategy, content creation, audience targeting and online branding. I don't just build products, I know how to get them seen.</p>
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
                <span className="stat-num" ref={vcRef}>{visitorCount !== null ? visitorCount.toLocaleString() : '…'}</span>
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
