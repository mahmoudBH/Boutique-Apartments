import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

/* ================= STYLES ================= */

const TestimonialSection = styled.section`
  padding: 12rem 2rem;
  background: linear-gradient(to bottom, #ffffff, #f9f9f9);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const SectionLabel = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: #111;
  font-weight: 400;
`;

const TestimonialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  position: relative;
`;

const QuoteCard = styled(motion.div)`
  background: white;
  padding: 5rem;
  border-radius: 4px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.03);
  text-align: center;
  max-width: 800px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  /* علامة اقتباس ديكورية */
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Playfair Display", serif;
    font-size: 10rem;
    color: #f0f0f0;
    line-height: 1;
    z-index: -1;
  }
`;

const QuoteText = styled.p`
  font-family: "Playfair Display", serif;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  line-height: 1.6;
  color: #1a1a1a;
  font-style: italic;
  margin-bottom: 2.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 2px solid #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  strong {
    font-size: 1rem;
    letter-spacing: 1px;
    color: #111;
  }

  span {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 5px;
  color: #ffd700;
  margin-bottom: 1rem;
  justify-content: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
`;

const NavBtn = styled.button`
  background: white;
  border: 1px solid #eee;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #111;

  &:hover {
    border-color: #ffd700;
    color: #ffd700;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

/* ================= DATA ================= */

const reviews = [
  {
    id: 1,
    text: "The Yorkville Suite was beyond my expectations. The attention to detail and the concierge service made my business trip feel like a retreat.",
    author: "Alexander Wright",
    position: "CEO, TechVision",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    text: "Une expérience inoubliable. L'appartement était d'une propreté impeccable et le design est digne d'un hôtel 5 étoiles.",
    author: "Marie Laurent",
    position: "Fashion Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    text: "Best executive stay in Toronto. Period. The views from the Penthouse are unmatched and the location is perfect for anyone.",
    author: "James Peterson",
    position: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

/* ================= COMPONENT ================= */

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <TestimonialSection id="experience">
      <Container>
        <Header>
          <SectionLabel>Guest Stories</SectionLabel>
          <Title>Unmatched Experiences</Title>
        </Header>

        <TestimonialWrapper>
          <AnimatePresence mode="wait">
            <QuoteCard
              key={reviews[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} fill="currentColor" size={14} />
                ))}
              </Stars>

              <QuoteText>{reviews[index].text}</QuoteText>

              <AuthorInfo>
                <img src={reviews[index].image} alt={reviews[index].author} />
                <strong>{reviews[index].author}</strong>
                <span>{reviews[index].position}</span>
              </AuthorInfo>
            </QuoteCard>
          </AnimatePresence>
        </TestimonialWrapper>

        <Controls>
          <NavBtn onClick={prevReview} aria-label="Previous testimonial">
            <FiChevronLeft size={24} />
          </NavBtn>
          <NavBtn onClick={nextReview} aria-label="Next testimonial">
            <FiChevronRight size={24} />
          </NavBtn>
        </Controls>
      </Container>
    </TestimonialSection>
  );
}
