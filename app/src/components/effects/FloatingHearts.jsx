import { motion } from "framer-motion";
import Heart from "./svg/Heart";

const hearts = [
  { left: "15%", delay: 0 },
  { left: "35%", delay: 0.5 },
  { left: "55%", delay: 1 },
  { left: "75%", delay: 1.5 },
];

export default function FloatingHearts({ explode = false }) {
  return (
    <>
      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            left: explode ? "50%" : heart.left,
            bottom: explode ? "40%" : "15%",
            pointerEvents: "none",
          }}
          animate={{
            x: explode ? Math.random() * 180 - 90 : 0,
            y: explode ? -180 : [0, -120],
            opacity: [0, 1, 0],
            scale: [0.8, 1.15, 0.9],
            rotate: [-8, 8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: heart.delay,
          }}
        >
          <Heart />
        </motion.div>
      ))}
    </>
  );
}