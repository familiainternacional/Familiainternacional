'use client';

import Link from 'next/link';
import { Home, Briefcase, Info, MessageCircle } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { buildWhatsAppWidgetHref } from '@/lib/contact/links';
import { siteConfig } from '@/config/site';

export default function MobileTabBar({ whatsappNumber }: { whatsappNumber?: string }) {
  const { locale } = useI18n();
  const phone = whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(phone, locale);

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Intenta abrir el widget de Cliengo
    const cliengoButton = document.querySelector('#cliengo-button') as HTMLElement 
      || document.querySelector('.clgo-chat-launcher') as HTMLElement
      || document.querySelector('[class*="cliengo"]') as HTMLElement;
    if (cliengoButton) {
      cliengoButton.click();
    } else {
      // Si no encuentra el botón (quizás no cargó), alternativamente abre WhatsApp
      window.open(whatsappHref, '_blank');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden pointer-events-none">
      <nav className="mx-auto flex w-full max-w-sm items-center justify-between rounded-[2rem] bg-[#1a1a1a] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto">
        <Link href="/#home" className="flex flex-col items-center justify-center gap-1 text-white hover:text-gray-300 transition-colors">
          <Home size={22} strokeWidth={2} />
          <span className="text-[10px] font-bold tracking-wide">Inicio</span>
        </Link>
        <Link href="/#services" className="flex flex-col items-center justify-center gap-1 text-white hover:text-gray-300 transition-colors">
          <Briefcase size={22} strokeWidth={2} />
          <span className="text-[10px] font-bold tracking-wide">Servicios</span>
        </Link>
        <Link href="/nosotros" className="flex flex-col items-center justify-center gap-1 text-white hover:text-gray-300 transition-colors">
          <Info size={22} strokeWidth={2} />
          <span className="text-[10px] font-bold tracking-wide">Nosotros</span>
        </Link>
        <a 
          href={whatsappHref} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center justify-center gap-1 text-[#25D366] hover:text-[#20ba59] transition-colors"
        >
          <WhatsAppIcon size={22} />
          <span className="text-[10px] font-bold tracking-wide">WhatsApp</span>
        </a>
        <button 
          onClick={handleChatClick}
          className="flex flex-col items-center justify-center gap-1 text-[#0070f3] hover:text-[#0051b3] transition-colors"
        >
          <MessageCircle size={22} strokeWidth={2} />
          <span className="text-[10px] font-bold tracking-wide">Chat</span>
        </button>
      </nav>
    </div>
  );
}
