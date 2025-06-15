
import { Link } from "react-router-dom";
import { Calculator, BarChart3, FileText, Shield, Globe, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const Services = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Calculator,
      title: "Tax Calculators",
      description: "Comprehensive tax calculation tools for income tax, VAT, corporate tax, and more, tailored to each country's specific regulations.",
      features: ["Income Tax Calculator", "VAT Calculator", "Corporate Tax Calculator", "Capital Gains Tax Calculator"]
    },
    {
      icon: BarChart3,
      title: "Budget Analysis Tools",
      description: "Advanced tools for government budget analysis, spending tracking, and fiscal planning across different countries.",
      features: ["Budget Analyzer", "Spending Tracker", "Revenue Projector", "Deficit Calculator"]
    },
    {
      icon: FileText,
      title: "Compliance Tools",
      description: "Stay compliant with local regulations using our specialized compliance and reporting tools.",
      features: ["Tax Filing Assistance", "Regulatory Framework Guide", "Compliance Checker", "Deadline Tracker"]
    },
    {
      icon: Shield,
      title: "Professional Accuracy",
      description: "All our tools are verified by tax professionals and updated regularly to ensure accuracy and compliance.",
      features: ["Expert Verification", "Regular Updates", "Audit Trail", "Professional Support"]
    },
    {
      icon: Globe,
      title: "Multi-Country Support",
      description: "Access tools and calculators for governments and businesses across multiple countries and jurisdictions.",
      features: ["200+ Countries", "Local Regulations", "Currency Support", "Language Localization"]
    },
    {
      icon: Users,
      title: "Enterprise Solutions",
      description: "Scalable solutions for large organizations, government agencies, and multinational corporations.",
      features: ["API Access", "Custom Integration", "Bulk Processing", "Dedicated Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional government finance and taxation tools designed to help organizations 
              and individuals navigate complex financial regulations worldwide.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <service.icon className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6">
              Explore our comprehensive suite of government finance and tax tools.
            </p>
            <Link
              to="/en"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
