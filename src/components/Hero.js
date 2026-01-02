import styled, { keyframes } from "styled-components";
import {
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

// --- Animations ---
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// Gestion de la vidéo en background
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Overlay sombre pour garantir que le texte blanc soit lisible sur la vidéo
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    0,
    0,
    0,
    0.4
  ); // Ajustez l'opacité selon la luminosité de la vidéo
  z-index: 0;
`;

// Conteneur principal "Glassmorphism"
const GlassContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 900px;
  padding: 3rem 4rem;
  text-align: center;

  // L'effet verre dépoli
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 0 1rem;
    background: rgba(
      0,
      0,
      0,
      0.2
    ); // Un peu plus sombre sur mobile pour la lisibilité
    backdrop-filter: blur(5px);
  }
`;

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 300; // Une font plus fine fait plus "Luxe"
  color: #fff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-family:
    "Playfair Display", serif; // Assurez-vous d'importer une font serif élégante

  span {
    font-weight: 700;
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled.button`
  background: #fff;
  color: #000;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
    background: #f8f8f8;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #fff;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
  }
`;

// Indicateur de scroll en bas de page
const ScrollIndicator = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  white-space: nowrap; /* ✅ يمنع كسر السطر */
  text-align: center;

  letter-spacing: 3px;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);

  animation: ${fadeInUp} 1.5s ease-out 1s backwards;

  &::after {
    content: "";
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, #fff, transparent);
    margin-top: 10px;
  }
`;
const ScrollWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

const SocialFloating = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;

  @media (max-width: 1024px) {
    display: none; // On cache ça sur les petits écrans
  }
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;

export default function Hero() {
  return (
    <HeroSection id="home">
      {/* 1. La Vidéo Background */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/homevideo.mp4" type="video/mp4" />
        {/* Fallback image si la vidéo ne charge pas */}
        Your browser does not support the video tag.
      </VideoBackground>

      {/* 2. Overlay sombre */}
      <Overlay />

      {/* 3. Contenu Glassmorphism */}
      <GlassContainer>
        <LocationBadge>
          <FiMapPin /> Toronto, Ontario
        </LocationBadge>

        <Title>
          Urban Sanctuary
          <span>In The City Heart</span>
        </Title>

        <Subtitle>
          Experience the warmth of luxury living. Our boutique apartments offer
          a serene escape with panoramic views, even when the snow falls.
        </Subtitle>

        <ButtonGroup>
          <PrimaryButton>
            Book Your Stay <FiArrowRight />
          </PrimaryButton>
          <SecondaryButton>View Gallery</SecondaryButton>
        </ButtonGroup>
      </GlassContainer>

      {/* 4. Éléments latéraux (Réseaux sociaux flottants à droite) */}
      <SocialFloating>
        <SocialIcon
          href="https://www.instagram.com/mahmoud__bh/"
          aria-label="Instagram"
        >
          <FiInstagram />
        </SocialIcon>
        <SocialIcon
          href="https://www.facebook.com/mahmoudbh7"
          aria-label="Facebook"
        >
          <FiFacebook />
        </SocialIcon>
        <SocialIcon
          href="https://www.linkedin.com/in/mahmoudbh7/"
          aria-label="LinkedIn"
        >
          <FiLinkedin />
        </SocialIcon>
      </SocialFloating>

      {/* 5. Scroll Indicator */}
      <ScrollWrapper>
        <ScrollIndicator>Scroll to Explore</ScrollIndicator>
      </ScrollWrapper>
    </HeroSection>
  );
}
