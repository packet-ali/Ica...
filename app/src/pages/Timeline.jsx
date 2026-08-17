import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  useMemory,
} from "../contexts/MemoryContext";

import {
  timelineData,
} from "../data/timeline";

import "../styles/timeline.css";


/* =========================================================
   TIMELINE PAGE
   OUR LITTLE UNIVERSE
========================================================= */

export default function Timeline() {

  const navigate =
    useNavigate();


  const {
    memories,
    completeMemory,
  } = useMemory();


  /* =======================================================
     ACTIVE MEMORY
  ======================================================= */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);


  /* =======================================================
     ANIMATION DIRECTION

     1  = bergerak ke memory berikutnya
    -1  = kembali ke memory sebelumnya
  ======================================================= */

  const [
    direction,
    setDirection,
  ] = useState(1);


  /* =======================================================
     KEEP MEMORY BUTTON
  ======================================================= */

  const [
    showKeepButton,
    setShowKeepButton,
  ] = useState(false);


  /* =======================================================
     CURRENT MEMORY
  ======================================================= */

  const currentMemory =
    timelineData[activeIndex];


  const isFirstMemory =
    activeIndex === 0;


  const isLastMemory =
    activeIndex ===
    timelineData.length - 1;


  /* =======================================================
     MEMORY ALREADY COLLECTED
  ======================================================= */

  useEffect(() => {

    if (memories.timeline) {

      setShowKeepButton(true);

    }

  }, [memories.timeline]);


  /* =======================================================
     CHECK LAST MEMORY
  ======================================================= */

  useEffect(() => {

    if (!isLastMemory) {

      setShowKeepButton(false);

      return;

    }


    /*
      Jika user sudah pernah menyelesaikan
      Timeline sebelumnya, langsung tampilkan
      tombol Memory kept.

      Jika belum, tombol muncul setelah
      sedikit jeda agar transisi terakhir
      selesai terlebih dahulu.
    */

    if (memories.timeline) {

      setShowKeepButton(true);

      return;

    }


    const timer =
      setTimeout(() => {

        setShowKeepButton(true);

      }, 900);


    return () => {

      clearTimeout(timer);

    };

  }, [
    activeIndex,
    isLastMemory,
    memories.timeline,
  ]);


  /* =======================================================
     NAVIGATE MEMORY
  ======================================================= */

  function changeMemory(
    nextIndex,
    nextDirection
  ) {

    if (
      nextIndex < 0 ||
      nextIndex >= timelineData.length
    ) {
      return;
    }


    setDirection(
      nextDirection
    );


    setShowKeepButton(false);


    setActiveIndex(
      nextIndex
    );

  }


  /* =======================================================
     NEXT MEMORY
  ======================================================= */

  function handleNext() {

    if (isLastMemory) {
      return;
    }


    changeMemory(
      activeIndex + 1,
      1
    );

  }


  /* =======================================================
     PREVIOUS MEMORY
  ======================================================= */

  function handlePrevious() {

    if (isFirstMemory) {
      return;
    }


    changeMemory(
      activeIndex - 1,
      -1
    );

  }


  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {

    function handleKeyDown(
      event
    ) {

      if (
        event.key ===
        "ArrowDown"
      ) {

        handleNext();

      }


      if (
        event.key ===
        "ArrowUp"
      ) {

        handlePrevious();

      }

    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  });


  /* =======================================================
     KEEP MEMORY
  ======================================================= */

  function handleKeepMemory() {

    if (
      memories.timeline
    ) {

      navigate(
        "/main-menu"
      );

      return;

    }


    completeMemory(
      "timeline"
    );


    setShowKeepButton(
      false
    );


    setTimeout(() => {

      navigate(
        "/main-menu"
      );

    }, 1200);

  }


  /* =======================================================
     BACK TO MENU
  ======================================================= */

  function handleBack() {

    navigate(
      "/main-menu"
    );

  }


  /* =========================================================
   ANIMATION VARIANTS

   ↓ NEXT:
   Foto lama naik ke atas
   Foto baru masuk dari bawah

   ↑ PREVIOUS:
   Foto lama turun ke bawah
   Foto baru masuk dari atas
========================================================= */

