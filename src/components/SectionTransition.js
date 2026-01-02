import React from "react";
import { motion } from "framer-motion";

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
