
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { continents } from "@/data/continents";
import MegaMenu from "./MegaMenu";
import { handleToolNavigation } from "@/utils/toolNavigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

interface ContinentalNavProps {
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

const ContinentalNav = ({ selectedCountry, setSelectedCountry }: ContinentalNavProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { language } = useLanguage();

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    setActiveMenu(null);
    // This will be used for routing to country-specific pages
    const countrySlug = country.toLowerCase().replace(/\s+/g, '-');
    console.log(`Selected country: ${country}, navigating to /${countrySlug}`);
    // In the future, this will use: navigate(`/${countrySlug}`);
  };

  const handleToolClick = (tool: string) => {
    handleToolNavigation(tool, language);
    setActiveMenu(null);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-0">
            {Object.entries(continents).map(([key, continent]) => (
              <div 
                key={key} 
                className="relative"
                onMouseEnter={() => {
                  setActiveMenu(key);
                  setHoveredCountry(null);
                }}
                onMouseLeave={() => {
                  setActiveMenu(null);
                  setHoveredCountry(null);
                }}
              >
                <button
                  className={`${continent.color} ${continent.hoverColor} text-white px-6 py-4 flex items-center space-x-2 transition-colors duration-200 font-medium text-sm`}
                >
                  <span>{continent.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mega Menu */}
                {activeMenu === key && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-xl border border-gray-200 rounded-b-lg z-50 w-[800px]"
                  >
                    <MegaMenu
                      continent={continent}
                      hoveredCountry={hoveredCountry}
                      setHoveredCountry={setHoveredCountry}
                      onCountryClick={handleCountryClick}
                      onToolClick={handleToolClick}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default ContinentalNav;
