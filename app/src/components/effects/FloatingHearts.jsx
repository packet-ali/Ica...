import { motion } from "framer-motion";
import Heart from "./svg/Heart";

const idleHearts = [
  {
    left: "12%",
    delay: 0,
    duration: 3.8,
    size: 0.8,
  },
  {
    left: "32%",
    delay: 1.7,
    duration: 4.4,
    size: 1,
  },
  {
    left: "58%",
    delay: 0.9,
    duration: 3.6,
    size: 0.75,
  },
  {
    left: "78%",
    delay: 2.4,
    duration: 4.1,
    size: 0.9,
  },
];

const explosionHearts = [
  {
    x: -115,
    y: -75,
    rotate: -25,
    delay: 0,
  },
  {
    x: -65,
    y: -120,
    rotate: 18,
    delay: 0.08,
  },
  {
    x: 65,
    y: -115,
    rotate: -18,
    delay: 0.16,
  },
  {
    x: 115,
    y: -70,
    rotate: 28,
    delay: 0.24,
  },
];

export default function FloatingHearts({
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
          IDLE HEARTS
      ========================== */}

      {idleHearts.map((heart, index) => (
        <motion.div
          key={`idle-heart-${index}`}
          style={{
            position: "absolute",
            left: heart.left,
            bottom: "-5%",
            pointerEvents: "none",
          }}
          animate={{
            y: -150,

            opacity: isFading
              ? 0
              : [
                  0,
                  0.9,
                  0.9,
                  0,
                ],

            scale: heart.size,
          }}
          transition={{
            y: {
              duration: heart.duration,
              delay: heart.delay,
              repeat: isFading ? 0 : Infinity,
              ease: "easeOut",
            },

            opacity: {
              duration: isFading ? 0.65 : heart.duration,
              delay: isFading ? 0 : heart.delay,
              repeat: isFading ? 0 : Infinity,
              repeatDelay: 0.4,
              ease: "easeOut",
            },

            scale: {
              duration: 0.4,
            },
          }}
        >
          <Heart />
        </motion.div>
      ))}

      {/* =========================
          EXPLOSION HEARTS
      ========================== */}

      {isExploding &&
        explosionHearts.map((heart, index) => (
          <motion.div
            key={`explosion-heart-${index}`}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.35,
              rotate: 0,
            }}
            animate={{
              x: heart.x,
              y: heart.y,

              opacity: [
                0,
                1,
                1,
                0,
              ],

              scale: [
                0.35,
                1,
                1.05,
                0.7,
              ],

              rotate: heart.rotate,
            }}
            transition={{
              duration: 0.9,
              delay: heart.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",

              /*
               * Titik awal berada di area
               * atas / mulut kotak kado.
               */
              left: "50%",
              top: "31%",

              pointerEvents: "none",
            }}
          >
            <Heart />
          </motion.div>
        ))}
    </>
  );
}