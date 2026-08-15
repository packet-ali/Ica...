import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/main-menu.css";


/* =========================================================
   MENU ITEMS
========================================================= */

const menuItems = [
  {
    id: "letter",
    title: "Letter",
    subtitle: "words I couldn't say",
    path: "/letter",
    icon: "letter",
  },
  {
    id: "timeline",
    title: "Timeline",
    subtitle: "where it all happened",
    path: "/timeline",
    icon: "timeline",
  },
  {
    id: "music",
    title: "Music",
    subtitle: "a song for you",
    path: "/music",
    icon: "music",
  },
  {
    id: "gifts",
    title: "Gifts",
    subtitle: "something waiting for you",
    path: "/gifts",
    icon: "gift",
  },
];


/* =========================================================
   SVG ICONS
   Tidak menggunakan emoji.
========================================================= */

function MenuIcon({ type }) {

  if (type === "letter") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="menu-item-icon"
        aria-hidden="true"
      >
        <rect
          x="19"
          y="23"
          width="42"
          height="34"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M20 27 L40 43 L60 27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M21 54 L34 41"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        <path
          d="M59 54 L46 41"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    );
  }


  if (type === "timeline") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="menu-item-icon"
        aria-hidden="true"
      >
        <ellipse
          cx="40"
          cy="40"
          rx="27"
          ry="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.55"
        />

        <circle
          cx="20"
          cy="38"
          r="3"
          fill="currentColor"
        />

        <circle
          cx="40"
          cy="24"
          r="3"
          fill="currentColor"
        />

        <circle
          cx="60"
          cy="43"
          r="3"
          fill="currentColor"
        />

        <path
          d="M21 38 C27 34, 31 27, 39 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        <path
          d="M42 25 C49 28, 53 37, 59 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    );
  }


  if (type === "music") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="menu-item-icon"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r="23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />

        <circle
          cx="40"
          cy="40"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />

        <circle
          cx="40"
          cy="40"
          r="2"
          fill="currentColor"
        />

        <path
          d="M51 25 L51 43"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M51 25 C57 24, 60 26, 62 29"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }


  return (
    <svg
      viewBox="0 0 80 80"
      className="menu-item-icon"
      aria-hidden="true"
    >
      <rect
        x="21"
        y="29"
        width="38"
        height="28"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M21 34 H59"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <path
        d="M40 29 V57"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <path
        d="M40 29 C34 22, 26 23, 26 28 C26 31, 30 33, 40 29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <path
        d="M40 29 C46 22, 54 23, 54 28 C54 31, 50 33, 40 29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}


/* =========================================================
   MEMORY INDICATOR
========================================================= */

function MemoryIndicator() {

  return (
    <div className="memory-indicator">

      <div className="memory-hearts">

        {[0, 1, 2, 3].map((heart) => (

          <svg
            key={heart}
            viewBox="0 0 24 24"
            className="memory-heart"
            aria-hidden="true"
          >
            <path
              d="M12 20.5
                 C10.5 19.1 4 14.3 4 9.2
                 C4 6.3 5.9 4.5 8.4 4.5
                 C10.1 4.5 11.3 5.4 12 6.7
                 C12.7 5.4 13.9 4.5 15.6 4.5
                 C18.1 4.5 20 6.3 20 9.2
                 C20 14.3 13.5 19.1 12 20.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>

        ))}

      </div>


      <span className="memory-label">
        Memories: 0/4
      </span>

    </div>
  );
}


/* =========================================================
   MAIN MENU
========================================================= */

export default function MainMenu() {

  const navigate = useNavigate();


  function handleMenuClick(path) {
    navigate(path);
  }


  return (
    <main className="main-menu-page">


      {/* =================================================
          BACKGROUND ATMOSPHERE
      ================================================= */}

      <div
        className="main-menu-glow main-menu-glow-one"
        aria-hidden="true"
      />

      <div
        className="main-menu-glow main-menu-glow-two"
        aria-hidden="true"
      />


      {/* =================================================
          BACKGROUND PARTICLES
      ================================================= */}

      <div
        className="main-menu-stars"
        aria-hidden="true"
      >

        <span className="main-star star-one" />
        <span className="main-star star-two" />
        <span className="main-star star-three" />
        <span className="main-star star-four" />
        <span className="main-star star-five" />
        <span className="main-star star-six" />

      </div>


      {/* =================================================
          LARGE ORBIT
      ================================================= */}

      <svg
        className="main-menu-orbit"
        viewBox="0 0 800 800"
        aria-hidden="true"
      >

        <ellipse
          cx="400"
          cy="400"
          rx="330"
          ry="235"
          fill="none"
        />

      </svg>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="main-menu-content">


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="main-menu-header"

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >

          <span className="main-menu-kicker">
            welcome to
          </span>

          <h1 className="main-menu-title">
            Our Little
            <br />
            <span>Universe</span>
          </h1>

          <div className="main-menu-divider" />

        </motion.div>


        {/* =================================================
            MENU GRID
        ================================================= */}

        <div className="main-menu-grid">

          {menuItems.map((item, index) => (

            <motion.button
              key={item.id}
              className="main-menu-item"
              onClick={() =>
                handleMenuClick(item.path)
              }

              initial={{
                opacity: 0,
                y: 20,
                scale: 0.94
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              transition={{
                duration: 0.7,
                delay: 0.45 + index * 0.15,
                ease: "easeOut"
              }}

              whileHover={{
                scale: 1.035
              }}

              whileTap={{
                scale: 0.97
              }}
            >

              <div className="main-menu-item-orbit">

                <MenuIcon
                  type={item.icon}
                />

              </div>

              <span className="main-menu-item-title">
                {item.title}
              </span>

              <span className="main-menu-item-subtitle">
                {item.subtitle}
              </span>

            </motion.button>

          ))}

        </div>


        {/* =================================================
            CENTER ORNAMENT
        ================================================= */}

        <motion.div
          className="main-menu-center-ornament"

          initial={{
            opacity: 0,
            scale: 0
          }}

          animate={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 1,
            delay: 0.95,
            ease: "easeOut"
          }}
        >

          <span />

          <div className="center-orbit-dot" />

          <span />

        </motion.div>


        {/* =================================================
            MEMORY COUNTER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8,
            delay: 1.15
          }}
        >

          <MemoryIndicator />

        </motion.div>

      </section>

    </main>
  );
}