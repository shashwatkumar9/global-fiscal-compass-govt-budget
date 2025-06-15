
export const continents = {
  europe: {
    name: "Europe",
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    countries: ["Germany", "UK", "France", "Italy", "Spain", "Netherlands", "Switzerland", "Belgium", "Austria", "Poland"]
  },
  asia: {
    name: "Asia",
    color: "bg-green-600", 
    hoverColor: "hover:bg-green-700",
    countries: ["China", "Japan", "India", "South Korea", "Indonesia", "Taiwan", "Saudi Arabia", "Israel", "Turkey", "Thailand", "Singapore", "Philippines", "Malaysia", "Bangladesh", "Vietnam"]
  },
  northAmerica: {
    name: "North America",
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700", 
    countries: ["USA", "Canada", "Mexico"]
  },
  southAmerica: {
    name: "South America",
    color: "bg-orange-600",
    hoverColor: "hover:bg-orange-700",
    countries: ["Brazil", "Argentina", "Colombia", "Chile", "Peru"]
  },
  africa: {
    name: "Africa",
    color: "bg-red-600",
    hoverColor: "hover:bg-red-700",
    countries: ["South Africa", "Egypt", "Algeria", "Nigeria", "Ethiopia", "Morocco", "Kenya", "Angola", "Ghana", "Tanzania"]
  },
  oceania: {
    name: "Oceania",
    color: "bg-teal-600",
    hoverColor: "hover:bg-teal-700",
    countries: ["Australia", "New Zealand", "Fiji"]
  }
};

export type ContinentKey = keyof typeof continents;
