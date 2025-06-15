
import { baseTools } from "@/data/tools";
import { continents } from "@/data/continents";

export interface ParsedTool {
  country?: string;
  toolName: string;
  isCountrySpecific: boolean;
}

// Map of UK tools to their actual page routes
const ukToolRoutes: { [key: string]: string } = {
  "United Kingdom Income Tax Calculator": "income-tax-calculator",
  "United Kingdom VAT Calculator": "vat-calculator", 
  "United Kingdom Corporate Tax Calculator": "corporate-tax-calculator",
  "United Kingdom Capital Gains Tax Calculator": "capital-gains-tax-calculator",
  "United Kingdom Property Tax Calculator": "property-tax-calculator",
  "United Kingdom Inheritance Tax Calculator": "inheritance-tax-calculator",
  "United Kingdom Payroll Tax Calculator": "payroll-tax-calculator",
  "United Kingdom Sales Tax Calculator": "sales-tax-calculator",
  "United Kingdom Import Tax Calculator": "import-tax-calculator",
  "United Kingdom Municipal Tax Calculator": "municipal-tax-calculator",
  "United Kingdom Budget Analyzer": "budget-analyzer",
  "United Kingdom GDP Calculator": "gdp-calculator",
  "United Kingdom Public Debt Calculator": "public-debt-calculator",
  "United Kingdom Revenue Projector": "revenue-projector",
  "United Kingdom Spending Tracker": "spending-tracker",
  "United Kingdom Budget Comparison": "budget-comparison",
  "United Kingdom Fiscal Impact Tool": "fiscal-impact-tool",
  "United Kingdom Economic Growth Calculator": "economic-growth-calculator",
  "United Kingdom Budget Allocation Tool": "budget-allocation-tool",
  "United Kingdom Deficit Calculator": "deficit-calculator"
};

// Map of German tools to their actual page routes
const germanToolRoutes: { [key: string]: string } = {
  "Germany Income Tax Calculator": "income-tax-calculator",
  "Germany VAT Calculator": "vat-calculator",
  "Germany Corporate Tax Calculator": "corporate-tax-calculator",
  "Germany Capital Gains Tax Calculator": "capital-gains-tax-calculator",
  "Germany Property Tax Calculator": "property-tax-calculator",
  "Germany Inheritance Tax Calculator": "inheritance-tax-calculator",
  "Germany Payroll Tax Calculator": "payroll-tax-calculator",
  "Germany Sales Tax Calculator": "sales-tax-calculator",
  "Germany Import Tax Calculator": "import-tax-calculator",
  "Germany Municipal Tax Calculator": "municipal-tax-calculator",
  "Germany Budget Analyzer": "budget-analyzer",
  "Germany GDP Calculator": "gdp-calculator",
  "Germany Public Debt Calculator": "public-debt-calculator",
  "Germany Revenue Projector": "revenue-projector",
  "Germany Spending Tracker": "spending-tracker",
  "Germany Budget Comparison": "budget-comparison",
  "Germany Fiscal Impact Tool": "fiscal-impact-tool",
  "Germany Economic Growth Calculator": "economic-growth-calculator",
  "Germany Budget Allocation Tool": "budget-allocation-tool",
  "Germany Deficit Calculator": "deficit-calculator"
};

export const parseToolName = (toolString: string): ParsedTool => {
  // Get all countries from continents
  const allCountries = Object.values(continents).flatMap(continent => continent.countries);
  
  // Check if the tool string starts with a country name
  const matchedCountry = allCountries.find(country => 
    toolString.toLowerCase().startsWith(country.toLowerCase())
  );
  
  if (matchedCountry) {
    // Remove country name and clean up the tool name
    const toolName = toolString
      .replace(new RegExp(`^${matchedCountry}\\s+`, 'i'), '')
      .trim();
    
    return {
      country: matchedCountry,
      toolName,
      isCountrySpecific: true
    };
  }
  
  return {
    toolName: toolString,
    isCountrySpecific: false
  };
};

export const generateToolSlug = (toolString: string): string => {
  return toolString.toLowerCase().replace(/\s+/g, '-');
};

export const generateCountrySlug = (country: string): string => {
  // Handle special country slug mappings
  const countrySlugMap: { [key: string]: string } = {
    "United Kingdom": "uk",  // Changed to "uk" to match desired URL format
    "United States": "united-states",
    "South Korea": "south-korea",
    "New Zealand": "new-zealand",
    "South Africa": "south-africa"
  };
  
  return countrySlugMap[country] || country.toLowerCase().replace(/\s+/g, '-');
};

export const getToolRoute = (toolString: string, lang: string): string => {
  console.log(`Getting route for tool: ${toolString} in language: ${lang}`);
  
  // Check if it's a UK tool with existing page
  if (ukToolRoutes[toolString]) {
    const route = `/tool/${lang}/uk/${ukToolRoutes[toolString]}`;
    console.log(`Found UK tool route: ${route}`);
    return route;
  }
  
  // Check if it's a German tool with existing page
  if (germanToolRoutes[toolString]) {
    const route = `/tool/${lang}/germany/${germanToolRoutes[toolString]}`;
    console.log(`Found German tool route: ${route}`);
    return route;
  }
  
  const parsedTool = parseToolName(toolString);
  
  if (parsedTool.isCountrySpecific && parsedTool.country) {
    const countrySlug = generateCountrySlug(parsedTool.country);
    const toolSlug = generateToolSlug(parsedTool.toolName);
    
    const route = `/tool/${lang}/${countrySlug}/${toolSlug}`;
    console.log(`Generated route for country-specific tool: ${route}`);
    return route;
  } else {
    // For global tools, we'll redirect to a general tool page
    const toolSlug = generateToolSlug(parsedTool.toolName);
    console.log(`Global tool not yet implemented: ${toolSlug}`);
    // Return empty string to indicate this should show an alert
    return '';
  }
};

export const handleToolNavigation = (toolString: string, lang: string, navigate: (path: string) => void) => {
  const route = getToolRoute(toolString, lang);
  
  if (route) {
    console.log(`Navigating to: ${route}`);
    navigate(route);
  } else {
    const parsedTool = parseToolName(toolString);
    alert(`Global tool "${parsedTool.toolName}" page not yet implemented. Please select a country-specific version.`);
  }
};
