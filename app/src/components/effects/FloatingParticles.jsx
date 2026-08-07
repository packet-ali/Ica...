import { motion } from "framer-motion";
import Particle from "./svg/Particle";

const particles = Array.from(
  { length: 8 },
  (_, index) => index
);

export default function FloatingParticles({
  explode = false,
}) {
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle}
          style={{
            position: "absolute",
            left: explode
              ? "50%"
              : `${Math.random() * 100}%`,
            bottom: explode ? "40%" : "10%",
            pointerEvents: "none",
          }}
          animate={{
            x: explode
              ? Math.random() * 240 - 120
              : 0,
            y: explode ? -220 : [0, -150],
            opacity: [0, 1, 0],
            scale: [0.5, 1.6, 0.2],
            rotate: [0, 180],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle * 0.2,
          }}
        >
          <Particle />
        </motion.div>
      ))}
    </>
  );
}