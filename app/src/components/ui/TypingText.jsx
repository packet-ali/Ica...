import { useEffect } from "react";
import useTyping from "../../hooks/useTyping";

export default function TypingText({
  text = "",
  speed = 35,
  start = true,
  className = "",
  onComplete,
}) {

  const {
    displayedText,
    isComplete,
  } = useTyping(
    text,
    speed,
    start
  );


  useEffect(() => {

    if (
      isComplete &&
      start &&
      onComplete
    ) {
      onComplete();
    }

  }, [
    isComplete,
    start,
    onComplete
  ]);


  return (
    <span
      className={`typing-text ${className}`}
      data-complete={isComplete}
    >

      {displayedText}

      {start && !isComplete && (
        <span className="typing-cursor">
          |
        </span>
      )}

    </span>
  );
}