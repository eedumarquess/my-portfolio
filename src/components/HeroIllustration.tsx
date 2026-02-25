/**
 * Hero illustration: hand-drawn style, B&W.
 * Suggests flows/systems (backend) without literal imagery.
 */
export function HeroIllustration() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg
        viewBox="0 0 280 200"
        fill="none"
        stroke="#1c1c1c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full max-w-[280px] md:max-w-[320px]"
      >
        {/* Abstract nodes and connections - hand-drawn feel with slight irregularity */}
        <circle cx="50" cy="40" r="12" />
        <circle cx="140" cy="30" r="10" />
        <circle cx="230" cy="45" r="11" />
        <circle cx="70" cy="110" r="14" />
        <circle cx="140" cy="100" r="12" />
        <circle cx="210" cy="115" r="10" />
        <circle cx="140" cy="170" r="13" />
        {/* Connections */}
        <path d="M50 52 L65 95" />
        <path d="M62 52 L130 38" />
        <path d="M158 40 L205 58" />
        <path d="M230 56 L218 102" />
        <path d="M84 96 L125 92" />
        <path d="M155 92 L198 108" />
        <path d="M128 112 L138 157" />
        <path d="M152 112 L142 157" />
      </svg>
    </div>
  );
}
