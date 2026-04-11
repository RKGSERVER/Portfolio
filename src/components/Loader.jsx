import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

export default function Loader() {
  const loaderRef = useRef(null)
  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // lock scroll while loading
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

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
              // unlock scroll
              document.body.style.overflow = ''
              document.body.style.touchAction = ''
              document.dispatchEvent(new Event('loaderDone'))
            }
          })
        }, 400)
      }
      setCount(Math.floor(progress))
      setWidth(progress)
    }, 28)

    return () => {
      clearInterval(interval)
      // safety unlock if component unmounts
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
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
