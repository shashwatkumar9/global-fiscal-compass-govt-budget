
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { translations, TranslationSet } from '@/data/translations';

export const useTranslations = (): TranslationSet => {
  const { language } = useLanguage();
  return translations[language] || translations.en;
};
