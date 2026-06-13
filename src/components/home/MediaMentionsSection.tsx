import React from 'react';
import { ArrowUpRight, PlayCircle } from 'lucide-react';

const MEDIA_VIDEOS = [
  {
    id: 1,
    source: 'YouTube',
    title: 'Análisis del caso judicial',
    description: 'Comentarios y análisis detallado sobre procesos internacionales y protección de menores.',
    url: 'https://www.youtube.com/watch?v=mLSScUYiRQ8',
    thumbnail: 'https://img.youtube.com/vi/mLSScUYiRQ8/hqdefault.jpg',
  },
  {
    id: 2,
    source: 'YouTube',
    title: 'Entrevista y cobertura legal',
    description: 'Participación especial explicando los alcances de la ley en conflictos familiares transfronterizos.',
    url: 'https://www.youtube.com/watch?v=NAUoyTDqyI0',
    thumbnail: 'https://img.youtube.com/vi/NAUoyTDqyI0/hqdefault.jpg',
  },
  {
    id: 3,
    source: 'T13',
    title: 'Drama judicial en Estados Unidos',
    description: 'Cobertura de Teletrece sobre el complejo caso de custodia internacional de la actriz chilena Mane Swett.',
    url: 'https://www.t13.cl/videos/espectaculos/el-drama-judicial-mane-swett-estados-unidos-10-5-2024',
    thumbnail: null,
  },
];

export default function MediaMentionsSection() {
  return (
    <section id="medios" className="relative z-10 w-full bg-[#f8fafc] px-5 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="bg-[#07234c]/10 text-[#07234c] text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] py-2.5 px-5 rounded-full mb-8">
          Casos Destacados en Prensa
        </div>

        {/* Main Title */}
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-black text-[#1c1c1c] text-center max-w-4xl leading-[1.1] tracking-tight mb-16">
          Apariciones en medios y análisis de nuestros expertos
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {MEDIA_VIDEOS.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden bg-white border border-neutral-200/80 rounded-[2.5rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07234c]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full bg-[#07234c] overflow-hidden flex items-center justify-center">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#07234c] to-[#185365] opacity-90 group-hover:scale-105 transition-transform duration-500"></div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <PlayCircle className="absolute w-12 h-12 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#07234c] uppercase tracking-widest mb-3 block">
                    {video.source}
                  </span>
                  <h3 className="text-xl font-bold text-[#1c1c1c] mb-3 leading-tight group-hover:text-[#07234c] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-neutral-600 mb-8 line-clamp-3">
                    {video.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-neutral-100 mt-auto">
                  <span className="text-sm font-bold text-neutral-400 group-hover:text-[#1c1c1c] transition-colors">
                    Ver video
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-400 group-hover:bg-neutral-50 group-hover:text-[#1c1c1c] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
