
import { Search, ChevronDown, User } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const FeaturesSection = () => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.features.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features.countrySpecificToolsTitle}</h3>
          <p className="text-gray-600">{t.features.countrySpecificToolsDescription}</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChevronDown className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features.smartNavigationTitle}</h3>
          <p className="text-gray-600">{t.features.smartNavigationDescription}</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features.expertAccuracyTitle}</h3>
          <p className="text-gray-600">{t.features.expertAccuracyDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
