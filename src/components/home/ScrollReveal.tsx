'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { premiumEase } from '@/lib/motion/easings';

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
};

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -72px 0px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: premiumEase,
      }}
    >
      {children}
    </motion.div>
  );
}
