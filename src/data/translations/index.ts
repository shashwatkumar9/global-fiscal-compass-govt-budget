
import { TranslationSet } from './types';
import { enTranslations } from './en';
import { deTranslations } from './de';
import { frTranslations } from './fr';
import { esTranslations } from './es';
import { hiTranslations } from './hi';
import { zhTranslations } from './zh';
import { jaTranslations } from './ja';
import { arTranslations } from './ar';

export const translations: Record<string, TranslationSet> = {
  en: enTranslations,
  de: deTranslations,
  fr: frTranslations,
  es: esTranslations,
  hi: hiTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  ar: arTranslations
};

export { TranslationSet } from './types';
