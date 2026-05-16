interface EyeLogoProps {
  size?: number;
}

export function EyeLogo({ size = 160 }: EyeLogoProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-outer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-inner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={size * 0.48} fill="url(#glow-outer)" />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + size * 0.06} stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.6" />

      {/* Main circle */}
      <circle cx={cx} cy={cy} r={r} stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.8" fill="#131325" />

      {/* Inner glow */}
      <circle cx={cx} cy={cy} r={r} fill="url(#glow-inner)" />

      {/* Decorative dots on outer ring */}
      <circle cx={cx} cy={cy - r - size * 0.06} r={size * 0.018} fill="#a78bfa" opacity="0.8" />
      <circle cx={cx + (r + size * 0.06) * 0.866} cy={cy - (r + size * 0.06) * 0.5} r={size * 0.012} fill="#a78bfa" opacity="0.6" />
      <circle cx={cx - (r + size * 0.06) * 0.866} cy={cy - (r + size * 0.06) * 0.5} r={size * 0.012} fill="#a78bfa" opacity="0.6" />

      {/* Eye shape */}
      <path
        d={`M ${cx - r * 0.55} ${cy} Q ${cx} ${cy - r * 0.35} ${cx + r * 0.55} ${cy} Q ${cx} ${cy + r * 0.35} ${cx - r * 0.55} ${cy} Z`}
        fill="#22204a"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeOpacity="0.9"
      />

      {/* Iris */}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#f59e0b" opacity="0.9" />

      {/* Pupil */}
      <circle cx={cx} cy={cy} r={r * 0.1} fill="#0d0d1a" />

      {/* Eye glow */}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#f59e0b" opacity="0.2" />

      {/* Small star decorations */}
      <text x={cx - r * 0.72} y={cy - r * 0.12} fontSize={size * 0.08} fill="#a78bfa" opacity="0.7" textAnchor="middle">✦</text>
      <text x={cx + r * 0.72} y={cy + r * 0.2} fontSize={size * 0.055} fill="#a78bfa" opacity="0.5" textAnchor="middle">✦</text>
    </svg>
  );
}
