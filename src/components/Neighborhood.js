import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowUpRight,
  FiNavigation,
  FiShoppingBag,
  FiCoffee,
} from "react-icons/fi";

/* ================= STYLES (Ultra-Luxury Edition) ================= */

const Section = styled.section`
  padding: 15rem 0;
  background: #020202; /* أسود أعمق للفخامة */
  color: #fff;
  position: relative;
  overflow: hidden;
`;

const LuxuryBackgroundText = styled(motion.h2)`
  position: absolute;
  top: 10%;
  left: -5%;
  font-size: 25vw;
  font-family: "Playfair Display", serif;
  font-weight: 900;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(212, 175, 55, 0.08) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const MainTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(3.5rem, 8vw, 6rem);
  line-height: 1;
  font-weight: 400;

  span.label {
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 10px;
    color: #d4af37; /* Gold */
    margin-bottom: 2rem;
    font-family: "Inter", sans-serif;
    font-weight: 900;
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.3); /* Subtle Neon Glow */
  }

  .gold-gradient {
    background: linear-gradient(
      to right,
      #ffffff 0%,
      #d4af37 50%,
      #ffffff 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 5s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const DescriptionBox = styled(motion.div)`
  max-width: 450px;
`;

const ViewMapBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  color: #d4af37;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 4px;
  padding: 15px 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #d4af37, transparent);
  }
`;

const MosaicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem;
  position: relative;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  grid-column: ${(props) => props.$col || "span 6"};
  height: ${(props) => props.$height || "450px"};
  margin-top: ${(props) => props.$offset || "0"};

  /* تأثير توهج الحواف النيوني البسيط */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(212, 175, 55, 0.1);
    z-index: 3;
    transition: all 0.5s ease;
  }

  &:hover::before {
    border: 1px solid rgba(212, 175, 55, 0.5);
    box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8) contrast(1.1);
    transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.1) rotate(1deg);
    filter: brightness(1);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 60%);
    z-index: 1;
  }
`;

const OverlayInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
  z-index: 2;
`;

const GoldTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #d4af37;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(10px);
  margin-bottom: 1.5rem;
`;

/* ================= COMPONENT ================= */

export default function Neighborhood() {
  const { scrollYProgress } = useScroll();
  const xMove = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const revealVariants = {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Section id="location">
      <LuxuryBackgroundText style={{ x: xMove }}>
        THE GOLDEN MILE
      </LuxuryBackgroundText>

      <Container>
        <HeaderContainer>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <MainTitle>
              <span className="label">The Epicenter</span>
              <div className="gold-gradient">
                Toronto's Elite
                <br />
                Neighborhood
              </div>
            </MainTitle>
          </motion.div>

          <DescriptionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: "2",
                fontSize: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              A sanctuary of prestige where heritage meets high-modernity.
              Experience the finest collection of Michelin gastronomy and
              bespoke retail boutiques.
            </p>
            <ViewMapBtn href="#" whileHover={{ gap: "25px" }}>
              THE COLLECTION GUIDE <FiArrowUpRight />
            </ViewMapBtn>
          </DescriptionBox>
        </HeaderContainer>

        <MosaicGrid>
          {/* 1. Dining */}
          <ImageWrapper
            $col="span 7"
            $height="700px"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Dining"
            />
            <OverlayInfo
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GoldTag>
                <FiNavigation /> Gastronomy
              </GoldTag>
              <h3
                style={{
                  color: "#dbd9d9ff",
                  fontFamily: "Playfair Display",
                  fontSize: "3rem",
                  fontWeight: 400,
                }}
              >
                Michelin Stars
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  letterSpacing: "2px",
                }}
              >
                200m • CURATED DINING
              </p>
            </OverlayInfo>
          </ImageWrapper>

          {/* 2. Shopping */}
          <ImageWrapper
            $col="span 5"
            $height="500px"
            $offset="120px"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1648634940764-45d9929baac5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shopping"
            />
            <OverlayInfo
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GoldTag>
                <FiShoppingBag /> Luxury Hub
              </GoldTag>
              <h3
                style={{
                  color: "#dbd9d9ff",
                  fontFamily: "Playfair Display",
                  fontSize: "2.2rem",
                  fontWeight: 400,
                }}
              >
                Boutique Row
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  letterSpacing: "2px",
                }}
              >
                EXCLUSIVITY DEFINED
              </p>
            </OverlayInfo>
          </ImageWrapper>

          {/* 3. Arts */}
          <ImageWrapper
            $col="4 / span 6"
            $height="450px"
            $offset="-50px"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Culture"
            />
            <OverlayInfo
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GoldTag>
                <FiCoffee /> Heritage
              </GoldTag>
              <h3
                style={{
                  color: "#dbd9d9ff",
                  fontFamily: "Playfair Display",
                  fontSize: "2.2rem",
                  fontWeight: 400,
                }}
              >
                Royal District
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  letterSpacing: "2px",
                }}
              >
                5 MIN WALK • ARTS
              </p>
            </OverlayInfo>
          </ImageWrapper>
        </MosaicGrid>
      </Container>
    </Section>
  );
}
