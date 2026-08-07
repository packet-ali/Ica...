import { motion } from "framer-motion";
import Flower from "./svg/Flower";

const flowers = [
  { left: "20%", delay: 0.2 },
  { left: "45%", delay: 0.8 },
  { left: "70%", delay: 1.2 },
];

export default function FloatingFlowers({ explode = false }) {
  return (
    <>
      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            left: explode ? "50%" : flower.left,
            bottom: explode ? "40%" : "12%",
            pointerEvents: "none",
          }}
          animate={{
            x: explode ? Math.random() * 150 - 75 : 0,
            y: explode ? -170 : [0, -100],
            opacity: [0, 1, 0],
            rotate: [0, 20],
            scale: [0.8, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: flower.delay,
          }}
        >
          <Flower />
        </motion.div>
      ))}
    </>
  );
}