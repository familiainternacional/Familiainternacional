'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      // Tailwind !important classes to disable animation on desktop (md and above)
      // framer-motion uses inline styles, so !important is required to override them
      className="md:!opacity-100 md:!transform-none"
    >
      {children}
    </motion.div>
  );
}
