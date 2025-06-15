
import { baseTools } from "@/data/tools";
import { continents } from "@/data/continents";

export interface ParsedTool {
  country?: string;
  toolName: string;
  isCountrySpecific: boolean;
}

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

export const handleToolNavigation = (toolString: string) => {
  const toolSlug = generateToolSlug(toolString);
  const parsedTool = parseToolName(toolString);
  
  console.log(`Navigating to tool: ${toolString}`);
  console.log(`Tool slug: ${toolSlug}`);
  console.log(`Parsed tool:`, parsedTool);
  
  if (parsedTool.isCountrySpecific) {
    console.log(`Country-specific tool: ${parsedTool.country} - ${parsedTool.toolName}`);
    // Future route: `/tool/${country-slug}/${tool-slug}`
    const countrySlug = parsedTool.country!.toLowerCase().replace(/\s+/g, '-');
    const baseToolSlug = generateToolSlug(parsedTool.toolName);
    console.log(`Future route: /tool/${countrySlug}/${baseToolSlug}`);
  } else {
    console.log(`Global tool: ${parsedTool.toolName}`);
    // Future route: `/tool/${tool-slug}`
    console.log(`Future route: /tool/${toolSlug}`);
  }
};
