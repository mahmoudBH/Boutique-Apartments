import React, { useState } from "react";
import styled from "styled-components";
import { FiX, FiArrowRight, FiCamera, FiMaximize } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ================= STYLES - WHITE LUXURY GALLERY ================= */

const Section = styled.section`
  padding: 10rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.05),
      transparent
    );
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1400px;
  margin: 0 auto 6rem;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
  }
`;

const TitleBox = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;
`;

const SectionLabel = styled.span`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  color: #d4af37;
  font-weight: 700;
  margin-bottom: 1.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 40px;
    height: 1px;
    background: #d4af37;
    margin-right: 15px;
  }
`;

const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: #1a1a1a;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.5px;

  span {
    color: #d4af37;
    font-style: italic;
    font-weight: 400;
  }
`;

const Subtitle = styled.p`
  color: #666666;
  font-size: 1rem;
  line-height: 1.8;
  margin-top: 1.5rem;
  font-weight: 300;
  max-width: 500px;
`;

const ViewMoreBtn = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #1a1a1a;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.4s ease;
  border-radius: 2px;

  &:hover {
    background: #1a1a1a;
    border-color: #1a1a1a;
    color: #ffffff;
    gap: 20px;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 240px;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    grid-auto-rows: 200px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
  grid-column: ${(props) => props.layout.col};
  grid-row: ${(props) => props.layout.row};
  background: #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);

  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  z-index: 3;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.5s ease;

  ${ImageCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #d4af37;
  padding: 4px 8px;
  border-radius: 2px;
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const ImageTitle = styled.h4`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #fff;
  font-weight: 400;
  margin: 0;
`;

const ExpandIcon = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s ease;
  z-index: 3;
  backdrop-filter: blur(5px);

  ${ImageCard}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;

/* ============== Lightbox (Cinema Mode) ============== */

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const LightboxContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LightboxImage = styled(motion.img)`
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 10002;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
    color: #d4af37;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;

  &:hover {
    background: #d4af37;
    border-color: #d4af37;
    color: #000;
  }

  &.prev {
    left: 2rem;
  }
  &.next {
    right: 2rem;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    &.prev {
      left: 1rem;
    }
    &.next {
      right: 1rem;
    }
  }
`;

const LightboxInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  z-index: 10001;

  h3 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    font-weight: 400;
    margin: 0 0 0.5rem 0;
    color: #e9e9e9ff;
  }

  p {
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
  }
`;

/* Ambient Glow for Light Theme - subtle warm light */
const AmbientGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 70%
  );
  border-radius: 50%;
  top: -10%;
  right: -10%;
  pointer-events: none;
  z-index: 0;
`;

/* ================= COMPONENT ================= */

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryData = [
    {
      id: 1,
      url: "/apartment1.png",
      title: "The Grand Living Space",
      category: "Architectural",
      layout: { col: "span 8", row: "span 2" },
    },
    {
      id: 2,
      url: "/481637056.jpg",
      title: "Master Suite",
      category: "Luxury",
      layout: { col: "span 4", row: "span 1" },
    },
    {
      id: 3,
      url: "/481637032.jpg",
      title: "Chef's Kitchen",
      category: "Culinary",
      layout: { col: "span 4", row: "span 2" },
    },
    {
      id: 4,
      url: "/481637027.jpg",
      title: "Skyline Panorama",
      category: "View",
      layout: { col: "span 4", row: "span 1" },
    },
    {
      id: 5,
      url: "/481636794.jpg",
      title: "Spa Bath Retreat",
      category: "Wellness",
      layout: { col: "span 4", row: "span 1" },
    },
    {
      id: 6,
      url: "/477974748.jpg",
      title: "Study Lounge",
      category: "Library",
      layout: { col: "span 4", row: "span 2" },
    },
    {
      id: 7,
      url: "/477974684.jpg",
      title: "Dining Pavilion",
      category: "Entertainment",
      layout: { col: "span 4", row: "span 1" },
    },
    {
      id: 8,
      url: "/477974683.jpg",
      title: "Urban Terrace",
      category: "Exterior",
      layout: { col: "span 4", row: "span 1" },
    },
  ];

  const openLightbox = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % galleryData.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryData[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex =
      (currentIndex - 1 + galleryData.length) % galleryData.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryData[newIndex]);
  };

  return (
    <Section id="gallery">
      <AmbientGlow />

      <HeaderContainer>
        <TitleBox>
          <SectionLabel>
            <FiCamera style={{ marginRight: "10px" }} />
            Visual Documentation
          </SectionLabel>
          <Title>
            Design <span>Excellence</span>
            <br />
            Through Our Lens
          </Title>
          <Subtitle>
            Each photograph tells a story of meticulous craftsmanship and
            architectural precision that defines the Toronto Boutique Apartments
            experience.
          </Subtitle>
        </TitleBox>

        <ViewMoreBtn whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Explore Full Gallery <FiArrowRight />
        </ViewMoreBtn>
      </HeaderContainer>

      <GalleryGrid>
        {galleryData.map((img, index) => (
          <ImageCard
            key={img.id}
            layout={img.layout}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            onClick={() => openLightbox(img, index)}
          >
            <ExpandIcon>
              <FiMaximize />
            </ExpandIcon>
            <GalleryImage src={img.url} alt={img.title} loading="lazy" />
            <Overlay>
              <CategoryBadge>{img.category}</CategoryBadge>
              <ImageTitle>{img.title}</ImageTitle>
            </Overlay>
          </ImageCard>
        ))}
      </GalleryGrid>

      <AnimatePresence>
        {selectedImage && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <CloseButton onClick={closeLightbox}>
              <FiX size={32} />
            </CloseButton>

            <LightboxContent>
              <NavButton className="prev" onClick={prevImage}>
                <FiArrowRight style={{ transform: "rotate(180deg)" }} />
              </NavButton>

              <LightboxImage
                key={selectedImage.id}
                src={selectedImage.url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              />

              <NavButton className="next" onClick={nextImage}>
                <FiArrowRight />
              </NavButton>
            </LightboxContent>

            <LightboxInfo>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </LightboxInfo>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default PhotoGallery;
