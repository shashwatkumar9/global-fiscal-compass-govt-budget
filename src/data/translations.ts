export interface TranslationSet {
  hero: {
    title: string;
    subtitle: string;
  };
  header: {
    searchPlaceholder: string;
    countrySpecific: string;
    noToolsFound: string;
    services: string;
    about: string;
    contact: string;
    signIn: string;
    signUp: string;
  };
  quickAccessTools: {
    description: string;
  };
  featuredTools: {
    title: string;
    titleForCountry: string;
    showAllCountries: string;
    toolDescriptionForCountry: string;
    toolDescriptionGlobal: string;
    launchTool: string;
    currentlyViewing: string;
    viewingDescription: string;
    taxCalculatorButton: string;
    budgetToolsButton: string;
    topEconomies: string;
  };
  features: {
    title: string;
    countrySpecificToolsTitle: string;
    countrySpecificToolsDescription: string;
    smartNavigationTitle: string;
    smartNavigationDescription: string;
    expertAccuracyTitle: string;
    expertAccuracyDescription: string;
  };
  megaMenu: {
    countries: string;
    popularTools: string;
    advancedTools: string;
    countryPopularTools: string;
    countryAdvancedTools: string;
  };
  germanTaxCalculator: {
    title: string;
    subtitle: string;
    basicInfo: string;
    personal: string;
    deductions: string;
    grossIncome: string;
    taxClass: string;
    federalState: string;
    churchMember: string;
    children: string;
    maritalStatus: string;
    spouseIncome: string;
    workExpenses: string;
    commuteDistance: string;
    workDays: string;
    homeOfficeDays: string;
    specialExpenses: string;
    results: string;
    netIncome: string;
    taxBreakdown: string;
    taxableIncome: string;
    incomeTax: string;
    solidaritySurcharge: string;
    churchTax: string;
    totalTax: string;
    effectiveRate: string;
    marginalRate: string;
    monthlyNet: string;
    childBenefits: string;
    keyFeatures: string;
    legalBasis: string;
    quickGuide: string;
    disclaimer: string;
  };
}

