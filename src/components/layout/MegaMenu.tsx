
import { baseTools } from "@/data/tools";
import { handleToolNavigation } from "@/utils/toolNavigation";

interface MegaMenuProps {
  continent: {
    name: string;
    countries: string[];
  };
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
  onCountryClick: (country: string) => void;
  onToolClick?: (tool: string) => void;
}

const MegaMenu = ({ 
  continent, 
  hoveredCountry, 
  setHoveredCountry, 
  onCountryClick, 
  onToolClick 
}: MegaMenuProps) => {
  // Generate country-specific tools that persist during hover
  const getCountryTools = (country: string | null) => {
    if (!country) {
      return {
        popular: baseTools.slice(0, 10),
        advanced: baseTools.slice(10, 20)
      };
    }

    return {
      popular: baseTools.slice(0, 10).map(tool => `${country} ${tool}`),
      advanced: baseTools.slice(10, 20).map(tool => `${country} ${tool}`)
    };
  };

  const currentTools = getCountryTools(hoveredCountry);

  const handleToolClick = (tool: string) => {
    if (onToolClick) {
      onToolClick(tool);
    } else {
      handleToolNavigation(tool);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Countries Column */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Countries
          </h3>
          <div className="space-y-2">
            {continent.countries.map((country) => (
              <button
                key={country}
                onClick={() => onCountryClick(country)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150"
                onMouseEnter={() => setHoveredCountry(country)}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tools Column */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            {hoveredCountry ? `${hoveredCountry} Popular Tools` : 'Popular Tools'}
          </h3>
          <div className="space-y-2">
            {currentTools.popular.map((tool) => (
              <button
                key={tool}
                onClick={() => handleToolClick(tool)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 text-sm"
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Tools Column */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            {hoveredCountry ? `${hoveredCountry} Advanced Tools` : 'Advanced Tools'}
          </h3>
          <div className="space-y-2">
            {currentTools.advanced.map((tool) => (
              <button
                key={tool}
                onClick={() => handleToolClick(tool)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 text-sm"
              >
                {tool}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
