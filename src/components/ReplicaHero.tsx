import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Shield } from 'lucide-react';
import PressOutletStrip from '@/components/home/PressOutletStrip';

export default function ReplicaHero() {
  return (
    <div
      id="home"
      className="relative flex min-h-0 flex-col items-center overflow-hidden bg-[#07234c] px-4 pb-10 pt-32 font-sans sm:pt-36 lg:pt-40"
    >
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-5xl flex-1 flex-col items-center justify-center lg:mt-4">
        <h1 className="text-display flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-white sm:gap-x-3">
          <span>Familias</span>

          <span className="relative inline-block h-[44px] w-[108px] shrink-0 overflow-hidden rounded-full align-middle shadow-lg shadow-black/10 sm:h-[52px] sm:w-[132px] md:h-[60px] md:w-[156px] lg:h-[68px] lg:w-[176px]">
            <Image src="/hero-santiago.png" alt="" fill priority className="object-cover" aria-hidden />
          </span>

          <span className="w-full text-center">Sin Fronteras</span>
        </h1>

        <div className="mt-8 flex w-full max-w-lg flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link href="/evalua-tu-caso" className="fi-btn-hero fi-btn-hero--primary w-full sm:w-auto">
            Evaluar mi caso
          </Link>

          <Link
            href="#services"
            className="fi-btn-hero fi-btn-hero--secondary group w-full gap-3 sm:w-auto"
          >
            Necesito ayuda
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
              <ArrowUpRight className="h-4 w-4 text-white" aria-hidden />
            </span>
          </Link>
        </div>

        <p className="fi-prose mt-8 text-center fi-section-lead text-white/82">
          Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente a la protección de familias y
          menores a nivel global.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 px-4 pt-8 sm:mt-16 sm:flex-row">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-85 sm:justify-start lg:gap-12">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
              <Shield className="h-5 w-5" aria-hidden />
              <span>Sustracción de Niños</span>
            </div>
            <div className="text-base font-bold tracking-tight text-white">Divorcios Internacionales</div>
            <div className="text-base font-bold tracking-tight text-white">Exequátur (Validación)</div>
          </div>
          <PressOutletStrip className="justify-center text-white/55 sm:justify-start" />
        </div>

        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60">
          Scroll Down
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
            <ArrowDown className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}