export const translations: Record<string, TranslationSet> = {
  en: {
    hero: {
      title: "Government Budget & Tax Tools for Every Country",
      subtitle: "Professional tax calculators, budget analyzers, and compliance tools tailored for each country's regulations and available in multiple languages."
    },
    header: {
      searchPlaceholder: "Search for tax tools, calculators, or countries...",
      countrySpecific: "Country-specific",
      noToolsFound: "No tools found matching your search",
      services: "Services",
      about: "About",
      contact: "Contact",
      signIn: "Sign In",
      signUp: "Sign Up"
    },
    quickAccessTools: {
      description: "Quick access to essential government and tax tools"
    },
    featuredTools: {
      title: "Featured Tools",
      titleForCountry: "Featured Tools for {country}",
      showAllCountries: "Show All Countries",
      toolDescriptionForCountry: "Specialized for {country}'s regulations",
      toolDescriptionGlobal: "Professional government and tax calculation tools",
      launchTool: "Launch Tool",
      currentlyViewing: "Currently Viewing: {country}",
      viewingDescription: "All tools are customized for {country}'s specific regulations and tax laws.",
      taxCalculatorButton: "{country} Tax Calculator",
      budgetToolsButton: "{country} Budget Tools",
      topEconomies: "Top Global Economies"
    },
    features: {
      title: "Key Features",
      countrySpecificToolsTitle: "Country-Specific Tools",
      countrySpecificToolsDescription: "Access specialized calculators and tools tailored to each country's unique tax laws and regulations.",
      smartNavigationTitle: "Smart Navigation",
      smartNavigationDescription: "Easily find the right tools with our intelligent search and categorization system.",
      expertAccuracyTitle: "Expert Accuracy",
      expertAccuracyDescription: "All calculations are verified by tax professionals and updated with the latest regulations."
    },
    megaMenu: {
      countries: "Countries",
      popularTools: "Popular Tools",
      advancedTools: "Advanced Tools",
      countryPopularTools: "{country} Popular Tools",
      countryAdvancedTools: "{country} Advanced Tools"
    },
    germanTaxCalculator: {
      title: "German Income Tax Calculator",
      subtitle: "Professional German income tax calculator for 2025 with all deductions and allowances",
      basicInfo: "Basic Information",
      personal: "Personal Details",
      deductions: "Deductions & Expenses",
      grossIncome: "Annual Gross Income (€)",
      taxClass: "Tax Class (Steuerklasse)",
      federalState: "Federal State",
      churchMember: "Church Tax Member",
      children: "Number of Children",
      maritalStatus: "Marital Status",
      spouseIncome: "Spouse Annual Income (€)",
      workExpenses: "Additional Work Expenses (€)",
      commuteDistance: "Daily Commute Distance (km)",
      workDays: "Annual Work Days",
      homeOfficeDays: "Home Office Days",
      specialExpenses: "Special Expenses (€)",
      results: "Tax Calculation Results",
      netIncome: "Net Income",
      taxBreakdown: "Tax Breakdown",
      taxableIncome: "Taxable Income",
      incomeTax: "Income Tax",
      solidaritySurcharge: "Solidarity Surcharge",
      churchTax: "Church Tax",
      totalTax: "Total Tax",
      effectiveRate: "Effective Rate",
      marginalRate: "Marginal Rate",
      monthlyNet: "Monthly Net Income",
      childBenefits: "Child Benefits",
      keyFeatures: "Key Features",
      legalBasis: "Legal Basis",
      quickGuide: "Quick Guide",
      disclaimer: "Important Disclaimer"
    }
  },
  de: {
    hero: {
      title: "Regierungsbudget- und Steuertools für jedes Land",
      subtitle: "Professionelle Steuerrechner, Budget-Analyzer und Compliance-Tools, die auf die Vorschriften jedes Landes zugeschnitten und in mehreren Sprachen verfügbar sind."
    },
    header: {
      searchPlaceholder: "Suchen Sie nach Steuertools, Rechnern oder Ländern...",
      countrySpecific: "Länderspezifisch",
      noToolsFound: "Keine Tools gefunden, die Ihrer Suche entsprechen",
      services: "Dienstleistungen",
      about: "Über uns",
      contact: "Kontakt",
      signIn: "Anmelden",
      signUp: "Registrieren"
    },
    quickAccessTools: {
      description: "Schnellzugriff auf wichtige Regierungs- und Steuertools"
    },
    featuredTools: {
      title: "Empfohlene Tools",
      titleForCountry: "Empfohlene Tools für {country}",
      showAllCountries: "Alle Länder anzeigen",
      toolDescriptionForCountry: "Spezialisiert auf die Vorschriften von {country}",
      toolDescriptionGlobal: "Professionelle Regierungs- und Steuerberechnungstools",
      launchTool: "Tool starten",
      currentlyViewing: "Aktuell angezeigt: {country}",
      viewingDescription: "Alle Tools sind auf die spezifischen Vorschriften und Steuergesetze von {country} zugeschnitten.",
      taxCalculatorButton: "{country} Steuerrechner",
      budgetToolsButton: "{country} Budget-Tools",
      topEconomies: "Top-Weltwirtschaften"
    },
    features: {
      title: "Hauptmerkmale",
      countrySpecificToolsTitle: "Länderspezifische Tools",
      countrySpecificToolsDescription: "Zugang zu spezialisierten Rechnern und Tools, die auf die einzigartigen Steuergesetze und Vorschriften jedes Landes zugeschnitten sind.",
      smartNavigationTitle: "Intelligente Navigation",
      smartNavigationDescription: "Finden Sie einfach die richtigen Tools mit unserem intelligenten Such- und Kategorisierungssystem.",
      expertAccuracyTitle: "Expertengenauigkeit",
      expertAccuracyDescription: "Alle Berechnungen werden von Steuerfachleuten überprüft und mit den neuesten Vorschriften aktualisiert."
    },
    megaMenu: {
      countries: "Länder",
      popularTools: "Beliebte Tools",
      advancedTools: "Erweiterte Tools",
      countryPopularTools: "{country} Beliebte Tools",
      countryAdvancedTools: "{country} Erweiterte Tools"
    },
    germanTaxCalculator: {
      title: "Deutscher Einkommensteuerrechner",
      subtitle: "Professioneller deutscher Einkommensteuerrechner für 2025 mit allen Abzügen und Freibeträgen",
      basicInfo: "Grundinformationen",
      personal: "Persönliche Angaben",
      deductions: "Abzüge & Ausgaben",
      grossIncome: "Jahres-Bruttoeinkommen (€)",
      taxClass: "Steuerklasse",
      federalState: "Bundesland",
      churchMember: "Kirchensteuerpflichtig",
      children: "Anzahl Kinder",
      maritalStatus: "Familienstand",
      spouseIncome: "Jahreseinkommen Ehepartner (€)",
      workExpenses: "Zusätzliche Werbungskosten (€)",
      commuteDistance: "Tägliche Pendelstrecke (km)",
      workDays: "Jährliche Arbeitstage",
      homeOfficeDays: "Homeoffice-Tage",
      specialExpenses: "Sonderausgaben (€)",
      results: "Steuerberechnungsergebnisse",
      netIncome: "Nettoeinkommen",
      taxBreakdown: "Steueraufschlüsselung",
      taxableIncome: "Zu versteuerndes Einkommen",
      incomeTax: "Einkommensteuer",
      solidaritySurcharge: "Solidaritätszuschlag",
      churchTax: "Kirchensteuer",
      totalTax: "Gesamtsteuer",
      effectiveRate: "Effektiver Steuersatz",
      marginalRate: "Grenzsteuersatz",
      monthlyNet: "Monatliches Nettoeinkommen",
      childBenefits: "Kindergeld/Kinderfreibetrag",
      keyFeatures: "Hauptfunktionen",
      legalBasis: "Rechtsgrundlage",
      quickGuide: "Schnellanleitung",
      disclaimer: "Wichtiger Hinweis"
    }
  },
  fr: {
    hero: {
      title: "Outils de budget gouvernemental et fiscaux pour chaque pays",
      subtitle: "Calculatrices fiscales professionnelles, analyseurs de budget et outils de conformité adaptés aux réglementations de chaque pays et disponibles en plusieurs langues."
    },
    header: {
      searchPlaceholder: "Rechercher des outils fiscaux, calculatrices ou pays...",
      countrySpecific: "Spécifique au pays",
      noToolsFound: "Aucun outil trouvé correspondant à votre recherche",
      services: "Services",
      about: "À propos",
      contact: "Contact",
      signIn: "Se connecter",
      signUp: "S'inscrire"
    },
    quickAccessTools: {
      description: "Accès rapide aux outils gouvernementaux et fiscaux essentiels"
    },
    featuredTools: {
      title: "Outils en vedette",
      titleForCountry: "Outils en vedette pour {country}",
      showAllCountries: "Afficher tous les pays",
      toolDescriptionForCountry: "Spécialisé pour les réglementations de {country}",
      toolDescriptionGlobal: "Outils professionnels de calcul gouvernemental et fiscal",
      launchTool: "Lancer l'outil",
      currentlyViewing: "Actuellement affiché : {country}",
      viewingDescription: "Tous les outils sont personnalisés pour les réglementations et lois fiscales spécifiques de {country}.",
      taxCalculatorButton: "Calculatrice fiscale {country}",
      budgetToolsButton: "Outils budgétaires {country}",
      topEconomies: "Principales économies mondiales"
    },
    features: {
      title: "Caractéristiques principales",
      countrySpecificToolsTitle: "Outils spécifiques au pays",
      countrySpecificToolsDescription: "Accédez à des calculatrices et outils spécialisés adaptés aux lois fiscales et réglementations uniques de chaque pays.",
      smartNavigationTitle: "Navigation intelligente",
      smartNavigationDescription: "Trouvez facilement les bons outils avec notre système de recherche et de catégorisation intelligent.",
      expertAccuracyTitle: "Précision d'expert",
      expertAccuracyDescription: "Tous les calculs sont vérifiés par des professionnels fiscaux et mis à jour avec les dernières réglementations."
    },
    megaMenu: {
      countries: "Pays",
      popularTools: "Outils populaires",
      advancedTools: "Outils avancés",
      countryPopularTools: "{country} Outils populaires",
      countryAdvancedTools: "{country} Outils avancés"
    },
    germanTaxCalculator: {
      title: "Calculateur d'impôt sur le revenu allemand",
      subtitle: "Calculateur professionnel d'impôt sur le revenu allemand pour 2025 avec toutes les déductions et allocations",
      basicInfo: "Informations de base",
      personal: "Détails personnels",
      deductions: "Déductions et dépenses",
      grossIncome: "Revenu brut annuel (€)",
      taxClass: "Classe d'impôt (Steuerklasse)",
      federalState: "État fédéral",
      churchMember: "Membre de l'impôt d'église",
      children: "Nombre d'enfants",
      maritalStatus: "État civil",
      spouseIncome: "Revenu annuel du conjoint (€)",
      workExpenses: "Frais professionnels supplémentaires (€)",
      commuteDistance: "Distance quotidienne de trajet (km)",
      workDays: "Jours de travail annuels",
      homeOfficeDays: "Jours de bureau à domicile",
      specialExpenses: "Dépenses spéciales (€)",
      results: "Résultats du calcul d'impôt",
      netIncome: "Revenu net",
      taxBreakdown: "Répartition des impôts",
      taxableIncome: "Revenu imposable",
      incomeTax: "Impôt sur le revenu",
      solidaritySurcharge: "Surtaxe de solidarité",
      churchTax: "Impôt d'église",
      totalTax: "Impôt total",
      effectiveRate: "Taux effectif",
      marginalRate: "Taux marginal",
      monthlyNet: "Revenu net mensuel",
      childBenefits: "Allocations familiales",
      keyFeatures: "Caractéristiques principales",
      legalBasis: "Base légale",
      quickGuide: "Guide rapide",
      disclaimer: "Avertissement important"
    }
  },
  es: {
    hero: {
      title: "Herramientas de presupuesto gubernamental y fiscales para cada país",
      subtitle: "Calculadoras fiscales profesionales, analizadores de presupuesto y herramientas de cumplimiento adaptadas a las regulaciones de cada país y disponibles en múltiples idiomas."
    },
    header: {
      searchPlaceholder: "Buscar herramientas fiscales, calculadoras o países...",
      countrySpecific: "Específico del país",
      noToolsFound: "No se encontraron herramientas que coincidan con su búsqueda",
      services: "Servicios",
      about: "Acerca de",
      contact: "Contacto",
      signIn: "Iniciar sesión",
      signUp: "Registrarse"
    },
    quickAccessTools: {
      description: "Acceso rápido a herramientas gubernamentales y fiscales esenciales"
    },
    featuredTools: {
      title: "Herramientas destacadas",
      titleForCountry: "Herramientas destacadas para {country}",
      showAllCountries: "Mostrar todos los países",
      toolDescriptionForCountry: "Especializado para las regulaciones de {country}",
      toolDescriptionGlobal: "Herramientas profesionales de cálculo gubernamental y fiscal",
      launchTool: "Lanzar herramienta",
      currentlyViewing: "Viendo actualmente: {country}",
      viewingDescription: "Todas las herramientas están personalizadas para las regulaciones y leyes fiscales específicas de {country}.",
      taxCalculatorButton: "Calculadora fiscal de {country}",
      budgetToolsButton: "Herramientas de presupuesto de {country}",
      topEconomies: "Principales economías mundiales"
    },
    features: {
      title: "Características principales",
      countrySpecificToolsTitle: "Herramientas específicas del país",
      countrySpecificToolsDescription: "Acceda a calculadoras y herramientas especializadas adaptadas a las leyes fiscales y regulaciones únicas de cada país.",
      smartNavigationTitle: "Navegación inteligente",
      smartNavigationDescription: "Encuentre fácilmente las herramientas correctas con nuestro sistema de búsqueda y categorización inteligente.",
      expertAccuracyTitle: "Precisión experta",
      expertAccuracyDescription: "Todos los cálculos son verificados por profesionales fiscales y actualizados con las últimas regulaciones."
    },
    megaMenu: {
      countries: "Países",
      popularTools: "Herramientas populares",
      advancedTools: "Herramientas avanzadas",
      countryPopularTools: "{country} Herramientas populares",
      countryAdvancedTools: "{country} Herramientas avanzadas"
    },
    germanTaxCalculator: {
      title: "Calculadora de impuesto sobre la renta alemán",
      subtitle: "Calculadora profesional de impuesto sobre la renta alemán para 2025 con todas las deducciones y asignaciones",
      basicInfo: "Información básica",
      personal: "Detalles personales",
      deductions: "Deducciones y gastos",
      grossIncome: "Ingreso bruto anual (€)",
      taxClass: "Clase de impuesto (Steuerklasse)",
      federalState: "Estado federal",
      churchMember: "Miembro del impuesto de iglesia",
      children: "Número de hijos",
      maritalStatus: "Estado civil",
      spouseIncome: "Ingreso anual del cónyuge (€)",
      workExpenses: "Gastos laborales adicionales (€)",
      commuteDistance: "Distancia diaria de viaje (km)",
      workDays: "Días laborales anuales",
      homeOfficeDays: "Días de oficina en casa",
      specialExpenses: "Gastos especiales (€)",
      results: "Resultados del cálculo de impuestos",
      netIncome: "Ingreso neto",
      taxBreakdown: "Desglose de impuestos",
      taxableIncome: "Ingreso gravable",
      incomeTax: "Impuesto sobre la renta",
      solidaritySurcharge: "Recargo de solidaridad",
      churchTax: "Impuesto de iglesia",
      totalTax: "Impuesto total",
      effectiveRate: "Tasa efectiva",
      marginalRate: "Tasa marginal",
      monthlyNet: "Ingreso neto mensual",
      childBenefits: "Beneficios por hijos",
      keyFeatures: "Características principales",
      legalBasis: "Base legal",
      quickGuide: "Guía rápida",
      disclaimer: "Descargo de responsabilidad importante"
    }
  },
  hi: {
    hero: {
      title: "हर देश के लिए सरकारी बजट और कर उपकरण",
      subtitle: "प्रत्येक देश के नियमों के लिए तैयार किए गए पेशेवर कर कैलकुलेटर, बजट विश्लेषक और अनुपालन उपकरण और कई भाषाओं में उपलब्ध।"
    },
    header: {
      searchPlaceholder: "कर उपकरण, कैलकुलेटर या देशों की खोज करें...",
      countrySpecific: "देश-विशिष्ट",
      noToolsFound: "आपकी खोज से मेल खाने वाले कोई उपकरण नहीं मिले",
      services: "सेवाएं",
      about: "के बारे में",
      contact: "संपर्क",
      signIn: "साइन इन",
      signUp: "साइन अप"
    },
    quickAccessTools: {
      description: "आवश्यक सरकारी और कर उपकरणों तक त्वरित पहुंच"
    },
    featuredTools: {
      title: "विशेष उपकरण",
      titleForCountry: "{country} के लिए विशेष उपकरण",
      showAllCountries: "सभी देश दिखाएं",
      toolDescriptionForCountry: "{country} के नियमों के लिए विशेषीकृत",
      toolDescriptionGlobal: "पेशेवर सरकारी और कर गणना उपकरण",
      launchTool: "उपकरण लॉन्च करें",
      currentlyViewing: "वर्तमान में देख रहे हैं: {country}",
      viewingDescription: "सभी उपकरण {country} के विशिष्ट नियमों और कर कानूनों के लिए अनुकूलित हैं।",
      taxCalculatorButton: "{country} कर कैलकुलेटर",
      budgetToolsButton: "{country} बजट उपकरण",
      topEconomies: "शीर्ष वैश्विक अर्थव्यवस्थाएं"
    },
    features: {
      title: "मुख्य विशेषताएं",
      countrySpecificToolsTitle: "देश-विशिष्ट उपकरण",
      countrySpecificToolsDescription: "प्रत्येक देश के अनूठे कर कानूनों और नियमों के अनुकूल विशेष कैलकुलेटर और उपकरणों तक पहुंच प्राप्त करें।",
      smartNavigationTitle: "स्मार्ट नेविगेशन",
      smartNavigationDescription: "हमारी बुद्धिमान खोज और वर्गीकरण प्रणाली के साथ आसानी से सही उपकरण खोजें।",
      expertAccuracyTitle: "विशेषज्ञ सटीकता",
      expertAccuracyDescription: "सभी गणनाएं कर पेशेवरों द्वारा सत्यापित की जाती हैं और नवीनतम नियमों के साथ अपडेट की जाती हैं।"
    },
    megaMenu: {
      countries: "देश",
      popularTools: "लोकप्रिय उपकरण",
      advancedTools: "उन्नत उपकरण",
      countryPopularTools: "{country} लोकप्रिय उपकरण",
      countryAdvancedTools: "{country} उन्नत उपकरण"
    },
    germanTaxCalculator: {
      title: "जर्मन आयकर कैलकुलेटर",
      subtitle: "सभी कटौती और भत्तों के साथ 2025 के लिए पेशेवर जर्मन आयकर कैलकुलेटर",
      basicInfo: "बुनियादी जानकारी",
      personal: "व्यक्तिगत विवरण",
      deductions: "कटौती और खर्च",
      grossIncome: "वार्षिक सकल आय (€)",
      taxClass: "कर वर्ग (Steuerklasse)",
      federalState: "संघीय राज्य",
      churchMember: "चर्च कर सदस्य",
      children: "बच्चों की संख्या",
      maritalStatus: "वैवाहिक स्थिति",
      spouseIncome: "जीवनसाथी की वार्षिक आय (€)",
      workExpenses: "अतिरिक्त कार्य व्यय (€)",
      commuteDistance: "दैनिक आवागमन दूरी (km)",
      workDays: "वार्षिक कार्य दिवस",
      homeOfficeDays: "होम ऑफिस दिन",
      specialExpenses: "विशेष व्यय (€)",
      results: "कर गणना परिणाम",
      netIncome: "शुद्ध आय",
      taxBreakdown: "कर विवरण",
      taxableIncome: "कर योग्य आय",
      incomeTax: "आयकर",
      solidaritySurcharge: "एकजुटता अधिभार",
      churchTax: "चर्च कर",
      totalTax: "कुल कर",
      effectiveRate: "प्रभावी दर",
      marginalRate: "सीमांत दर",
      monthlyNet: "मासिक शुद्ध आय",
      childBenefits: "बाल लाभ",
      keyFeatures: "मुख्य विशेषताएं",
      legalBasis: "कानूनी आधार",
      quickGuide: "त्वरित गाइड",
      disclaimer: "महत्वपूर्ण अस्वीकरण"
    }
  },
  zh: {
    hero: {
      title: "每个国家的政府预算和税务工具",
      subtitle: "专业税务计算器、预算分析器和合规工具，针对每个国家的法规量身定制，提供多种语言版本。"
    },
    header: {
      searchPlaceholder: "搜索税务工具、计算器或国家...",
      countrySpecific: "特定国家",
      noToolsFound: "未找到与您搜索匹配的工具",
      services: "服务",
      about: "关于",
      contact: "联系",
      signIn: "登录",
      signUp: "注册"
    },
    quickAccessTools: {
      description: "快速访问基本政府和税务工具"
    },
    featuredTools: {
      title: "特色工具",
      titleForCountry: "{country}的特色工具",
      showAllCountries: "显示所有国家",
      toolDescriptionForCountry: "专为{country}法规定制",
      toolDescriptionGlobal: "专业政府和税务计算工具",
      launchTool: "启动工具",
      currentlyViewing: "当前查看：{country}",
      viewingDescription: "所有工具都针对{country}的具体法规和税法进行了定制。",
      taxCalculatorButton: "{country}税务计算器",
      budgetToolsButton: "{country}预算工具",
      topEconomies: "全球顶级经济体"
    },
    features: {
      title: "主要特点",
      countrySpecificToolsTitle: "国家特定工具",
      countrySpecificToolsDescription: "访问针对每个国家独特税法和法规量身定制的专业计算器和工具。",
      smartNavigationTitle: "智能导航",
      smartNavigationDescription: "通过我们的智能搜索和分类系统轻松找到合适的工具。",
      expertAccuracyTitle: "专家准确性",
      expertAccuracyDescription: "所有计算都经过税务专业人员验证，并使用最新法规进行更新。"
    },
    megaMenu: {
      countries: "国家",
      popularTools: "热门工具",
      advancedTools: "高级工具",
      countryPopularTools: "{country}热门工具",
      countryAdvancedTools: "{country}高级工具"
    },
    germanTaxCalculator: {
      title: "德国所得税计算器",
      subtitle: "2025年专业德国所得税计算器，包含所有扣除额和津贴",
      basicInfo: "基本信息",
      personal: "个人详情",
      deductions: "扣除和费用",
      grossIncome: "年度总收入 (€)",
      taxClass: "税收等级 (Steuerklasse)",
      federalState: "联邦州",
      churchMember: "教会税成员",
      children: "子女人数",
      maritalStatus: "婚姻状况",
      spouseIncome: "配偶年收入 (€)",
      workExpenses: "额外工作费用 (€)",
      commuteDistance: "每日通勤距离 (km)",
      workDays: "年度工作日",
      homeOfficeDays: "居家办公日",
      specialExpenses: "特殊费用 (€)",
      results: "税收计算结果",
      netIncome: "净收入",
      taxBreakdown: "税收明细",
      taxableIncome: "应税收入",
      incomeTax: "所得税",
      solidaritySurcharge: "团结附加税",
      churchTax: "教会税",
      totalTax: "总税额",
      effectiveRate: "有效税率",
      marginalRate: "边际税率",
      monthlyNet: "月净收入",
      childBenefits: "儿童福利",
      keyFeatures: "主要功能",
      legalBasis: "法律依据",
      quickGuide: "快速指南",
      disclaimer: "重要免责声明"
    }
  },
  ja: {
    hero: {
      title: "すべての国のための政府予算・税務ツール",
      subtitle: "各国の規制に合わせたプロフェッショナルな税務計算機、予算分析ツール、コンプライアンスツールを多言語で提供。"
    },
    header: {
      searchPlaceholder: "税務ツール、計算機、または国を検索...",
      countrySpecific: "国固有",
      noToolsFound: "検索に一致するツールが見つかりません",
      services: "サービス",
      about: "会社概要",
      contact: "お問い合わせ",
      signIn: "サインイン",
      signUp: "サインアップ"
    },
    quickAccessTools: {
      description: "重要な政府・税務ツールへの迅速なアクセス"
    },
    featuredTools: {
      title: "注目のツール",
      titleForCountry: "{country}の注目ツール",
      showAllCountries: "すべての国を表示",
      toolDescriptionForCountry: "{country}の規制に特化",
      toolDescriptionGlobal: "プロフェッショナルな政府・税務計算ツール",
      launchTool: "ツールを起動",
      currentlyViewing: "現在表示中：{country}",
      viewingDescription: "すべてのツールは{country}の特定の規制と税法に合わせてカスタマイズされています。",
      taxCalculatorButton: "{country}税務計算機",
      budgetToolsButton: "{country}予算ツール",
      topEconomies: "世界のトップ経済国"
    },
    features: {
      title: "主な機能",
      countrySpecificToolsTitle: "国固有のツール",
      countrySpecificToolsDescription: "各国固有の税法と規制に合わせた専門的な計算機とツールにアクセスできます。",
      smartNavigationTitle: "スマートナビゲーション",
      smartNavigationDescription: "インテリジェントな検索と分類システムで適切なツールを簡単に見つけることができます。",
      expertAccuracyTitle: "専門家の精度",
      expertAccuracyDescription: "すべての計算は税務専門家によって検証され、最新の規制で更新されています。"
    },
    megaMenu: {
      countries: "国",
      popularTools: "人気ツール",
      advancedTools: "高度なツール",
      countryPopularTools: "{country}人気ツール",
      countryAdvancedTools: "{country}高度なツール"
    },
    germanTaxCalculator: {
      title: "ドイツ所得税計算機",
      subtitle: "すべての控除と手当を含む2025年のプロフェッショナルなドイツ所得税計算機",
      basicInfo: "基本情報",
      personal: "個人詳細",
      deductions: "控除と費用",
      grossIncome: "年間総所得 (€)",
      taxClass: "税務クラス (Steuerklasse)",
      federalState: "連邦州",
      churchMember: "教会税メンバー",
      children: "子どもの数",
      maritalStatus: "婚姻状況",
      spouseIncome: "配偶者年収 (€)",
      workExpenses: "追加業務費用 (€)",
      commuteDistance: "日次通勤距離 (km)",
      workDays: "年間勤務日数",
      homeOfficeDays: "在宅勤務日数",
      specialExpenses: "特別費用 (€)",
      results: "税務計算結果",
      netIncome: "手取り収入",
      taxBreakdown: "税金内訳",
      taxableIncome: "課税所得",
      incomeTax: "所得税",
      solidaritySurcharge: "連帯付加税",
      churchTax: "教会税",
      totalTax: "総税額",
      effectiveRate: "実効税率",
      marginalRate: "限界税率",
      monthlyNet: "月次手取り収入",
      childBenefits: "児童手当",
      keyFeatures: "主な機能",
      legalBasis: "法的根拠",
      quickGuide: "クイックガイド",
      disclaimer: "重要な免責事項"
    }
  },
  ar: {
    hero: {
      title: "أدوات الميزانية الحكومية والضرائب لكل دولة",
      subtitle: "حاسبات ضرائب مهنية ومحللات ميزانية وأدوات امتثال مصممة خصيصاً لقوانين كل دولة ومتاحة بعدة لغات."
    },
    header: {
      searchPlaceholder: "البحث عن أدوات الضرائب أو الحاسبات أو البلدان...",
      countrySpecific: "خاص بالدولة",
      noToolsFound: "لم يتم العثور على أدوات تطابق بحثك",
      services: "الخدمات",
      about: "حول",
      contact: "اتصل بنا",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب"
    },
    quickAccessTools: {
      description: "وصول سريع للأدوات الحكومية والضريبية الأساسية"
    },
    featuredTools: {
      title: "الأدوات المميزة",
      titleForCountry: "الأدوات المميزة لـ {country}",
      showAllCountries: "عرض جميع البلدان",
      toolDescriptionForCountry: "متخصص لقوانين {country}",
      toolDescriptionGlobal: "أدوات حساب حكومية وضريبية مهنية",
      launchTool: "تشغيل الأداة",
      currentlyViewing: "العرض الحالي: {country}",
      viewingDescription: "جميع الأدوات مخصصة للقوانين والقوانين الضريبية المحددة لـ {country}.",
      taxCalculatorButton: "حاسبة ضرائب {country}",
      budgetToolsButton: "أدوات ميزانية {country}",
      topEconomies: "أفضل الاقتصادات العالمية"
    },
    features: {
      title: "الميزات الرئيسية",
      countrySpecificToolsTitle: "أدوات خاصة بالدولة",
      countrySpecificToolsDescription: "الوصول إلى حاسبات وأدوات متخصصة مصممة خصيصاً لقوانين الضرائب واللوائح الفريدة لكل دولة.",
      smartNavigationTitle: "التنقل الذكي",
      smartNavigationDescription: "اعثر بسهولة على الأدوات المناسبة مع نظام البحث والتصنيف الذكي لدينا.",
      expertAccuracyTitle: "دقة الخبراء",
      expertAccuracyDescription: "جميع العمليات الحسابية يتم التحقق منها من قبل متخصصي الضرائب وتحديثها بأحدث اللوائح."
    },
    megaMenu: {
      countries: "البلدان",
      popularTools: "الأدوات الشائعة",
      advancedTools: "الأدوات المتقدمة",
      countryPopularTools: "{country} الأدوات الشائعة",
      countryAdvancedTools: "{country} الأدوات المتقدمة"
    },
    germanTaxCalculator: {
      title: "حاسبة ضريبة الدخل الألمانية",
      subtitle: "حاسبة ضريبة الدخل الألمانية المهنية لعام 2025 مع جميع الخصومات والبدلات",
      basicInfo: "المعلومات الأساسية",
      personal: "التفاصيل الشخصية",
      deductions: "الخصومات والمصروفات",
      grossIncome: "الدخل الإجمالي السنوي (€)",
      taxClass: "فئة الضريبة (Steuerklasse)",
      federalState: "الولاية الفيدرالية",
      churchMember: "عضو ضريبة الكنيسة",
      children: "عدد الأطفال",
      maritalStatus: "الحالة الاجتماعية",
      spouseIncome: "الدخل السنوي للزوج/ة (€)",
      workExpenses: "مصروفات العمل الإضافية (€)",
      commuteDistance: "مسافة التنقل اليومية (km)",
      workDays: "أيام العمل السنوية",
      homeOfficeDays: "أيام العمل من المنزل",
      specialExpenses: "المصروفات الخاصة (€)",
      results: "نتائج حساب الضريبة",
      netIncome: "الدخل الصافي",
      taxBreakdown: "تفصيل الضرائب",
      taxableIncome: "الدخل الخاضع للضريبة",
      incomeTax: "ضريبة الدخل",
      solidaritySurcharge: "رسوم التضامن",
      churchTax: "ضريبة الكنيسة",
      totalTax: "إجمالي الضريبة",
      effectiveRate: "المعدل الفعلي",
      marginalRate: "المعدل الحدي",
      monthlyNet: "الدخل الصافي الشهري",
      childBenefits: "إعانات الأطفال",
      keyFeatures: "الميزات الرئيسية",
      legalBasis: "الأساس القانوني",
      quickGuide: "الدليل السريع",
      disclaimer: "إخلاء مسؤولية مهم"
    }
  }
};
