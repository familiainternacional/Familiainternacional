'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { premiumEase } from '@/lib/motion/easings';

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
};

const REVEAL_TRANSITION = {
  duration: 0.38,
  ease: premiumEase,
} as const;

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06, margin: '0px 0px -12% 0px' }}
      transition={{
        ...REVEAL_TRANSITION,
        delay: Math.min(delay, 0.12),
      }}
    >
      {children}
    </motion.div>
  );
}
