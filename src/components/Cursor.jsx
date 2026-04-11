import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // hide on touch devices — native touch is better
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) {
      dotRef.current.style.display  = 'none'
      ringRef.current.style.display = 'none'
      textRef.current.style.display = 'none'
      return
    }

    // ── Desktop mouse cursor ──────────────────────────────────────────────
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
  }, [])

  return (
    <>
      <div ref={dotRef}  className="c-dot" />
      <div ref={ringRef} className="c-ring" />
      <div ref={textRef} className="c-text" />
    </>
  )
}
