import { motion } from "framer-motion";
import { giftConfig } from "../GiftConfig";

export default function GiftShadow({
  phase = "idle",
}) {
  const { box } = giftConfig;

  const isOpening =
    phase === "jump" ||
    phase === "open" ||
    phase === "explode" ||
    phase === "flash";

  return (
    <motion.g
      animate={{
        scaleX:
          phase === "pressed"
            ? 0.9
            : isOpening
            ? 0.65
            : 1,

        scaleY:
          phase === "pressed"
            ? 1.05
            : isOpening
            ? 0.75
            : 1,

        opacity:
          phase === "pressed"
            ? 0.2
            : isOpening
            ? 0.08
            : 0.14,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      style={{
        transformOrigin: "160px 252px",
      }}
    >
      <ellipse
        cx={box.x + box.width / 2}
        cy={box.y + box.height + 22}
        rx="82"
        ry="15"
        fill="rgba(0,0,0,.14)"
        filter="url(#giftShadow)"
      />
    </motion.g>
  );
}