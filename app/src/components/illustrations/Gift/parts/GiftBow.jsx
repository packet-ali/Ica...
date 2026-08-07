import { motion } from "framer-motion";

export default function GiftBow({ isOpening }) {
  return (
    <motion.g
      animate={{
        y: isOpening ? -25 : 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
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

      <ellipse
        cx="160"
        cy="90"
        rx="11"
        ry="10"
        fill="#F8EAD2"
      />
    </motion.g>
  );
}