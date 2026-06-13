'use client';

import { Calendar } from 'lucide-react';

interface BookCallButtonProps {
  className?: string;
  text?: string;
  calLink?: string;
}

export default function BookCallButton({ 
  className = "inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand-dark transition-all font-medium",
  text = "Agendar Videollamada",
  calLink = "sebastian-leiva-gutierrez-unljsw/30min" // Cuenta corporativa principal
}: BookCallButtonProps) {
  const bookingUrl = `https://cal.com/${calLink}`;

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Calendar className="w-5 h-5" />
      {text}
    </a>
  );
}
