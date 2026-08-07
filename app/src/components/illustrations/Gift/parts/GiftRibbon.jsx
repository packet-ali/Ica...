import { giftConfig } from "../GiftConfig";

export default function GiftRibbon() {
  const { box, lid, ribbon } = giftConfig;

  const centerX =
    box.x + box.width / 2 - ribbon.width / 2;

  return (
    <g>
      <rect
        x={centerX}
        y={lid.y}
        width={ribbon.width}
        height={lid.height}
        rx="9"
        fill="url(#giftRibbonGradient)"
      />

      <rect
        x={centerX}
        y={box.y}
        width={ribbon.width}
        height={box.height}
        rx="9"
        fill="url(#giftRibbonGradient)"
      />

      <rect
        x={box.x}
        y={box.y + 26}
        width={box.width}
        height={ribbon.horizontalHeight}
        rx="9"
        fill="url(#giftRibbonGradient)"
      />
    </g>
  );
}