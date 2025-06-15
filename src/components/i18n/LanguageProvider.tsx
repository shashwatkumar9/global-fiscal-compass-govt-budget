
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
    
    console.log('Setting language to:', newLang, 'Current path:', location.pathname);
    
    // Handle different page types - prioritize tool pages first
    if (location.pathname.includes('/tool/')) {
      // Parse the tool URL to extract country and tool parts
      const pathParts = location.pathname.split('/').filter(Boolean);
      console.log('Tool page - path parts:', pathParts);
      
      // Tool URLs should be: /tool/{lang}/{country}/{tool}
      if (pathParts[0] === 'tool' && pathParts.length >= 4) {
        const [, currentLang, countrySlug, toolSlug] = pathParts;
        const newPath = `/tool/${newLang}/${countrySlug}/${toolSlug}`;
        console.log('Navigating to tool page:', newPath);
        navigate(newPath, { replace: true });
        return;
      }
    }
    
    if (location.pathname === '/' || location.pathname === `/${language}`) {
      // On homepage, navigate to language-specific homepage
      navigate(`/${newLang}`, { replace: true });
    } else if (location.pathname.startsWith(`/${language}`)) {
      // For other language-specific pages, replace the language part
      const pathWithoutLang = location.pathname.replace(`/${language}`, '');
      navigate(`/${newLang}${pathWithoutLang}`, { replace: true });
    } else {
      // Fallback: try to maintain the current structure with the new language
      const pathSegments = location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && languages[pathSegments[0] as LanguageCode]) {
        // Replace the first segment (language) with the new language
        pathSegments[0] = newLang;
        navigate(`/${pathSegments.join('/')}`, { replace: true });
      } else {
        // If no language in path, prepend the new language
        navigate(`/${newLang}${location.pathname}`, { replace: true });
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
