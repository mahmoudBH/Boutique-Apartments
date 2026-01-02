import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiArrowUp,
  FiArrowRight,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

/* ================= STYLES (Luxury Redefined) ================= */

const FooterContainer = styled.footer`
  background: #020202; /* أسود مطلق للفخامة */
  color: #ffffff;
  padding: 12rem 2rem 4rem;
  position: relative;
  overflow: hidden;

  /* إضاءة ذهبية خافتة في الزوايا (Ambient Gold Glow) */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    opacity: 0.3;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 4rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const BrandSide = styled.div`
  .logo-title {
    font-family: "Playfair Display", serif;
    font-size: 2.8rem;
    line-height: 0.9;
    margin-bottom: 2rem;
    letter-spacing: -1px;

    span {
      color: #d4af37; /* النقطة الذهبية */
    }
  }
  .tagline {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.95rem;
    line-height: 2;
    max-width: 350px;
    font-weight: 300;
    @media (max-width: 768px) {
      margin: 0 auto;
    }
  }
`;

const LinkHeading = styled.h4`
  font-family: "Inter", sans-serif;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 0.7rem;
  color: #d4af37; /* التسميات باللون الذهبي */
  font-weight: 900;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const NavLink = styled(motion.a)`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  transition: all 0.4s ease;
  width: fit-content;

  @media (max-width: 768px) {
    margin: 0 auto 1.5rem;
  }

  &:hover {
    color: #d4af37;
    letter-spacing: 1px;
  }
`;

const SubscribeBox = styled.div`
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: 3.5rem;
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 2px;

  h4 {
    font-family: "Playfair Display", serif;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    background: linear-gradient(to right, #fff, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MinimalForm = styled.form`
  display: flex;
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  margin-top: 2.5rem;
  padding-bottom: 12px;
  transition: border-color 0.4s;

  &:focus-within {
    border-color: #fff;
  }

  input {
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    outline: none;
    font-size: 0.9rem;
    letter-spacing: 1px;
    &::placeholder {
      color: #333;
      text-transform: uppercase;
      font-size: 0.7rem;
      letter-spacing: 2px;
    }
  }

  button {
    background: none;
    border: none;
    color: #d4af37;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      transform: scale(1.2) translateX(5px);
      color: #fff;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5rem;

  .legal-text {
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.65rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const SocialGroup = styled.div`
  display: flex;
  gap: 3rem;

  a {
    color: #d4af37;
    font-size: 1.2rem;
    opacity: 0.5;
    transition: all 0.5s ease;
    &:hover {
      opacity: 1;
      transform: translateY(-5px);
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
  }
`;

const ScrollUpBtn = styled(motion.button)`
  background: transparent;
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.3);
  width: 50px;
  height: 80px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto 4rem;
  transition: all 0.4s;

  &:hover {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.05);
  }

  span {
    font-size: 0.6rem;
    writing-mode: vertical-rl;
    margin-top: 10px;
    letter-spacing: 2px;
  }
`;

/* ================= COMPONENT ================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <ContentWrapper>
        <ScrollUpBtn
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FiArrowUp size={18} />
          <span>TOP</span>
        </ScrollUpBtn>

        <TopGrid>
          <BrandSide>
            <div className="logo-title">
              Toronto
              <br />
              Boutique<span>.</span>
            </div>
            <p className="tagline">
              Curating exceptional stays for the global elite. Where
              architectural mastery meets bespoke concierge services in the
              heart of Ontario.
            </p>
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.8rem",
                }}
              >
                <FiMapPin size={14} color="#D4AF37" /> YORKVILLE, TORONTO,
                CANADA
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.8rem",
                }}
              >
                <FiMail size={14} color="#D4AF37" />{" "}
                RESERVATIONS@TORONTOBOUTIQUE.COM
              </div>
            </div>
          </BrandSide>

          {/* Nav 1 */}
          <div>
            <LinkHeading>The Estates</LinkHeading>
            <NavLink whileHover={{ x: 10 }} href="#apartments">
              The Penthouse
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#apartments">
              Skyline Suites
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#apartments">
              Yorkville Lofts
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#apartments">
              Garden Villas
            </NavLink>
          </div>

          {/* Nav 2 */}
          <div>
            <LinkHeading>Curation</LinkHeading>
            <NavLink whileHover={{ x: 10 }} href="#about">
              Our Heritage
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#gallery">
              Art Gallery
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#services">
              Concierge Plan
            </NavLink>
            <NavLink whileHover={{ x: 10 }} href="#contact">
              Investor Relations
            </NavLink>
          </div>

          {/* Newsletter */}
          <SubscribeBox>
            <LinkHeading>Exclusive Access</LinkHeading>
            <h4>Join the Inner Circle</h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.3)",
                lineHeight: "1.6",
              }}
            >
              Receive private invitations to new property launches and elite
              city guides.
            </p>
            <MinimalForm
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input type="email" placeholder="EMAIL ADDRESS" required />
              <button type="submit">
                <FiArrowRight size={22} />
              </button>
            </MinimalForm>
          </SubscribeBox>
        </TopGrid>

        <BottomBar>
          <p className="legal-text">
            © {currentYear} TORONTO BOUTIQUE APARTMENTS • ARCHITECTURAL
            EXCELLENCE
          </p>

          <SocialGroup>
            <a href="https://www.instagram.com/mahmoud__bh/">
              <FiInstagram />
            </a>
            <a href="https://www.facebook.com/mahmoudbh7">
              <FiFacebook />
            </a>
            <a href="https://www.linkedin.com/in/mahmoudbh7/">
              <FiLinkedin />
            </a>
          </SocialGroup>

          <p
            className="legal-text"
            style={{ color: "#D4AF37", fontWeight: "bold" }}
          >
            PRIVATE & CONFIDENTIAL
          </p>
        </BottomBar>

        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "15vw",
            fontFamily: "Playfair Display",
            color: "rgba(212, 175, 55, 0.02)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          ESTABLISHED 2010
        </div>
      </ContentWrapper>
    </FooterContainer>
  );
}
