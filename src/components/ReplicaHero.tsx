import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import BookCallButton from '@/components/home/BookCallButton';
import { PRIMARY_BUTTON_XL_CLASS, SITE_CONTAINER_CLASS, HOME_SECTION_ANCHOR_CLASS } from '@/lib/layout';

export default function ReplicaHero() {
  return (
    <section 
      className="relative w-full pb-10 pt-[84px] sm:pt-[100px] xl:pb-12 xl:pt-[104px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/hero-bg.png)' }}
    >
      <div className="absolute inset-0 bg-[#07234c]/30 backdrop-blur-[2px]"></div>
      <div className={`relative z-10 ${SITE_CONTAINER_CLASS}`}>
        <div
          id="home"
          className={`relative w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/85 backdrop-blur-lg shadow-[0_30px_80px_rgba(0,0,0,0.2)] sm:rounded-[2rem] xl:rounded-[2.25rem] ${HOME_SECTION_ANCHOR_CLASS}`}
        >
          <div className="grid min-h-[500px] lg:min-h-[580px] lg:grid-cols-2 lg:items-stretch xl:min-h-[620px]">
            <div className="flex h-full min-h-0 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:justify-between lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16">
              <div className="space-y-4 lg:space-y-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b7280] sm:text-[13px]">
                  Derecho Internacional de Familia · Chile
                </p>

                <h1 className="text-left text-[clamp(1.875rem,2.3vw+0.65rem,3rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#111827] lg:text-[clamp(2.1rem,2vw+0.85rem,3.15rem)]">
                  <span className="block">Familias</span>
                  <span className="block">Sin Fronteras</span>
                </h1>

                <p className="sr-only">
                  Familia Internacional — estudio jurídico en Chile especializado en Derecho Internacional de Familia:
                  divorcios internacionales, sustracción de menores, exequátur y custodia transfronteriza.
                </p>

                <p className="max-w-2xl text-left text-[0.9375rem] font-medium leading-relaxed text-[#4b5563] sm:text-base lg:max-w-none lg:text-[1.0625rem] lg:leading-7 xl:max-w-xl">
                  Si su caso cruza países, le ayudamos a entender qué conviene, dónde actuar y cuál es el primer paso
                  procesal — con abogados especializados en convenios internacionales y tribunales chilenos.
                </p>
              </div>

              <div className="mt-8 w-full sm:mt-10 lg:mb-8 lg:mt-0">
                <BookCallButton
                  text="Agendar Videollamada"
                  className={`${PRIMARY_BUTTON_XL_CLASS} [&_svg]:h-5 [&_svg]:w-5`}
                />
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16">
              <EvaluaTuCasoForm variant="light" fillHeight />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
