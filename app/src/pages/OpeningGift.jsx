import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Gift from "../components/illustrations/Gift/Gift";

import FloatingHearts from "../components/effects/FloatingHearts";
import FloatingFlowers from "../components/effects/FloatingFlowers";
import FloatingParticles from "../components/effects/FloatingParticles";

export default function OpeningGift() {
  const navigate = useNavigate();

  const giftRef = useRef(null);

  const [canClick, setCanClick] = useState(false);
  const [phase, setPhase] = useState("idle");

  const [showFlash, setShowFlash] = useState(false);

  const [lightOrigin, setLightOrigin] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /*
    ==========================================
    MENGAMBIL POSISI UJUNG ATAS BOX
    ==========================================

    SVG:
    viewBox = 0 0 320 320

    Box:
    x = 70
    y = 110
    width = 180

    Titik cahaya:
    x = 160
    y = 110

    Jadi cahaya dimulai tepat dari
    tengah ujung atas badan box.
  */

  function updateLightOrigin() {
    if (!giftRef.current) return;

    const rect =
      giftRef.current.getBoundingClientRect();

    const scaleX = rect.width / 320;
    const scaleY = rect.height / 320;

    const originX =
      rect.left + 160 * scaleX;

    const originY =
      rect.top + 110 * scaleY;

    setLightOrigin({
      x: originX,
      y: originY,
    });
  }

  /*
    Hitung posisi awal ketika halaman
    pertama kali siap.
  */

  useEffect(() => {
    updateLightOrigin();

    window.addEventListener(
      "resize",
      updateLightOrigin
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateLightOrigin
      );
    };
  }, []);

  function handleGiftClick() {
    if (!canClick || phase !== "idle") return;

    /*
      Hitung ulang posisi tepat sebelum
      animasi dimulai.
    */
    updateLightOrigin();

    /*
      =========================
      PRESSED
      =========================
    */

    setPhase("pressed");

    /*
      =========================
      SHAKE
      =========================
    */

    setTimeout(() => {
      setPhase("shake");
    }, 200);

    /*
      =========================
      JUMP
      =========================
    */

    setTimeout(() => {
      setPhase("jump");
    }, 800);

    /*
      =========================
      OPEN
      =========================
    */

    setTimeout(() => {
      setPhase("open");
    }, 1100);

    /*
      =========================
      EXPLOSION
      =========================
    */

    setTimeout(() => {
      setPhase("explode");
    }, 1400);

    /*
      =========================
      GLOBAL LIGHT
      =========================
    */

    setTimeout(() => {
      /*
        Ambil posisi lagi karena
        kado sudah berpindah ke atas
        akibat animasi jump.
      */
      updateLightOrigin();

      setShowFlash(true);
    }, 1500);

    /*
      =========================
      FLASH
      =========================
    */

    setTimeout(() => {
      setPhase("flash");
    }, 4300);

    /*
      =========================
      BIRTHDAY
      =========================
    */

    setTimeout(() => {
      navigate("/birthday");
    }, 4800);
  }

  return (
    <main className="opening-page">

      {/* =========================
          TITLE
      ========================== */}

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


      {/* =========================
          GIFT
      ========================== */}

      <motion.div
        ref={giftRef}
        className={`gift-wrapper ${
          canClick ? "clickable" : ""
        }`}
        onClick={handleGiftClick}
        style={{
          position: "relative",
          cursor: canClick
            ? "pointer"
            : "default",
          zIndex: 10,
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

        <FloatingHearts
          phase={phase}
        />

        <FloatingFlowers
          phase={phase}
        />

        <FloatingParticles
          phase={phase}
        />
      </motion.div>


      {/* =========================
          GLOBAL LIGHT
      ========================== */}

      {showFlash && (
        <motion.div
          initial={{
            scale: 0.015,
            opacity: 0.04,
          }}
          animate={{
            scale: [
              0.015,
              0.06,
              0.16,
              0.35,
              0.7,
              1.3,
              2.2,
              3.5,
              5.5,
              8,
            ],

            opacity: [
              0.04,
              0.08,
              0.14,
              0.1,
              0.2,
              0.15,
              0.3,
              0.45,
              0.7,
              1,
            ],
          }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
          }}
          style={{
            position: "fixed",

            /*
              INI YANG PALING PENTING.

              Cahaya ditempatkan langsung
              pada koordinat ujung atas box.
            */
            left: `${lightOrigin.x}px`,
            top: `${lightOrigin.y}px`,

            width: "32vmax",
            height: "32vmax",

            transform:
              "translate(-50%, -50%)",

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 42%, rgba(255,255,255,0.65) 68%, rgba(255,255,255,0) 100%)",

            filter: "blur(4px)",

            pointerEvents: "none",

            zIndex: 9999,
          }}
        />
      )}
    </main>
  );
}