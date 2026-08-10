import { motion } from "framer-motion";

export default function GiftGlow({
  isOpening = false,
}) {
  return (
    <motion.g
      animate={{
        opacity: isOpening
          ? [0.35, 0.65, 0.95]
          : [0.28, 0.42, 0.28],

        scale: isOpening
          ? [0.9, 1.15, 1.35]
          : [0.96, 1, 0.96],
      }}
      transition={{
        opacity: {
          duration: isOpening ? 0.8 : 2.4,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut",
        },

        scale: {
          duration: isOpening ? 0.9 : 2.4,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        transformOrigin: "160px 150px",
      }}
    >
      {/* Main soft glow */}
      <circle
        cx="160"
        cy="145"
        r="68"
        fill="url(#giftGlow)"
      />

      {/* Inner light */}
      <circle
        cx="160"
        cy="125"
        r="32"
        fill="#FFF8F4"
        opacity={isOpening ? 0.22 : 0.08}
      />

      {/* Small core */}
      <circle
        cx="160"
        cy="112"
        r="14"
      y  fill="#FFFFFF"
        opacity={isOpening ? 0.28 : 0.1}
      />
    </motion.g>
  );
}