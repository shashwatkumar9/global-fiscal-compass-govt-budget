
import { Button } from "@/components/ui/button";
import { topToolsForEconomies, topEconomies } from "@/data/tools";
import { handleToolNavigation } from "@/utils/toolNavigation";

interface FeaturedToolsProps {
  selectedCountry: string | null;
  onClearCountrySelection: () => void;
  onToolClick?: (tool: string) => void;
  onEconomyCountryClick: (country: string) => void;
}

const FeaturedTools = ({ 
  selectedCountry, 
  onClearCountrySelection, 
  onToolClick, 
  onEconomyCountryClick 
}: FeaturedToolsProps) => {
  // Get featured tools based on selected country
  const getFeaturedTools = () => {
    if (selectedCountry) {
      return topToolsForEconomies.map(tool => `${selectedCountry} ${tool}`);
    }
    return topToolsForEconomies;
  };

  const featuredTools = getFeaturedTools();

  const handleClick = (tool: string) => {
    if (onToolClick) {
      onToolClick(tool);
    } else {
      handleToolNavigation(tool);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {selectedCountry 
            ? `Featured Tools for ${selectedCountry}` 
            : 'Featured Tools for Major Economies'
          }
        </h2>
        {selectedCountry && (
          <Button 
            variant="outline" 
            onClick={onClearCountrySelection}
            className="text-sm"
          >
            Show All Countries
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {featuredTools.map((tool, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-2">{tool}</h3>
            <p className="text-gray-600 text-xs mb-3">
              {selectedCountry 
                ? `Specifically designed for ${selectedCountry}` 
                : 'Available for all major economies'
              }
            </p>
            <Button 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
              onClick={() => handleClick(tool)}
            >
              Launch Tool
            </Button>
          </div>
        ))}
      </div>
      
      {/* Top Economies Grid or Selected Country Highlight */}
      <div className="bg-gray-100 rounded-lg p-6">
        {selectedCountry ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Currently Viewing: {selectedCountry}
            </h3>
            <p className="text-gray-600 mb-4">
              All tools above are specifically configured for {selectedCountry}'s financial regulations and requirements.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => handleClick(`${selectedCountry} Income Tax Calculator`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {selectedCountry} Tax Calculator
              </Button>
              <Button 
                onClick={() => handleClick(`${selectedCountry} Budget Analyzer`)}
                variant="outline"
              >
                {selectedCountry} Budget Tools
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Top 10 Global Economies</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
              {topEconomies.map((economy, index) => (
                <button
                  key={economy}
                  onClick={() => onEconomyCountryClick(economy)}
                  className={`p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border hover:border-blue-300 ${
                    selectedCountry === economy 
                      ? 'bg-blue-100 border-blue-500' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xs font-semibold text-blue-600 mb-1">#{index + 1}</div>
                    <div className="text-sm font-medium text-gray-900">{economy}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedTools;
