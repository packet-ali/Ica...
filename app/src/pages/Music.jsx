import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  musicData,
} from "../data/music";

import {
  useMemory,
} from "../contexts/MemoryContext";

import "../styles/music.css";


/* =========================================================
   MUSIC PAGE
   OUR LITTLE UNIVERSE
========================================================= */

export default function Music() {

  const navigate =
    useNavigate();


  const {
    completeMemory,
    memories,
  } = useMemory();


  /* =======================================================
     AUDIO
  ======================================================= */

  const audioRef =
    useRef(null);


  /* =======================================================
     END SECTION REF
  ======================================================= */

  const endingRef =
    useRef(null);


  /* =======================================================
     ACTIVE SONG
  ======================================================= */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);


  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);


  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);


  const [
    duration,
    setDuration,
  ] = useState(0);


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  /* =======================================================
     CURRENT SONG
  ======================================================= */

  const currentSong =
    musicData[activeIndex];


  const isFirstSong =
    activeIndex === 0;


  const isLastSong =
    activeIndex ===
    musicData.length - 1;


  /* =======================================================
     CHANGE SONG
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    audio.pause();

    audio.currentTime = 0;

    setCurrentTime(0);

    setDuration(0);

    setIsPlaying(false);

    setIsLoading(true);

  }, [activeIndex]);


  /* =======================================================
     AUDIO EVENTS
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    function handleLoadedMetadata() {

      setDuration(
        audio.duration || 0
      );

      setIsLoading(false);
    }


    function handleTimeUpdate() {

      setCurrentTime(
        audio.currentTime
      );
    }


    function handleEnded() {

      setIsPlaying(false);


      /*
        Jika masih ada lagu berikutnya,
        otomatis pindah ke lagu berikutnya.
      */

      if (!isLastSong) {

        setActiveIndex(
          (prev) => prev + 1
        );

      }

    }


    function handleWaiting() {

      setIsLoading(true);
    }


    function handleCanPlay() {

      setIsLoading(false);
    }


    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "waiting",
      handleWaiting
    );

    audio.addEventListener(
      "canplay",
      handleCanPlay
    );


    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "waiting",
        handleWaiting
      );

      audio.removeEventListener(
        "canplay",
        handleCanPlay
      );

    };

  }, [
    activeIndex,
    isLastSong,
  ]);


  /* =======================================================
     DETECT MUSIC ENDING
  ======================================================= */

  useEffect(() => {

    const endingElement =
      endingRef.current;

    if (!endingElement) {
      return;
    }


    /*
      Observer digunakan supaya Music baru
      dianggap selesai ketika bagian paling akhir
      benar-benar terlihat di layar.
    */

    const observer =
      new IntersectionObserver(
        (
          entries
        ) => {

          const entry =
            entries[0];


          if (
            entry.isIntersecting
          ) {

            completeMemory(
              "music"
            );

          }

        },
        {
          threshold: 0.6,
        }
      );


    observer.observe(
      endingElement
    );


    return () => {

      observer.disconnect();

    };

  }, [
    completeMemory,
  ]);


  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  async function togglePlay() {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    if (audio.paused) {

      try {

        await audio.play();

        setIsPlaying(true);

      } catch (error) {

        console.error(
          "Audio gagal diputar:",
          error
        );

        setIsPlaying(false);
      }

    } else {

      audio.pause();

      setIsPlaying(false);

    }

  }


  /* =======================================================
     NEXT SONG
  ======================================================= */

  function handleNext() {

    if (isLastSong) {
      return;
    }


    setActiveIndex(
      (prev) => prev + 1
    );

  }


  /* =======================================================
     PREVIOUS SONG
  ======================================================= */

  function handlePrevious() {

    if (isFirstSong) {
      return;
    }


    setActiveIndex(
      (prev) => prev - 1
    );

  }


  /* =======================================================
     PROGRESS
  ======================================================= */

  function handleProgressChange(
    event
  ) {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    const newTime =
      Number(
        event.target.value
      );


    audio.currentTime =
      newTime;


    setCurrentTime(
      newTime
    );

  }


  /* =======================================================
     FORMAT TIME
  ======================================================= */

  function formatTime(
    time
  ) {

    if (
      !Number.isFinite(time)
    ) {

      return "00:00";

    }


    const minutes =
      Math.floor(
        time / 60
      );


    const seconds =
      Math.floor(
        time % 60
      );


    return `${String(
      minutes
    ).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

  }


  /* =======================================================
     BACK
  ======================================================= */

  function handleBack() {

    navigate(
      "/main-menu"
    );

  }


  /* =======================================================
     CONTINUE
  ======================================================= */

  function handleContinue() {

    navigate(
      "/gifts"
    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main
      className="music-page"
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          music-background-glow
          music-background-glow-one
        "
      />

      <div
        className="
          music-background-glow
          music-background-glow-two
        "
      />


      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <motion.button

        className="
          music-back-button
        "

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
          MAIN CONTENT
      ================================================= */}

      <section
        className="
          music-content
        "
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header

          className="
            music-header
          "

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
            className="
              music-kicker
            "
          >
            our soundtrack
          </span>


          <h1
            className="
              music-title
            "
          >

            Songs That

            <br />

            <span>
              Feel Like Us
            </span>

          </h1>


          <div
            className="
              music-divider
            "
          />

        </motion.header>


        {/* =================================================
            COUNTER
        ================================================= */}

        <motion.div

          className="
            music-counter
          "

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
            delay: 0.35,
          }}

        >

          <span>
            {String(
              activeIndex + 1
            ).padStart(2, "0")}
          </span>

          <span>
            /
          </span>

          <span>
            {String(
              musicData.length
            ).padStart(2, "0")}
          </span>

        </motion.div>


        {/* =================================================
            MUSIC PLAYER
        ================================================= */}

        <motion.section

          className="
            music-player
          "

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.45,
          }}

        >


          {/* =================================================
              COVER
          ================================================= */}

          <div
            className="
              music-cover-frame
            "
          >

            <img

              className="
                music-cover
              "

              src={
                currentSong.cover
              }

              alt={
                `${currentSong.title} artwork`
              }

            />

          </div>


          {/* =================================================
              SONG INFORMATION
          ================================================= */}

          <div
            className="
              music-song-info
            "
          >

            <h2>
              {
                currentSong.title
              }
            </h2>

            <p>
              {
                currentSong.artist
              }
            </p>

          </div>


          {/* =================================================
              AUDIO
          ================================================= */}

          <audio
            ref={audioRef}
            src={currentSong.audio}
            preload="metadata"
          />


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div
            className="
              music-progress-container
            "
          >

            <input

              className="
                music-progress
              "

              type="range"

              min="0"

              max={
                duration || 0
              }

              step="0.01"

              value={
                Math.min(
                  currentTime,
                  duration || 0
                )
              }

              onChange={
                handleProgressChange
              }

              style={{
                "--progress":
                  duration
                    ? `${(
                        currentTime /
                        duration
                      ) * 100}%`
                    : "0%",
              }}

              aria-label="
                Song progress
              "

            />


            <div
              className="
                music-time
              "
            >

              <span>
                {
                  formatTime(
                    currentTime
                  )
                }
              </span>

              <span>
                {
                  formatTime(
                    duration
                  )
                }
              </span>

            </div>

          </div>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div
            className="
              music-controls
            "
          >


            {/* PREVIOUS */}

            <motion.button

              className="
                music-control
                music-control-side
              "

              onClick={
                handlePrevious
              }

              disabled={
                isFirstSong
              }

              whileHover={
                !isFirstSong
                  ? {
                      scale: 1.08,
                    }
                  : undefined
              }

              whileTap={
                !isFirstSong
                  ? {
                      scale: 0.94,
                    }
                  : undefined
              }

              aria-label="
                Previous song
              "

            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="
                    M6 6
                    L6 18
                  "
                />

                <path
                  d="
                    M18 6
                    L10 12
                    L18 18
                    Z
                  "
                />

              </svg>

            </motion.button>


            {/* PLAY / PAUSE */}

            <motion.button

              className="
                music-control
                music-control-main
              "

              onClick={
                togglePlay
              }

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.94,
              }}

              aria-label={
                isPlaying
                  ? "Pause"
                  : "Play"
              }

            >

              {isPlaying ? (

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <rect
                    x="7"
                    y="6"
                    width="3"
                    height="12"
                    rx="1"
                   const navigate =
    useNavigate();


  /* =======================================================
     MEMORY
  ======================================================= */

  const {
    completeMemory,
  } = useMemory();


  /* =======================================================
     AUDIO
  ======================================================= */

  const audioRef =
    useRef(null);


  /* =======================================================
     ACTIVE SONG
  ======================================================= */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);


  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);


  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);


  const [
    duration,
    setDuration,
  ] = useState(0);


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  /* =======================================================
     CURRENT SONG
  ======================================================= */

  const currentSong =
    musicData[activeIndex];


  const isFirstSong =
    activeIndex === 0;


  const isLastSong =
    activeIndex ===
    musicData.length - 1;


  /* =======================================================
     COMPLETE MUSIC MEMORY
  ======================================================= */

  useEffect(() => {

    completeMemory("music");

  }, [completeMemory]);


  /* =======================================================
     CHANGE SONG
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    audio.pause();

    audio.currentTime = 0;


    setCurrentTime(0);

    setDuration(0);

    setIsPlaying(false);

    setIsLoading(true);

  }, [activeIndex]);


  /* =======================================================
     AUDIO EVENTS
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    function handleLoadedMetadata() {

      setDuration(
        audio.duration || 0
      );

      setIsLoading(false);
    }


    function handleTimeUpdate() {

      setCurrentTime(
        audio.currentTime
      );
    }


    function handleEnded() {

      setIsPlaying(false);


      /*
        Otomatis lanjut ke lagu berikutnya
        kalau masih tersedia.
      */

      if (!isLastSong) {

        setActiveIndex(
          (prev) => prev + 1
        );

      }

    }


    function handleWaiting() {

      setIsLoading(true);
    }


    function handleCanPlay() {

      setIsLoading(false);
    }


    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "waiting",
      handleWaiting
    );

    audio.addEventListener(
      "canplay",
      handleCanPlay
    );


    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "waiting",
        handleWaiting
      );

      audio.removeEventListener(
        "canplay",
        handleCanPlay
      );

    };

  }, [
    activeIndex,
    isLastSong,
  ]);


  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  async function togglePlay() {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    if (audio.paused) {

      try {

        await audio.play();

        setIsPlaying(true);

      } catch (error) {

        console.error(
          "Audio gagal diputar:",
          error
        );

        setIsPlaying(false);

      }

    } else {

      audio.pause();

      setIsPlaying(false);

    }

  }


  /* =======================================================
     NEXT SONG
  ======================================================= */

  function handleNext() {

    if (isLastSong) {
      return;
    }


    setActiveIndex(
      (prev) => prev + 1
    );

  }


  /* =======================================================
     PREVIOUS SONG
  ======================================================= */

  function handlePrevious() {

    if (isFirstSong) {
      return;
    }


    setActiveIndex(
      (prev) => prev - 1
    );

  }


  /* =======================================================
     PROGRESS
  ======================================================= */

  function handleProgressChange(
    event
  ) {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    const newTime =
      Number(
        event.target.value
      );


    audio.currentTime =
      newTime;


    setCurrentTime(
      newTime
    );

  }


  /* =======================================================
     FORMAT TIME
  ======================================================= */

  function formatTime(
    time
  ) {

    if (
      !Number.isFinite(time)
    ) {

      return "00:00";

    }


    const minutes =
      Math.floor(
        time / 60
      );


    const seconds =
      Math.floor(
        time % 60
      );


    return `${String(
      minutes
    ).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

  }


  /* =======================================================
     BACK
  ======================================================= */

  function handleBack() {

    navigate(
      "/main-menu"
    );

  }


  /* =======================================================
     KEEP MEMORIES
  ======================================================= */

  function handleKeepMemories() {

    navigate(
      "/main-menu"
    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main
      className="music-page"
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          music-background-glow
          music-background-glow-one
        "
      />

      <div
        className="
          music-background-glow
          music-background-glow-two
        "
      />


      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <motion.button

        className="
          music-back-button
        "

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
          MAIN CONTENT
      ================================================= */}

      <section
        className="
          music-content
        "
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header

          className="
            music-header
          "

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
            className="
              music-kicker
            "
          >
            our soundtrack
          </span>


          <h1
            className="
              music-title
            "
          >

            Songs That

            <br />

            <span>
              Feel Like Us
            </span>

          </h1>


          <div
            className="
              music-divider
            "
          />

        </motion.header>


        {/* =================================================
            COUNTER
        ================================================= */}

        <motion.div

          className="
            music-counter
          "

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
            delay: 0.35,
          }}

        >

          <span>
            {String(
              activeIndex + 1
            ).padStart(2, "0")}
          </span>

          <span>
            /
          </span>

          <span>
            {String(
              musicData.length
            ).padStart(2, "0")}
          </span>

        </motion.div>


        {/* =================================================
            MUSIC PLAYER
        ================================================= */}

        <motion.section

          className="
            music-player
          "

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.45,
          }}

        >


          {/* =================================================
              COVER
          ================================================= */}

          <div
            className="
              music-cover-frame
            "
          >

            <img
              className="
                music-cover
              "

              src={
                currentSong.cover
              }

              alt={
                `${currentSong.title} artwork`
              }

            />

          </div>


          {/* =================================================
              SONG INFORMATION
          ================================================= */}

          <div
            className="
              music-song-info
            "
          >

            <h2>
              {
                currentSong.title
              }
            </h2>

            <p>
              {
                currentSong.artist
              }
            </p>

          </div>


          {/* =================================================
              AUDIO
          ================================================= */}

          <audio
            ref={audioRef}
            src={currentSong.audio}
            preload="metadata"
          />


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div
            className="
              music-progress-container
            "
          >

            <input

              className="
                music-progress
              "

              type="range"

              min="0"

              max={
                duration || 0
              }

              step="0.01"

              value={
                Math.min(
                  currentTime,
                  duration || 0
                )
              }

              onChange={
                handleProgressChange
              }

              style={{
                "--progress":
                  duration
                    ? `${(
                        currentTime /
                        duration
                      ) * 100}%`
                    : "0%",
              }}

              aria-label="
                Song progress
              "

            />


            <div
              className="
                music-time
              "
            >

              <span>
                {
                  formatTime(
                    currentTime
                  )
                }
              </span>

              <span>
                {
                  formatTime(
                    duration
                  )
                }
              </span>

            </div>

          </div>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div
            className="
              music-controls
            "
          >


            {/* PREVIOUS */}

            <motion.button

              className="
                music-control
                music-control-side
              "

              onClick={
                handlePrevious
              }

              disabled={
                isFirstSong
              }

              whileHover={
                !isFirstSong
                  ? {
                      scale: 1.08,
                    }
                  : undefined
              }

              whileTap={
                !isFirstSong
                  ? {
                      scale: 0.94,
                    }
                  : undefined
              }

              aria-label="
                Previous song
              "

            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="
                    M6 6
                    L6 18
                  "
                />

                <path
                  d="
                    M18 6
                    L10 12
                    L18 18
                    Z
                  "
                />

              </svg>

            </motion.button>


            {/* PLAY / PAUSE */}

            <motion.button

              className="
                music-control
                music-control-main
              "

              onClick={
                togglePlay
              }

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.94,
              }}

              aria-label={
                isPlaying
                  ? "Pause"
                  : "Play"
              }

            >

              {isPlaying ? (

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <rect
                    x="7"
                    y="6"
                    width="3"
                    height="12"
                    rx="1"
                  />

                  <rect
                    x="14"
                    y="6"
                    width="3"
                    height="12"
                    rx="1"
                  />

                </svg>

              ) : (

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <path
                    d="
                      M9 6
                      L18 12
                      L9 18
                      Z
                    "
                  />

                </svg>

              )}

            </motion.button>


            {/* NEXT */}

            <motion.button

              className="
                music-control
                music-control-side
              "

              onClick={
                handleNext
              }

              disabled={
                isLastSong
              }

              whileHover={
                !isLastSong
                  ? {
                      scale: 1.08,
                    }
                  : undefined
              }

              whileTap={
                !isLastSong
                  ? {
                      scale: 0.94,
                    }
                  : undefined
              }

              aria-label="
                Next song
              "

            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="
                    M18 6
                    L18 18
                  "
                />

                <path
                  d="
                    M6 6
                    L14 12
                    L6 18
                    Z
                  "
                />

              </svg>

            </motion.button>

          </div>

        </motion.section>


        {/* =================================================
            LYRICS
        ================================================= */}

        <motion.section

          className="
            music-lyrics-section
          "

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.7,
          }}

        >

          <span
            className="
              music-lyrics-label
            "
          >
            a little piece of the song
          </span>


          <div
            className="
              music-lyrics
            "
          >

            {
              currentSong.lyrics.map(
                (
                  line,
                  index
                ) => (

                  <p
                    key={index}
                    className={
                      line === ""
                        ? "music-lyrics-space"
                        : ""
                    }
                  >

                    {line}

                  </p>

                )
              )
            }

          </div>

        </motion.section>


        {/* =================================================
            BOTTOM ORNAMENT
        ================================================= */}

        <div
          className="
            music-bottom-ornament
          "
          aria-hidden="true"
        >

          <span />
          <span />
          <span />

        </div>


        {/* =================================================
            KEEP MEMORIES
        ================================================= */}

        <motion.section

          className="
            music-keep-memories
          "

          initial={{
            opacity: 0,
            y: 18,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.3,
          }}

          transition={{
            duration: 0.9,
          }}

        >

          <span
            className="
              music-keep-kicker
            "
          >
            another little memory
          </span>


          <h2>
            Keep the
            <br />
            <span>
              memories
            </span>
       const audioRef =
    useRef(null);


  /* =======================================================
     ACTIVE SONG
  ======================================================= */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);


  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);


  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);


  const [
    duration,
    setDuration,
  ] = useState(0);


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  /* =======================================================
     CURRENT SONG
  ======================================================= */

  const currentSong =
    musicData[activeIndex];


  const isFirstSong =
    activeIndex === 0;


  const isLastSong =
    activeIndex ===
    musicData.length - 1;


  /* =======================================================
     CHANGE SONG
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();

    audio.currentTime = 0;

    setCurrentTime(0);

    setDuration(0);

    setIsPlaying(false);

    setIsLoading(true);

  }, [activeIndex]);


  /* =======================================================
     AUDIO EVENTS
  ======================================================= */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    function handleLoadedMetadata() {

      setDuration(
        audio.duration || 0
      );

      setIsLoading(false);
    }


    function handleTimeUpdate() {

      setCurrentTime(
        audio.currentTime
      );
    }


    function handleEnded() {

      setIsPlaying(false);

      /*
        Kalau masih ada lagu berikutnya,
        otomatis lanjut ke lagu berikutnya.
      */

      if (!isLastSong) {

        setActiveIndex(
          (prev) => prev + 1
        );

      }
    }


    function handleWaiting() {

      setIsLoading(true);
    }


    function handleCanPlay() {

      setIsLoading(false);
    }


    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "waiting",
      handleWaiting
    );

    audio.addEventListener(
      "canplay",
      handleCanPlay
    );


    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "waiting",
        handleWaiting
      );

      audio.removeEventListener(
        "canplay",
        handleCanPlay
      );

    };

  }, [
    activeIndex,
    isLastSong,
  ]);


  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  async function togglePlay() {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    if (audio.paused) {

      try {

        await audio.play();

        setIsPlaying(true);

      } catch (error) {

        console.error(
          "Audio gagal diputar:",
          error
        );

        setIsPlaying(false);
      }

    } else {

      audio.pause();

      setIsPlaying(false);

    }
  }


  /* =======================================================
     NEXT SONG
  ======================================================= */

  function handleNext() {

    if (isLastSong) {
      return;
    }

    setActiveIndex(
      (prev) => prev + 1
    );
  }


  /* =======================================================
     PREVIOUS SONG
  ======================================================= */

  function handlePrevious() {

    if (isFirstSong) {
      return;
    }

    setActiveIndex(
      (prev) => prev - 1
    );
  }


  /* =======================================================
     PROGRESS
  ======================================================= */

  function handleProgressChange(
    event
  ) {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    const newTime =
      Number(
        event.target.value
      );


    audio.currentTime =
      newTime;

    setCurrentTime(
      newTime
    );
  }


  /* =======================================================
     FORMAT TIME
  ======================================================= */

  function formatTime(
    time
  ) {

    if (
      !Number.isFinite(time)
    ) {

      return "00:00";
    }


    const minutes =
      Math.floor(
        time / 60
      );


    const seconds =
      Math.floor(
        time % 60
      );


    return `${String(
      minutes
    ).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }


  /* =======================================================
     BACK
  ======================================================= */

  function handleBack() {

    navigate(
      "/main-menu"
    );
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main
      className="music-page"
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          music-background-glow
          music-background-glow-one
        "
      />

      <div
        className="
          music-background-glow
          music-background-glow-two
        "
      />


      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <motion.button

        className="
          music-back-button
        "

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
          MAIN CONTENT
      ================================================= */}

      <section
        className="
          music-content
        "
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header

          className="
            music-header
          "

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
            className="
              music-kicker
            "
          >
            our soundtrack
          </span>


          <h1
            className="
              music-title
            "
          >

            Songs That

            <br />

            <span>
              Feel Like Us
            </span>

          </h1>


          <div
            className="
              music-divider
            "
          />

        </motion.header>


        {/* =================================================
            COUNTER
        ================================================= */}

        <motion.div

          className="
            music-counter
          "

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
        >

          <span>
            {String(
              activeIndex + 1
            ).padStart(2, "0")}
          </span>

          <span>
            /
          </span>

          <span>
            {String(
              musicData.length
            ).padStart(2, "0")}
          </span>

        </motion.div>


        {/* =================================================
            MUSIC PLAYER
        ================================================= */}

        <motion.section

          className="
            music-player
          "

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.45,
          }}
        >


          {/* =================================================
              COVER
          ================================================= */}

          <div
            className="
              music-cover-frame
            "
          >

            <img
              className="
                music-cover
              "

              src={
                currentSong.cover
              }

              alt={
                `${currentSong.title} artwork`
              }
            />

          </div>


          {/* =================================================
              SONG INFO
          ================================================= */}

          <div
            className="
              music-song-info
            "
          >

            <h2>
              {
                currentSong.title
              }
            </h2>

            <p>
              {
                currentSong.artist
              }
            </p>

          </div>


          {/* =================================================
              AUDIO ELEMENT
          ================================================= */}

          <audio
            ref={audioRef}
            src={currentSong.audio}
            preload="metadata"
          />


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div
            className="
              music-progress-container
            "
          >

            <input

              className="
                music-progress
              "

              type="range"

              min="0"

              max={
                duration || 0
              }

              step="0.01"

              value={
                Math.min(
                  currentTime,
                  duration || 0
                )
              }

              onChange={
                handleProgressChange
              }

              style={{
                "--progress":
                  duration
                    ? `${(
                        currentTime /
                        duration
                      ) * 100}%`
                    : "0%",
              }}

              aria-label="
                Song progress
              "
            />


            <div
              className="
                music-time
              "
            >

              <span>
                {
                  formatTime(
                    currentTime
                  )
                }
              </span>

              <span>
                {
                  formatTime(
                    duration
                  )
                }
              </span>

            </div>

          </div>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div
            className="
              music-controls
            "
          >


            {/* PREVIOUS */}

            <motion.button

              className="
                music-control
                music-control-side
              "

              onClick={
                handlePrevious
              }

              disabled={
                isFirstSong
              }

              whileHover={
                !isFirstSong
                  ? {
                      scale: 1.08,
                    }
                  : undefined
              }

              whileTap={
                !isFirstSong
                  ? {
                      scale: 0.94,
                    }
                  : undefined
              }

              aria-label="
                Previous song
              "
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="
                    M6 6
                    L6 18
                  "
                />

                <path
                  d="
                    M18 6
                    L10 12
                    L18 18
                    Z
                  "
                />

              </svg>

            </motion.button>


            {/* PLAY */}

            <motion.button

              className="
                music-control
                music-control-main
              "

              onClick={
                togglePlay
              }

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.94,
              }}

              aria-label={
                isPlaying
                  ? "Pause"
                  : "Play"
              }
            >

              {isPlaying ? (

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <rect
                    x="7"
                    y="6"
                    width="3"
                    height="12"
                    rx="1"
                  />

                  <rect
                    x="14"
                    y="6"
                    width="3"
                    height="12"
                    rx="1"
                  />

                </svg>

              ) : (

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <path
                    d="
                      M9 6
                      L18 12
                      L9 18
                      Z
                    "
                  />

                </svg>

              )}

            </motion.button>


            {/* NEXT */}

            <motion.button

              className="
                music-control
                music-control-side
              "

              onClick={
                handleNext
              }

              disabled={
                isLastSong
              }

              whileHover={
                !isLastSong
                  ? {
                      scale: 1.08,
                    }
                  : undefined
              }

              whileTap={
                !isLastSong
                  ? {
                      scale: 0.94,
                    }
                  : undefined
              }

              aria-label="
                Next song
              "
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="
                    M18 6
                    L18 18
                  "
                />

                <path
                  d="
                    M6 6
                    L14 12
                    L6 18
                    Z
                  "
                />

              </svg>

            </motion.button>

          </div>

        </motion.section>


        {/* =================================================
            LYRICS
        ================================================= */}

        <motion.section

          className="
            music-lyrics-section
          "

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.7,
          }}
        >

          <span
            className="
              music-lyrics-label
            "
          >
            a little piece of the song
          </span>


          <div
            className="
              music-lyrics
            "
          >

            {
              currentSong.lyrics.map(
                (
                  line,
                  index
                ) => (

                  <p
                    key={index}
                    className={
                      line === ""
                        ? "music-lyrics-space"
                        : ""
                    }
                  >
                    {line}
                  </p>

                )
              )
            }

          </div>

        </motion.section>


        {/* =================================================
            BOTTOM ORNAMENT
        ================================================= */}

        <div
          className="
            music-bottom-ornament
          "
          aria-hidden="true"
        >

          <span />
          <span />
          <span />

        </div>

      </section>

    </main>
  );
             }
