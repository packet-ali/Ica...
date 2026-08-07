import { giftConfig } from "../GiftConfig";

export default function GiftShadow() {
  const { box } = giftConfig;

  return (
    <ellipse
      cx={box.x + box.width / 2}
      cy={box.y + box.height + 22}
      rx="82"
      ry="15"
      fill="rgba(0,0,0,.14)"
      filter="url(#giftShadow)"
    />
  );
}