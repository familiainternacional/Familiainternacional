'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, Mail, Smartphone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { buildGoogleMapsEmbedFromCoordinates } from '@/lib/maps/google-maps-embed';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaWrapper from '../forms/ReCaptchaWrapper';

const OFFICE_LAT = -33.41628375;
const OFFICE_LNG = -70.5920947147805;
const MAP_EMBED_SRC = buildGoogleMapsEmbedFromCoordinates(OFFICE_LAT, OFFICE_LNG, 16);
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`;

function OfficeMapSectionInner({ showPageHeader = true }: { showPageHeader?: boolean }) {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState(
    isSpanish
      ? 'Ocurrio un error al enviar su solicitud. Por favor intente nuevamente.'
      : 'An error occurred while sending your request. Please try again.',
  );
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(
      isSpanish
        ? 'Ocurrio un error al enviar su solicitud. Por favor intente nuevamente.'
        : 'An error occurred while sending your request. Please try again.',
    );
    
    let token = '';
    if (executeRecaptcha) {
      token = await executeRecaptcha('home_contact_form_submit');
    }
    
    const finalMessage = formData.company 
      ? `Empresa/Cargo: ${formData.company}\n\n${formData.message}`
      : formData.message;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: finalMessage,
          leadSource: 'home_contact_form',
          recaptchaToken: token,
          recaptchaAction: 'home_contact_form_submit',
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        setErrorMessage(
          payload?.error ??
            (isSpanish
              ? 'Ocurrio un error al enviar su solicitud. Por favor intente nuevamente.'
              : 'An error occurred while sending your request. Please try again.'),
        );
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-white py-16 text-[#07234c] md:py-28"
    >
      {/* TOP: Title & Subtitle */}
      {showPageHeader ? (
        <div className="fi-section-header mx-auto max-w-[1440px] px-5 md:px-12 lg:px-24">
          <p className="fi-eyebrow text-[var(--color-primary)]">
            {isSpanish ? 'Contacto' : 'Contact'}
          </p>
          <h2 id="contact-title" className="fi-section-heading text-[#07234c]">
            {isSpanish ? 'Contáctanos' : 'Get In Touch'}
          </h2>
          <p className="fi-section-intro">
            {isSpanish
              ? 'Nos encantaría escucharte. Ya sea que tengas dudas, necesites asesoría legal o quieras conocer más sobre nuestros servicios, nuestro equipo está aquí para ayudarte.'
              : 'We\'d love to hear from you! Whether you have questions, need legal advice, or want to learn more about our services, our team is here to help.'}
          </p>
        </div>
      ) : null}

      {/* MIDDLE: Contained Map */}
      <div className={`mx-auto max-w-[1440px] px-5 md:px-12 lg:px-24 ${showPageHeader ? 'mb-16 md:mb-28' : 'mb-12 md:mb-16'}`}>
        <div className="relative h-[360px] overflow-hidden rounded-[18px] bg-[#f2f2f2] md:h-[560px]">
          <iframe
            title={isSpanish ? 'Mapa de Familia Internacional' : 'Familia Internacional map'}
            src={MAP_EMBED_SRC}
            className="absolute inset-0 h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          
          {/* Floating Button inside map */}
          <div className="absolute bottom-5 left-5 z-10 md:bottom-8 md:left-8">
            <Link
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#07234c] px-5 py-3 text-small font-medium text-white transition-all hover:scale-105 hover:bg-[var(--color-primary)] md:px-6 md:py-3.5"
            >
              {isSpanish ? 'Cómo llegar' : 'Get Directions'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM: Request a Demo / Form */}
      <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-5 md:px-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-24">
        <div>
          <h3 className="text-h3 font-bold text-[#07234c]">
            {isSpanish ? 'Evalúa tu caso' : 'Request a Demo'}
          </h3>
          <p className="fi-section-intro">
            {isSpanish
              ? 'Cuéntanos brevemente qué necesitas y nuestro equipo evaluará el mejor camino jurídico para avanzar con claridad.'
              : 'Tell us briefly what you need and our team will evaluate the best legal path forward with clarity.'}
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center rounded-[20px] bg-white p-10 text-center border border-[#07234c]/5 min-h-[400px]">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
              <CheckCircle2 className="h-8 w-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="fi-card-title mb-4 text-[#07234c]">
              {isSpanish ? '¡Mensaje Enviado!' : 'Message Sent!'}
            </h3>
            <p className="fi-card-desc mb-8 max-w-[45ch]">
              {isSpanish 
                ? 'Hemos recibido su solicitud. Un abogado de nuestro equipo revisará su caso y se pondrá en contacto a la brevedad.'
                : 'We have received your request. One of our lawyers will review your case and contact you shortly.'}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="rounded-full border border-[#07234c]/10 bg-white px-8 py-3 text-small font-semibold text-[#07234c] transition-all hover:bg-[#07234c]/5 hover:border-[#07234c]/20"
            >
              {isSpanish ? 'Enviar nueva consulta' : 'Send new message'}
            </button>
          </div>
        ) : (
          <form className="grid sm:grid-cols-2 gap-x-6 gap-y-8" onSubmit={handleSubmit}>
            {status === 'error' && (
              <div className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}
            
            {/* Field: Full Name */}
            <div>
              <label className="mb-3 block text-small font-bold text-[#07234c]">
                {isSpanish ? 'Nombre Completo' : 'Full Name'}<span className="text-[var(--color-primary)]">*</span>
              </label>
              <div className="relative flex items-center rounded-xl bg-[#f4f6f8] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-shadow">
                <User className="absolute left-4 h-5 w-5 text-gray-400" strokeWidth={1.5} />
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isSpanish ? 'Ingresa tu nombre...' : 'Enter your name...'}
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-small text-[#07234c] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            
            {/* Field: Job Position / Empresa */}
            <div>
              <label className="mb-3 block text-small font-bold text-[#07234c]">
                {isSpanish ? 'Empresa / Cargo' : 'Job Position'}
              </label>
              <div className="relative flex items-center rounded-xl bg-[#f4f6f8] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-shadow">
                <Briefcase className="absolute left-4 h-5 w-5 text-gray-400" strokeWidth={1.5} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={isSpanish ? 'Ingresa tu empresa o cargo...' : 'Enter your job position...'}
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-small text-[#07234c] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div>
              <label className="mb-3 block text-small font-bold text-[#07234c]">
                {isSpanish ? 'Correo Electrónico' : 'Email Address'}<span className="text-[var(--color-primary)]">*</span>
              </label>
              <div className="relative flex items-center rounded-xl bg-[#f4f6f8] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-shadow">
                <Mail className="absolute left-4 h-5 w-5 text-gray-400" strokeWidth={1.5} />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={isSpanish ? 'Ingresa tu correo...' : 'Enter your email...'}
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-small text-[#07234c] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Field: Phone */}
            <div>
              <label className="mb-3 block text-small font-bold text-[#07234c]">
                {isSpanish ? 'Teléfono' : 'Phone Number'}
              </label>
              <div className="relative flex items-center rounded-xl bg-[#f4f6f8] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-shadow">
                <Smartphone className="absolute left-4 h-5 w-5 text-gray-400" strokeWidth={1.5} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={isSpanish ? 'Ingresa tu teléfono...' : 'Enter your phone number...'}
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-small text-[#07234c] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            
            {/* Field: Message */}
            <div className="sm:col-span-2">
              <label className="mb-3 block text-small font-bold text-[#07234c]">
                {isSpanish ? 'Mensaje' : 'Message'}<span className="text-[var(--color-primary)]">*</span>
              </label>
              <div className="relative flex rounded-xl bg-[#f4f6f8] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-shadow">
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isSpanish ? 'Cuéntanos brevemente sobre tu caso...' : 'Tell us briefly about your case...'}
                  className="w-full bg-transparent py-4 px-5 text-small text-[#07234c] outline-none placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="rlu-button rlu-button-primary flex min-h-12 w-full items-center justify-center gap-2 px-10 sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isSpanish ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>{isSpanish ? 'Enviar Solicitud' : 'Submit Request'}</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default function OfficeMapSection({ showPageHeader = true }: { showPageHeader?: boolean }) {
  return (
    <ReCaptchaWrapper>
      <OfficeMapSectionInner showPageHeader={showPageHeader} />
    </ReCaptchaWrapper>
  );
}
