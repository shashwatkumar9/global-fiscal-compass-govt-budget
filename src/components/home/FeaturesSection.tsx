
import { Search, ChevronDown, User } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose GovtBudget.com?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Country-Specific Tools</h3>
          <p className="text-gray-600">Over 500 country-specific financial tools covering 50+ countries across all major continents</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChevronDown className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Navigation</h3>
          <p className="text-gray-600">Intelligent navigation that dynamically shows country-specific tools as you browse</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Accuracy</h3>
          <p className="text-gray-600">All calculations based on current country-specific government data and regulations</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
