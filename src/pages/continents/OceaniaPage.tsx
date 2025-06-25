
import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, TrendingUp, PieChart, FileText, CreditCard } from "lucide-react";
import { LanguageCode, languages } from "@/data/languages";
import { continents } from "@/data/continents";

const OceaniaPage = () => {
  const { lang } = useParams<{ lang: LanguageCode }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (!lang || !languages[lang]) {
    return <Navigate to="/404" replace />;
  }

  const oceaniaCountries = continents.oceania.countries;

  const getCountrySlug = (country: string) => {
    return country.toLowerCase().replace(/\s+/g, '-');
  };

  const topTools = [
    { name: "Income Tax Calculator", icon: Calculator },
    { name: "GDP Calculator", icon: TrendingUp },
    { name: "Budget Analyzer", icon: PieChart },
    { name: "VAT Calculator", icon: FileText },
    { name: "Corporate Tax Calculator", icon: CreditCard }
  ];

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
          <span className="text-gray-900">Oceania</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oceania Countries</h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore financial tools and government budget resources for Oceania countries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oceaniaCountries.map((country) => (
            <Card key={country} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{country}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/country/${lang}/${getCountrySlug(country)}`}>
                      View Tools
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Top 5 Financial Tools:</p>
                <div className="space-y-2">
                  {topTools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <tool.icon className="w-4 h-4 text-blue-600" />
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OceaniaPage;
