
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";
import FranceBudgetAnalyzer from "@/components/tools/FranceBudgetAnalyzer";

const FranceBudgetAnalyzerPage = () => {
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
          <Link to={`/tool/${lang}/france/budget-analyzer`} className="hover:text-blue-600">France</Link>
          <span>/</span>
          <span className="text-gray-900">Budget Analyzer</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">France Budget Analyzer</h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive budget analysis tool for France with advanced features and French financial guidelines.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              France
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Budget Analysis
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {languages[lang].name}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Advanced Features
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FranceBudgetAnalyzer />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related French Tools</h3>
              <div className="space-y-2">
                <Link
                  to={`/tool/${lang}/france/spending-tracker`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Spending Tracker
                </Link>
                <Link
                  to={`/tool/${lang}/france/budget-comparison`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Budget Comparison
                </Link>
                <Link
                  to={`/tool/${lang}/france/budget-allocation-tool`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Budget Allocation Tool
                </Link>
                <Link
                  to={`/tool/${lang}/france/deficit-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Deficit Calculator
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Features</h3>
              <div className="space-y-3 text-sm">
                <div>✓ French budget guidelines compliance</div>
                <div>✓ Interactive charts and visualizations</div>
                <div>✓ Scenario planning and projections</div>
                <div>✓ Savings rate optimization</div>
                <div>✓ Expense categorization</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FranceBudgetAnalyzerPage;
