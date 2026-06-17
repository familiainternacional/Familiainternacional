'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  isSupportedCurrency,
  isSupportedLocale,
  type Locale,
  type SupportedCurrency,
} from './config';
import { translate, getDictionary, formatTranslation, type TranslationKey, type Dictionary } from './dictionaries';
import { siteConfig } from '@/config/site';

interface I18nContextValue {
  locale: Locale;
  currency: SupportedCurrency;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  t: (key: TranslationKey, variables?: Record<string, string>) => string;
  dictionary: Dictionary;
}

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialCurrency?: SupportedCurrency;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALE_STORAGE_KEY = `${siteConfig.storageKeyPrefix}.locale`;
const CURRENCY_STORAGE_KEY = `${siteConfig.storageKeyPrefix}.currency`;
const PREFERENCE_CHANGE_EVENT = `${siteConfig.storageKeyPrefix}.preferences-change`;

function writePreferenceCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function persistPreferences(preferences: Partial<{ locale: Locale; currency: SupportedCurrency }>) {
  void fetch('/api/i18n/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
    keepalive: true,
  }).catch(() => {
    // The client cookie above is enough for the current session if the request is interrupted.
  });
}

function emitPreferenceChange() {
  window.dispatchEvent(new Event(PREFERENCE_CHANGE_EVENT));
}

function subscribePreferences(onStoreChange: () => void) {
  const handleChange = () => onStoreChange();
  window.addEventListener(PREFERENCE_CHANGE_EVENT, handleChange);
  window.addEventListener('storage', handleChange);
  return () => {
    window.removeEventListener(PREFERENCE_CHANGE_EVENT, handleChange);
    window.removeEventListener('storage', handleChange);
  };
}

function readStoredLocale(fallback: Locale): Locale {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isSupportedLocale(stored) ? stored : fallback;
}

function readStoredCurrency(fallback: SupportedCurrency): SupportedCurrency {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
  return isSupportedCurrency(stored) ? stored : fallback;
}

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialCurrency = DEFAULT_CURRENCY,
}: I18nProviderProps) {
  const router = useRouter();
  const locale = useSyncExternalStore(
    subscribePreferences,
    () => readStoredLocale(initialLocale),
    () => initialLocale,
  );
  const currency = useSyncExternalStore(
    subscribePreferences,
    () => readStoredCurrency(initialCurrency),
    () => initialCurrency,
  );

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    writePreferenceCookie('NEXT_LOCALE', locale);
    if (locale !== initialLocale) {
      persistPreferences({ locale });
    }

    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    writePreferenceCookie('NEXT_CURRENCY', currency);
    if (currency !== initialCurrency) {
      persistPreferences({ currency });
    }
  }, [currency, initialCurrency, initialLocale, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    currency,
    dictionary: getDictionary(locale),
    setLocale(nextLocale) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      writePreferenceCookie('NEXT_LOCALE', nextLocale);
      persistPreferences({ locale: nextLocale });
      emitPreferenceChange();
      router.refresh();
    },
    setCurrency(nextCurrency) {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
      writePreferenceCookie('NEXT_CURRENCY', nextCurrency);
      persistPreferences({ currency: nextCurrency });
      emitPreferenceChange();
      router.refresh();
    },
    t(key, variables) {
      if (variables) {
        return formatTranslation(locale, key, variables);
      }
      return translate(locale, key);
    },
  }), [currency, locale, router]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider.');
  }

  return context;
}
