import { motion } from "framer-motion";

export default function GiftGlow({ isOpening }) {
  return (
    <motion.circle
      cx="160"
      cy="150"
      r="82"
      fill="url(#giftGlow)"
      opacity="0.35"
      animate={{
        scale: isOpening ? 1.4 : 1,
        opacity: isOpening ? 0.75 : 0.35,
      }}
      transition={{
        duration: 0.8,
      }}
    />
  );
}