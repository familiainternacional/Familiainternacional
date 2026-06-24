'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import ReCaptchaWrapper from './ReCaptchaWrapper';
import { useOptionalExecuteRecaptcha } from '@/lib/security/use-optional-execute-recaptcha';
import { getLeadAttributionFromBrowser } from '@/lib/leads/attribution';

type EvaluaTuCasoFormVariant = 'default' | 'light';

const EVALUATE_CTA_BUTTON_CLASS =
  'inline-flex min-h-[56px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-8 text-base font-bold text-[#07234c] shadow-xl shadow-[#07234c]/20 transition-all hover:scale-[1.02] hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:w-auto sm:px-10 sm:text-lg';

const EVALUATE_CTA_BUTTON_LIGHT_CLASS = `${EVALUATE_CTA_BUTTON_CLASS} border border-[#07234c]/10`;

const LIGHT_FIELD_CLASS =
  'border-black/10 bg-white/70 text-[#111827] placeholder:text-[#9ca3af] backdrop-blur-sm';

function EvaluaTuCasoFormInner({
  variant = 'default',
  fillHeight = false,
}: {
  variant?: EvaluaTuCasoFormVariant;
  fillHeight?: boolean;
}) {
  const { dictionary } = useI18n();
  const evalua = dictionary.forms.evalua;
  const executeRecaptcha = useOptionalExecuteRecaptcha();
  const isLight = variant === 'light';
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>(evalua.error);
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
    setErrorMessage(evalua.error);
    try {
      let token = '';
      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha('evalua_tu_caso_submit');
        } catch (recaptchaError) {
          console.error('[recaptcha] execute failed', recaptchaError);
        }
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...getLeadAttributionFromBrowser(),
          leadSource: variant === 'light' ? 'home_hero_form' : 'evalua_tu_caso_form',
          recaptchaToken: token,
          recaptchaAction: 'evalua_tu_caso_submit',
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        setErrorMessage(payload?.error ?? evalua.error);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isLight ? 'border border-black/10 bg-transparent p-6 text-[#111827]' : 'bg-[#051830] p-8 border border-white/10 text-white'} rounded-card text-center`}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
          <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <h3 className={`mb-4 text-h3 ${isLight ? 'text-[#111827]' : 'text-white'}`}>{evalua.success}</h3>
        <p className={`mb-8 max-w-[65ch] text-body ${isLight ? 'text-[#4b5563]' : 'text-gray-400'}`}>
          {evalua.successDesc}
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className={`${isLight ? 'border-black/10 bg-black/[0.03] text-[#111827] hover:bg-black/[0.06]' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'} rounded-card border px-8 py-3 text-small font-medium transition-colors`}
        >
          {evalua.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`${isLight ? 'bg-transparent p-0 md:p-0 border-0 shadow-none' : 'bg-[#051830] p-5 min-[380px]:p-6 md:p-10 border border-white/10'} relative overflow-hidden ${isLight ? 'rounded-none' : 'rounded-card'} ${fillHeight ? 'lg:flex lg:h-full lg:flex-col' : ''}`}>
      {!isLight ? (
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--color-primary)]/10 blur-[100px]" />
      ) : null}
      
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="min-w-0 max-w-[65ch] text-body">{errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`relative z-10 ${isLight ? 'space-y-5' : 'space-y-6'} ${fillHeight ? 'lg:flex lg:h-full lg:flex-col' : ''}`}
      >
        <div className={`grid grid-cols-1 gap-5 ${isLight ? 'md:grid-cols-2 md:gap-5' : 'md:grid-cols-2 gap-6'}`}>
          <div className="space-y-2">
            <label htmlFor="name" className={`text-small font-medium ${isLight ? 'text-[#374151]' : 'text-gray-300'}`}>
              {evalua.fields.name} <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${isLight ? LIGHT_FIELD_CLASS : 'bg-[#07234c] border-white/10 text-white'} w-full rounded-card border px-4 py-3 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
              placeholder={evalua.fields.namePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className={`text-small font-medium ${isLight ? 'text-[#374151]' : 'text-gray-300'}`}>
              {evalua.fields.email} <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${isLight ? LIGHT_FIELD_CLASS : 'bg-[#07234c] border-white/10 text-white'} w-full rounded-card border px-4 py-3 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
              placeholder={evalua.fields.emailPlaceholder}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={`text-small font-medium ${isLight ? 'text-[#374151]' : 'text-gray-300'}`}>
            {evalua.fields.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${isLight ? LIGHT_FIELD_CLASS : 'bg-[#07234c] border-white/10 text-white'} w-full rounded-card border px-4 py-3 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
            placeholder={evalua.fields.phonePlaceholder}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className={`text-small font-medium ${isLight ? 'text-[#374151]' : 'text-gray-300'}`}>
            {evalua.fields.message} <span className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            required
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={isLight ? 4 : 5}
            className={`${isLight ? LIGHT_FIELD_CLASS : 'bg-[#07234c] border-white/10 text-white'} w-full resize-none rounded-card border px-4 py-3 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
            placeholder={evalua.fields.messagePlaceholder}
          />
        </div>

        <button
          disabled={status === 'submitting'}
          type="submit"
          className={`${isLight ? EVALUATE_CTA_BUTTON_LIGHT_CLASS : EVALUATE_CTA_BUTTON_CLASS} ${fillHeight ? 'lg:mb-8 lg:mt-auto' : ''}`}
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-[#07234c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {evalua.submitting}
            </span>
          ) : (
            <>
              {evalua.submit}
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function EvaluaTuCasoForm({
  variant = 'default',
  fillHeight = false,
  lazyRecaptcha = true,
}: {
  variant?: EvaluaTuCasoFormVariant;
  fillHeight?: boolean;
  lazyRecaptcha?: boolean;
}) {
  return (
    <ReCaptchaWrapper lazy={lazyRecaptcha} forceActive={!lazyRecaptcha}>
      <EvaluaTuCasoFormInner variant={variant} fillHeight={fillHeight} />
    </ReCaptchaWrapper>
  );
}
