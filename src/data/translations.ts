
import { LanguageCode } from './languages';

const translationsData = {
  en: {
    header: {
      searchPlaceholder: "Search tools, countries, or tax calculators...",
      noToolsFound: "No tools found",
      countrySpecific: "Country-specific",
      services: "Services",
      about: "About",
      contact: "Contact",
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    megaMenu: {
      countries: "Countries",
      popularTools: "Popular Tools",
      advancedTools: "Advanced Tools",
      countryPopularTools: "{country} Popular Tools",
      countryAdvancedTools: "{country} Advanced Tools",
    },
    hero: {
      title: "Global Government Finance & Taxation Tools",
      subtitle: "Comprehensive financial tools, tax calculators, and budget analyzers for over 50 countries across 6 continents. Make informed decisions with accurate, up-to-date government finance data.",
    },
    featuredTools: {
      title: "Featured Tools for Major Economies",
      titleForCountry: "Featured Tools for {country}",
      showAllCountries: "Show All Countries",
      toolDescriptionForCountry: "Specifically designed for {country}",
      toolDescriptionGlobal: "Available for all major economies",
      launchTool: "Launch Tool",
      currentlyViewing: "Currently Viewing: {country}",
      viewingDescription: "All tools above are specifically configured for {country}'s financial regulations and requirements.",
      taxCalculatorButton: "{country} Tax Calculator",
      budgetToolsButton: "{country} Budget Tools",
      topEconomies: "Top 10 Global Economies",
    },
    quickAccessTools: {
      description: "Calculate and analyze with precision",
    },
    features: {
      title: "Why Choose GovtBudget.com?",
      countrySpecificToolsTitle: "Country-Specific Tools",
      countrySpecificToolsDescription: "Over 500 country-specific financial tools covering 50+ countries across all major continents",
      smartNavigationTitle: "Smart Navigation",
      smartNavigationDescription: "Intelligent navigation that dynamically shows country-specific tools as you browse",
      expertAccuracyTitle: "Expert Accuracy",
      expertAccuracyDescription: "All calculations based on current country-specific government data and regulations",
    },
  },
  de: {
    header: {
      searchPlaceholder: "Suchen Sie nach Tools, Ländern oder Steuerrechnern...",
      noToolsFound: "Keine Tools gefunden",
      countrySpecific: "Länderspezifisch",
      services: "Dienstleistungen",
      about: "Über uns",
      contact: "Kontakt",
      signIn: "Anmelden",
      signUp: "Registrieren",
    },
    megaMenu: {
      countries: "Länder",
      popularTools: "Beliebte Tools",
      advancedTools: "Erweiterte Tools",
      countryPopularTools: "{country} Beliebte Tools",
      countryAdvancedTools: "{country} Erweiterte Tools",
    },
    hero: {
      title: "Globale Tools für öffentliche Finanzen und Steuern",
      subtitle: "Umfassende Finanzinstrumente, Steuerrechner und Budgetanalysatoren für über 50 Länder auf 6 Kontinenten. Treffen Sie fundierte Entscheidungen mit genauen, aktuellen Daten zu den öffentlichen Finanzen.",
    },
    featuredTools: {
      title: "Ausgewählte Tools für große Volkswirtschaften",
      titleForCountry: "Ausgewählte Tools für {country}",
      showAllCountries: "Alle Länder anzeigen",
      toolDescriptionForCountry: "Speziell für {country} entwickelt",
      toolDescriptionGlobal: "Verfügbar für alle großen Volkswirtschaften",
      launchTool: "Tool starten",
      currentlyViewing: "Aktuelle Ansicht: {country}",
      viewingDescription: "Alle oben genannten Tools sind speziell für die Finanzvorschriften und -anforderungen von {country} konfiguriert.",
      taxCalculatorButton: "{country} Steuerrechner",
      budgetToolsButton: "{country} Budget-Tools",
      topEconomies: "Top 10 globale Volkswirtschaften",
    },
    quickAccessTools: {
      description: "Präzise berechnen und analysieren",
    },
    features: {
      title: "Warum GovtBudget.com wählen?",
      countrySpecificToolsTitle: "Länderspezifische Tools",
      countrySpecificToolsDescription: "Über 500 länderspezifische Finanzinstrumente für mehr als 50 Länder auf allen wichtigen Kontinenten",
      smartNavigationTitle: "Intelligente Navigation",
      smartNavigationDescription: "Intelligente Navigation, die beim Surfen dynamisch länderspezifische Tools anzeigt",
      expertAccuracyTitle: "Experten-Genauigkeit",
      expertAccuracyDescription: "Alle Berechnungen basieren auf aktuellen länderspezifischen Regierungsdaten und -vorschriften",
    },
  },
  es: {
    header: {
      searchPlaceholder: "Buscar herramientas, países o calculadoras de impuestos...",
      noToolsFound: "No se encontraron herramientas",
      countrySpecific: "Específico del país",
      services: "Servicios",
      about: "Sobre nosotros",
      contact: "Contacto",
      signIn: "Iniciar sesión",
      signUp: "Registrarse",
    },
    megaMenu: {
      countries: "Países",
      popularTools: "Herramientas populares",
      advancedTools: "Herramientas avanzadas",
      countryPopularTools: "Herramientas populares de {country}",
      countryAdvancedTools: "Herramientas avanzadas de {country}",
    },
    hero: {
      title: "Herramientas globales de finanzas y fiscalidad gubernamentales",
      subtitle: "Herramientas financieras integrales, calculadoras de impuestos y analizadores de presupuesto para más de 50 países en 6 continentes. Tome decisiones informadas con datos precisos y actualizados sobre las finanzas gubernamentales.",
    },
    featuredTools: {
      title: "Herramientas destacadas para las principales economías",
      titleForCountry: "Herramientas destacadas para {country}",
      showAllCountries: "Mostrar todos los países",
      toolDescriptionForCountry: "Diseñado específicamente para {country}",
      toolDescriptionGlobal: "Disponible para las principales economías",
      launchTool: "Lanzar herramienta",
      currentlyViewing: "Viendo actualmente: {country}",
      viewingDescription: "Todas las herramientas anteriores están configuradas específicamente para las regulaciones y requisitos financieros de {country}.",
      taxCalculatorButton: "Calculadora de impuestos de {country}",
      budgetToolsButton: "Herramientas de presupuesto de {country}",
      topEconomies: "Las 10 principales economías mundiales",
    },
    quickAccessTools: {
      description: "Calcule y analice con precisión",
    },
    features: {
      title: "¿Por qué elegir GovtBudget.com?",
      countrySpecificToolsTitle: "Herramientas específicas por país",
      countrySpecificToolsDescription: "Más de 500 herramientas financieras específicas por país que cubren más de 50 países en los principales continentes",
      smartNavigationTitle: "Navegación inteligente",
      smartNavigationDescription: "Navegación inteligente que muestra dinámicamente herramientas específicas del país mientras navega",
      expertAccuracyTitle: "Precisión experta",
      expertAccuracyDescription: "Todos los cálculos se basan en datos y regulaciones gubernamentales actuales específicas del país",
    },
  },
  fr: {
    header: {
      searchPlaceholder: "Rechercher des outils, des pays ou des calculateurs d'impôts...",
      noToolsFound: "Aucun outil trouvé",
      countrySpecific: "Spécifique au pays",
      services: "Services",
      about: "À propos",
      contact: "Contact",
      signIn: "Se connecter",
      signUp: "S'inscrire",
    },
    megaMenu: {
      countries: "Pays",
      popularTools: "Outils populaires",
      advancedTools: "Outils avancés",
      countryPopularTools: "Outils populaires pour {country}",
      countryAdvancedTools: "Outils avancés pour {country}",
    },
    hero: {
      title: "Outils mondiaux de finances publiques et de fiscalité",
      subtitle: "Outils financiers complets, calculateurs d'impôts et analyseurs de budget pour plus de 50 pays sur 6 continents. Prenez des décisions éclairées avec des données précises et à jour sur les finances publiques.",
    },
    featuredTools: {
      title: "Outils phares pour les grandes économies",
      titleForCountry: "Outils phares pour {country}",
      showAllCountries: "Afficher tous les pays",
      toolDescriptionForCountry: "Spécialement conçu pour {country}",
      toolDescriptionGlobal: "Disponible pour toutes les grandes économies",
      launchTool: "Lancer l'outil",
      currentlyViewing: "Affichage en cours : {country}",
      viewingDescription: "Tous les outils ci-dessus sont spécifiquement configurés pour les réglementations et exigences financières de {country}.",
      taxCalculatorButton: "Calculateur d'impôts {country}",
      budgetToolsButton: "Outils budgétaires {country}",
      topEconomies: "Top 10 des économies mondiales",
    },
    quickAccessTools: {
      description: "Calculez et analysez avec précision",
    },
    features: {
      title: "Pourquoi choisir GovtBudget.com ?",
      countrySpecificToolsTitle: "Outils par pays",
      countrySpecificToolsDescription: "Plus de 500 outils financiers spécifiques à chaque pays, couvrant plus de 50 pays sur tous les grands continents",
      smartNavigationTitle: "Navigation intelligente",
      smartNavigationDescription: "Navigation intelligente qui affiche dynamiquement les outils spécifiques au pays pendant que vous naviguez",
      expertAccuracyTitle: "Précision d'expert",
      expertAccuracyDescription: "Tous les calculs sont basés sur les données et réglementations gouvernementales en vigueur spécifiques à chaque pays",
    },
  },
};

// Fallback for other languages to English
const translations: Record<LanguageCode, typeof translationsData.en> = {
  en: translationsData.en,
  de: translationsData.de,
  fr: translationsData.fr,
  es: translationsData.es,
  hi: translationsData.en, // Placeholder
  zh: translationsData.en, // Placeholder
  ja: translationsData.en, // Placeholder
  ar: translationsData.en, // Placeholder
};

export type TranslationSet = typeof translationsData.en;

export { translations };
