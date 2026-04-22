import { useState, useRef, useCallback, useEffect } from 'react'

const EMAIL = 'rozario9913@gmail.com'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-#!%'

export { EMAIL }

export default function useGlitchReveal() {
  const [display, setDisplay] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const frameRef = useRef(null)

  const scramble = useCallback((target, onDone) => {
    let iteration = 0
    const totalFrames = target.length * 4
    cancelAnimationFrame(frameRef.current)
    const step = () => {
      setDisplay(
        target.split('').map((char, idx) => {
          if (char === '@' || char === '.') return char
          if (idx < Math.floor(iteration / 4)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iteration++
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(target)
        if (onDone) onDone()
      }
    }
    step()
  }, [])

  const scrambleOut = useCallback((current, onDone) => {
    let iteration = 0
    const totalFrames = current.length * 3
    cancelAnimationFrame(frameRef.current)
    const step = () => {
      const revealed = current.length - Math.floor(iteration / 3)
      setDisplay(
        current.split('').map((char, idx) => {
          if (idx >= revealed) return ''
          if (char === '@' || char === '.') return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iteration++
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay('')
        if (onDone) onDone()
      }
    }
    step()
  }, [])

  const trigger = useCallback(() => {
    clearTimeout(timerRef.current)
    cancelAnimationFrame(frameRef.current)
    setVisible(true)
    scramble(EMAIL, () => {
      timerRef.current = setTimeout(() => {
        scrambleOut(EMAIL, () => setVisible(false))
      }, 2200)
    })
  }, [scramble, scrambleOut])

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    cancelAnimationFrame(frameRef.current)
  }, [])

  return { display, visible, trigger }
}
