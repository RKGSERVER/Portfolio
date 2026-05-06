// One set duplicated for seamless -50% loop
const ITEMS = [
  'DEVELOPER', '·', 'BCA', '·', 'DIGITAL MARKETER', '·', 'UI/UX DESIGNER', '·', 'CREATOR', '·', 'ARTIST', '·',
  'DEVELOPER', '·', 'BCA', '·', 'DIGITAL MARKETER', '·', 'UI/UX DESIGNER', '·', 'CREATOR', '·', 'ARTIST', '·',
]

export default function MarqueeBanner() {
  return (
    <div className="marquee-banner" aria-hidden="true">
      <div className="marquee-track">
        {ITEMS.map((w, i) => (
          <span key={i} className={w === '·' ? 'm-dot' : undefined}>{w}</span>
        ))}
      </div>
    </div>
  )
}
