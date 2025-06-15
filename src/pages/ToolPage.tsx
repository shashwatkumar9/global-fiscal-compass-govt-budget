
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { baseTools } from "@/data/tools";
import { continents } from "@/data/continents";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";

const ToolPage = () => {
  const { lang, countrySlug, toolSlug } = useParams<{ lang: LanguageCode, countrySlug: string, toolSlug: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // If lang is not valid, redirect to 404
  if (!lang || !languages[lang]) {
    return <Navigate to="/404" replace />;
  }
  
  // Get all countries from continents
  const allCountries = Object.values(continents).flatMap(continent => continent.countries);
  
  // Find the country from slug
  const country = allCountries.find(c => 
    c.toLowerCase().replace(/\s+/g, '-') === countrySlug
  );

  // Find the tool from slug
  const tool = baseTools.find(t => 
    t.toLowerCase().replace(/\s+/g, '-') === toolSlug
  );

  // If country or tool not found, redirect to 404
  if (!country || !tool) {
    return <Navigate to="/404" replace />;
  }

  const toolTitle = `[${lang.toUpperCase()}] ${country} ${tool}`;
  const toolSubtitle = `Advanced ${tool.toLowerCase()} tool for ${country}'s regulations. (Viewing in: ${languages[lang].name})`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <ContinentalNav 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to={`/tool/${lang}/${countrySlug}/${toolSlug}`} className="hover:text-blue-600">{country}</Link>
          <span>/</span>
          <span className="text-gray-900">{tool} ({lang.toUpperCase()})</span>
        </div>

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Tool Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{toolTitle}</h1>
          <p className="text-xl text-gray-600 mb-6">{toolSubtitle}</p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {country}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {tool}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {languages[lang].name}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Government Compliant
            </span>
          </div>
        </div>

        {/* Tool Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tool Features</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Country-Specific Calculations</h3>
                  <p className="text-gray-600">All calculations are based on {country}'s current tax laws and regulations, presented in {languages[lang].name}.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Real-Time Updates</h3>
                  <p className="text-gray-600">Tax rates and regulations are updated automatically to reflect current laws.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Professional Reports</h3>
                  <p className="text-gray-600">Generate detailed reports suitable for official submissions.</p>
                </div>
              </div>

              {/* Placeholder for actual tool functionality */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-center text-gray-600">
                  The {toolTitle} interface will be implemented here.
                  <br />
                  This is a placeholder for the actual tool functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
              <div className="space-y-2">
                {baseTools.slice(0, 5).filter(t => t !== tool).map((relatedTool) => (
                  <Link
                    key={relatedTool}
                    to={`/tool/${lang}/${countrySlug}/${relatedTool.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {country} {relatedTool}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Country:</span>
                  <span className="ml-2 text-gray-600">{country}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Tool Type:</span>
                  <span className="ml-2 text-gray-600">{tool}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Last Updated:</span>
                  <span className="ml-2 text-gray-600">Today</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Compliance:</span>
                  <span className="ml-2 text-green-600">✓ Government Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolPage;
