import { giftConfig } from "../GiftConfig";

export default function GiftBox() {
  const { box } = giftConfig;

  return (
    <g id="gift-box">
      <rect
        x={box.x}
        y={box.y}
        width={box.width}
        height={box.height}
        rx={box.radius}
        fill="url(#giftBodyGradient)"
      />

      <rect
        x={box.x + 6}
        y={box.y + 6}
        width={box.width - 12}
        height={box.height - 12}
        rx={box.radius - 6}
        fill="rgba(255,255,255,.06)"
      />

      <path
        d="
          M80 120
          Q160 102
          240 120
        "
        fill="none"
        stroke="rgba(255,255,255,.18)"
        strokeWidth="3"
      />
    </g>
  );
}