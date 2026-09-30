// Stylised neighbourhood map used as a stand-in for a real map provider in the mockup.
export function IllustratedMap() {
  return (
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="400" height="320" fill="oklch(0.965 0.012 140)" />
      {/* Parks */}
      <path d="M140 190 q40 -20 80 5 q15 40 -20 60 q-50 10 -65 -20 z" fill="oklch(0.88 0.08 150)" />
      <circle cx="330" cy="70" r="34" fill="oklch(0.9 0.07 150)" />
      <rect x="20" y="30" width="80" height="55" rx="10" fill="oklch(0.9 0.07 150)" />
      {/* Canal */}
      <path
        d="M-10 280 C 80 250, 150 300, 240 270 S 360 230, 410 250"
        stroke="oklch(0.82 0.08 230)"
        strokeWidth="18"
        fill="none"
      />
      {/* Blocks */}
      {[
        [120, 30, 60, 50],
        [200, 30, 70, 45],
        [20, 110, 70, 60],
        [120, 110, 60, 50],
        [280, 120, 90, 50],
        [20, 190, 90, 45],
        [260, 190, 60, 40],
      ].map(([x, y, w, h]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="6"
          fill="oklch(0.93 0.01 150)"
        />
      ))}
      {/* Main roads */}
      <g stroke="white" strokeLinecap="round" fill="none">
        <path d="M0 100 H400" strokeWidth="14" />
        <path d="M0 180 H400" strokeWidth="10" />
        <path d="M110 0 V320" strokeWidth="10" />
        <path d="M250 0 C 240 100, 270 200, 250 320" strokeWidth="14" />
        <path d="M190 0 V180" strokeWidth="6" />
        <path d="M0 250 L 110 180" strokeWidth="6" />
      </g>
      <g fill="oklch(0.55 0.03 155)" fontSize="10" fontFamily="Noto Sans Thai, sans-serif">
        <text x="300" y="96">
          ถ.สุขุมวิท
        </text>
        <text x="10" y="176">
          ซ.ประชาอุทิศ
        </text>
        <text x="160" y="232">
          สวนสาธารณะ
        </text>
        <text x="290" y="262">
          คลองบางนา
        </text>
      </g>
    </svg>
  );
}
