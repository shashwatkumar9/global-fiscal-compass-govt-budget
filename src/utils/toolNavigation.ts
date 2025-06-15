
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

export const generateCountrySlug = (country: string): string => {
  return country.toLowerCase().replace(/\s+/g, '-');
};

export const handleToolNavigation = (toolString: string) => {
  const parsedTool = parseToolName(toolString);
  
  console.log(`Navigating to tool: ${toolString}`);
  console.log(`Parsed tool:`, parsedTool);
  
  if (parsedTool.isCountrySpecific && parsedTool.country) {
    const countrySlug = generateCountrySlug(parsedTool.country);
    const toolSlug = generateToolSlug(parsedTool.toolName);
    const route = `/tool/${countrySlug}/${toolSlug}`;
    
    console.log(`Navigating to country-specific tool: ${route}`);
    window.location.href = route;
  } else {
    // For global tools, we'll redirect to a general tool page
    const toolSlug = generateToolSlug(parsedTool.toolName);
    console.log(`Global tool not yet implemented: ${toolSlug}`);
    // For now, just log it - you can implement global tool pages later
    alert(`Global tool "${parsedTool.toolName}" page not yet implemented. Please select a country-specific version.`);
  }
};
