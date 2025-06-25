import { useState, useRef, useEffect } from "react";
import { continents } from "@/data/continents";
import { baseTools } from "@/data/tools";
import { handleToolNavigation } from "@/utils/toolNavigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useTranslations } from "@/hooks/useTranslations";
import { useNavigate } from "react-router-dom";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = useTranslations();

  const generateAllSuggestions = () => {
    const suggestions: string[] = [];
    
    // Add continent names
    Object.values(continents).forEach(continent => {
      suggestions.push(continent.name);
    });
    
    // Add all countries
    Object.values(continents).forEach(continent => {
      continent.countries.forEach(country => {
        suggestions.push(country);
      });
    });
    
    // Add base tools first
    suggestions.push(...baseTools);
    
    // Add country-specific tools for all countries across all continents
    Object.values(continents).forEach(continent => {
      continent.countries.forEach(country => {
        baseTools.forEach(tool => {
          suggestions.push(`${country} ${tool}`);
        });
      });
    });
    
    // Sort suggestions for better UX - prioritize exact matches and shorter strings
    return suggestions.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const queryLower = searchQuery.toLowerCase();
      
      // Exact matches first
      if (aLower === queryLower) return -1;
      if (bLower === queryLower) return 1;
      
      // Then starts with query
      const aStartsWith = aLower.startsWith(queryLower);
      const bStartsWith = bLower.startsWith(queryLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (bStartsWith && !aStartsWith) return 1;
      
      // Prioritize continents and countries over tools
      const aIsContinent = Object.values(continents).some(continent => continent.name === a);
      const bIsContinent = Object.values(continents).some(continent => continent.name === b);
      const aIsCountry = Object.values(continents).some(continent => continent.countries.includes(a));
      const bIsCountry = Object.values(continents).some(continent => continent.countries.includes(b));
      
      if ((aIsContinent || aIsCountry) && !(bIsContinent || bIsCountry)) return -1;
      if ((bIsContinent || bIsCountry) && !(aIsContinent || aIsCountry)) return 1;
      
      // Then shorter strings
      return a.length - b.length;
    });
  };

  const allSuggestions = generateAllSuggestions();

  const filteredSuggestions = searchQuery.length > 0 
    ? allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 15)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    // Check if it's a continent
    const continent = Object.entries(continents).find(([key, cont]) => cont.name === suggestion);
    if (continent) {
      const continentSlug = continent[0] === 'northAmerica' ? 'north-america' : 
                           continent[0] === 'southAmerica' ? 'south-america' : 
                           continent[0];
      navigate(`/continent/${language}/${continentSlug}`);
      setShowSearchSuggestions(false);
      setSearchQuery("");
      return;
    }
    
    // Check if it's a country
    const isCountry = Object.values(continents).some(continent => 
      continent.countries.includes(suggestion)
    );
    if (isCountry) {
      const countrySlug = suggestion === "United Kingdom" ? "uk" : 
                         suggestion.toLowerCase().replace(/\s+/g, '-');
      navigate(`/country/${language}/${countrySlug}`);
      setShowSearchSuggestions(false);
      setSearchQuery("");
      return;
    }
    
    // Otherwise, handle as a tool
    handleToolNavigation(suggestion, language, navigate);
    setShowSearchSuggestions(false);
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    showSearchSuggestions,
    setShowSearchSuggestions,
    searchRef,
    filteredSuggestions,
    handleToolClick: handleSuggestionClick,
    t,
  };
};
