import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  EmailIcon, FacebookIcon, GitHubIcon, InstagramIcon,
  TwitterIcon, LinkedInIcon, YouTubeIcon, LinktreeIcon
} from "./SocialIcons"
import useGlitchReveal from "../hooks/useGlitchReveal"
import "./Contact.css"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/rozario_rajkumar_official?igsh=MWhtYzJyMDJld2ZxZw==" },
  { Icon: GitHubIcon,    label: "GitHub",    href: "https://github.com/RKGSERVER" },
  { Icon: LinkedInIcon,  label: "LinkedIn",  href: "https://www.linkedin.com/in/rozariorajkumar?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { Icon: TwitterIcon,   label: "Twitter / X", href: "https://x.com/Rozario_rkg" },
  { Icon: FacebookIcon,  label: "Facebook",  href: "https://www.facebook.com/share/1SfAMXmrVz/" },
  { Icon: YouTubeIcon,   label: "YouTube",   href: "https://youtube.com/@official_rkg07?si=CxzSMoMubwHaRQIX" },
  { Icon: LinktreeIcon,  label: "Linktree",  href: "https://linktr.ee/RozarioRajkumar" },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef    = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const [status, setStatus] = useState("idle")
  const [msgLen, setMsgLen] = useState(0)
  const { display, visible, trigger } = useGlitchReveal()

  /* ── scroll + entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // header words
      gsap.fromTo(".contact-header .anim",
        { y: 60, opacity: 0 },
        { scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" }
      )

      // left children slide from left
      gsap.fromTo(Array.from(leftRef.current.children),
        { x: -60, opacity: 0 },
        { scrollTrigger: { trigger: leftRef.current, start: "top 78%" },
          x: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: "power4.out" }
      )

      // right card slide up + fade
      gsap.fromTo(rightRef.current,
        { y: 70, opacity: 0 },
        { scrollTrigger: { trigger: rightRef.current, start: "top 82%" },
          y: 0, opacity: 1, duration: 1.1, ease: "power4.out" }
      )

      // form fields cascade
      gsap.fromTo(rightRef.current.querySelectorAll(".form-field"),
        { y: 28, opacity: 0 },
        { scrollTrigger: { trigger: rightRef.current, start: "top 78%" },
          y: 0, opacity: 1, duration: 0.7, stagger: 0.09,
          ease: "power3.out", delay: 0.35 }
      )

      // social pills pop in
      gsap.fromTo(sectionRef.current.querySelectorAll(".csocial"),
        { scale: 0.7, opacity: 0 },
        { scrollTrigger: { trigger: leftRef.current, start: "top 75%" },
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.06,
          ease: "back.out(1.7)", delay: 0.5 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── elastic hover on pills ── */
  useEffect(() => {
    const pills = sectionRef.current.querySelectorAll(".csocial")
    const handlers = []
    pills.forEach(el => {
      const onEnter = () => gsap.to(el, { scale: 1.08, duration: 0.3, ease: "power2.out" })
      const onLeave = () => gsap.to(el, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" })
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
      handlers.push({ el, onEnter, onLeave })
    })
    return () => handlers.forEach(({ el, onEnter, onLeave }) => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
    })
  }, [])

  /* ── form submit via FormSubmit (direct POST) ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    const data = new FormData(formRef.current)
    try {
      const res = await fetch("https://formsubmit.co/rozario9913@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      if (res.ok || res.status === 200) {
        setStatus("sent")
        formRef.current.reset()
        setMsgLen(0)
        gsap.fromTo(".contact-form",
          { boxShadow: "0 0 0 2px rgba(0,220,130,0)" },
          { boxShadow: "0 0 0 2px rgba(0,220,130,0.35)", duration: 0.4, yoyo: true, repeat: 1 }
        )
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        setStatus("error")
        gsap.fromTo(".contact-form", { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" })
        setTimeout(() => setStatus("idle"), 4000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  const btnLabel = {
    idle:    "Send Message",
    sending: "Sending...",
    sent:    "Message Sent ✓",
    error:   "Failed — Retry",
  }
  const btnStyle = {
    sent:  { background: "#00c853" },
    error: { background: "#e53935" },
  }

  return (
    <section ref={sectionRef} className="contact section" id="contact">
      <div className="section-num">05</div>

      {/* ambient orbs — no lines */}
      <div className="contact-orb contact-orb-1" aria-hidden="true" />
      <div className="contact-orb contact-orb-2" aria-hidden="true" />

      {/* header */}
      <div className="contact-header">
        <p className="section-eyebrow anim">Get In Touch</p>
        <h2 className="section-title anim">Let's Connect</h2>
        <p className="contact-sub anim">
          Whether you're a producer, a dev, or just a fan — the door is always open.
        </p>
      </div>

      <div className="contact-body">

        {/* ── LEFT ── */}
        <div ref={leftRef} className="contact-left">

          <div className="avail-badge">
            <span className="avail-dot" />
            <span className="avail-text">Available for work</span>
          </div>

          <div className="contact-cta-text">
            <h3>Have an idea?<br />Let's make it <em>happen.</em></h3>
            <p>Got a project, a collab, or just want to say hi? I'm always up for something interesting.</p>
          </div>

          <div className="contact-email-wrap">
            <span className="contact-email-label">Direct Email</span>
            <button className="contact-email-btn" onClick={trigger} aria-label="Reveal email">
              <EmailIcon size={18} />
              Click to reveal
            </button>
            {visible && (
              <div className="email-inline-reveal">
                <span className="email-glitch-text">{display}</span>
              </div>
            )}
          </div>

          {/* phone + location */}
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="cdi-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <span className="cdi-label">Phone</span>
                <a href="tel:+919016340207" className="cdi-value">+91 90163 40207</a>
              </div>
            </div>
            <div className="contact-detail-item">
              <a
                href="https://maps.google.com/?q=Valsad,Gujarat,India"
                target="_blank"
                rel="noreferrer"
                className="cdi-icon cdi-icon-link"
                aria-label="Open in Google Maps"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              <div>
                <span className="cdi-label">Location</span>
                <a
                  href="https://maps.google.com/?q=Valsad,Gujarat,India"
                  target="_blank"
                  rel="noreferrer"
                  className="cdi-value"
                >Valsad, Gujarat, India — 396001</a>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <span className="contact-socials-label">Find me on</span>
            <div className="contact-socials-grid">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  className="csocial"
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="csocial-icon"><Icon size={14} /></span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT — glass form card ── */}
        <div ref={rightRef} className="contact-form-wrap">
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject"  value="New Portfolio Message!" />
            <input type="hidden" name="_captcha"  value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="ct-name">Your Name</label>
                <input id="ct-name" name="name" type="text"
                  placeholder="Rozario Rajkumar" required autoComplete="off" />
                <div className="field-line" />
              </div>
              <div className="form-field">
                <label htmlFor="ct-email">Email Address</label>
                <input id="ct-email" name="email" type="email"
                  placeholder="you@example.com" required autoComplete="off" />
                <div className="field-line" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="ct-subject">Subject</label>
              <input id="ct-subject" name="subject" type="text"
                placeholder="What's this about?" autoComplete="off" />
              <div className="field-line" />
            </div>

            <div className="form-field">
              <label htmlFor="ct-msg">Message</label>
              <textarea id="ct-msg" name="message"
                placeholder="Tell me what's on your mind..."
                rows="5" required maxLength={500}
                onChange={e => setMsgLen(e.target.value.length)} />
              <div className="field-line" />
              <div className="field-meta">{msgLen} / 500</div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending"}
                style={btnStyle[status] || {}}
              >
                <div className="btn-ripple" />
                <span>{btnLabel[status]}</span>
                {status === "sending" ? <span className="spinner" /> : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <div className="form-secure">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2"
                    stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Sent securely<br />via FormSubmit
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}
