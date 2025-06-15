
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import GermanIncomeTaxCalculator from "@/components/tools/GermanIncomeTaxCalculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";
import { useTranslations } from "@/hooks/useTranslations";

const GermanIncomeTaxPage = () => {
  const { lang } = useParams<{ lang: LanguageCode }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const t = useTranslations();

  // If lang is not valid, redirect to 404
  if (!lang || !languages[lang]) {
    return <Navigate to="/404" replace />;
  }

  const toolTitle = "Germany Income Tax Calculator";
  const toolSubtitle = `Professional German income tax calculator for 2025 with all deductions and allowances. (Available in: ${languages[lang].name})`;

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
          <Link to={`/tool/${lang}/germany/income-tax-calculator`} className="hover:text-blue-600">Germany</Link>
          <span>/</span>
          <span className="text-gray-900">Income Tax Calculator</span>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{toolTitle}</h1>
              <p className="text-xl text-gray-600 mb-6">{toolSubtitle}</p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Germany
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Income Tax
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  2025 Tax Year
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {languages[lang].name}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Professional Grade
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Tool
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Results
              </Button>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <GermanIncomeTaxCalculator />

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Key Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Complete 2025 German tax calculation</li>
              <li>• All 6 tax classes supported</li>
              <li>• Automatic deduction optimization</li>
              <li>• Church tax calculation</li>
              <li>• Solidarity surcharge</li>
              <li>• Child benefit optimization</li>
              <li>• Home office deductions</li>
              <li>• Commuting expense calculator</li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Basis</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">Law:</span>
                <span className="ml-2">Einkommensteuergesetz (EStG) §32a</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Tax Year:</span>
                <span className="ml-2">2025</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Last Updated:</span>
                <span className="ml-2">January 1, 2025</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Accuracy:</span>
                <span className="ml-2 text-green-600">Government Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Guide</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Enter your annual gross income</li>
              <li>2. Select your tax class</li>
              <li>3. Choose your federal state</li>
              <li>4. Add personal details</li>
              <li>5. Include all deductions</li>
              <li>6. Review your results</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                💡 Tip: Use tax class 3/5 if married with unequal incomes, or 4/4 for similar incomes.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h4>
          <p className="text-sm text-yellow-700">
            This calculator provides estimates based on current German tax law for the 2025 tax year. 
            Results are for informational purposes only and should not be considered as professional tax advice. 
            For official tax matters, please consult a qualified tax advisor (Steuerberater) or the German tax authorities (Finanzamt). 
            Tax laws may change, and individual circumstances can affect actual tax liability.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GermanIncomeTaxPage;
