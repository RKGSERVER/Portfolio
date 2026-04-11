import { EmailIcon, FacebookIcon, GitHubIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons'
import useGlitchReveal from '../hooks/useGlitchReveal'
import './Footer.css'

const footerSocials = [
  { Icon: InstagramIcon, href: 'https://www.instagram.com/rozario_rajkumar_official?igsh=MWhtYzJyMDJld2ZxZw==', label: 'Instagram' },
  { Icon: TwitterIcon,   href: 'https://x.com/Rozario_rkg',                                                     label: 'Twitter' },
  { Icon: GitHubIcon,    href: 'https://github.com/RKGSERVER',                                                   label: 'GitHub' },
  { Icon: LinkedInIcon,  href: 'https://www.linkedin.com/in/rozariorajkumar?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
  { Icon: FacebookIcon,  href: 'https://www.facebook.com/share/1SfAMXmrVz/',                                    label: 'Facebook' },
  { Icon: YouTubeIcon,   href: 'https://youtube.com/@official_rkg07?si=CxzSMoMubwHaRQIX',                                              label: 'YouTube' },
  { Icon: EmailIcon,     href: 'mailto:rozario9913@gmail.com', label: 'Email', isEmail: true },
]

export default function Footer() {
  const { display, visible, trigger } = useGlitchReveal()

  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-track">
          {[0, 1, 2, 3].map(copy => (
            <span key={copy} style={{ display: 'contents' }}>
              <span className="fw">STAY</span>
              <span className="fsep">·</span>
              <span className="fw outline">TUNED</span>
              <span className="fsep">·</span>
              <span className="fw">STAY</span>
              <span className="fsep">·</span>
              <span className="fw outline">TUNED</span>
              <span className="fsep">·</span>
              <span className="fw">STAY</span>
              <span className="fsep">·</span>
              <span className="fw outline">TUNED</span>
              <span className="fsep">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-logo glitch" data-text="ROZARIO RAJKUMAR">ROZARIO RAJKUMAR</span>
        <p>© 2026 · Rozario Rajkumar · RKGSTUDIO · Built with code &amp; vision</p>

        <div className="footer-socials">
          {footerSocials.map(({ Icon, href, label, isEmail }) => (
            <div key={label} className="footer-social-wrap">
              <a
                className="footer-social-link"
                href={isEmail ? undefined : href}
                aria-label={label}
                target={!isEmail && href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                onClick={isEmail ? (e) => { e.preventDefault(); trigger() } : undefined}
                style={isEmail ? { cursor: 'none' } : {}}
              >
                <Icon size={32} />
              </a>
              {/* glitch reveal pops above the email icon */}
              {isEmail && visible && (
                <div className="footer-email-reveal">
                  <span className="footer-email-text">{display}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
