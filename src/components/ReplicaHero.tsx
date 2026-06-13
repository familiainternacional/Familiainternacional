import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function ReplicaHero() {
  return (
    <div
      id="home"
      className="fi-hero-offset flex min-h-screen flex-col gap-3 bg-white p-2 font-sans text-neutral-900 md:p-3 lg:flex-row"
    >
      
      {/* Left Column (35%) */}
      <div className="flex w-full flex-col justify-between rounded-[1.5rem] bg-white p-6 md:rounded-[2.5rem] md:p-10 lg:w-[35%]">
        {/* Middle: Description */}
        <div className="mb-20 mt-8 max-w-[320px] lg:mb-32 lg:mt-auto">
          <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-6">
            Derecho Internacional de Familia
          </h2>
          <p className="text-[17px] leading-[1.65] text-neutral-700 font-medium">
            Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente a la protección de familias y menores a nivel global.
          </p>
        </div>

        {/* Bottom: CTA */}
        <div>
          <button className="group flex items-center justify-between w-full sm:w-[260px] bg-[#07234c] text-white rounded-full p-2 pr-6 transition-all hover:bg-[#0a3066] shadow-lg shadow-[#07234c]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07234c] focus-visible:ring-offset-2">
            <span className="bg-white/15 text-white p-3 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <span className="text-[12px] font-bold tracking-widest uppercase">
              Descubrir más
            </span>
            <span className="w-4" /> {/* Spacer for balance */}
          </button>
        </div>
        
      </div>

      {/* Right Column (65%) */}
      <div className="relative w-full lg:w-[65%] min-h-[60vh] lg:min-h-0 bg-neutral-100 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
        
        {/* Background Image */}
        <Image
          src="/hero-santiago.png"
          alt="Derecho Internacional de Familia"
          fill
          priority
          className="object-cover"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />

        {/* Bottom Right Title */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:left-auto lg:right-12 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.05] font-medium tracking-tight lg:text-right">
            Familias
            <br />
            Sin Fronteras.
          </h1>
        </div>
      </div>

    </div>
  );
}
