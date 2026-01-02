import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";

/* ================= STYLES ================= */

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ scrolled }) =>
    scrolled ? "rgba(255,255,255,0.95)" : "transparent"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ scrolled }) => (scrolled ? "1rem 2rem" : "1.5rem 3rem")};
  z-index: 1000;
  transition: all 0.4s ease;
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none"};

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const Logo = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  cursor: pointer;
  color: ${({ scrolled, mobileOpen }) =>
    scrolled || mobileOpen ? "#1a1a1a" : "#ffffff"};
  transition: color 0.4s ease;
  z-index: 102;

  span {
    color: #ffd700;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    transform: translateY(${({ mobileOpen }) => (mobileOpen ? "0" : "-100vh")});
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
  }
`;

const getLinkColor = (scrolled, mobileOpen) => {
  if (mobileOpen) return "#1a1a1a";
  if (scrolled) return "#1a1a1a";
  return "#ffffff";
};

const NavLink = styled(ScrollLink)`
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  color: ${({ scrolled, mobileOpen }) => getLinkColor(scrolled, mobileOpen)};
  transition: color 0.4s ease;

  &.active {
    color: #ffd700;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0%;
    height: 2px;
    background: #ffd700;
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`;

const CTAButton = styled(ScrollLink)`
  padding: 0.8rem 1.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.3s ease;

  ${({ scrolled, mobileOpen }) =>
    !scrolled && !mobileOpen
      ? css`
          background: transparent;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.8);

          &:hover {
            background: #ffffff;
            color: #000000;
          }
        `
      : css`
          background: #000000;
          color: #ffffff;
          border-color: #000000;

          &:hover {
            background: #ffd700;
            transform: translateY(-2px);
          }
        `}

  @media (max-width: 768px) {
    background: #ffd700;
    color: #ffffff;
    border-color: #ffd700;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${({ scrolled, mobileOpen }) =>
    scrolled || mobileOpen ? "#1a1a1a" : "#ffffff"};
  z-index: 102;

  @media (max-width: 768px) {
    display: block;
  }
`;

/* ================= COMPONENT ================= */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "apartments", label: "Residences" },
    { id: "about", label: "Story" },
    { id: "services", label: "Services" },
    { id: "location", label: "Location" },
    { id: "experience", label: "Experience" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <Nav scrolled={scrolled}>
      <Logo scrolled={scrolled} mobileOpen={mobileOpen}>
        Toronto Boutique<span>.</span>
      </Logo>

      <MenuIcon
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FiX /> : <FiMenu />}
      </MenuIcon>

      <NavLinks mobileOpen={mobileOpen}>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.id}
            spy={true}
            smooth="easeInOutQuart"
            duration={900}
            offset={-80}
            activeClass="active"
            onClick={() => setMobileOpen(false)}
            scrolled={scrolled ? 1 : 0}
            mobileOpen={mobileOpen ? 1 : 0}
          >
            {item.label}
          </NavLink>
        ))}

        <CTAButton
          to="contact"
          smooth="easeInOutQuart"
          duration={900}
          offset={-80}
          onClick={() => setMobileOpen(false)}
          scrolled={scrolled ? 1 : 0}
          mobileOpen={mobileOpen ? 1 : 0}
        >
          Book Your Stay
        </CTAButton>
      </NavLinks>
    </Nav>
  );
}
