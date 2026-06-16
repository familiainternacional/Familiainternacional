'use client';

import Image from 'next/image';

type SectionBackgroundImageProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
};

export default function SectionBackgroundImage({
  src,
  alt = '',
  priority = false,
  className = '',
}: SectionBackgroundImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes="100vw"
      quality={priority ? 82 : 75}
      className={`object-cover object-center ${className}`}
    />
  );
}
