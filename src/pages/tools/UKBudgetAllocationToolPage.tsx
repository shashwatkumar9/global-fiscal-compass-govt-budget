
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import UKBudgetAllocationTool from "@/components/tools/UKBudgetAllocationTool";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";

const UKBudgetAllocationToolPage = () => {
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
          <Link to={`/tool/${lang}/united-kingdom/budget-allocation-tool`} className="hover:text-blue-600">United Kingdom</Link>
          <span>/</span>
          <span className="text-gray-900">Budget Allocation Tool</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <UKBudgetAllocationTool />
      </main>

      <Footer />
    </div>
  );
};

export default UKBudgetAllocationToolPage;
