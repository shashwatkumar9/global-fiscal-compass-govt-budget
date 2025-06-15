
export const languages = {
  en: { name: 'English', nativeName: 'English' },
  de: { name: 'German', nativeName: 'Deutsch' },
  fr: { name: 'French', nativeName: 'Français' },
  es: { name: 'Spanish', nativeName: 'Español' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  zh: { name: 'Mandarin', nativeName: '中文' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
};

export type LanguageCode = keyof typeof languages;

export const languageList = Object.entries(languages).map(([code, details]) => ({
  code: code as LanguageCode,
  ...details,
}));
