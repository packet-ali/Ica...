import { useEffect, useState } from "react";

export default function useTyping(
  text = "",
  speed = 35,
  start = true
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);

    let index = 0;

    const timer = setInterval(() => {
      index += 1;

      setDisplayedText(
        text.slice(0, index)
      );

      if (index >= text.length) {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, speed, start]);

  return {
    displayedText,
    isComplete,
  };
}