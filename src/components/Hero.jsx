import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const line1 = useRef(null)
  const line2 = useRef(null)
  const line3 = useRef(null)
  const tagRef = useRef(null)
  const subRef = useRef(null)
  const btnsRef = useRef(null)

  // Three.js background
  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const mesh1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({ color: 0xff3c00, wireframe: true, transparent: true, opacity: 0.07 })
    )
    const mesh2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.2, 1),
      new THREE.MeshBasicMaterial({ color: 0xff9500, wireframe: true, transparent: true, opacity: 0.03 })
    )
    scene.add(mesh1, mesh2)

    const positions = new Float32Array(800 * 3)
    for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 20
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xff3c00, size: 0.022, transparent: true, opacity: 0.35 }))
    scene.add(points)

    let mx = 0, my = 0
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      mesh1.rotation.x += 0.002; mesh1.rotation.y += 0.003
      mesh2.rotation.x -= 0.001; mesh2.rotation.y -= 0.002
      points.rotation.y += 0.0004
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.05
      camera.position.y += (-my * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  // GSAP hero entrance — fires after loader
  useEffect(() => {
    const run = () => {
      const isMobile = window.innerWidth <= 480
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(tagRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(line1.current,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1 }, '-=0.4')
        .fromTo(line2.current,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1 }, '-=0.7')
        .fromTo(line3.current,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1 }, '-=0.7')
        .fromTo(subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(btnsRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    }
    document.addEventListener('loaderDone', run, { once: true })
    return () => document.removeEventListener('loaderDone', run)
  }, [])

  // magnetic buttons
  useEffect(() => {
    const btns = btnsRef.current?.querySelectorAll('.btn') || []
    const handlers = []
    btns.forEach(btn => {
      const onMove = e => {
        const r = btn.getBoundingClientRect()
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power2.out' })
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

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="marquee-bg" aria-hidden="true">
        <div className="marquee-track">
          {['DEVELOPER','·','BCA','·','DIGITAL MARKETER','·','ESPORT PLAYER','·','CREATOR','·','ARTIST','·','DEVELOPER','·','BCA','·','DIGITAL MARKETER','·','ESPORT PLAYER','·','CREATOR','·','ARTIST','·'].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div ref={tagRef} className="hero-tag">
          <div className="hero-tag-inner">
            <span>Rozario Rajkumar &nbsp;·&nbsp; BCA 3rd Year &nbsp;·&nbsp; Certified Digital Marketer &nbsp;·&nbsp; Esport Player &nbsp;·&nbsp; Rozario Rajkumar &nbsp;·&nbsp; BCA 3rd Year &nbsp;·&nbsp; Certified Digital Marketer &nbsp;·&nbsp; Esport Player &nbsp;·&nbsp;</span>
          </div>
        </div>
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
          <a href="#about" className="btn btn-outline" data-cursor="EXPLORE">Know Me</a>
        </div>
      </div>

      <div className="hero-side-text" aria-hidden="true">SCROLL TO EXPLORE</div>

      <div className="scroll-mouse">
        <div className="scroll-wheel" />
      </div>
    </section>
  )
}
