import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import introTexts from "../data/intro";
import "../styles/intro.css";

export default function Intro() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < introTexts.length - 1) {
        setVisible(false);

        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setVisible(true);
        }, 600);
      } else {
        setVisible(false);

        setTimeout(() => {
          navigate("/opening");
        }, 800);
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, [currentIndex, navigate]);

  return (
    <main className="intro-page">
      <h1
        className={`intro-text ${
          visible ? "fade-in" : "fade-out"
        }`}
      >
        {introTexts[currentIndex]}
      </h1>
    </main>
  );
}