
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { languages, LanguageCode } from '@/data/languages';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ lang?: LanguageCode; countrySlug?: string; toolSlug?: string }>();

  // Sync language state with URL param
  useEffect(() => {
    if (params.lang && languages[params.lang]) {
      if (language !== params.lang) {
        setLanguageState(params.lang);
      }
    }
  }, [params.lang, language]);

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang); // Optimistically update state
    // If on a tool page, navigate to the new language version
    if (location.pathname.startsWith('/tool/') && params.countrySlug && params.toolSlug) {
      const currentPath = location.pathname;
      const newPath = currentPath.replace(`/tool/${params.lang || 'en'}/`, `/tool/${newLang}/`);
      if (currentPath !== newPath) {
        navigate(newPath);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
