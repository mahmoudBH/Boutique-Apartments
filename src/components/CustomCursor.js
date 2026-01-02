import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiPlus } from "react-icons/fi";

/* ================= STYLES ================= */

const CursorElement = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 20000;
  mix-blend-mode: difference;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InnerDot = styled.div`
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
`;

const ImageCursor = styled.div`
  color: #000;
  background: #fff;
  padding: 6px 10px; /* صغير وأنيق */
  border-radius: 25px;
  font-size: 0.65rem; /* نص صغير */
  font-weight: 700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

/* ================= COMPONENT ================= */

export default function CustomCursor() {
  const [isClickable, setIsClickable] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 9);
      mouseY.set(e.clientY - 9);
    };

    const detectHover = (e) => {
      const target = e.target;

      const clickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button");

      setIsClickable(!!clickable);

      const imageHover = target.closest("[data-cursor-image]");
      setIsImage(!!imageHover);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", detectHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", detectHover);
    };
  }, [mouseX, mouseY]);

  return (
    <CursorElement
      style={{ x: cursorX, y: cursorY }}
      animate={{
        scale: isImage ? 1.5 : isClickable ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {isImage ? (
        <ImageCursor>
          VIEW <FiPlus size={10} />
        </ImageCursor>
      ) : !isClickable ? (
        <InnerDot />
      ) : null}
    </CursorElement>
  );
}
