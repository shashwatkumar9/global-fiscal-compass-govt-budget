
import { useTranslations } from "@/hooks/useTranslations";

const HeroSection = () => {
  const t = useTranslations();

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t.hero.title}
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {t.hero.subtitle}
      </p>
    </div>
  );
};

export default HeroSection;
