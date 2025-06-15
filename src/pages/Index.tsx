
import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Menu, X, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data for search suggestions (in real app, this would come from API)
  const allTools = [
    // Tax Tools
    "Income Tax Calculator", "VAT Calculator", "Corporate Tax Calculator", "Property Tax Calculator",
    "Capital Gains Tax Calculator", "Inheritance Tax Calculator", "Sales Tax Calculator", "Payroll Tax Calculator",
    
    // Budget Tools
    "Government Budget Analyzer", "Municipal Budget Tracker", "Budget Allocation Tool", "Spending Analysis Tool",
    "Revenue Projection Tool", "Budget Comparison Tool", "Fiscal Policy Analyzer", "Public Debt Calculator",
    
    // Financial Tools
    "GDP Calculator", "Inflation Calculator", "Currency Converter", "Economic Indicator Tracker",
    "Import/Export Tax Calculator", "Customs Duty Calculator", "Trade Balance Analyzer", "Economic Growth Calculator",
    
    // Compliance Tools
    "Tax Compliance Checker", "Regulatory Compliance Tool", "Audit Preparation Tool", "Filing Deadline Tracker",
    "Document Generator", "Legal Framework Guide", "Policy Impact Analyzer", "Regulatory Change Tracker"
  ];

  const continents = {
    europe: {
      name: "Europe",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      countries: ["Germany", "UK", "France", "Italy", "Spain", "Netherlands", "Switzerland", "Belgium", "Austria", "Poland"]
    },
    asia: {
      name: "Asia",
      color: "bg-green-600", 
      hoverColor: "hover:bg-green-700",
      countries: ["China", "Japan", "India", "South Korea", "Indonesia", "Taiwan", "Saudi Arabia", "Israel", "Turkey", "Thailand", "Singapore", "Philippines", "Malaysia", "Bangladesh", "Vietnam"]
    },
    northAmerica: {
      name: "North America",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700", 
      countries: ["USA", "Canada", "Mexico"]
    },
    southAmerica: {
      name: "South America",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      countries: ["Brazil", "Argentina", "Colombia", "Chile", "Peru"]
    },
    africa: {
      name: "Africa",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      countries: ["South Africa", "Egypt", "Algeria", "Nigeria", "Ethiopia", "Morocco", "Kenya", "Angola", "Ghana", "Tanzania"]
    }
  };

  const mainTools = [
    "Income Tax Calculator", "VAT Calculator", "Corporate Tax Calculator", "Budget Analyzer",
    "GDP Calculator", "Currency Converter", "Import Tax Calculator", "Compliance Checker",
    "Inflation Calculator", "Property Tax Calculator", "Payroll Tax Calculator", "Trade Analyzer",
    "Revenue Projector", "Audit Tool", "Policy Analyzer", "Economic Tracker",
    "Sales Tax Calculator", "Customs Calculator", "Filing Tracker", "Legal Guide"
  ];

  const filteredSuggestions = allTools.filter(tool =>
    tool.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                GovtBudget<span className="text-blue-600">.com</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search tools, countries, or tax calculators..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Search Suggestions */}
              {showSearchSuggestions && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSearchSuggestions(false);
                        }}
                      >
                        <div className="flex items-center">
                          <Search className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No tools found</div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Button>
              <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#services" className="block text-gray-700 hover:text-blue-600 font-medium">Services</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2 flex-1">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button size="sm" className="flex items-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Continental Navigation Menu */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-0">
            {Object.entries(continents).map(([key, continent]) => (
              <div key={key} className="relative group">
                <button
                  className={`${continent.color} ${continent.hoverColor} text-white px-6 py-4 flex items-center space-x-2 transition-colors duration-200 font-medium text-sm`}
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <span>{continent.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mega Menu */}
                {activeMenu === key && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-xl border border-gray-200 rounded-b-lg z-50 w-[800px]"
                    onMouseEnter={() => setActiveMenu(key)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Countries Column */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            Countries
                          </h3>
                          <div className="space-y-2">
                            {continent.countries.map((country) => (
                              <a
                                key={country}
                                href={`#${country.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150"
                              >
                                {country}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Main Tools Columns */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            Popular Tools
                          </h3>
                          <div className="space-y-2">
                            {mainTools.slice(0, 10).map((tool) => (
                              <a
                                key={tool}
                                href={`#${tool.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 text-sm"
                              >
                                {tool}
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            Advanced Tools
                          </h3>
                          <div className="space-y-2">
                            {mainTools.slice(10, 20).map((tool) => (
                              <a
                                key={tool}
                                href={`#${tool.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 text-sm"
                              >
                                {tool}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Global Government Finance & Taxation Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial tools, tax calculators, and budget analyzers for over 50 countries across 5 continents. 
            Make informed decisions with accurate, up-to-date government finance data.
          </p>
        </div>

        {/* Quick Access Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainTools.slice(0, 8).map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool}</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate and analyze with precision</p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Launch Tool
              </Button>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose GovtBudget.com?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">Over 500 financial tools covering 50+ countries across all major continents</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronDown className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Navigation</h3>
              <p className="text-gray-600">Intuitive continental organization makes finding country-specific tools effortless</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Accuracy</h3>
              <p className="text-gray-600">All calculations based on current government data and regulations</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GovtBudget.com</h3>
              <p className="text-gray-300 text-sm">Your trusted source for government finance and taxation tools worldwide.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#tax-calc" className="text-gray-300 hover:text-white">Tax Calculator</a></li>
                <li><a href="#budget-analyzer" className="text-gray-300 hover:text-white">Budget Analyzer</a></li>
                <li><a href="#gdp-calc" className="text-gray-300 hover:text-white">GDP Calculator</a></li>
                <li><a href="#compliance" className="text-gray-300 hover:text-white">Compliance Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#help" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#docs" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#api" className="text-gray-300 hover:text-white">API Access</a></li>
                <li><a href="#updates" className="text-gray-300 hover:text-white">Updates</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 GovtBudget.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
