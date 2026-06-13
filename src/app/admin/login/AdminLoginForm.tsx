'use client';

import { useActionState } from 'react';
import { Lock, LogIn, Mail } from 'lucide-react';
import { loginAdmin, type LoginActionState } from './actions';

const initialState: LoginActionState = {};

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-small font-semibold text-gray-300">
          Correo administrador
        </span>
        <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4">
          <Mail className="h-4 w-4 text-[var(--color-primary)]" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="min-h-12 w-full bg-transparent text-white outline-none placeholder:text-gray-600"
            placeholder="admin@familiainternacional.cl"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-small font-semibold text-gray-300">
          Contraseña
        </span>
        <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4">
          <Lock className="h-4 w-4 text-[var(--color-primary)]" />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="min-h-12 w-full bg-transparent text-white outline-none placeholder:text-gray-600"
            placeholder="••••••••"
          />
        </span>
      </label>

      {state.error && (
        <p className="rounded-2xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-4 py-3 text-small text-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rlu-button rlu-button-primary min-h-12 w-full px-6 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LogIn className="h-4 w-4" />
        {isPending ? 'Ingresando...' : 'Ingresar al panel'}
      </button>
    </form>
  );
}
