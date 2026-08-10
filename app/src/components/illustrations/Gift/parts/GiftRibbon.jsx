import { giftConfig } from "../GiftConfig";

export default function GiftRibbon() {
  const { box, ribbon } = giftConfig;

  const centerX =
    box.x + box.width / 2 - ribbon.width / 2;

  return (
    <g>
      {/* =========================
          VERTICAL RIBBON
          Hanya pada badan box
      ========================== */}

      <rect
        x={centerX}
        y={box.y}
        width={ribbon.width}
        height={box.height}
        rx="9"
        fill="url(#giftRibbonGradient)"
      />

      {/* =========================
          HORIZONTAL RIBBON
      ========================== */}

      <rect
        x={box.x}
        y={box.y + 26}
        width={box.width}
        height={ribbon.horizontalHeight}
        rx="9"
        fill="url(#giftRibbonGradient)"
      />

      {/* =========================
          HIGHLIGHT VERTICAL
      ========================== */}

      <rect
        x={centerX + 3}
        y={box.y + 3}
        width="4"
        height={box.height - 6}
        rx="2"
        fill="rgba(255,255,255,.20)"
      />
    </g>
  );
}