
import { useState, useRef, useEffect } from "react";
import { continents } from "@/data/continents";
import { baseTools } from "@/data/tools";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Generate comprehensive search suggestions including all country-tool combinations
  const generateAllToolSuggestions = () => {
    const suggestions = [...baseTools];
    
    // Add country-specific tools for all countries
    Object.values(continents).forEach(continent => {
      continent.countries.forEach(country => {
        baseTools.forEach(tool => {
          suggestions.push(`${country} ${tool}`);
        });
      });
    });
    
    return suggestions;
  };

  const allToolSuggestions = generateAllToolSuggestions();

  const filteredSuggestions = allToolSuggestions.filter(tool =>
    tool.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    const toolSlug = tool.toLowerCase().replace(/\s+/g, '-');
    console.log(`Navigating to /tool/${toolSlug}`);
    // In the future, this will use: navigate(`/tool/${toolSlug}`);
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
