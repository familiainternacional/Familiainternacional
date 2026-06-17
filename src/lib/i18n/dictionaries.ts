import type { Locale } from './config';
import { es } from '@/locales/es';
import { en } from '@/locales/en';
import type { DeepStringKey } from './keys';

export const dictionaries = {
  es,
  en,
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
export type TranslationKey = DeepStringKey<typeof es>;

function getNestedValue(obj: unknown, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((prev, curr) => {
    if (prev && typeof prev === 'object' && curr in prev) {
      return (prev as Record<string, unknown>)[curr];
    }

    return undefined;
  }, obj);

  return typeof value === 'string' ? value : undefined;
}

export function translate(locale: Locale, key: TranslationKey): string {
  const dictionary = dictionaries[locale] ?? dictionaries.es;
  const value = getNestedValue(dictionary, key);

  if (value === undefined) {
    const fallbackValue = getNestedValue(dictionaries.es, key);
    return fallbackValue ?? key;
  }

  return value;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}

export function formatTranslation(
  locale: Locale,
  key: TranslationKey,
  variables: Record<string, string>,
): string {
  let text = translate(locale, key);
  for (const [name, value] of Object.entries(variables)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}
