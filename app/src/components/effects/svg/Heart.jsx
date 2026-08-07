export default function Heart() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
    >
      <defs>
        <linearGradient
          id="heartGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ff9eb5" />
          <stop offset="100%" stopColor="#ff6f91" />
        </linearGradient>
      </defs>

      <path
        d="
          M50 88
          C30 72,8 54,8 30
          C8 15,18 6,32 6
          C41 6,48 11,50 18
          C52 11,59 6,68 6
          C82 6,92 15,92 30
          C92 54,70 72,50 88
        "
        fill="url(#heartGradient)"
      />
    </svg>
  );
}