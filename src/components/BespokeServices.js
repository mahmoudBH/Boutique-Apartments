import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiCoffee,
  FiTruck,
  FiWind,
  FiShield,
  FiBriefcase,
  FiMusic,
} from "react-icons/fi";

/* ================= STYLES ================= */

const ServicesSection = styled.section`
  padding: 10rem 2rem;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 7rem;
`;

const SectionLabel = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  color: #111;
  font-weight: 400;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px; /* لخلق تأثير الفواصل الرفيعة */
  background: #eee; /* لون الفواصل */
  border: 1px solid #eee;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    z-index: 2;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
  }

  .icon-wrapper {
    margin-bottom: 2rem;
    color: #111;
    font-size: 2.5rem;
    transition: color 0.3s ease;
  }

  &:hover .icon-wrapper {
    color: #ffd700;
  }
`;

const ServiceTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  font-weight: 400;
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.8;
  color: #777;
  max-width: 280px;
  font-weight: 300;
`;

/* ================= DATA ================= */

const servicesData = [
  {
    icon: <FiTruck />,
    title: "Chauffeur Service",
    desc: "Luxury airport transfers and city tours in our fleet of premium executive vehicles.",
  },
  {
    icon: <FiCoffee />,
    title: "Private Chef",
    desc: "Experience world-class dining in your own suite with our curated personal chefs.",
  },
  {
    icon: <FiWind />,
    title: "Daily Housekeeping",
    desc: "Unobtrusive, professional cleaning services maintaining the highest standards of hygiene.",
  },
  {
    icon: <FiShield />,
    title: "24/7 Security",
    desc: "Our buildings feature advanced security systems and dedicated on-site personnel.",
  },
  {
    icon: <FiBriefcase />,
    title: "Business Center",
    desc: "High-speed fiber internet and dedicated workspaces for the modern professional.",
  },
  {
    icon: <FiMusic />,
    title: "Event Planning",
    desc: "Host intimate gatherings or executive meetings with our bespoke planning team.",
  },
];

/* ================= COMPONENT ================= */

export default function BespokeServices() {
  return (
    <ServicesSection id="services">
      <Container>
        <Header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Elevating Your Stay</SectionLabel>
            <Title>Bespoke Professional Services</Title>
          </motion.div>
        </Header>

        <ServicesGrid>
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="icon-wrapper">{service.icon}</div>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.desc}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
}
