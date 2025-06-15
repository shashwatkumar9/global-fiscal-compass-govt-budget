
export const languages = {
  en: { name: 'English', nativeName: 'English' },
  de: { name: 'German', nativeName: 'Deutsch' },
  fr: { name: 'French', nativeName: 'Français' },
  es: { name: 'Spanish', nativeName: 'Español' },
};

export type LanguageCode = keyof typeof languages;

export const languageList = Object.entries(languages).map(([code, details]) => ({
  code: code as LanguageCode,
  ...details,
}));
