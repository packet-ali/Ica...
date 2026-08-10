import { motion } from "framer-motion";
import Flower from "./svg/Flower";

const idleFlowers = [
  {
    left: "20%",
    delay: 0.6,
    duration: 4.2,
    size: 0.8,
  },
  {
    left: "43%",
    delay: 2.1,
    duration: 3.7,
    size: 1,
  },
  {
    left: "68%",
    delay: 1.2,
    duration: 4.5,
    size: 0.75,
  },
  {
    left: "84%",
    delay: 2.8,
    duration: 4,
    size: 0.9,
  },
];

const explosionFlowers = [
  {
    x: -110,
    y: -85,
    rotate: -35,
    delay: 0.05,
  },
  {
    x: -65,
    y: -130,
    rotate: 20,
    delay: 0.12,
  },
  {
    x: 65,
    y: -125,
    rotate: -20,
    delay: 0.2,
  },
  {
    x: 115,
    y: -80,
    rotate: 35,
    delay: 0.28,
  },
];

export default function FloatingFlowers({
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
          IDLE FLOWERS
      ========================== */}

      {idleFlowers.map((flower, index) => (
        <motion.div
          key={`idle-flower-${index}`}
          style={{
            position: "absolute",
            left: flower.left,
            bottom: "-5%",
            pointerEvents: "none",
          }}
          animate={{
            y: -160,

            opacity: isFading
              ? 0
              : [
                  0,
                  0.85,
                  0.85,
                  0,
                ],

            scale: flower.size,
          }}
          transition={{
            y: {
              duration: flower.duration,
              delay: flower.delay,
              repeat: isFading ? 0 : Infinity,
              ease: "easeOut",
            },

            opacity: {
              duration: isFading
                ? 0.65
                : flower.duration,

              delay: isFading
                ? 0
                : flower.delay,

              repeat: isFading ? 0 : Infinity,
              repeatDelay: 0.5,
              ease: "easeOut",
            },

            scale: {
              duration: 0.4,
            },
          }}
        >
          <Flower />
        </motion.div>
      ))}

      {/* =========================
          EXPLOSION FLOWERS
      ========================== */}

      {isExploding &&
        explosionFlowers.map((flower, index) => (
          <motion.div
            key={`explosion-flower-${index}`}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.35,
              rotate: 0,
            }}
            animate={{
              x: flower.x,
              y: flower.y,

              opacity: [
                0,
                1,
                1,
                0,
              ],

              scale: [
                0.35,
                1,
                1.1,
                0.7,
              ],

              rotate: flower.rotate,
            }}
            transition={{
              duration: 0.95,
              delay: flower.delay,
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
            <Flower />
          </motion.div>
        ))}
    </>
  );
}