
import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import ItalyRevenueProjector from "@/components/tools/ItalyRevenueProjector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LanguageCode, languages } from "@/data/languages";

const ItalyRevenueProjectorPage = () => {
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
          <Link to={`/country/${lang}/italy`} className="hover:text-blue-600">Italy</Link>
          <span>/</span>
          <span className="text-gray-900">Revenue Projector</span>
        </div>

        <Link to={`/country/${lang}/italy`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Italy Tools
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Italy Revenue Projector</h1>
          <p className="text-xl text-gray-600 mb-6">
            Project Italian government revenue streams with tax-specific growth modeling and elasticity analysis.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Italy
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Revenue Modeling
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Advanced Tool
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Tax Elasticity
            </span>
          </div>
        </div>

        <ItalyRevenueProjector />
      </main>

      <Footer />
    </div>
  );
};

export default ItalyRevenueProjectorPage;
