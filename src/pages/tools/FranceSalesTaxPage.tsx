
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";
import FranceSalesTaxCalculator from "@/components/tools/FranceSalesTaxCalculator";

const FranceSalesTaxPage = () => {
  const { lang } = useParams<{ lang: LanguageCode }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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
          <Link to={`/tool/${lang}/france/sales-tax-calculator`} className="hover:text-blue-600">France</Link>
          <span>/</span>
          <span className="text-gray-900">Sales Tax Calculator</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">France Sales Tax Calculator</h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate French Sales Tax (TVA) for 2025.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              France
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Sales Tax
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {languages[lang].name}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Government Compliant
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FranceSalesTaxCalculator />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related French Tools</h3>
              <div className="space-y-2">
                <Link
                  to={`/tool/${lang}/france/income-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Income Tax Calculator
                </Link>
                <Link
                  to={`/tool/${lang}/france/vat-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France VAT Calculator
                </Link>
                <Link
                  to={`/tool/${lang}/france/inheritance-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Inheritance Tax Calculator
                </Link>
                <Link
                  to={`/tool/${lang}/france/import-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Import Tax Calculator
                </Link>
                <Link
                  to={`/tool/${lang}/france/municipal-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Municipal Tax Calculator
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Country:</span>
                  <span className="ml-2 text-gray-600">France</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Tool Type:</span>
                  <span className="ml-2 text-gray-600">Sales Tax Calculator</span>
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

export default FranceSalesTaxPage;

