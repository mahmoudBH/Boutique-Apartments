// src/components/Apartments.js
import React, { useState, useMemo, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiSearch, FiCheck, FiMapPin, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ================= STYLES ================= */

const Section = styled.section`
  padding: 10rem 2rem;
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
  position: relative;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto 5rem;
`;

const SectionLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: block;
  opacity: 0.8;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #111;
  margin-bottom: 1.5rem;
  font-family: "Playfair Display", serif;
  font-weight: 400;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: #666;
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
`;

/* Floating Glassmorphism Filter Bar */
const FilterBar = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  padding: 0.8rem 2rem;
  border-radius: 100px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto 5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);

  @media (max-width: 900px) {
    border-radius: 20px;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1.5;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    width: 100%;
  }
`;

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1rem;
  width: 100%;
  outline: none;
  color: #1a1a1a;
  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  color: #444;
  flex: 0.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
`;

const Card = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.25s ease;

  &:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
    transform: translateY(-6px);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.2, 1, 0.3, 1);
  }
  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;

const ImgControls = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
`;

const MapBtn = styled.button`
  background: rgba(255, 255, 255, 0.92);
  border: none;
  padding: 8px 10px;
  font-size: 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.15s ease,
    background 0.15s ease;
  &:hover {
    transform: translateY(-3px);
    background: #fff;
  }
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.35rem 0.7rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
  color: #111;
  z-index: 2;
  border-radius: 6px;
`;

const CardContent = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
`;

const CardTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.15rem;
  color: #1a1a1a;
  margin: 0;
`;

const PriceTag = styled.div`
  text-align: right;
  .amount {
    color: #ffd700;
    font-weight: 700;
    font-size: 1.05rem;
    display: block;
  }
  .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 1px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #888;
  font-size: 0.85rem;
  border-top: 1px solid #f5f5f5;
  padding-top: 1rem;
  margin-top: auto;
`;

const ViewLink = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #111;
  display: flex;
  align-items: center;
  gap: 12px;
  &::after {
    content: "";
    width: 30px;
    height: 1px;
    background: #ffd700;
    transition: width 0.3s ease;
  }
`;

const ExploreAllWrapper = styled.div`
  margin-top: 4.5rem;
  text-align: center;
`;
const ExploreLead = styled.p`
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.95rem;
  letter-spacing: 1px;
`;
const ExploreAllBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: 1px solid #111;
  color: #111;
  padding: 0.95rem 2.2rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    background: #111;
    color: #fff;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  width: 100%;
  max-width: 1200px;
  height: 85vh;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    max-height: 90vh;
  }
`;

const ModalGallery = styled.div`
  flex: 1.4;
  background: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  img {
    width: 100%;
    height: 58%;
    object-fit: cover;
    display: block;
  }
`;

const MapFrameWrap = styled(motion.div)`
  width: 100%;
  height: 40%;
  background: #e9ecef;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  > iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

const ModalInfo = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  h3 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    margin: 0 0 1rem;
  }
  p {
    line-height: 1.6;
    color: #555;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const BookBtn = styled.button`
  background: #111;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.3s;
  &:hover {
    background: #ffd700;
  }
`;

/* ================= DATA ================= */

const apartmentsData = [
  {
    id: 1,
    title: "The Yorkville Suite",
    price: "$3,200",
    beds: 1,
    bath: 1,
    size: "850 sqft",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980",
    featured: true,
    desc: "Minimalist masterpiece in the design district with Italian marble finishes.",
    mapUrl:
      "https://www.google.com/maps?q=43.670278,-79.393282&z=15&output=embed",
  },
  {
    id: 2,
    title: "Skyline Penthouse",
    price: "$5,500",
    beds: 3,
    bath: 2,
    size: "1,400 sqft",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070",
    featured: true,
    desc: "Panoramic 360-degree views of the CN Tower with a private sky terrace.",
    mapUrl: "https://www.google.com/maps?q=43.6532,-79.3832&z=14&output=embed",
  },
  {
    id: 3,
    title: "Distillery Loft",
    price: "$2,800",
    beds: 1,
    bath: 1,
    size: "720 sqft",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
    featured: false,
    desc: "Industrial charm with exposed brickwork and smart home integration.",
    mapUrl: "https://www.google.com/maps?q=43.6502,-79.3597&z=15&output=embed",
  },
  {
    id: 4,
    title: "Executive Harbour",
    price: "$3,800",
    beds: 2,
    bath: 2,
    size: "1,100 sqft",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070",
    featured: false,
    desc: "Waterfront living with premium amenities and direct harbour access.",
    mapUrl: "https://www.google.com/maps?q=43.6545,-79.3800&z=14&output=embed",
  },
  {
    id: 5,
    title: "The King West Loft",
    price: "$3,450",
    beds: 2,
    bath: 1,
    size: "950 sqft",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    featured: true,
    desc: "Sophisticated design in the heart of the Entertainment District.",
    mapUrl: "https://www.google.com/maps?q=43.6453,-79.3950&z=15&output=embed",
  },
  {
    id: 6,
    title: "Bloor Luxury Suite",
    price: "$4,100",
    beds: 2,
    bath: 2,
    size: "1,200 sqft",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    featured: false,
    desc: "Elegant residence on the famous Bloor-Yorkville luxury corridor.",
    mapUrl: "https://www.google.com/maps?q=43.6680,-79.3948&z=15&output=embed",
  },
];

/* ================= RENDER ================= */

export default function Apartments() {
  const [query, setQuery] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const [mapPulse, setMapPulse] = useState(false);

  const filtered = useMemo(() => {
    return apartmentsData.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) &&
        (bedrooms ? a.beds === Number(bedrooms) : true),
    );
  }, [query, bedrooms]);

  useEffect(() => {
    if (!selected) return;
    if (selected.openMap) {
      const t = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setMapPulse(true);
          setTimeout(() => setMapPulse(false), 900);
        }
      }, 120);
      return () => clearTimeout(t);
    }
  }, [selected]);

  return (
    <Section id="apartments">
      <HeaderContainer>
        <SectionLabel>Our Collection</SectionLabel>
        <Title>Refined Living Spaces</Title>
        <Subtitle>
          Hand-picked executive rentals designed for the discerning traveler.
          Every residence is a statement of style and comfort.
        </Subtitle>
      </HeaderContainer>

      <FilterBar role="search" aria-label="Apartment filters">
        <SearchGroup>
          <FiSearch size={18} color="#FFD700" />
          <Input
            placeholder="Search by residence name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search apartments"
          />
        </SearchGroup>

        <Select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          aria-label="Bedrooms"
        >
          <option value="">All Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
        </Select>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "10px 28px",
            borderRadius: 999,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          QUICK BOOK
        </motion.button>
      </FilterBar>

      <Grid>
        <AnimatePresence>
          {filtered.map((apt, i) => (
            <Card
              key={apt.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => setSelected(apt)}
              role="button"
              tabIndex={0}
              aria-label={`Open details for ${apt.title}`}
            >
              <ImgContainer>
                {apt.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                <img src={apt.img} alt={apt.title} loading="lazy" />
                <ImgControls>
                  <MapBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected({ ...apt, openMap: true });
                    }}
                    aria-label={`Voir la carte de ${apt.title}`}
                    title="Voir la carte"
                  >
                    <FiMapPin /> Voir la carte
                  </MapBtn>
                </ImgControls>
              </ImgContainer>

              <CardContent>
                <CardHeader>
                  <CardTitle>{apt.title}</CardTitle>
                  <PriceTag>
                    <span className="amount">{apt.price}</span>
                    <span className="label">Monthly Rate</span>
                  </PriceTag>
                </CardHeader>

                <div style={{ color: "#666", fontSize: ".95rem" }}>
                  {apt.desc}
                </div>

                <MetaInfo>
                  <span>{apt.beds} BED</span>
                  <span>{apt.bath} BATH</span>
                  <span>{apt.size}</span>
                </MetaInfo>

                <ViewLink>View Residence</ViewLink>
              </CardContent>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>

      <ExploreAllWrapper>
        <ExploreLead>
          Looking for more residences? Explore our full collection and find your
          perfect match.
        </ExploreLead>
        <ExploreAllBtn
          href="/all-apartments"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore All Apartments <FiArrowRight />
        </ExploreAllBtn>
      </ExploreAllWrapper>

      <AnimatePresence>
        {selected && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            aria-modal="true"
            role="dialog"
            aria-label={`${selected.title} details`}
          >
            <ModalContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalGallery>
                <img src={selected.img} alt={selected.title} loading="lazy" />
                {selected.mapUrl ? (
                  <MapFrameWrap
                    ref={mapRef}
                    initial={false}
                    animate={mapPulse ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                    transition={{ duration: 0.9 }}
                    aria-hidden={false}
                  >
                    <iframe
                      title={`map-${selected.id}`}
                      src={selected.mapUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </MapFrameWrap>
                ) : (
                  <MapFrameWrap
                    ref={mapRef}
                    aria-hidden="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                    }}
                  >
                    <FiMapPin /> &nbsp; Location not available
                  </MapFrameWrap>
                )}
              </ModalGallery>

              <ModalInfo>
                <span
                  style={{
                    color: "#FFD700",
                    fontWeight: 700,
                    fontSize: ".8rem",
                    letterSpacing: "3px",
                    marginBottom: "1rem",
                    display: "block",
                  }}
                >
                  RESERVE NOW
                </span>
                <h3>{selected.title}</h3>
                <p>{selected.desc}</p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      background: "#f9f9f9",
                      borderRadius: "4px",
                    }}
                  >
                    <small
                      style={{
                        color: "#000000ff",
                        display: "block",
                        fontSize: "0.7rem",
                        letterSpacing: "1px",
                      }}
                    >
                      RESIDENCE TYPE
                    </small>
                    <strong
                      style={{
                        color: "#999",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {selected.beds} Rooms
                    </strong>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      background: "#f9f9f9",
                      borderRadius: "4px",
                    }}
                  >
                    <small
                      style={{
                        color: "#000000ff",
                        display: "block",
                        fontSize: "0.7rem",
                        letterSpacing: "1px",
                      }}
                    >
                      TOTAL AREA
                    </small>
                    <strong
                      style={{
                        color: "#999",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {selected.size}
                    </strong>
                  </div>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                      fontSize: ".95rem",
                      color: "#555",
                    }}
                  >
                    <FiCheck color="#FFD700" /> 24/7 Dedicated Concierge
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                      fontSize: ".95rem",
                      color: "#555",
                    }}
                  >
                    <FiCheck color="#FFD700" /> Premium High-Speed Wi-Fi
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                      fontSize: ".95rem",
                      color: "#555",
                    }}
                  >
                    <FiCheck color="#FFD700" /> Weekly Professional Cleaning
                  </div>
                </div>

                <BookBtn
                  onClick={() => alert("Redirecting to secure booking...")}
                >
                  Request Booking • {selected.price}
                </BookBtn>
              </ModalInfo>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}
