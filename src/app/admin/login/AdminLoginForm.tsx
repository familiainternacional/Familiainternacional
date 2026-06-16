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
        <span className="mb-2 block text-small font-semibold text-gray-700">
          Correo administrador
        </span>
        <span className="flex items-center gap-3 rounded-2xl border border-[#07234c]/15 bg-white px-4">
          <Mail className="h-4 w-4 text-[var(--color-primary)]" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="min-h-12 w-full bg-transparent text-[#111827] outline-none placeholder:text-gray-400"
            placeholder="admin@familiainternacional.cl"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-small font-semibold text-gray-700">
          Contraseña
        </span>
        <span className="flex items-center gap-3 rounded-2xl border border-[#07234c]/15 bg-white px-4">
          <Lock className="h-4 w-4 text-[var(--color-primary)]" />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="min-h-12 w-full bg-transparent text-[#111827] outline-none placeholder:text-gray-400"
            placeholder="••••••••"
          />
        </span>
      </label>

      {state.error && (
        <p className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-small text-red-700">
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
