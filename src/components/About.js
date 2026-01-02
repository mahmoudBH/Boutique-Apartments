import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

/* ================= STYLES ================= */

const AboutSection = styled.section`
  padding: 10rem 2rem;
  background: #fcfcfc; // Fond identique à la section Apartments
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ContentSide = styled.div`
  position: relative;
`;

const Label = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.8rem;
  color: #ffd700;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const MainTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1a1a1a;
  margin-bottom: 2rem;

  span {
    display: block;
    font-style: italic;
    color: #555;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BodyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 2.5rem;
  font-weight: 300;
`;

/* Grille de statistiques moderne */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatItem = styled.div`
  .number {
    display: block;
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 0.2rem;
  }
  .label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #888;
  }
`;

const ImageSide = styled.div`
  position: relative;
`;

const StyledImage = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
  background: #fff;
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.05);

  /* Border carré principal */
  border: 1px solid rgba(0, 0, 0, 0.2);

  /* Border décoratif secondaire */
  &::after {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const ActionButton = styled.button`
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffd700;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
  }
`;

/* ================= CountUp helper component ================= */

/**
 * CountUp
 * - end: number to reach
 * - duration: milliseconds
 * - decimals: how many decimals to show
 * - suffix: string appended (e.g. '+', '/5')
 */
function CountUp({ end = 0, duration = 1200, decimals = 0, suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      start();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            start();
          }
        });
      },
      { threshold: 0.4 },
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, decimals, suffix]);

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function start() {
    const startTime = performance.now();
    const from = 0;
    const to = Number(end);

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setValue(to);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
  }

  // formatting
  const formatted =
    decimals > 0
      ? (
          Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
        ).toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className="number">
      {formatted}
      {suffix}
    </span>
  );
}

/* ================= COMPONENT ================= */

export default function About() {
  return (
    <AboutSection id="about">
      <Wrapper>
        {/* Côté Image avec animation simple */}
        <ImageSide>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StyledImage>
              <img src="/logo.png" alt="Toronto Boutique Interior" />
            </StyledImage>
          </motion.div>
        </ImageSide>

        {/* Côté Texte */}
        <ContentSide>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Label>The Boutique Story</Label>
            <MainTitle>
              Redefining <span>Urban Living</span>
            </MainTitle>

            <BodyText>
              Since 2010, Toronto Boutique Apartments has been the benchmark for
              high-end executive rentals. We don’t just provide a place to
              sleep; we offer a sanctuary where five-star hotel elegance meets
              the warmth and privacy of your own home.
            </BodyText>

            <StatsGrid>
              <StatItem>
                {/* 500+ */}
                <CountUp end={500} duration={1400} decimals={0} suffix="+" />
                <span className="label">Luxury Units</span>
              </StatItem>

              <StatItem>
                {/* 4.9/5 -> animate to 4.9 (one decimal) and show /5 */}
                <CountUp end={4.9} duration={1200} decimals={1} suffix="/5" />
                <span className="label">Guest Rating</span>
              </StatItem>

              <StatItem>
                {/* 24/7 -> animate 0 -> 24 then show /7 */}
                <CountUp end={24} duration={1000} decimals={0} suffix="/7" />
                <span className="label">Personal Service</span>
              </StatItem>

              <StatItem>
                {/* 14+ years */}
                <CountUp end={14} duration={1200} decimals={0} suffix="+" />
                <span className="label">Years of Excellence</span>
              </StatItem>
            </StatsGrid>

            <ActionButton>Our Heritage</ActionButton>
          </motion.div>
        </ContentSide>
      </Wrapper>
    </AboutSection>
  );
}
