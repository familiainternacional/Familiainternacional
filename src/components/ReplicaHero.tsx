import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Shield } from 'lucide-react';

export default function ReplicaHero() {
  return (
    <div
      id="home"
      className="relative flex min-h-screen flex-col items-center pt-32 pb-10 px-4 overflow-hidden bg-[#07234c] font-sans"
    >
      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-7xl mx-auto mt-10 lg:mt-0">
        
        {/* Giant Headline */}
        <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-black text-white leading-[0.95] tracking-tight text-center flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
          <span className="mb-2 sm:mb-0">Familias</span>
          
          {/* Pill Image embedded in text */}
          <div className="relative inline-block w-[120px] h-[50px] sm:w-[180px] sm:h-[70px] md:w-[240px] md:h-[90px] lg:w-[280px] lg:h-[110px] rounded-full overflow-hidden shrink-0 align-middle shadow-xl shadow-black/10 mt-2 sm:mt-0">
            <Image
              src="/hero-santiago.png"
              alt="Familia Internacional"
              fill
              priority
              className="object-cover"
            />
          </div>
          
          <span className="w-full text-center mt-2 lg:mt-6">Sin Fronteras</span>
        </h1>

        {/* Subtitle - Kept from original content */}
        <p className="mt-8 max-w-2xl text-center text-base sm:text-lg lg:text-[19px] text-white/80 font-medium leading-[1.6]">
          Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente a la protección de familias y menores a nivel global.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            href="/evalua-tu-caso"
            className="flex items-center justify-center bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-[13px] tracking-widest uppercase rounded-full px-8 py-4 transition-all hover:scale-105 shadow-lg shadow-[#25d366]/20"
          >
            Evaluar mi caso
          </Link>
          
          <Link
            href="#services"
            className="group flex items-center gap-3 bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-[13px] tracking-widest uppercase rounded-full px-6 py-3.5 transition-all"
          >
            Necesito Ayuda
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Strip (Logos & Scroll) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
        
        {/* Left/Center Partners or Features */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 lg:gap-16 opacity-80">
          <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase text-white">
            <Shield className="w-5 h-5" />
            <span>Sustracción de Niños</span>
          </div>
          <div className="font-bold text-[1.1rem] tracking-tight text-white">
            Divorcios Internacionales
          </div>
          <div className="font-bold text-[1.1rem] tracking-tight text-white">
            Exequátur (Validación)
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex items-center gap-3 font-bold text-[11px] tracking-widest uppercase text-white opacity-60">
          Scroll Down
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20">
            <ArrowDown className="w-4 h-4" />
          </span>
        </div>
      </div>

    </div>
  );
}
