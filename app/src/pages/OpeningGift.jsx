import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Gift from "../components/illustrations/Gift/Gift";

export default function OpeningGift() {
  const navigate = useNavigate();

  const [canClick, setCanClick] = useState(false);

  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

function handleGiftClick() {
  if (!canClick) return;

  setIsOpening(true);

  setTimeout(() => {
    navigate("/birthday");
  }, 1800);
}

  return (
    <main className="opening-page">
      <motion.h2
        className="opening-title"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Ada sesuatu buat kamuu nih...
      </motion.h2>

      <motion.div
        className={`gift-wrapper ${canClick ? "clickable" : ""}`}
        onClick={handleGiftClick}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: isOpening ? 0.96 : 1,
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Gift isOpening={isOpening} />
      </motion.div>
    </main>
  );
}