const reelVariants = {
  enter: (animationDirection) => ({
    y:
      animationDirection > 0
        ? "105%"
        : "-105%",

    opacity: 0,

    scale: 0.94,

    rotateX:
      animationDirection > 0
        ? -8
        : 8,

    filter:
      "blur(8px)",
  }),

  center: {
    y: 0,

    opacity: 1,

    scale: 1,

    rotateX: 0,

    filter:
      "blur(0px)",
  },

  exit: (animationDirection) => ({
    y:
      animationDirection > 0
        ? "-105%"
        : "105%",

    opacity: 0,

    scale: 0.94,

    rotateX:
      animationDirection > 0
        ? 8
        : -8,

    filter:
      "blur(8px)",
  }),
};

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="timeline-page">


      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          timeline-background-glow
          timeline-background-glow-one
        "
      />

      <div
        className="
          timeline-background-glow
          timeline-background-glow-two
        "
      />


      {/* =================================================
          BACKGROUND STARS
      ================================================= */}

      <div
        className="timeline-stars"
        aria-hidden="true"
      >

        <span />
        <span />
        <span />
        <span />
        <span />
        <span />

      </div>


      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <motion.button
        className="timeline-back-button"

        onClick={
          handleBack
        }

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
          delay: 0.25,
        }}
      >

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >

          <path
            d="
              M15 5
              L8 12
              L15 19
            "
          />

        </svg>

        <span>
          universe
        </span>

      </motion.button>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section
        className="timeline-content"
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          className="timeline-header"

          initial={{
            opacity: 0,
            y: -18,
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

          <span
            className="timeline-kicker"
          >
            our story
          </span>


          <h1
            className="timeline-title"
          >
            Little
            <br />
            <span>
              Moments
            </span>
          </h1>


          <div
            className="timeline-divider"
          />

        </motion.header>


        {/* =================================================
            MEMORY COUNTER
        ================================================= */}

        <motion.div
          className="
            timeline-memory-counter
          "

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
        >

          <span>
            {String(
              activeIndex + 1
            ).padStart(2, "0")}
          </span>

          <span className="counter-line">
            /
          </span>

          <span>
            {String(
              timelineData.length
            ).padStart(2, "0")}
          </span>

        </motion.div>


        {/* =================================================
            REEL
        ================================================= */}

        <div
          className="timeline-reel"
        >


          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}

          <motion.button
            className="
              timeline-navigation
              timeline-navigation-up
            "

            onClick={
              handlePrevious
            }

            disabled={
              isFirstMemory
            }

            aria-label="
              Previous memory
            "

            whileHover={
              !isFirstMemory
                ? {
                    scale: 1.08,
                  }
                : undefined
            }

            whileTap={
              !isFirstMemory
                ? {
                    scale: 0.94,
                  }
                : undefined
            }
          >

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path
                d="
                  M6 14
                  L12 8
                  L18 14
                "
              />

            </svg>

          </motion.button>


          {/* =================================================
              MEMORY STAGE
          ================================================= */}

          <div
            className="
              timeline-stage
            "
          >

            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
            >

              <motion.article
                key={activeIndex}
                className="
                  timeline-memory
                "

                custom={direction}

                variants={
                  reelVariants
                }

                initial="enter"

                animate="center"

                exit="exit"

                transition={{
                  y: {
                    duration: 0.75,
                    ease: [
                      0.22,
                      0.61,
                      0.36,
                      1,
                    ],
                  },

                  opacity: {
                    duration: 0.45,
                  },

                  scale: {
                    duration: 0.75,
                    ease: "easeOut",
                  },

                  rotateX: {
                    duration: 0.75,
                    ease: "easeOut",
                  },

                  filter: {
                    duration: 0.55,
                  },
                }}
              >


                {/* =================================================
                    DATE
                ================================================= */}

                <div
                  className="
                    timeline-date
                  "
                >

                  <span>
                    {
                      currentMemory.day
                    }
                  </span>

                  <span
                    className="
                      timeline-date-separator
                    "
                  >
                    ·
                  </span>

                  <span>
                    {
                      currentMemory.month
                    }
                  </span>

                  <span
                    className="
                      timeline-date-separator
                    "
                  >
                    ·
                  </span>

                  <span>
                    {
                      currentMemory.year
                    }
                  </span>

                </div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <h2
                  className="
                    timeline-memory-title
                  "
                >
                  {
                    currentMemory.title
                  }
                </h2>


                {/* =================================================
                    PHOTO
                ================================================= */}

                <div
                  className="
                    timeline-photo-frame
                  "
                >

                  <div
                    className="
                      timeline-photo
                    "
                  >

                    <img
                      src={
                        currentMemory.image
                      }
                      alt={
                        currentMemory.title
                      }
                    />

                  </div>

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    timeline-description
                  "
                >
                  {
                    currentMemory.description
                  }
                </p>


                {/* =================================================
                    MEMORY DOT
                ================================================= */}

                <div
                  className="
                    timeline-memory-dot
                  "
                  aria-hidden="true"
                >

                  <span />

                </div>

              </motion.article>

            </AnimatePresence>

          </div>


          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <motion.button
            className="
              timeline-navigation
              timeline-navigation-down
            "

            onClick={
              handleNext
            }

            disabled={
              isLastMemory
            }

            aria-label="
              Next memory
            "

            whileHover={
              !isLastMemory
                ? {
                    scale: 1.08,
                  }
                : undefined
            }

            whileTap={
              !isLastMemory
                ? {
                    scale: 0.94,
                  }
                : undefined
            }
          >

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path
                d="
                  M6 10
                  L12 16
                  L18 10
                "
              />

            </svg>

          </motion.button>


        </div>


        {/* =================================================
            DOT INDICATORS
        ================================================= */}

        <div
          className="
            timeline-indicators
          "
          aria-label="
            Timeline progress
          "
        >

          {timelineData.map(
            (
              _memory,
              index
            ) => (

              <button
                key={index}

                className={`
                  timeline-indicator
                  ${
                    index ===
                    activeIndex
                      ? "active"
                      : ""
                  }
                `}

                onClick={() => {

                  if (
                    index ===
                    activeIndex
                  ) {
                    return;
                  }


                  setDirection(
                    index >
                      activeIndex
                      ? 1
                      : -1
                  );


                  setShowKeepButton(
                    false
                  );


                  setActiveIndex(
                    index
                  );

                }}

                aria-label={`
                  Go to memory ${
                    index + 1
                  }
                `}
              >

                <span />

              </button>

            )
          )}

        </div>


        {/* =================================================
            LAST MEMORY MESSAGE
        ================================================= */}

        {isLastMemory && (

          <motion.div
            className="
              timeline-ending
            "

            initial={{
              opacity: 0,
              y: 12,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.9,
              delay: 0.35,
            }}
          >

            <span>
              you've reached the end
              of this little story.
            </span>

          </motion.div>

        )}


        {/* =================================================
            KEEP MEMORY
        ================================================= */}

        {showKeepButton && (

          <motion.button
            className="
              timeline-keep-button
            "

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
              {
                memories.timeline
                  ? "Memory kept"
                  : "Keep this memory"
              }
            </span>

            <span>
              {
                memories.timeline
                  ? "♥"
                  : "♡"
              }
            </span>

          </motion.button>

        )}


        {/* =================================================
            BOTTOM ORNAMENT
        ================================================= */}

        <svg
          className="
            timeline-bottom-ornament
          "
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