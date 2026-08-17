import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import TypingText from "../components/ui/TypingText";

import {
  useMemory,
} from "../contexts/MemoryContext";

import {
  letterData,
} from "../data/letters";

import "../styles/letter.css";


/* =========================================================
   LETTER PAGE
========================================================= */

export default function Letter() {

  const navigate =
    useNavigate();


  const {
    memories,
    completeMemory,
  } = useMemory();


  const [
    activeParagraph,
    setActiveParagraph,
  ] = useState(0);


  const [
    typingStarted,
    setTypingStarted,
  ] = useState(true);


  const [
    showEmphasis,
    setShowEmphasis,
  ] = useState(false);


  const [
    showClosing,
    setShowClosing,
  ] = useState(false);


  const [
    showEnding,
    setShowEnding,
  ] = useState(false);


  const [
    showKeepButton,
    setShowKeepButton,
  ] = useState(false);


  const [
    memorySaved,
    setMemorySaved,
  ] = useState(
    memories.letter
  );


  /* =======================================================
     PARAGRAPH COMPLETE
  ======================================================= */

  function handleParagraphComplete() {

    if (
      activeParagraph <
      letterData.paragraphs.length - 1
    ) {

      setTimeout(() => {

        setTypingStarted(false);

        setActiveParagraph(
          (previous) =>
            previous + 1
        );

        setTypingStarted(true);

      }, 900);

      return;
    }


    setTimeout(() => {

      setShowEmphasis(true);

    }, 900);

  }


  /* =======================================================
     AFTER EMPHASIS
  ======================================================= */

  useEffect(() => {

    if (!showEmphasis) {
      return;
    }


    const closingTimer =
      setTimeout(() => {

        setShowClosing(true);

      }, 1400);


    const endingTimer =
      setTimeout(() => {

        setShowEnding(true);

      }, 2300);


    const buttonTimer =
      setTimeout(() => {

        setShowKeepButton(true);

      }, 3300);


    return () => {

      clearTimeout(
        closingTimer
      );

      clearTimeout(
        endingTimer
      );

      clearTimeout(
        buttonTimer
      );

    };

  }, [showEmphasis]);


  /* =======================================================
     MEMORY ALREADY COLLECTED
  ======================================================= */

  useEffect(() => {

    if (memories.letter) {

      setMemorySaved(true);

    }

  }, [memories.letter]);


  /* =======================================================
     KEEP MEMORY
  ======================================================= */

  function handleKeepMemory() {

    if (memorySaved) {

      navigate(
        "/main-menu"
      );

      return;

    }


    completeMemory(
      "letter"
    );


    setMemorySaved(true);


    setShowKeepButton(false);


    setTimeout(() => {

      navigate(
        "/main-menu"
      );

    }, 1500);

  }


  /* =======================================================
     RETURN TO MENU
  ======================================================= */

  function handleBack() {

    navigate(
      "/main-menu"
    );

  }


  return (
    <main className="letter-page">

      <div
        className="
          letter-background-glow
          letter-background-glow-one
        "
      />

      <div
        className="
          letter-background-glow
          letter-background-glow-two
        "
      />


      <div
        className="letter-stars"
        aria-hidden="true"
      >

        <span />
        <span />
        <span />
        <span />
        <span />
        <span />

      </div>


      <motion.button
        className="letter-back-button"

        onClick={handleBack}

        initial={{
          opacity: 0,
          x: -10,
        }}

        animate={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.7,
          delay: 0.3,
        }}
      >

        <span>
          ←
        </span>

        <span>
          universe
        </span>

      </motion.button>


      <section
        className="letter-content"
      >

        <motion.div
          className="letter-intro"

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
            ease: "easeOut",
          }}
        >

          <span className="letter-kicker">
            {letterData.kicker}
          </span>


          <div
            className="letter-small-ornament"
            aria-hidden="true"
          >

            <span />
            <div />
            <span />

          </div>


          <h1 className="letter-title">
            {letterData.title}
          </h1>

        </motion.div>


        <motion.article
          className="letter-paper"

          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          transition={{
            duration: 1.1,
            delay: 0.45,
            ease: "easeOut",
          }}
        >

          <div
            className="letter-paper-corner"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 100 100"
            >

              <path
                d="
                  M88 18
                  C74 10 62 14 58 25
                  C53 13 42 10 35 18
                  C27 27 36 40 48 43
                  C59 46 70 38 75 29
                  C81 35 87 36 92 31
                "
                fill="none"
              />

              <circle
                cx="58"
                cy="25"
                r="2"
              />

            </svg>

          </div>


          <p className="letter-greeting">
            {letterData.greeting}
          </p>


          <div className="letter-body">

            {letterData.paragraphs
              .slice(
                0,
                activeParagraph + 1
              )
              .map(
                (
                  paragraph,
                  index
                ) => {

                  const isCurrent =
                    index ===
                    activeParagraph;


                  return (
                    <motion.p
                      key={index}

                      initial={{
                        opacity: 0,
                        y: 8,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      transition={{
                        duration: 0.5,
                      }}
                    >

                      {isCurrent ? (

                        <TypingText
                          text={paragraph}
                          speed={32}
                          start={
                            typingStarted
                          }
                          onComplete={
                            handleParagraphComplete
                          }
                        />

                      ) : (

                        paragraph

                      )}

                    </motion.p>
                  );

                }
              )}

          </div>


          {showEmphasis && (

            <motion.div
              className="letter-emphasis"

              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
                filter:
                  "blur(5px)",
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter:
                  "blur(0px)",
              }}

              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            >

              <span className="letter-emphasis-mark">
                ✦
              </span>

              <p>
                {letterData.emphasis}
              </p>

            </motion.div>

          )}


          {showClosing && (

            <motion.div
              className="letter-closing"

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.9,
              }}
            >

              <p>
                {letterData.closing}
              </p>

              <strong>
                {letterData.signature}
              </strong>

            </motion.div>

          )}

        </motion.article>


        {showEnding && (

          <motion.div
            className="letter-ending"

            initial={{
              opacity: 0,
              y: 15,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}
          >

            <span>
              {letterData.ending}
            </span>

          </motion.div>

        )}


        {showKeepButton && (

          <motion.button
            className="letter-keep-button"

            onClick={
              handleKeepMemory
            }

            initial={{
              opacity: 0,
              y: 15,
              scale: 0.96,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}

            whileHover={{
              scale: 1.035,
            }}

            whileTap={{
              scale: 0.97,
            }}
          >

            <span>
              {memorySaved
                ? "Memory kept"
                : "Keep this memory"}
            </span>

            <span>
              {memorySaved
                ? "♥"
                : "♡"}
            </span>

          </motion.button>

        )}


        <svg
          className="letter-bottom-ornament"
          viewBox="0 0 240 60"
          aria-hidden="true"
        >

          <path
            d="
              M10 30
              C55 5 185 5 230 30
              C185 55 55 55 10 30
            "
          />

          <circle
            cx="120"
            cy="8"
            r="1.8"
          />

        </svg>

      </section>

    </main>
  );
}