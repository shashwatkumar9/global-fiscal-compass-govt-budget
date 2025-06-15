
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import QuickAccessTools from "@/components/home/QuickAccessTools";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/layout/Footer";
import { handleToolNavigation } from "@/utils/toolNavigation";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToolClick = (tool: string) => {
    handleToolNavigation(tool);
  };

  const handleEconomyCountryClick = (country: string) => {
    setSelectedCountry(country);
    console.log(`Selected economy country: ${country}`);
  };

  const clearCountrySelection = () => {
    setSelectedCountry(null);
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
        <HeroSection />

        <FeaturedTools
          selectedCountry={selectedCountry}
          onClearCountrySelection={clearCountrySelection}
          onToolClick={handleToolClick}
          onEconomyCountryClick={handleEconomyCountryClick}
        />

        <QuickAccessTools onToolClick={handleToolClick} />

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
