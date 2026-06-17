'use client';

import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import ReCaptchaWrapper from '@/components/forms/ReCaptchaWrapper';
import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { resolveSiteContact } from '@/lib/site-contact';
import { HOME_SECTION_ANCHOR_CLASS, HOME_SECTION_TITLE_MUTED_CLASS } from '@/lib/layout';
import { useI18n } from '@/lib/i18n/I18nProvider';

function ReplicaContactFormInner() {
  const { dictionary } = useI18n();
  const contactForm = dictionary.forms.contact;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>(contactForm.error);
  
  const [formData, setFormData] = useState({
    name: '',
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
    setErrorMessage(contactForm.error);
    
    try {
      let token = '';
      if (executeRecaptcha) {
        token = await executeRecaptcha('evalua_tu_caso_submit');
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          recaptchaToken: token,
          recaptchaAction: 'evalua_tu_caso_submit',
        })
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        setErrorMessage(payload?.error ?? contactForm.error);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-card shadow-sm text-center h-full flex flex-col justify-center items-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-[#07234c]" />
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{contactForm.success}</h3>
        <p className="text-[#555555]">{contactForm.successDesc}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50"
        >
          {contactForm.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-card shadow-md border border-black/5">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wide">{contactForm.fields.name}</label>
          <input
            required
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#f9f8f6] border-none rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#07234c]/30"
            placeholder={contactForm.fields.namePlaceholder}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wide">{contactForm.fields.email}</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#f9f8f6] border-none rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#07234c]/30"
            placeholder={contactForm.fields.emailPlaceholder}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wide">{contactForm.fields.phone}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#f9f8f6] border-none rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#07234c]/30"
            placeholder={contactForm.fields.phonePlaceholder}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wide">{contactForm.fields.message}</label>
          <textarea
            required id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
            className="w-full bg-[#f9f8f6] border-none rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#07234c]/30 resize-none"
            placeholder={contactForm.fields.messagePlaceholder}
          />
        </div>

        <div className="pt-2">
          <button
            disabled={status === 'submitting'}
            type="submit"
            className="fi-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            {status === 'submitting' ? contactForm.submitting : contactForm.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ReplicaContactSection({ adminValues }: { adminValues?: SiteSettingsAdminValues | null }) {
  const { dictionary } = useI18n();
  const contactSection = dictionary.home.contact;
  const contact = resolveSiteContact(adminValues);

  return (
    <section id="contact" className={`w-full bg-[#f9f8f6] py-16 font-sans sm:py-24 ${HOME_SECTION_ANCHOR_CLASS}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Info */}
            <div>
              <p className="fi-eyebrow mb-4 text-[var(--color-primary)]">{contactSection.eyebrow}</p>
              <h2 className={`mb-6 max-w-sm ${HOME_SECTION_TITLE_MUTED_CLASS}`}>
                {contactSection.title}
              </h2>
              <p className="mb-12 max-w-md text-sm text-[#555555] sm:text-base">
                {contactSection.intro}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#1a1a1a] mt-0.5 shrink-0" />
                  <a href={contact.primaryPhoneHref} className="text-[#1a1a1a] font-medium text-sm sm:text-base hover:text-[var(--color-primary)] transition-colors hover:underline underline-offset-4 decoration-black/20">
                    {contact.primaryPhone}
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#1a1a1a] mt-0.5 shrink-0" />
                  <a href={`mailto:${contact.primaryEmail}`} className="text-[#1a1a1a] font-medium text-sm sm:text-base hover:text-[var(--color-primary)] transition-colors hover:underline underline-offset-4 decoration-black/20">
                    {contact.primaryEmail}
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#1a1a1a] mt-0.5 shrink-0" />
                  <span className="text-[#1a1a1a] font-medium text-sm sm:text-base leading-relaxed max-w-[250px]">
                    {contact.officeAddressMultiline}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:max-w-lg lg:ml-auto mx-auto">
              <ReCaptchaWrapper lazy>
                <ReplicaContactFormInner />
              </ReCaptchaWrapper>
            </div>
          </div>
      </div>
    </section>
  );
}
