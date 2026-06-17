export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const premiumTransition = {
  duration: 0.42,
  ease: premiumEase,
} as const;

export const cardSpring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};
