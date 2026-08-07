import { motion } from "framer-motion";

export default function GiftBow({
  phase = "idle",
}) {
  const isOpen =
    phase === "open" ||
    phase === "explode" ||
    phase === "flash";

  return (
    <motion.g
      animate={{
        x:
          phase === "shake"
            ? [-4, 4, -4, 4, 0]
            : 0,

        y: isOpen
          ? -72
          : phase === "jump"
          ? -12
          : 0,

        rotate: isOpen ? -20 : 0,

        scale: phase === "pressed"
          ? 0.95
          : 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
      style={{
        transformOrigin: "160px 90px",
      }}
    >
      {/* Left loop */}
      <path
        d="
          M160 88
          C148 74,130 72,122 84
          C116 94,124 108,140 106
          C148 105,154 100,160 92
          Z
        "
        fill="url(#giftRibbonGradient)"
      />

      {/* Right loop */}
      <path
        d="
          M160 88
          C172 74,190 72,198 84
          C204 94,196 108,180 106
          C172 105,166 100,160 92
          Z
        "
        fill="url(#giftRibbonGradient)"
      />

      {/* Knot */}
      <ellipse
        cx="160"
        cy="90"
        rx="11"
        ry="10"
        fill="#F8EAD2"
      />

      {/* Left tail */}
      <path
        d="
          M152 96
          L142 116
          L150 112
          L156 126
          L163 101
          Z
        "
        fill="url(#giftRibbonGradient)"
      />

      {/* Right tail */}
      <path
        d="
          M168 96
          L178 116
          L170 112
          L164 126
          L157 101
          Z
        "
        fill="url(#giftRibbonGradient)"
      />

      {/* Highlight kiri */}
      <path
        d="
          M152 82
          C145 78,135 79,130 87
        "
        stroke="rgba(255,255,255,.45)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Highlight kanan */}
      <path
        d="
          M168 82
          C175 78,185 79,190 87
        "
        stroke="rgba(255,255,255,.45)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </motion.g>
  );
}