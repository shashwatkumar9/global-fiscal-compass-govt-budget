
import { useState, useRef, useEffect } from "react";
import { continents } from "@/data/continents";
import { baseTools } from "@/data/tools";
import { handleToolNavigation } from "@/utils/toolNavigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Generate comprehensive search suggestions including all country-tool combinations
  const generateAllToolSuggestions = () => {
    const suggestions: string[] = [];
    
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
      
      // Then country-specific tools (they contain country names)
      const aIsCountrySpecific = Object.values(continents).some(continent =>
        continent.countries.some(country => aLower.startsWith(country.toLowerCase()))
      );
      const bIsCountrySpecific = Object.values(continents).some(continent =>
        continent.countries.some(country => bLower.startsWith(country.toLowerCase()))
      );
      
      if (aIsCountrySpecific && !bIsCountrySpecific) return -1;
      if (bIsCountrySpecific && !aIsCountrySpecific) return 1;
      
      // Then shorter strings
      return a.length - b.length;
    });
  };

  const allToolSuggestions = generateAllToolSuggestions();

  const filteredSuggestions = searchQuery.length > 0 
    ? allToolSuggestions.filter(tool =>
        tool.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 15) // Increased to 15 suggestions for better coverage
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

  const handleToolClick = (tool: string) => {
    handleToolNavigation(tool, language);
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
    handleToolClick
  };
};
