import { motion } from "framer-motion";
import Particle from "./svg/Particle";

const idleParticles = [
  {
    left: "8%",
    delay: 0.2,
    duration: 3.2,
    size: 0.7,
  },
  {
    left: "27%",
    delay: 1.4,
    duration: 3.8,
    size: 0.9,
  },
  {
    left: "48%",
    delay: 0.6,
    duration: 3.4,
    size: 0.6,
  },
  {
    left: "67%",
    delay: 2,
    duration: 3.6,
    size: 0.8,
  },
  {
    left: "88%",
    delay: 1,
    duration: 3.1,
    size: 0.65,
  },
  {
    left: "38%",
    delay: 2.6,
    duration: 3.9,
    size: 0.75,
  },
];

const explosionParticles = [
  {
    x: -135,
    y: -65,
    rotate: 80,
    delay: 0,
  },
  {
    x: -95,
    y: -115,
    rotate: -60,
    delay: 0.06,
  },
  {
    x: -45,
    y: -145,
    rotate: 100,
    delay: 0.12,
  },
  {
    x: 45,
    y: -145,
    rotate: -90,
    delay: 0.18,
  },
  {
    x: 95,
    y: -115,
    rotate: 70,
    delay: 0.24,
  },
  {
    x: 135,
    y: -60,
    rotate: -80,
    delay: 0.3,
  },
];

export default function FloatingParticles({
  phase = "idle",
}) {
  const isFading =
    phase === "pressed" ||
    phase === "shake" ||
    phase === "jump" ||
    phase === "open" ||
    phase === "explode" ||
    phase === "flash";

  const isExploding =
    phase === "explode" ||
    phase === "flash";

  return (
    <>
      {/* =========================
          IDLE PARTICLES
      ========================== */}

      {idleParticles.map((particle, index) => (
        <motion.div
          key={`idle-particle-${index}`}
          style={{
            position: "absolute",
            left: particle.left,
            bottom: "-5%",
            pointerEvents: "none",
          }}
          animate={{
            y: -170,

            opacity: isFading
              ? 0
              : [
                  0,
                  0.8,
                  0.8,
                  0,
                ],

            scale: particle.size,
          }}
          transition={{
            y: {
              duration: particle.duration,
              delay: particle.delay,
              repeat: isFading ? 0 : Infinity,
              ease: "easeOut",
            },

            opacity: {
              duration: isFading
                ? 0.55
                : particle.duration,

              delay: isFading
                ? 0
                : particle.delay,

              repeat: isFading ? 0 : Infinity,
              repeatDelay: 0.3,
              ease: "easeOut",
            },

            scale: {
              duration: 0.35,
            },
          }}
        >
          <Particle />
        </motion.div>
      ))}

      {/* =========================
          EXPLOSION PARTICLES
      ========================== */}

      {isExploding &&
        explosionParticles.map((particle, index) => (
          <motion.div
            key={`explosion-particle-${index}`}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.2,
              rotate: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,

              opacity: [
                0,
                1,
                1,
                0,
              ],

              scale: [
                0.2,
                1.3,
                1,
                0,
              ],

              rotate: particle.rotate,
            }}
            transition={{
              duration: 0.75,
              delay: particle.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",

              /*
               * Titik awal berada di bagian
               * atas / mulut kotak kado.
               */
              left: "50%",
              top: "31%",

              pointerEvents: "none",
            }}
          >
            <Particle />
          </motion.div>
        ))}
    </>
  );
}