
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
    } else if (location.pathname === '/') {
      // Redirect to English version of homepage
      navigate('/en', { replace: true });
    }
  }, [params.lang, language, location.pathname, navigate]);

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    
    // Handle different page types
    if (location.pathname === '/' || location.pathname === `/${language}`) {
      // On homepage, navigate to language-specific homepage
      navigate(`/${newLang}`, { replace: true });
    } else if (location.pathname.startsWith('/tool/') && params.countrySlug && params.toolSlug) {
      // On tool page, change language in URL
      navigate(`/tool/${newLang}/${params.countrySlug}/${params.toolSlug}`, { replace: true });
    } else {
      // For other pages, try to maintain the structure
      const pathWithoutLang = location.pathname.replace(`/${params.lang || 'en'}`, '');
      navigate(`/${newLang}${pathWithoutLang}`, { replace: true });
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
