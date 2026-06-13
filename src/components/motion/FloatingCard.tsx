'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cardSpring, premiumEase } from '@/lib/motion/easings';

type FloatingCardProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  delay?: number;
};

export default function FloatingCard({
  children,
  className = '',
  index = 0,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.96, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.7,
        delay: delay + index * 0.08,
        ease: premiumEase,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: cardSpring,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
