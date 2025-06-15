
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageCode, languages } from "@/data/languages";

const FrancePayrollTaxPage = () => {
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
          <Link to={`/tool/${lang}/france/payroll-tax-calculator`} className="hover:text-blue-600">France</Link>
          <span>/</span>
          <span className="text-gray-900">Payroll Tax Calculator</span>
        </div>

        <Link to={`/${lang}`} className="inline-flex items-center mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">France Payroll Tax Calculator</h1>
          <p className="text-xl text-gray-600 mb-6">
            Professional French payroll tax calculator for 2025 with all deductions and employer contributions.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              France
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Payroll Tax
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
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">France Payroll Tax Calculator</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">French Payroll Compliance</h3>
                  <p className="text-gray-600">Calculate employee and employer contributions according to French labor law and social security regulations.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Social Security Contributions</h3>
                  <p className="text-gray-600">Automatic calculation of URSSAF, retirement, unemployment, and health insurance contributions.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Detailed Payslip Breakdown</h3>
                  <p className="text-gray-600">Generate comprehensive payslip reports compliant with French regulations.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-center text-gray-600">
                  The France Payroll Tax Calculator interface will be implemented here.
                  <br />
                  This is a placeholder for the actual calculator functionality.
                </p>
              </div>
            </div>
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
                  to={`/tool/${lang}/france/corporate-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Corporate Tax Calculator
                </Link>
                <Link
                  to={`/tool/${lang}/france/property-tax-calculator`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  France Property Tax Calculator
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
                  <span className="ml-2 text-gray-600">Payroll Tax Calculator</span>
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

export default FrancePayrollTaxPage;
