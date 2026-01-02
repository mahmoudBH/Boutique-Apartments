import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

/* ================= STYLES (Royal Black & Liquid Gold) ================= */

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #020202;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.3),
      transparent
    );
  }
  &::before {
    top: 8%;
  }
  &::after {
    bottom: 8%;
  }
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const LogoText = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.2rem, 7vw, 5rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 8px;
  margin-bottom: 0.5rem;

  span {
    color: #d4af37;
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  }
`;

const Tagline = styled(motion.p)`
  font-size: 0.7rem;
  color: #d4af37;
  letter-spacing: 0.8em;
  text-transform: uppercase;
  margin-bottom: 5rem;
  font-weight: 700;
  opacity: 0.8;
`;

const ProgressWrapper = styled.div`
  width: 280px;
  position: relative;
  margin: 0 auto;
`;

const ProgressBarBase = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(212, 175, 55, 0.1);
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #d4af37,
    #fff5b7,
    #d4af37,
    transparent
  );
  width: 100%;
`;

const Percentage = styled.div`
  font-size: 0.75rem;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  letter-spacing: 4px;
  margin-top: 1.5rem;
  font-weight: 300;
  opacity: 0.4;
`;

const AmbientGlow = styled(motion.div)`
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.04) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
  filter: blur(100px);
`;

const GoldDust = styled(motion.div)`
  position: absolute;
  width: 1.5px;
  height: 1.5px;
  background: #d4af37;
  border-radius: 50%;
  pointer-events: none;
`;

/* ================= COMPONENT ================= */

const PageTransition = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const mainControls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const jump = Math.random() * 12;
        if (prev + jump >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + jump;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const runExitSequence = async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        await mainControls.start({
          y: "-100%",
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
        });

        if (onComplete) onComplete();
      };

      runExitSequence();
    }
  }, [progress, mainControls, onComplete]);

  return (
    <AnimatePresence>
      <LoadingScreen
        initial={{ y: 0 }}
        animate={mainControls}
        exit={{ opacity: 0 }}
      >
        <AmbientGlow
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {[...Array(15)].map((_, i) => (
          <GoldDust
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -150],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <ContentBox>
          <motion.div
            initial={{ opacity: 0, letterSpacing: "20px" }}
            animate={{ opacity: 1, letterSpacing: "8px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <LogoText>
              Toronto Boutique<span>.</span>
            </LogoText>
          </motion.div>

          <Tagline
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            Luxury Private Residences
          </Tagline>

          <ProgressWrapper>
            <ProgressBarBase>
              <ProgressFill
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </ProgressBarBase>

            <Percentage>{Math.round(progress)}%</Percentage>
          </ProgressWrapper>

          <motion.div
            style={{ marginTop: "4rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "6px",
                color: "#D4AF37",
                textTransform: "uppercase",
                fontWeight: "900",
              }}
            >
              Authenticating Executive Access
            </span>
          </motion.div>
        </ContentBox>
      </LoadingScreen>
    </AnimatePresence>
  );
};

export default PageTransition;
