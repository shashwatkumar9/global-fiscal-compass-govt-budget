
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import NewHeroSection from "@/components/home/NewHeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/layout/Footer";
import { LanguageCode, languages } from "@/data/languages";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { lang } = useParams<{ lang: LanguageCode }>();

  // If lang is not valid, redirect to English
  if (!lang || !languages[lang]) {
    return <Navigate to="/en" replace />;
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

      <main>
        <NewHeroSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
