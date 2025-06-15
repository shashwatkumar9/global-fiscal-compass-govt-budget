
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Euro, FileText, Info } from "lucide-react";

const FranceCapitalGainsTaxCalculator = () => {
  const [salePrice, setSalePrice] = useState<number>(500000);
  const [purchasePrice, setPurchasePrice] = useState<number>(400000);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [isMainResidence, setIsMainResidence] = useState<string>("no");

  const calculateTax = () => {
    const capitalGain = Math.max(0, salePrice - purchasePrice);
    
    // Apply exemptions and reductions based on holding period
    let taxableGain = capitalGain;
    
    // Main residence exemption
    if (isMainResidence === "yes") {
      taxableGain = 0;
    } else {
      // Progressive reduction for holding period
      if (holdingPeriod > 2) {
        const reductionRate = Math.min((holdingPeriod - 2) * 6, 100) / 100;
        taxableGain = capitalGain * (1 - reductionRate);
      }
    }

    const taxRate = propertyType === "residential" ? 19 : 26.5; // 19% for residential, 26.5% for commercial
    const capitalGainsTax = taxableGain * (taxRate / 100);
    const socialContributions = taxableGain * 0.172; // 17.2% social contributions
    const totalTax = capitalGainsTax + socialContributions;

    return {
      capitalGain,
      taxableGain,
      capitalGainsTax,
      socialContributions,
      totalTax,
      netProceeds: salePrice - totalTax,
      effectiveRate: capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0
    };
  };

  const results = calculateTax();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur d'Impôt sur les Plus-Values Français</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez votre impôt sur les plus-values immobilières en France avec les dernières réglementations 2025.
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
                  <Calculator className="w-5 h-5" />
                  Informations de la Vente
                </CardTitle>
                <CardDescription>
                  Saisissez les détails de votre transaction immobilière
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="salePrice">Prix de Vente (€)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="purchasePrice">Prix d'Achat (€)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="holdingPeriod">Durée de Détention (années)</Label>
                  <Input
                    id="holdingPeriod"
                    type="number"
                    min="0"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="propertyType">Type de Bien</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Résidentiel</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="isMainResidence">Résidence Principale</Label>
                  <Select value={isMainResidence} onValueChange={setIsMainResidence}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Oui</SelectItem>
                      <SelectItem value="no">Non</SelectItem>
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
                  Résultats du Calcul
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.netProceeds)}</p>
                    <p className="text-sm text-gray-600">Produit Net</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalTax)}</p>
                    <p className="text-sm text-gray-600">Impôt Total</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plus-Value Brute:</span>
                    <span className="font-semibold">{formatCurrency(results.capitalGain)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plus-Value Taxable:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableGain)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impôt Plus-Value:</span>
                    <span className="font-semibold">{formatCurrency(results.capitalGainsTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prélèvements Sociaux:</span>
                    <span className="font-semibold">{formatCurrency(results.socialContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Effectif:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                {isMainResidence === "yes" && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Exonération totale</strong> - Résidence principale
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
              <CardTitle>Détail du Calcul</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Calcul de la Plus-Value</h4>
                  <p>Prix de vente: {formatCurrency(salePrice)}</p>
                  <p>Prix d'achat: {formatCurrency(purchasePrice)}</p>
                  <p className="font-semibold">Plus-value brute: {formatCurrency(results.capitalGain)}</p>
                </div>
                
                {holdingPeriod > 2 && isMainResidence === "no" && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Abattement pour Durée de Détention</h4>
                    <p>Durée: {holdingPeriod} années</p>
                    <p>Abattement: {Math.min((holdingPeriod - 2) * 6, 100)}%</p>
                    <p className="font-semibold">Plus-value taxable: {formatCurrency(results.taxableGain)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Abattements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Résidence principale:</strong> Exonération totale</p>
                  <p><strong>Durée de détention:</strong> 6% par an au-delà de 2 ans</p>
                  <p><strong>Exonération totale:</strong> Après 22 ans pour les particuliers</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Taux d'Imposition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Résidentiel:</strong> 19% + 17.2% (prélèvements sociaux)</p>
                  <p><strong>Commercial:</strong> 26.5% + 17.2% (prélèvements sociaux)</p>
                  <p><strong>Total résidentiel:</strong> 36.2%</p>
                  <p><strong>Total commercial:</strong> 43.7%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FranceCapitalGainsTaxCalculator;
