import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Gift from "../components/illustrations/Gift/Gift";

import FloatingHearts from "../components/effects/FloatingHearts";
import FloatingFlowers from "../components/effects/FloatingFlowers";
import FloatingParticles from "../components/effects/FloatingParticles";

export default function OpeningGift() {
  const navigate = useNavigate();

  const [canClick, setCanClick] = useState(false);

  // idle
  // pressed
  // shake
  // jump
  // open
  // explode
  // flash
  const [phase, setPhase] = useState("idle");

  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  function handleGiftClick() {
    if (!canClick || phase !== "idle") return;

    setPhase("pressed");

    setTimeout(() => {
      setPhase("shake");
    }, 200);

    setTimeout(() => {
      setPhase("jump");
    }, 800);

    setTimeout(() => {
      setPhase("open");
    }, 1100);

    setTimeout(() => {
      setPhase("explode");
    }, 1400);

    setTimeout(() => {
      setPhase("flash");
      setShowFlash(true);
    }, 2000);

    setTimeout(() => {
      navigate("/birthday");
    }, 2400);
  }

  return (
    <main className="opening-page">
      <motion.h2
        className="opening-title"
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        Ada sesuatu buat kamuu nih...
      </motion.h2>

      <motion.div
        className={`gift-wrapper ${
          canClick ? "clickable" : ""
        }`}
        onClick={handleGiftClick}
        style={{
          position: "relative",
          cursor: "pointer",
        }}
        animate={{
          scale:
            phase === "pressed"
              ? 0.92
              : phase === "jump"
              ? 1.05
              : 1,

          y:
            phase === "pressed"
              ? 10
              : phase === "jump"
              ? -30
              : [0, -8, 0],

          rotate:
            phase === "shake"
              ? [-3, 3, -3, 3, 0]
              : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
      >
        <Gift phase={phase} />

        <FloatingHearts phase={phase} />

        <FloatingFlowers phase={phase} />

        <FloatingParticles phase={phase} />
      </motion.div>

      {showFlash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#ffffff",
            zIndex: 9999,
          }}
        />
      )}
    </main>
  );
}