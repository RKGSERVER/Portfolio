import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

function spawnRipple(x, y) {
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('div')
    el.className = 'water-ripple'
    el.style.left = x + 'px'
    el.style.top  = y + 'px'
    document.body.appendChild(el)
    gsap.fromTo(el,
      { scale: 0, opacity: 0.65, x: '-50%', y: '-50%' },
      {
        scale: 2.5 + i * 1.2,
        opacity: 0,
        duration: 0.8 + i * 0.22,
        delay: i * 0.1,
        ease: 'power2.out',
        onComplete: () => el.remove()
      }
    )
  }
}

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // check touch via pointer — most reliable method
    const isTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window

    if (isTouch) {
      // force hide via style — belt AND suspenders with CSS
      ;[dotRef, ringRef, textRef].forEach(r => {
        if (r.current) r.current.style.cssText = 'display:none!important'
      })

      const onTap = e => {
        const t = e.changedTouches[0]
        spawnRipple(t.clientX, t.clientY)
      }
      document.addEventListener('touchend', onTap, { passive: true })
      return () => document.removeEventListener('touchend', onTap)
    }

    // ── Desktop mouse cursor ────────────────────────────────────────────
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
