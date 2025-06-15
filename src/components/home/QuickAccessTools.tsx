
import { Button } from "@/components/ui/button";
import { baseTools } from "@/data/tools";
import { handleToolNavigation } from "@/utils/toolNavigation";

interface QuickAccessToolsProps {
  onToolClick?: (tool: string) => void;
}

const QuickAccessTools = ({ onToolClick }: QuickAccessToolsProps) => {
  const handleClick = (tool: string) => {
    if (onToolClick) {
      onToolClick(tool);
    } else {
      handleToolNavigation(tool);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {baseTools.slice(0, 8).map((tool, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool}</h3>
          <p className="text-gray-600 text-sm mb-4">Calculate and analyze with precision</p>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => handleClick(tool)}
          >
            Launch Tool
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuickAccessTools;
