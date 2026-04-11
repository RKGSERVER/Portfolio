import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

export default function Loader() {
  const loaderRef = useRef(null)
  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 5 + 1
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
              loaderRef.current.style.display = 'none'
              // trigger hero
              document.dispatchEvent(new Event('loaderDone'))
            }
          })
        }, 400)
      }
      setCount(Math.floor(progress))
      setWidth(progress)
    }, 28)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-count">{count}</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar-fill" style={{ width: width + '%' }} />
      </div>
      <div className="loader-label">INITIALIZING</div>
    </div>
  )
}
