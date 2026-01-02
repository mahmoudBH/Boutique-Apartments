import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Apartments from "./components/Apartments";
import About from "./components/About";
import GuestExperience from "./components/GuestExperience";
import PhotoGallery from "./components/PhotoGallery";
import BespokeServices from "./components/BespokeServices";
import Neighborhood from "./components/Neighborhood";
import Contact from "./components/contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import ScrollReveal from "./components/SectionTransition";

/* ================= GLOBAL STYLES ================= */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    cursor: none !important;
  }

  html.lenis {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #050505; /* الخلفية سوداء دائماً لمنع الوميض */
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <PageTransition key="loader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Header />
            <main>
              <Hero />
              <Apartments />
              <About />
              <ScrollReveal>
                <BespokeServices />
              </ScrollReveal>
              <Neighborhood />
              <GuestExperience />
              <PhotoGallery />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
