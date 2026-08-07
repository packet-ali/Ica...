import GiftGlow from "./parts/GiftGlow";
import GiftShadow from "./parts/GiftShadow";
import GiftBox from "./parts/GiftBox";
import GiftRibbon from "./parts/GiftRibbon";
import GiftLid from "./parts/GiftLid";
import GiftBow from "./parts/GiftBow";
import GiftSparkles from "./parts/GiftSparkles";

export default function Gift({
  phase = "idle",
}) {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="giftBodyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F08C8C" />
          <stop offset="100%" stopColor="#D95D5D" />
        </linearGradient>

        <linearGradient
          id="giftRibbonGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFF8EE" />
          <stop offset="100%" stopColor="#F5DFC1" />
        </linearGradient>

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

        <filter
          id="giftShadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <GiftGlow phase={phase} />

      <GiftShadow phase={phase} />

      <GiftBox />

      <GiftRibbon />

      <GiftLid phase={phase} />

      <GiftBow phase={phase} />

      <GiftSparkles phase={phase} />
    </svg>
  );
}