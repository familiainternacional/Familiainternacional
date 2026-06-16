'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

type MediaThumbnailProps = {
  src: string;
  alt: string;
  variant?: 'video' | 'press';
  className?: string;
};

export default function MediaThumbnail({
  src,
  alt,
  variant = 'press',
  className = '',
}: MediaThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-tr from-[#07234c] to-[#185365] ${className}`}>
        {variant === 'video' ? (
          <PlayCircle className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white/90" />
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, 100vw"
      className={`transition-transform duration-500 group-hover:scale-105 ${
        variant === 'video' ? 'object-cover' : 'object-cover object-top'
      } ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
