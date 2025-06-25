
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, Calculator, TrendingUp, PieChart, FileText, CreditCard, ArrowRight } from "lucide-react";

const NewHeroSection = () => {
  const { language } = useLanguage();

  const topCountriesByContinent = [
    { continent: "Europe", countries: ["Germany", "United Kingdom", "France"], color: "bg-blue-600", hoverColor: "hover:bg-blue-700" },
    { continent: "Asia", countries: ["China", "Japan", "India"], color: "bg-green-600", hoverColor: "hover:bg-green-700" },
    { continent: "North America", countries: ["USA", "Canada", "Mexico"], color: "bg-purple-600", hoverColor: "hover:bg-purple-700" },
    { continent: "South America", countries: ["Brazil", "Argentina", "Colombia"], color: "bg-orange-600", hoverColor: "hover:bg-orange-700" },
    { continent: "Africa", countries: ["South Africa", "Egypt", "Nigeria"], color: "bg-red-600", hoverColor: "hover:bg-red-700" },
    { continent: "Oceania", countries: ["Australia", "New Zealand", "Fiji"], color: "bg-teal-600", hoverColor: "hover:bg-teal-700" }
  ];

  const topPersonalTools = [
    { 
      name: "Income Tax Calculator", 
      icon: Calculator, 
      description: "Calculate your personal income tax obligations",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    { 
      name: "VAT Calculator", 
      icon: FileText, 
      description: "Determine VAT amounts for purchases and sales",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    { 
      name: "Property Tax Calculator", 
      icon: PieChart, 
      description: "Calculate property tax based on your location",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    { 
      name: "Capital Gains Tax Calculator", 
      icon: TrendingUp, 
      description: "Calculate taxes on investment gains",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    },
    { 
      name: "Corporate Tax Calculator", 
      icon: CreditCard, 
      description: "Calculate corporate tax for business owners",
      color: "bg-pink-50 text-pink-700 border-pink-200"
    }
  ];

  const getCountrySlug = (country: string) => {
    const slugMap: { [key: string]: string } = {
      "United Kingdom": "uk",
      "Germany": "germany",
      "France": "france"
    };
    return slugMap[country] || country.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <Globe className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">
              GovtBudget<span className="text-blue-600">.com</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive platform for government financial tools and budget analysis across the globe. 
            Access country-specific calculators, budget analyzers, and fiscal planning tools.
          </p>
        </div>

        {/* Top Countries by Continent */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Popular Countries by Continent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCountriesByContinent.map((continentData) => (
              <Card key={continentData.continent} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300">
                <CardHeader className={`${continentData.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center justify-between">
                    <span>{continentData.continent}</span>
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/continent/${language}/${continentData.continent.toLowerCase().replace(/\s+/g, '-')}`}>
                        View All
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {continentData.countries.map((country) => (
                      <Link
                        key={country}
                        to={`/country/${language}/${getCountrySlug(country)}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 group-hover:text-blue-600">
                            {country}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Personal Finance Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Top Personal Finance Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topPersonalTools.map((tool) => (
              <Card key={tool.name} className={`hover:shadow-lg transition-all duration-300 border-2 ${tool.color} hover:scale-105`}>
                <CardContent className="p-6 text-center">
                  <tool.icon className="w-12 h-12 mx-auto mb-4 text-current" />
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm opacity-80 mb-4">{tool.description}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Government Finance Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose a continent to discover comprehensive financial tools for your country
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {topCountriesByContinent.map((continentData) => (
              <Button key={continentData.continent} variant="secondary" size="lg" asChild>
                <Link to={`/continent/${language}/${continentData.continent.toLowerCase().replace(/\s+/g, '-')}`}>
                  Explore {continentData.continent}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeroSection;
