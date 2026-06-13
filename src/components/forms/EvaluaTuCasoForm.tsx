'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaWrapper from './ReCaptchaWrapper';

function EvaluaTuCasoFormInner() {
  useI18n();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState(
    'Ocurrio un error al enviar su solicitud. Por favor, intente nuevamente o contactenos por telefono.',
  );
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
    setErrorMessage('Ocurrio un error al enviar su solicitud. Por favor, intente nuevamente o contactenos por telefono.');
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
          ...formData,
          recaptchaToken: token,
          recaptchaAction: 'evalua_tu_caso_submit',
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        setErrorMessage(payload?.error ?? 'Ocurrio un error al enviar su solicitud. Por favor, intente nuevamente o contactenos por telefono.');
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
        className="bg-[#051830] p-8 rounded-2xl border border-white/10 text-center"
      >
        <div className="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <h3 className="mb-4 text-h3 text-white">¡Hemos recibido su solicitud!</h3>
        <p className="mb-8 max-w-[65ch] text-body text-gray-400">
          Un abogado de nuestro equipo revisará su caso y se pondrá en contacto con usted a la brevedad posible.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-small font-medium text-white transition-colors hover:bg-white/10"
        >
          Enviar otra consulta
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#051830] p-5 min-[380px]:p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="min-w-0 max-w-[65ch] text-body">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-small font-medium text-gray-300">
              Nombre Completo <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#07234c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-small font-medium text-gray-300">
              Correo Electrónico <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#07234c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
              placeholder="ejemplo@correo.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-small font-medium text-gray-300">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#07234c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            placeholder="+56 9 ..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-small font-medium text-gray-300">
            Descripción de su Caso <span className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            required
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full bg-[#07234c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none"
            placeholder="Describa brevemente la situación legal en la que necesita asesoría..."
          />
        </div>

        <button
          disabled={status === 'submitting'}
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-small font-medium text-white transition-all hover:bg-[#d62828] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            <>
              Solicitar Evaluación
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function EvaluaTuCasoForm() {
  return (
    <ReCaptchaWrapper>
      <EvaluaTuCasoFormInner />
    </ReCaptchaWrapper>
  );
}
