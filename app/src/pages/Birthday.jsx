import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import TypingText from "../components/ui/TypingText";

import "../styles/birthday.css";


/* =========================================================
   BIRTHDAY LETTER
========================================================= */

const birthdayParagraphs = [
  "Ada banyak hal yang ingin aku ceritakan tentang hari ini, tentang kamu, dan tentang betapa bersyukurnya aku karena bisa mengenalmu.",

  "Tapi untuk sekarang, aku cuma ingin kamu tahu satu hal.",

  "Semoga di umur yang baru ini, kamu selalu menemukan alasan untuk tersenyum, menemukan keberanian untuk mengejar apa yang kamu inginkan, dan selalu dikelilingi oleh hal-hal baik.",

  "Aku mungkin tidak selalu tahu cara terbaik untuk mengungkapkannya, tapi aku benar-benar senang bisa menjadi bagian kecil dari perjalananmu."
];


const birthdayEmphasis =
  "Terima kasih sudah hadir dan membuat dunia terasa sedikit lebih indah.";


/* =========================================================
   TYPING SETTINGS
========================================================= */

const typingSpeed = 35;

const paragraphDelay = 900;

const emphasisDelay = 1000;


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Birthday() {

  const navigate = useNavigate();

  const [activeParagraph, setActiveParagraph] =
    useState(0);

  const [typingStarted, setTypingStarted] =
    useState(true);

  const [showEmphasis, setShowEmphasis] =
    useState(false);

  const [showMoreMessage, setShowMoreMessage] =
    useState(false);

  const [showContinueButton, setShowContinueButton] =
    useState(false);


  /* =======================================================
     PARAGRAPH SEQUENCE
  ======================================================= */

  useEffect(() => {

    setTypingStarted(true);

  }, [activeParagraph]);


  /* =======================================================
     AFTER FINAL EMPHASIS
  ======================================================= */

  useEffect(() => {

    if (!showEmphasis) return;


    const moreMessageTimer = setTimeout(() => {

      setShowMoreMessage(true);

    }, 1700);


    const buttonTimer = setTimeout(() => {

      setShowContinueButton(true);

    }, 2700);


    return () => {

      clearTimeout(moreMessageTimer);
      clearTimeout(buttonTimer);

    };

  }, [showEmphasis]);


  /* =======================================================
     PARAGRAPH COMPLETE
  ======================================================= */

  function handleParagraphComplete() {

    if (
      activeParagraph <
      birthdayParagraphs.length - 1
    ) {

      setTimeout(() => {

        setTypingStarted(false);

        setActiveParagraph(
          (previous) => previous + 1
        );

      }, paragraphDelay);

      return;
    }


    setTimeout(() => {

      setShowEmphasis(true);

    }, emphasisDelay);
  }


  /* =======================================================
     CONTINUE
  ======================================================= */

  function handleContinue() {

    navigate("/main-menu");

  }


  return (
    <main className="birthday-page">


      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="birthday-background-glow birthday-background-glow-one"
        aria-hidden="true"
      />

      <div
        className="birthday-background-glow birthday-background-glow-two"
        aria-hidden="true"
      />


      <svg
        className="birthday-stars"
        viewBox="0 0 1000 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >

        <circle cx="110" cy="150" r="1.8" />
        <circle cx="180" cy="310" r="1.2" />
        <circle cx="850" cy="170" r="1.6" />
        <circle cx="780" cy="350" r="1.1" />
        <circle cx="90" cy="620" r="1.3" />
        <circle cx="900" cy="610" r="1.8" />
        <circle cx="240" cy="760" r="1.1" />
        <circle cx="720" cy="770" r="1.3" />

      </svg>


      {/* =================================================
          CONTENT
      ================================================= */}

      <motion.section
        className="birthday-content"

        initial={{
          opacity: 0,
          y: 28
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 1.2,
          ease: "easeOut"
        }}
      >


        {/* =================================================
            PHOTO
        ================================================= */}

        <motion.div
          className="birthday-photo-area"

          initial={{
            opacity: 0,
            scale: 0.92
          }}

          animate={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: "easeOut"
          }}
        >

          <div
            className="birthday-photo-halo"
            aria-hidden="true"
          />


          <svg
            className="birthday-orbit"
            viewBox="0 0 360 300"
            aria-hidden="true"
          >

            <ellipse
              cx="180"
              cy="150"
              rx="155"
              ry="112"
              fill="none"
            />

            <circle
              cx="55"
              cy="94"
              r="2.4"
            />

            <circle
              cx="298"
              cy="206"
              r="1.8"
            />

          </svg>


          <svg
            className="birthday-sparkles"
            viewBox="0 0 360 300"
            aria-hidden="true"
          >

            <path
              d="M62 72 L65 80 L73 83 L65 86 L62 94 L59 86 L51 83 L59 80 Z"
            />

            <path
              d="M298 78 L300 84 L306 86 L300 88 L298 94 L296 88 L290 86 L296 84 Z"
            />

            <path
              d="M78 214 L80 220 L86 222 L80 224 L78 230 L76 224 L70 222 L76 220 Z"
            />

          </svg>


          <div className="birthday-photo-frame">

            <div className="birthday-photo">

              <img
                src="/images/birthday/baby-photo.png"
                alt="Foto masa kecil"
                className="birthday-photo-image"
              />

            </div>

          </div>


          <svg
            className="birthday-flower"
            viewBox="0 0 80 80"
            aria-hidden="true"
          >

            <g>

              <ellipse
                cx="40"
                cy="25"
                rx="9"
                ry="16"
              />

              <ellipse
                cx="55"
                cy="40"
                rx="16"
                ry="9"
              />

              <ellipse
                cx="40"
                cy="55"
                rx="9"
                ry="16"
              />

              <ellipse
                cx="25"
                cy="40"
                rx="16"
                ry="9"
              />

              <circle
                cx="40"
                cy="40"
                r="6"
              />

            </g>

          </svg>

        </motion.div>


        {/* =================================================
            KICKER
        ================================================= */}

        <motion.p
          className="birthday-kicker"

          initial={{
            opacity: 0,
            y: 8
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8,
            delay: 0.9
          }}
        >
          today is about you
        </motion.p>


        {/* =================================================
            TITLE
        ================================================= */}

        <motion.h1
          className="birthday-title"

          initial={{
            opacity: 0,
            y: 14
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1,
            delay: 1.05,
            ease: "easeOut"
          }}
        >

          happiest birthday,

          <br />

          <span>
            babyyy!
          </span>

        </motion.h1>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <motion.div
          className="birthday-divider"

          initial={{
            width: 0,
            opacity: 0
          }}

          animate={{
            width: 68,
            opacity: 1
          }}

          transition={{
            duration: 0.8,
            delay: 1.45,
            ease: "easeOut"
          }}
        />


        {/* =================================================
            LETTER
        ================================================= */}

        <article className="birthday-letter">

          {birthdayParagraphs
            .slice(0, activeParagraph + 1)
            .map((paragraph, index) => {

              const isCurrent =
                index === activeParagraph;

              return (
                <motion.p
                  key={index}
                  className="birthday-paragraph"

                  initial={{
                    opacity: 0
                  }}

                  animate={{
                    opacity: 1
                  }}

                  transition={{
                    duration: 0.5
                  }}
                >

                  {isCurrent ? (

                    <TypingText
                      text={paragraph}
                      speed={typingSpeed}
                      start={typingStarted}
                      onComplete={
                        handleParagraphComplete
                      }
                    />

                  ) : (

                    paragraph

                  )}

                </motion.p>
              );

            })}


          {/* =================================================
              FINAL EMPHASIS
          ================================================= */}

          {showEmphasis && (

            <motion.p
              className="birthday-letter-emphasis"

              initial={{
                opacity: 0,
                y: 18,
                scale: 0.98
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              transition={{
                duration: 1.2,
                ease: "easeOut"
              }}
            >
              {birthdayEmphasis}
            </motion.p>

          )}


          {/* =================================================
              THERE'S STILL MORE
          ================================================= */}

          {showMoreMessage && (

            <motion.p
              className="birthday-more-message"

              initial={{
                opacity: 0,
                y: 12
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 1.1,
                ease: "easeOut"
              }}
            >
              There's still more...
            </motion.p>

          )}


          {/* =================================================
              CONTINUE BUTTON
          ================================================= */}

          {showContinueButton && (

            <motion.button
              className="birthday-continue-button"

              onClick={handleContinue}

              initial={{
                opacity: 0,
                y: 12,
                scale: 0.96
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              transition={{
                duration: 0.9,
                ease: "easeOut"
              }}

              whileHover={{
                scale: 1.035
              }}

              whileTap={{
                scale: 0.97
              }}
            >

              <span>
                Continue the journey
              </span>

              <span
                className="birthday-continue-arrow"
                aria-hidden="true"
              >
                →
              </span>

            </motion.button>

          )}

        </article>


        {/* =================================================
            BOTTOM ORBIT
        ================================================= */}

        <svg
          className="birthday-bottom-orbit"
          viewBox="0 0 240 60"
          aria-hidden="true"
        >

          <path
            d="M10 30 C55 5, 185 5, 230 30 C185 55, 55 55, 10 30 Z"
            fill="none"
          />

          <circle
            cx="120"
            cy="8"
            r="1.8"
          />

        </svg>

      </motion.section>

    </main>
  );
}