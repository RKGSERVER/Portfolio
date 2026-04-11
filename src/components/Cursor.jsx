import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

const isTouch = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!isTouch()) {
      // ── DESKTOP mouse ──────────────────────────────────────────────────
      let mx = 0, my = 0, rx = 0, ry = 0

      const onMove = e => {
        mx = e.clientX; my = e.clientY
        gsap.to(dotRef.current,  { x: mx, y: my, duration: 0.08 })
        gsap.to(textRef.current, { x: mx + 18, y: my - 18, duration: 0.12 })
      }
      document.addEventListener('mousemove', onMove)

      let raf
      const loop = () => {
        rx += (mx - rx) * 0.1
        ry += (my - ry) * 0.1
        gsap.set(ringRef.current, { x: rx, y: ry })
        raf = requestAnimationFrame(loop)
      }
      loop()

      const onEnter = e => {
        const label = e.currentTarget.dataset.cursor
        if (label) {
          dotRef.current.classList.add('expanded')
          textRef.current.textContent = label
          textRef.current.classList.add('show')
        }
      }
      const onLeave = () => {
        dotRef.current.classList.remove('expanded')
        textRef.current.classList.remove('show')
      }
      const els = document.querySelectorAll('[data-cursor]')
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })

      return () => {
        document.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(raf)
        els.forEach(el => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
      }

    } else {
      // ── MOBILE touch — always fluid, never freezes ─────────────────────
      dotRef.current.style.display  = 'block'
      ringRef.current.style.display = 'block'

      let rx = -100, ry = -100

      const move = (x, y) => {
        gsap.to(dotRef.current,  { x, y, duration: 0.05, ease: 'none' })
        gsap.to(ringRef.current, { x, y, duration: 0.15, ease: 'power2.out' })
        rx = x; ry = y
      }

      const onTouchStart = e => {
        const t = e.touches[0]
        move(t.clientX, t.clientY)
        // tap pulse on ring
        gsap.fromTo(ringRef.current,
          { scale: 1, opacity: 1 },
          { scale: 1.8, opacity: 0, duration: 0.4, ease: 'power2.out',
            onComplete: () => gsap.set(ringRef.current, { scale: 1, opacity: 1 }) }
        )
      }

      const onTouchMove = e => {
        const t = e.touches[0]
        move(t.clientX, t.clientY)
      }

      // on touchend — cursor stays visible at last position but does NOT freeze
      // it will snap to next touch immediately

      document.addEventListener('touchstart', onTouchStart, { passive: true })
      document.addEventListener('touchmove',  onTouchMove,  { passive: true })

      return () => {
        document.removeEventListener('touchstart', onTouchStart)
        document.removeEventListener('touchmove',  onTouchMove)
      }
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="c-dot" />
      <div ref={ringRef} className="c-ring" />
      <div ref={textRef} className="c-text" />
    </>
  )
}
