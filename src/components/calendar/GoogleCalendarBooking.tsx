import Link from 'next/link';
import { CalendarDays, ExternalLink } from 'lucide-react';

type GoogleCalendarBookingProps = {
  bookingUrl?: string;
};

type BookingProvider = 'google' | 'cal';

function getSafeBookingProvider(url: string): BookingProvider | null {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== 'https:') return null;

    if (['calendar.google.com', 'calendar.app.google'].includes(parsed.hostname)) {
      return 'google';
    }

    if (parsed.hostname === 'cal.com' || parsed.hostname.endsWith('.cal.com')) {
      return 'cal';
    }

    return null;
  } catch {
    return null;
  }
}

export default function GoogleCalendarBooking({ bookingUrl }: GoogleCalendarBookingProps) {
  const normalizedUrl = bookingUrl?.trim();
  const provider = normalizedUrl ? getSafeBookingProvider(normalizedUrl) : null;

  if (!normalizedUrl || !provider) {
    return null;
  }

  const providerLabel = provider === 'cal' ? 'Cal.com' : 'Google Calendar';
  const title =
    provider === 'cal'
      ? 'Reserve una reuni&oacute;n en Cal.com'
      : 'Reserve una reuni&oacute;n en Google Calendar';
  const description =
    provider === 'cal'
      ? 'Elija un horario disponible y confirme su reuni&oacute;n directamente desde la p&aacute;gina de reservas.'
      : 'Elija un horario disponible y Google Calendar bloquear&aacute; autom&aacute;ticamente los espacios ocupados.';

  return (
    <section
      aria-labelledby="calendar-booking-title"
      className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#051830]"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
        <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
              <CalendarDays className="h-4 w-4" />
              Agenda directa
            </span>
            <h2 id="calendar-booking-title" className="font-serif text-h2 leading-tight text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-[65ch] text-body text-gray-400">
              {description}
            </p>
          </div>

          <Link
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-small font-semibold text-white transition-colors hover:bg-white/10 sm:w-fit"
          >
            Abrir en {providerLabel}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="min-h-[680px] border-t border-white/10 bg-white lg:border-l lg:border-t-0">
          <iframe
            src={normalizedUrl}
            title={`Reservas de ${providerLabel} - Ruiz Leiva Abogados`}
            className="h-[680px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
