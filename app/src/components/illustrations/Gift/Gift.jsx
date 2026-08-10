import GiftGlow from "./parts/GiftGlow";
import GiftShadow from "./parts/GiftShadow";
import GiftBox from "./parts/GiftBox";
import GiftRibbon from "./parts/GiftRibbon";
import GiftLid from "./parts/GiftLid";
import GiftBow from "./parts/GiftBow";
import GiftSparkles from "./parts/GiftSparkles";
import { RefreshCwOff } from "lucide-react";

export default function Gift({
  phase = "idle",
}) {
  const isOpening =
    phase === "open" ||
    phase === "explode" ||
    phase === "flash";

  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* =========================
            BODY GRADIENT
        ========================== */}

        <linearGradient
          id="giftBodyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#F08C8C"
          />

          <stop
            offset="100%"
            stopColor="#D95D5D"
          />
        </linearGradient>


        {/* =========================
            RIBBON GRADIENT
        ========================== */}

        <linearGradient
          id="giftRibbonGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#FFF8EE"
          />

          <stop
            offset="100%"
            stopColor="#F5DFC1"
          />
        </linearGradient>


        {/* =========================
            LOCAL GLOW
        ========================== */}

        <radialGradient id="giftGlow">
          <stop
            offset="0%"
            stopColor="#FFD8E6"
            stopOpacity="0.9"
          />

          <stop
            offset="100%"
            stopColor="#FFD8E6"
            stopOpacity="0"
          />
        </radialGradient>


        {/* =========================
            SHADOW BLUR
        ========================== */}

        <filter
          id="giftShadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="8"
          />
        </filter>
      </defs>


      {/* =========================
          LOCAL GLOW
      ========================== */}

      <GiftGlow
        phase={phase}
      />


      {/* =========================
          SHADOW
      ========================== */}

      <GiftShadow
        phase={phase}
      />


      {/* =========================
          GIFT BODY
      ========================== */}

      <GiftBox />


      {/* =========================
          RIBBON
          Lid ribbon follows lid
          Body ribbon stays on box
      ========================== */}

      <GiftRibbon />


      {/* =========================
          LID
      ========================== */}

      <GiftLid
        phase={phase}
      />


      {/* =========================
          BOW
      ========================== */}

      <GiftBow
        phase={phase}
      />


      {/* =========================
          SPARKLES
      ========================== */}

      <GiftSparkles
        phase={phase}
      />
    </svg>
  );
}