import { EmailIcon, FacebookIcon, GitHubIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon, LinktreeIcon } from './SocialIcons'
import useGlitchReveal from '../hooks/useGlitchReveal'
import './Footer.css'

const quickLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const footerSocials = [
  { Icon: InstagramIcon, href: 'https://www.instagram.com/rozario_rajkumar_official?igsh=MWhtYzJyMDJld2ZxZw==', label: 'Instagram' },
  { Icon: TwitterIcon,   href: 'https://x.com/Rozario_rkg',                                                     label: 'Twitter / X' },
  { Icon: GitHubIcon,    href: 'https://github.com/RKGSERVER',                                                   label: 'GitHub' },
  { Icon: LinkedInIcon,  href: 'https://www.linkedin.com/in/rozariorajkumar?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
  { Icon: FacebookIcon,  href: 'https://www.facebook.com/share/1SfAMXmrVz/',                                    label: 'Facebook' },
  { Icon: YouTubeIcon,   href: 'https://youtube.com/@official_rkg07?si=CxzSMoMubwHaRQIX',                       label: 'YouTube' },
  { Icon: LinktreeIcon,  href: 'https://linktr.ee/RozarioRajkumar',                                             label: 'Linktree' },
  { Icon: EmailIcon,     href: 'mailto:rozario9913@gmail.com', label: 'Email', isEmail: true },
]

export default function Footer() {
  const { display, visible, trigger } = useGlitchReveal()

  return (
    <footer className="footer">

      {/* ── marquee strip ── */}
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-track">
          {[0, 1].map(copy => (
            <div key={copy} className="footer-group">
              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>

              <span className="fw">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw outline">CODE</span>
              <span className="fsep">•</span>
              <span className="fw">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw">SCALE</span>
              <span className="fsep">•</span>
              <span className="fw outline">RKG LABS</span>
              <span className="fsep">•</span>
              <span className="fw">CODE</span>
              <span className="fsep">•</span>
              <span className="fw outline">DEBUG</span>
              <span className="fsep">•</span>
              <span className="fw">DEPLOY</span>
              <span className="fsep">•</span>
              <span className="fw outline">SCALE</span>
              <span className="fsep">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── main footer grid ── */}
      <div className="footer-grid">

        {/* COL 1 — brand */}
        <div className="footer-col footer-brand">
          <span className="footer-logo glitch" data-text="ROZARIO RAJKUMAR">ROZARIO RAJKUMAR</span>
          <p className="footer-tagline">Developer by craft, creator by soul.</p>
          <p className="footer-tagline">Turning ideas into digital experiences.</p>
          <p className="footer-tagline">Code. Design. Grow. Repeat.</p>
        </div>

        {/* COL 2 — quick links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer-link">
                  <span className="footer-link-arrow">→</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 — socials */}
        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <div className="footer-socials-grid">
            {footerSocials.map(({ Icon, href, label, isEmail }) => (
              <div key={label} className="footer-social-wrap">
                {isEmail ? (
                  <button
                    className="footer-social-pill footer-email-btn"
                    aria-label={label}
                    onClick={trigger}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                ) : (
                  <a
                    className="footer-social-pill"
                    href={href}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </a>
                )}
                {isEmail && visible && (
                  <div className="footer-email-reveal">
                    <span className="footer-email-text">{display}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COL 4 — contact details */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="fci-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <a href="tel:+919016340207" className="footer-contact-link">+91 90163 40207</a>
            </li>
            <li>
              <span className="fci-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="footer-contact-link">rozario9913@gmail.com</span>
            </li>
            <li className="footer-location">
              <a
                href="https://maps.google.com/?q=Valsad,Gujarat,India"
                target="_blank"
                rel="noreferrer"
                className="fci-icon fci-icon-link"
                aria-label="Open in Google Maps"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              <div>
                <a
                  href="https://maps.google.com/?q=Valsad,Gujarat,India"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-contact-link"
                >Valsad, Gujarat, India</a>
                <span className="footer-pincode">PIN: 396001</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* ── bottom bar ── */}
      <div className="footer-bottom-bar">
        <p>© 2026 &nbsp;·&nbsp; Rozario Rajkumar &nbsp;·&nbsp; RKGSTUDIO &nbsp;·&nbsp; RKGLABS &nbsp;·&nbsp; All Rights Reserved &nbsp;·&nbsp; Built with code &amp; vision</p>
      </div>

    </footer>
  )
}
