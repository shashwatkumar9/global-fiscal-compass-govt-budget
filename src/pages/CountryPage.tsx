
import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, TrendingUp, PieChart, FileText, CreditCard, Building, Banknote, Import, MapPin } from "lucide-react";
import { LanguageCode, languages } from "@/data/languages";

const CountryPage = () => {
  const { lang, countrySlug } = useParams<{ lang: LanguageCode; countrySlug: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (!lang || !languages[lang] || !countrySlug) {
    return <Navigate to="/404" replace />;
  }

  // Map slug back to country name
  const getCountryName = (slug: string) => {
    const countryMap: { [key: string]: string } = {
      "uk": "United Kingdom",
      "germany": "Germany", 
      "france": "France",
      "usa": "USA",
      "canada": "Canada",
      "mexico": "Mexico",
      "china": "China",
      "japan": "Japan",
      "india": "India",
      "brazil": "Brazil",
      "argentina": "Argentina",
      "colombia": "Colombia",
      "south-africa": "South Africa",
      "egypt": "Egypt", 
      "nigeria": "Nigeria",
      "australia": "Australia",
      "new-zealand": "New Zealand",
      "fiji": "Fiji"
    };
    return countryMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const countryName = getCountryName(countrySlug);

  const allTools = [
    { name: "Income Tax Calculator", icon: Calculator, slug: "income-tax-calculator", category: "Tax Tools" },
    { name: "VAT Calculator", icon: FileText, slug: "vat-calculator", category: "Tax Tools" },
    { name: "Corporate Tax Calculator", icon: Building, slug: "corporate-tax-calculator", category: "Tax Tools" },
    { name: "Capital Gains Tax Calculator", icon: TrendingUp, slug: "capital-gains-tax-calculator", category: "Tax Tools" },
    { name: "Property Tax Calculator", icon: MapPin, slug: "property-tax-calculator", category: "Tax Tools" },
    { name: "Inheritance Tax Calculator", icon: CreditCard, slug: "inheritance-tax-calculator", category: "Tax Tools" },
    { name: "Payroll Tax Calculator", icon: Banknote, slug: "payroll-tax-calculator", category: "Tax Tools" },
    { name: "Sales Tax Calculator", icon: FileText, slug: "sales-tax-calculator", category: "Tax Tools" },
    { name: "Import Tax Calculator", icon: Import, slug: "import-tax-calculator", category: "Tax Tools" },
    { name: "Municipal Tax Calculator", icon: Building, slug: "municipal-tax-calculator", category: "Tax Tools" },
    { name: "Budget Analyzer", icon: PieChart, slug: "budget-analyzer", category: "Budget Tools" },
    { name: "GDP Calculator", icon: TrendingUp, slug: "gdp-calculator", category: "Economic Tools" },
    { name: "Public Debt Calculator", icon: Calculator, slug: "public-debt-calculator", category: "Economic Tools" },
    { name: "Revenue Projector", icon: TrendingUp, slug: "revenue-projector", category: "Budget Tools" },
    { name: "Spending Tracker", icon: PieChart, slug: "spending-tracker", category: "Budget Tools" },
    { name: "Budget Comparison", icon: FileText, slug: "budget-comparison", category: "Budget Tools" },
    { name: "Fiscal Impact Tool", icon: Building, slug: "fiscal-impact-tool", category: "Economic Tools" },
    { name: "Economic Growth Calculator", icon: TrendingUp, slug: "economic-growth-calculator", category: "Economic Tools" },
    { name: "Budget Allocation Tool", icon: PieChart, slug: "budget-allocation-tool", category: "Budget Tools" },
    { name: "Deficit Calculator", icon: Calculator, slug: "deficit-calculator", category: "Economic Tools" }
  ];

  const toolCategories = ["Tax Tools", "Budget Tools", "Economic Tools"];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Tax Tools": "bg-blue-50 border-blue-200",
      "Budget Tools": "bg-green-50 border-green-200", 
      "Economic Tools": "bg-purple-50 border-purple-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-50 border-gray-200";
  };

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
          <span className="text-gray-900">{countryName}</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{countryName} Financial Tools</h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive financial calculators and government budget tools for {countryName}.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {countryName}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {allTools.length} Tools Available
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {languages[lang].name}
            </span>
          </div>
        </div>

        {/* Tools by Category */}
        {toolCategories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allTools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <Card key={tool.slug} className={`hover:shadow-lg transition-all duration-300 border-2 ${getCategoryColor(category)} hover:scale-105`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <tool.icon className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
                      </div>
                      <Button variant="default" size="sm" className="w-full" asChild>
                        <Link to={`/tool/${lang}/${countrySlug}/${tool.slug}`}>
                          Open Tool
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default CountryPage;
