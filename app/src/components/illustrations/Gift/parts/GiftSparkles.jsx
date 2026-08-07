import { motion } from "framer-motion";

export default function GiftSparkles({ isOpening }) {
  return (
    <motion.g
      animate={{
        opacity: isOpening ? 1 : 0.6,
        scale: isOpening ? 1.25 : 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <circle cx="95" cy="80" r="2" fill="white" />

      <circle cx="230" cy="65" r="2" fill="white" />

      <circle cx="250" cy="180" r="2" fill="white" />

      <circle cx="80" cy="170" r="2" fill="white" />
    </motion.g>
  );
}