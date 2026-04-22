import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Noise from './components/Noise'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function App() {
  useEffect(() => {
    // smooth anchor scroll
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'))
        if (target) {
          e.preventDefault()
          gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.2, ease: 'power4.inOut' })
        }
      })
    })
  }, [])

  return (
    <>
      <Noise />
      <Cursor />
      <Loader />
      <Navbar />
      <main style={{ overflowX: 'hidden', width: '100%' }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
