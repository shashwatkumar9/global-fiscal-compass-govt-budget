
import { Link } from "react-router-dom";
import { Target, Users, Globe, Award } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: Target,
      title: "Accuracy",
      description: "We ensure all our calculations are precise and up-to-date with the latest regulations."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making complex government finance tools accessible to everyone, everywhere."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Supporting organizations and individuals across more than 200 countries worldwide."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality tools and professional support."
    }
  ];

  const team = [
    {
      name: "Financial Experts",
      role: "Tax & Finance Professionals",
      description: "Our team includes certified tax professionals and financial experts from around the world."
    },
    {
      name: "Technology Team",
      role: "Software Engineers",
      description: "Experienced developers ensuring our tools are fast, reliable, and user-friendly."
    },
    {
      name: "Compliance Specialists",
      role: "Regulatory Experts",
      description: "Legal and compliance experts who keep our tools updated with changing regulations."
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
              About GovtBudget.com
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to making government finance and taxation accessible, 
              accurate, and easy to understand for everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              To provide the world's most comprehensive and accurate government finance and taxation tools, 
              empowering individuals, businesses, and organizations to make informed financial decisions 
              while ensuring compliance with local regulations across all countries.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                GovtBudget.com was founded with a simple yet ambitious goal: to democratize access to 
                professional-grade government finance and taxation tools. We recognized that navigating 
                the complex world of international tax laws and government regulations was a challenge 
                faced by millions worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our team of financial experts, software engineers, and compliance specialists worked 
                tirelessly to create a platform that combines accuracy, accessibility, and ease of use. 
                Today, we serve users in over 200 countries, providing tools that are trusted by 
                individuals, businesses, and government agencies alike.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We continue to innovate and expand our offerings, always with the goal of making 
                complex financial calculations simple and ensuring compliance with ever-changing 
                regulations around the world.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Thousands of Satisfied Users</h2>
            <p className="text-xl mb-6">
              Experience the difference that professional-grade tools can make.
            </p>
            <Link
              to="/en"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
