import { motion } from "framer-motion";
import { giftConfig } from "../GiftConfig";

export default function GiftLid({
  phase = "idle",
}) {
  const { lid } = giftConfig;

  const isOpen =
    phase === "open" ||
    phase === "explode" ||
    phase === "flash";

  return (
    <motion.g
      animate={{
        x:
          phase === "shake"
            ? [-3, 3, -3, 3, 0]
            : 0,

        y: isOpen
          ? -60
          : phase === "jump"
          ? -10
          : 0,

        rotate: isOpen ? -18 : 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
      style={{
        transformOrigin: "160px 102px",
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