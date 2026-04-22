// Real SVG brand icons — official brand colors

export function EmailIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#EA4335"/>
      <path d="M8 14l16 11L40 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="14" width="32" height="22" rx="2" stroke="#fff" strokeWidth="2.5"/>
    </svg>
  )
}

export function FacebookIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#1877F2"/>
      <path d="M32 8h-4a8 8 0 00-8 8v4h-4v6h4v14h6V26h4l1-6h-5v-4a2 2 0 012-2h3V8z" fill="#fff"/>
    </svg>
  )
}

export function GitHubIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#24292E"/>
      <path fillRule="evenodd" clipRule="evenodd"
        d="M24 10C16.268 10 10 16.268 10 24c0 6.188 4.013 11.43 9.573 13.28.7.128.957-.304.957-.674 0-.332-.012-1.213-.019-2.38-3.893.846-4.715-1.876-4.715-1.876-.636-1.616-1.553-2.046-1.553-2.046-1.27-.868.096-.85.096-.85 1.404.098 2.143 1.44 2.143 1.44 1.248 2.138 3.273 1.52 4.07 1.162.127-.904.488-1.52.888-1.87-3.108-.353-6.375-1.554-6.375-6.916 0-1.527.546-2.775 1.44-3.754-.144-.354-.624-1.776.137-3.702 0 0 1.174-.376 3.847 1.434A13.38 13.38 0 0124 17.4c1.19.006 2.387.16 3.506.47 2.67-1.81 3.842-1.434 3.842-1.434.763 1.926.283 3.348.14 3.702.895.979 1.438 2.227 1.438 3.754 0 5.375-3.272 6.558-6.39 6.904.503.433.95 1.287.95 2.594 0 1.872-.017 3.38-.017 3.84 0 .373.252.808.963.672C33.99 35.426 38 30.186 38 24c0-7.732-6.268-14-14-14z"
        fill="#fff"/>
    </svg>
  )
}

export function InstagramIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="url(#ig-grad)"/>
      <rect x="13" y="13" width="22" height="22" rx="6" stroke="#fff" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="5.5" stroke="#fff" strokeWidth="2.5"/>
      <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/>
    </svg>
  )
}

export function TwitterIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M11 11h7.5l5.5 7.5L30.5 11H37l-9.5 12L37 37h-7.5L24 29l-6.5 8H11l10-12.5L11 11z" fill="#fff"/>
    </svg>
  )
}

export function LinkedInIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0A66C2"/>
      <path d="M14 19h5v15h-5V19zM16.5 17a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#fff"/>
      <path d="M22 19h4.8v2h.1c.7-1.2 2.3-2.5 4.7-2.5 5 0 5.9 3.3 5.9 7.5V34h-5v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V34H22V19z" fill="#fff"/>
    </svg>
  )
}

export function YouTubeIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FF0000"/>
      <path d="M38.5 17.5a4 4 0 00-2.8-2.8C33.4 14 24 14 24 14s-9.4 0-11.7.7a4 4 0 00-2.8 2.8C9 19.8 9 24 9 24s0 4.2.5 6.5a4 4 0 002.8 2.8C14.6 34 24 34 24 34s9.4 0 11.7-.7a4 4 0 002.8-2.8C39 28.2 39 24 39 24s0-4.2-.5-6.5z" fill="#fff"/>
      <path d="M21 28.5l7.5-4.5-7.5-4.5v9z" fill="#FF0000"/>
    </svg>
  )
}

export function LinktreeIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#43E55E"/>
      <path d="M24 8l-6 10h4v6h4v-6h4L24 8z" fill="#fff"/>
      <path d="M14 20l4 6h-3v6h3v6h12v-6h3v-6h-3l4-6H14z" fill="#fff"/>
    </svg>
  )
}
