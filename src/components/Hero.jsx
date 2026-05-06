import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const line1     = useRef(null)
  const line2     = useRef(null)
  const line3     = useRef(null)
  const subRef    = useRef(null)
  const btnsRef   = useRef(null)

  /* ── Three.js background ── */
  useEffect(() => {
    const canvas = canvasRef.current

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    /* icosahedrons */
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xff3c00, wireframe: true, transparent: true, opacity: 0.55 })
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xff6a00, wireframe: true, transparent: true, opacity: 0.22 })
    const mesh1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), mat1)
    const mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), mat2)
    scene.add(mesh1, mesh2)

    /* star texture */
    const starCanvas = document.createElement('canvas')
    starCanvas.width = 64; starCanvas.height = 64
    const ctx  = starCanvas.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0,   'rgba(255,255,255,1)')
    grad.addColorStop(0.2, 'rgba(255,200,120,0.9)')
    grad.addColorStop(0.5, 'rgba(255,100,30,0.4)')
    grad.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const starTex = new THREE.CanvasTexture(starCanvas)

    const STAR_COUNT = 280
    const positions  = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({
      map: starTex,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    /* smooth mouse tracking — target vs current */
    let mxTarget = 0, myTarget = 0
    let mxCur    = 0, myCur    = 0
    const onMouse = e => {
      mxTarget = (e.clientX / window.innerWidth  - 0.5) * 2
      myTarget = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    /* delta-time loop for frame-rate independent animation */
    let raf
    let lastTime = performance.now()
    let twinkleT = 0

    const animate = (now) => {
      raf = requestAnimationFrame(animate)
      const dt = Math.min((now - lastTime) / 1000, 0.05) // cap at 50ms
      lastTime = now
      twinkleT += dt

      /* rotate meshes */
      mesh1.rotation.x += 0.35 * dt
      mesh1.rotation.y += 0.5  * dt
      mesh2.rotation.x -= 0.18 * dt
      mesh2.rotation.y -= 0.35 * dt
      points.rotation.y += 0.06 * dt

      /* smooth star twinkle */
      pMat.opacity = 0.55 + Math.sin(twinkleT * 1.1) * 0.25

      /* smooth camera follow mouse */
      const lerpF = 1 - Math.pow(0.04, dt)
      mxCur += (mxTarget - mxCur) * lerpF
      myCur += (myTarget - myCur) * lerpF
      camera.position.x += (mxCur * 0.5 - camera.position.x) * lerpF
      camera.position.y += (-myCur * 0.5 - camera.position.y) * lerpF
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      pGeo.dispose()
      mat1.dispose(); mat2.dispose(); pMat.dispose()
      starTex.dispose()
      renderer.dispose()
    }
  }, [])

  /* ── GSAP hero entrance ── */
  useEffect(() => {
    const run = () => {
      gsap.set([line1.current, line2.current, line3.current, subRef.current, btnsRef.current], {
        willChange: 'transform, opacity',
      })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(line1.current,  { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1 })
        .fromTo(line2.current,  { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1 }, '-=0.7')
        .fromTo(line3.current,  { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1 }, '-=0.7')
        .fromTo(subRef.current, { opacity: 0, y: 24 },     { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(btnsRef.current,{ opacity: 0, y: 24 },     { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .then(() => {
          gsap.set([line1.current, line2.current, line3.current, subRef.current, btnsRef.current], {
            willChange: 'auto',
          })
        })
    }
    document.addEventListener('loaderDone', run, { once: true })
    return () => document.removeEventListener('loaderDone', run)
  }, [])

  /* ── magnetic buttons ── */
  useEffect(() => {
    const btns = btnsRef.current?.querySelectorAll('.btn') || []
    const handlers = []
    btns.forEach(btn => {
      const onMove = e => {
        const r = btn.getBoundingClientRect()
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width  / 2) * 0.25,
          y: (e.clientY - r.top  - r.height / 2) * 0.25,
          duration: 0.4, ease: 'power2.out',
        })
      }
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      handlers.push({ btn, onMove, onLeave })
    })
    return () => handlers.forEach(({ btn, onMove, onLeave }) => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    })
  }, [])

  /* ── CSS stars — generated once, kept in ref ── */
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id:    i,
      top:   `${Math.random() * 100}%`,
      left:  `${Math.random() * 100}%`,
      size:  `${0.8 + Math.random() * 2}px`,
      dur:   `${2.5 + Math.random() * 4}s`,
      delay: `${-(Math.random() * 6)}s`,
    }))
  )

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="star-field" aria-hidden="true">
        {stars.current.map(s => (
          <span key={s.id} style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            '--dur': s.dur, '--delay': s.delay,
          }} />
        ))}
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span ref={line1} className="hero-line">I CODE</span>
          <span ref={line2} className="hero-line">I CREATE</span>
          <span ref={line3} className="hero-line outline">I RISE</span>
        </h1>
        <p ref={subRef} className="hero-sub">
          Turning lines of code into experiences. Building something the world hasn't seen yet.
        </p>
        <div ref={btnsRef} className="hero-btns">
          <a href="#experience" className="btn btn-primary" data-cursor="EXPLORE">My Journey</a>
          <a href="#about"      className="btn btn-outline"  data-cursor="EXPLORE">Know Me</a>
        </div>
      </div>

      <div className="hero-side-text" aria-hidden="true">SCROLL TO EXPLORE</div>
    </section>
  )
}
