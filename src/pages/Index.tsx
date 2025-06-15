
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContinentalNav from "@/components/layout/ContinentalNav";
import HeroSection from "@/components/home/HeroSection";
import QuickAccessTools from "@/components/home/QuickAccessTools";
import FeaturedTools from "@/components/home/FeaturedTools";
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
        <HeroSection />
        <QuickAccessTools />
        <FeaturedTools />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
