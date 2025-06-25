
import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import SpainSalesTaxCalculator from "@/components/tools/SpainSalesTaxCalculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LanguageCode, languages } from "@/data/languages";

const SpainSalesTaxPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { lang } = useParams<{ lang: LanguageCode }>();

  if (!lang || !languages[lang]) {
    return <Navigate to="/404" replace />;
  }

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
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to={`/${lang}`} className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to={`/country/${lang}/spain`} className="hover:text-blue-600">Spain</Link>
          <span>/</span>
          <span className="text-gray-900">Sales Tax Calculator</span>
        </div>

        <Link to={`/country/${lang}/spain`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Spain Tools
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Spain Sales Tax Calculator</h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate Spanish sales tax (VAT/IGIC) for retail transactions with special rates for different regions and products.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Spain
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Sales Tax
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Retail Calculator
            </span>
          </div>
        </div>

        <SpainSalesTaxCalculator />
      </main>

      <Footer />
    </div>
  );
};

export default SpainSalesTaxPage;
