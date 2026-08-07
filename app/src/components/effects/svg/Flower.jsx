export default function Flower() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 100 100"
      fill="none"
    >
      <defs>
        <radialGradient
          id="flowerGradient"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#FFE8F0" />
          <stop offset="100%" stopColor="#F8BBD0" />
        </radialGradient>
      </defs>

      {/* Kelopak atas */}
      <ellipse
        cx="50"
        cy="28"
        rx="12"
        ry="18"
        fill="url(#flowerGradient)"
      />

      {/* Kelopak kanan */}
      <ellipse
        cx="72"
        cy="50"
        rx="18"
        ry="12"
        fill="url(#flowerGradient)"
      />

      {/* Kelopak bawah */}
      <ellipse
        cx="50"
        cy="72"
        rx="12"
        ry="18"
        fill="url(#flowerGradient)"
      />

      {/* Kelopak kiri */}
      <ellipse
        cx="28"
        cy="50"
        rx="18"
        ry="12"
        fill="url(#flowerGradient)"
      />

      {/* Kelopak diagonal */}
      <ellipse
        cx="35"
        cy="35"
        rx="10"
        ry="15"
        transform="rotate(-35 35 35)"
        fill="url(#flowerGradient)"
      />

      <ellipse
        cx="65"
        cy="35"
        rx="10"
        ry="15"
        transform="rotate(35 65 35)"
        fill="url(#flowerGradient)"
      />

      <ellipse
        cx="35"
        cy="65"
        rx="10"
        ry="15"
        transform="rotate(35 35 65)"
        fill="url(#flowerGradient)"
      />

      <ellipse
        cx="65"
        cy="65"
        rx="10"
        ry="15"
        transform="rotate(-35 65 65)"
        fill="url(#flowerGradient)"
      />

      {/* Putik */}
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="#FFF3C7"
      />
    </svg>
  );
}