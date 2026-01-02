import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiArrowRight, FiMessageCircle } from "react-icons/fi";

/* ================= STYLES ================= */

const ContactSection = styled.section`
  padding: 12rem 2rem;
  background: #fcfcfc;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 8rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 5rem;
  }
`;

/* Côté Gauche : Information Conciergerie */
const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 2rem;
  display: block;
`;

const Headline = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  line-height: 1.1;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
`;

const Description = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 4rem;
  font-weight: 300;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  .icon-box {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    color: #ffd700;
  }

  div {
    span {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #999;
      margin-bottom: 4px;
    }
    strong {
      font-size: 1.1rem;
      color: #1a1a1a;
      font-weight: 500;
    }
  }
`;

const FormCard = styled(motion.div)`
  background: white;
  padding: 5rem;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.03);
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
  grid-column: ${(props) => (props.full ? "span 2" : "span 1")};

  @media (max-width: 600px) {
    grid-column: span 1;
  }

  label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #1a1a1a;
    font-weight: 700;
    display: block;
    margin-bottom: 10px;
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem 0;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
    background: transparent;
    transition: border-color 0.3s ease;
    outline: none;

    &:focus {
      border-bottom-color: #ffd700;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 4rem;
  background: #111;
  color: white;
  border: none;
  padding: 1.5rem 3.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  width: fit-content;

  &:hover {
    background: #ffd700;
  }
`;

/* ================= COMPONENT ================= */

export default function Contact() {
  return (
    <ContactSection id="contact">
      <Wrapper>
        {/* Informations */}
        <InfoSide>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Personal Concierge</SectionLabel>
            <Headline>
              At Your Service, <span>Anytime.</span>
            </Headline>
            <Description>
              Whether you're looking for a specific residence or require bespoke
              arrangements for your stay, our dedicated team is ready to assist
              you 24/7.
            </Description>

            <ContactDetail>
              <div className="icon-box">
                <FiPhone size={20} />
              </div>
              <div>
                <span>Direct Line</span>
                <strong>+1 (416) 555-0123</strong>
              </div>
            </ContactDetail>

            <ContactDetail>
              <div className="icon-box">
                <FiMessageCircle size={20} />
              </div>
              <div>
                <span>WhatsApp Concierge</span>
                <strong>Chat with us now</strong>
              </div>
            </ContactDetail>

            <ContactDetail>
              <div className="icon-box">
                <FiMail size={20} />
              </div>
              <div>
                <span>Inquiries</span>
                <strong>reservations@boutique.com</strong>
              </div>
            </ContactDetail>
          </motion.div>
        </InfoSide>

        {/* Formulaire */}
        <FormCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FormGrid>
            <InputGroup>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </InputGroup>

            <InputGroup>
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </InputGroup>

            <InputGroup>
              <label>Expected Arrival</label>
              <input type="date" />
            </InputGroup>

            <InputGroup>
              <label>Number of Guests</label>
              <input type="number" placeholder="2" />
            </InputGroup>

            <InputGroup full>
              <label>Special Requests</label>
              <textarea
                rows="4"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </InputGroup>
          </FormGrid>

          <SubmitButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Send Request <FiArrowRight />
          </SubmitButton>
        </FormCard>
      </Wrapper>
    </ContactSection>
  );
}
