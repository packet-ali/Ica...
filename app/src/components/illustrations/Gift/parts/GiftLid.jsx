import { motion } from "framer-motion";
import { giftConfig } from "../GiftConfig";

export default function GiftLid({ isOpening }) {
  const { lid } = giftConfig;

  return (
    <motion.g
      animate={{
        y: isOpening ? -25 : 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <rect
        x={lid.x}
        y={lid.y}
        width={lid.width}
        height={lid.height}
        rx={lid.radius}
        fill="url(#giftBodyGradient)"
      />
    </motion.g>
  );
}