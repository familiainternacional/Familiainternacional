'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const paymentMethods = [
  { name: 'PayPal', logo: '/paypal.svg' },
  { name: 'Wise', logo: '/wise.svg' },
  { name: 'MoneyGram', logo: '/moneygram.svg' },
  { name: 'Western Union', logo: '/westernunion.svg' },
];

export default function PaymentMethodsBanner() {
  const { locale } = useI18n();
  const title = locale === 'es' ? 'Métodos de pago internacionales aceptados' : 'International payment methods accepted';

  // Duplicate items to create a seamless infinite loop
  const carouselItems = [...paymentMethods, ...paymentMethods, ...paymentMethods, ...paymentMethods];

  return (
    <section className="w-full bg-[#f8f9fa] py-12 border-t border-[#07234c]/10 overflow-hidden relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#07234c]/60">
          {title}
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10" />

        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {carouselItems.map((method, idx) => (
            <div
              key={`${method.name}-${idx}`}
              className="flex w-64 items-center justify-center shrink-0 mx-4 opacity-70 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 relative overflow-hidden rounded-full bg-white shadow-sm flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={method.logo}
                    alt={`${method.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-lg font-bold text-[#07234c] tracking-tight">
                  {method.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * ${paymentMethods.length * 2})); /* Scroll half the items to loop seamlessly */
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
