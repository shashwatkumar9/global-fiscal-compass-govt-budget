
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Home, Euro, MapPin, Building } from "lucide-react";

const FrancePropertyTaxCalculator = () => {
  const [cadastralValue, setCadastralValue] = useState<number>(150000);
  const [propertyType, setPropertyType] = useState<string>("house");
  const [location, setLocation] = useState<string>("urban");
  const [isMainResidence, setIsMainResidence] = useState<string>("yes");
  const [isVacant, setIsVacant] = useState<string>("no");
  const [department, setDepartment] = useState<string>("75"); // Paris
  const [area, setArea] = useState<number>(100);

  // Sample tax rates by department (simplified)
  const departmentRates = {
    "75": { name: "Paris", taxeFonciere: 13.5, taxeHabitation: 12.3 },
    "69": { name: "Rhône", taxeFonciere: 38.8, taxeHabitation: 25.1 },
    "13": { name: "Bouches-du-Rhône", taxeFonciere: 32.4, taxeHabitation: 18.9 },
    "59": { name: "Nord", taxeFonciere: 41.2, taxeHabitation: 28.7 },
    "33": { name: "Gironde", taxeFonciere: 25.6, taxeHabitation: 15.2 }
  };

  const calculatePropertyTax = () => {
    // Taxe foncière calculation
    let rentavalueRate = 0.5; // 50% abatement for built properties
    if (propertyType === "land") {
      rentavalueRate = 0.8; // 20% abatement for unbuilt land
    }

    const rentalValue = cadastralValue * rentavalueRate;
    const deptRates = departmentRates[department as keyof typeof departmentRates];
    
    const taxeFonciere = (rentalValue * deptRates.taxeFonciere) / 100;

    // Taxe d'habitation (being phased out for main residences)
    let taxeHabitation = 0;
    if (isMainResidence === "no") {
      taxeHabitation = (rentalValue * deptRates.taxeHabitation) / 100;
    }

    // Taxe sur les logements vacants (for vacant properties in tense zones)
    let taxeLogementVacant = 0;
    if (isVacant === "yes" && (department === "75" || department === "69")) {
      taxeLogementVacant = cadastralValue * 0.012; // 1.2% for first year vacancy
    }

    // Taxe d'enlèvement des ordures ménagères (TEOM) - estimated
    const teom = area * 8; // Rough estimate of €8 per m²

    const totalTax = taxeFonciere + taxeHabitation + taxeLogementVacant + teom;

    return {
      cadastralValue,
      rentalValue,
      taxeFonciere,
      taxeHabitation,
      taxeLogementVacant,
      teom,
      totalTax,
      effectiveRate: (totalTax / cadastralValue) * 100
    };
  };

  const results = calculatePropertyTax();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const propertyTypes = {
    "house": "Maison individuelle",
    "apartment": "Appartement",
    "commercial": "Local commercial",
    "land": "Terrain nu",
    "industrial": "Local industriel"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur Taxe Foncière France</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez vos taxes foncières et d'habitation françaises selon votre département et type de bien.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculateur</TabsTrigger>
          <TabsTrigger value="breakdown">Détail</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Informations du Bien
                </CardTitle>
                <CardDescription>
                  Saisissez les caractéristiques de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="cadastralValue">Valeur Locative Cadastrale (€)</Label>
                  <Input
                    id="cadastralValue"
                    type="number"
                    value={cadastralValue}
                    onChange={(e) => setCadastralValue(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Valeur indiquée sur votre avis de taxe foncière
                  </p>
                </div>

                <div>
                  <Label htmlFor="propertyType">Type de Bien</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(propertyTypes).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Département</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(departmentRates).map(([code, info]) => (
                        <SelectItem key={code} value={code}>
                          {code} - {info.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Surface (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="isMainResidence">Résidence Principale</Label>
                  <Select value={isMainResidence} onValueChange={setIsMainResidence}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Oui</SelectItem>
                      <SelectItem value="no">Non (résidence secondaire)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="isVacant">Logement Vacant</Label>
                  <Select value={isVacant} onValueChange={setIsVacant}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Non</SelectItem>
                      <SelectItem value="yes">Oui (plus de 1 an)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="w-5 h-5" />
                  Taxes à Payer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(results.totalTax)}</p>
                  <p className="text-sm text-gray-600">Total des Taxes Annuelles</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valeur Locative Cadastrale:</span>
                    <span className="font-semibold">{formatCurrency(results.cadastralValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base d'Imposition:</span>
                    <span className="font-semibold">{formatCurrency(results.rentalValue)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxe Foncière:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(results.taxeFonciere)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxe d'Habitation:</span>
                    <span className="font-semibold text-orange-600">{formatCurrency(results.taxeHabitation)}</span>
                  </div>
                  {results.taxeLogementVacant > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxe Logement Vacant:</span>
                      <span className="font-semibold text-purple-600">{formatCurrency(results.taxeLogementVacant)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">TEOM:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.teom)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Effectif:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Paiement:</strong> En 2 fois (février et octobre) ou mensuellement
                  </p>
                </div>

                {isMainResidence === "yes" && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Info:</strong> Suppression progressive de la taxe d'habitation sur les résidences principales
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détail du Calcul des Taxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Taxe Foncière</h4>
                  <div className="space-y-1 text-sm">
                    <p>Base d'imposition: {formatCurrency(results.rentalValue)} (50% de la valeur cadastrale)</p>
                    <p>Taux communal: {departmentRates[department as keyof typeof departmentRates].taxeFonciere}%</p>
                    <p>Calcul: {formatCurrency(results.rentalValue)} × {departmentRates[department as keyof typeof departmentRates].taxeFonciere}% = {formatCurrency(results.taxeFonciere)}</p>
                  </div>
                </div>

                {results.taxeHabitation > 0 && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Taxe d'Habitation</h4>
                    <div className="space-y-1 text-sm">
                      <p>Base d'imposition: {formatCurrency(results.rentalValue)}</p>
                      <p>Taux communal: {departmentRates[department as keyof typeof departmentRates].taxeHabitation}%</p>
                      <p>Calcul: {formatCurrency(results.rentalValue)} × {departmentRates[department as keyof typeof departmentRates].taxeHabitation}% = {formatCurrency(results.taxeHabitation)}</p>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">TEOM (Taxe Ordures Ménagères)</h4>
                  <div className="space-y-1 text-sm">
                    <p>Surface: {area} m²</p>
                    <p>Taux estimé: 8€/m²</p>
                    <p>Calcul: {area} m² × 8€ = {formatCurrency(results.teom)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Types de Taxes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Taxe Foncière</h4>
                    <p className="text-sm text-gray-600">Tous les propriétaires, payable en octobre</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Taxe d'Habitation</h4>
                    <p className="text-sm text-gray-600">Supprimée pour les résidences principales</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">TEOM</h4>
                    <p className="text-sm text-gray-600">Collecte des ordures ménagères</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Exonérations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Personnes Âgées</h4>
                    <p className="text-sm text-gray-600">Plus de 75 ans sous conditions de revenus</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Constructions Neuves</h4>
                    <p className="text-sm text-gray-600">2 ans d'exonération possible</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rénovation Énergétique</h4>
                    <p className="text-sm text-gray-600">Exonération temporaire possible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrancePropertyTaxCalculator;
