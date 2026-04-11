import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { EmailIcon, FacebookIcon, GitHubIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from "./SocialIcons"
import useGlitchReveal from "../hooks/useGlitchReveal"
import "./Contact.css"

const socials = [
  { Icon: EmailIcon,     label: "Email",       href: "mailto:rozario9913@gmail.com",                                                                cursor: "MAIL",    isEmail: true },
  { Icon: InstagramIcon, label: "Instagram",   href: "https://www.instagram.com/rozario_rajkumar_official?igsh=MWhtYzJyMDJld2ZxZw==",              cursor: "FOLLOW" },
  { Icon: GitHubIcon,    label: "GitHub",      href: "https://github.com/RKGSERVER",                                                                cursor: "CODE" },
  { Icon: LinkedInIcon,  label: "LinkedIn",    href: "https://www.linkedin.com/in/rozariorajkumar?utm_source=share_via&utm_content=profile&utm_medium=member_android", cursor: "CONNECT" },
  { Icon: TwitterIcon,   label: "Twitter / X", href: "https://x.com/Rozario_rkg",                                                                  cursor: "FOLLOW" },
  { Icon: FacebookIcon,  label: "Facebook",    href: "https://www.facebook.com/share/1SfAMXmrVz/",                                                  cursor: "FOLLOW" },
  { Icon: YouTubeIcon,   label: "YouTube",     href: "https://youtube.com/@official_rkg07?si=CxzSMoMubwHaRQIX",                                                            cursor: "WATCH" },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef    = useRef(null)
  const [status, setStatus] = useState("idle")
  const { display, visible, trigger } = useGlitchReveal()

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".anim"),
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out" }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    const data = new FormData(formRef.current)
    try {
      const res = await fetch("https://formsubmit.co/ajax/rozario9913@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      const json = await res.json()
      if (json.success === "true" || json.success === true) {
        setStatus("sent")
        formRef.current.reset()
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 4000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  const btnLabel = { idle: "Send Message", sending: "Sending...", sent: "Message Sent!", error: "Failed - Try Again" }
  const btnStyle = { sent: { background: "#00c853" }, error: { background: "#e53935" } }

  return (
    <section ref={sectionRef} className="contact section" id="contact">
      <div className="section-num">04</div>
      <div className="contact-header anim">
        <p className="section-eyebrow">Get In Touch</p>
        <h2 className="section-title">Lets Connect</h2>
        <p className="contact-sub">Whether you are a producer, a dev, or just a fan - the door is open.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          {socials.map(({ Icon, label, href, cursor, isEmail }, i) => (
            <div key={i} className="contact-item-wrap">
              <a
                className="contact-item anim"
                href={isEmail ? undefined : href}
                data-cursor={cursor}
                target={!isEmail && href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={isEmail ? (e) => { e.preventDefault(); trigger() } : undefined}
                style={isEmail ? { cursor: "none" } : {}}
              >
                <div className="ci-icon"><Icon size={26} /></div>
                <div className="ci-text"><span className="ci-label">{label}</span></div>
                <svg className="ci-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {isEmail && visible && (
                <div className="email-inline-reveal">
                  <span className="email-glitch-text">{display}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <form ref={formRef} className="contact-form anim" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject"  value="New Portfolio Message!" />
          <input type="hidden" name="_captcha"  value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" placeholder="Your Name" required />
            <div className="form-line" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="your@email.com" required />
            <div className="form-line" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder="What is on your mind..." rows="4" required />
            <div className="form-line" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={btnStyle[status] || {}}>
            <span>{btnLabel[status]}</span>
            {status === "sending" ? (
              <span className="spinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
