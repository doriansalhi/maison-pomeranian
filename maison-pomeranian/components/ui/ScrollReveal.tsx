'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  /** Translation Y initiale en px (default 24) */
  y?: number;
  className?: string;
  /** Marge négative qui déclenche un peu en avance */
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  rootMargin = '-80px',
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: rootMargin }}
      variants={variants}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
