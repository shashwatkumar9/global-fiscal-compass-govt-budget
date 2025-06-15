import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, Euro, Home, Building2 } from "lucide-react";

const FranceCapitalGainsTaxCalculator = () => {
  const [salePrice, setSalePrice] = useState<number>(300000);
  const [purchasePrice, setPurchasePrice] = useState<number>(200000);
  const [purchaseDate, setPurchaseDate] = useState<string>("2018-01-01");
  const [saleDate, setSaleDate] = useState<string>("2024-01-01");
  const [assetType, setAssetType] = useState<string>("real_estate");
  const [improvementCosts, setImprovementCosts] = useState<number>(15000);
  const [notaryFees, setNotaryFees] = useState<number>(12000);
  const [isMainResidence, setIsMainResidence] = useState<string>("no");

  const calculateHoldingPeriod = () => {
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const diffTime = Math.abs(sale.getTime() - purchase.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffYears);
  };

  const calculateCapitalGainsTax = () => {
    const grossCapitalGain = salePrice - purchasePrice - improvementCosts - notaryFees;
    const holdingPeriod = calculateHoldingPeriod();

    if (grossCapitalGain <= 0) {
      return {
        grossCapitalGain,
        holdingPeriod,
        allowance: 0,
        taxableGain: 0,
        incomeTax: 0,
        socialContributions: 0,
        totalTax: 0,
        netGain: grossCapitalGain,
        effectiveRate: 0
      };
    }

    // Main residence exemption
    if (isMainResidence === "yes" && assetType === "real_estate") {
      return {
        grossCapitalGain,
        holdingPeriod,
        allowance: grossCapitalGain, // Full exemption
        taxableGain: 0,
        incomeTax: 0,
        socialContributions: 0,
        totalTax: 0,
        netGain: grossCapitalGain,
        effectiveRate: 0
      };
    }

    let allowance = 0;

    if (assetType === "real_estate") {
      // Real estate holding period allowances
      if (holdingPeriod >= 6) {
        // Income tax allowance: 6% per year from 6th to 21st year, then 4% for 22nd year
        let incomeTaxAllowance = 0;
        if (holdingPeriod >= 22) {
          incomeTaxAllowance = 100; // Full exemption after 22 years
        } else {
          incomeTaxAllowance = Math.min(100, (holdingPeriod - 5) * 6);
        }
        allowance = (grossCapitalGain * incomeTaxAllowance) / 100;
      }
    } else if (assetType === "securities") {
      // Securities: abatement for duration of ownership
      if (holdingPeriod >= 2) {
        const allowanceRate = Math.min(65, (holdingPeriod - 1) * 1.3); // 1.3% per year after 2nd year, max 65%
        allowance = (grossCapitalGain * allowanceRate) / 100;
      }
    }

    const taxableGain = Math.max(0, grossCapitalGain - allowance);

    // Tax rates
    let incomeTaxRate = 0;
    let socialContribRate = 0;

    if (assetType === "real_estate") {
      incomeTaxRate = holdingPeriod >= 22 ? 0 : 19; // 19% for real estate
      socialContribRate = holdingPeriod >= 30 ? 0 : 17.2; // 17.2% social contributions
    } else if (assetType === "securities") {
      incomeTaxRate = 12.8; // PFU (flat tax)
      socialContribRate = 17.2;
    } else {
      incomeTaxRate = 19;
      socialContribRate = 17.2;
    }

    const incomeTax = (taxableGain * incomeTaxRate) / 100;
    const socialContributions = (taxableGain * socialContribRate) / 100;
    const totalTax = incomeTax + socialContributions;
    const netGain = grossCapitalGain - totalTax;
    const effectiveRate = grossCapitalGain > 0 ? (totalTax / grossCapitalGain) * 100 : 0;

    return {
      grossCapitalGain,
      holdingPeriod,
      allowance,
      taxableGain,
      incomeTax,
      socialContributions,
      totalTax,
      netGain,
      effectiveRate
    };
  };

  const results = calculateCapitalGainsTax();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const assetTypes = {
    "real_estate": "Immobilier",
    "securities": "Valeurs mobilières",
    "business": "Parts sociales",
    "other": "Autres biens"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur Plus-Values France</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez l'impôt sur les plus-values immobilières et mobilières avec les abattements pour durée de détention.
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
                  <TrendingUp className="w-5 h-5" />
                  Informations de la Cession
                </CardTitle>
                <CardDescription>
                  Saisissez les détails de votre plus-value
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="assetType">Type de Bien</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(assetTypes).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="purchasePrice">Prix d'Acquisition (€)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaseDate">Date d'Acquisition</Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="saleDate">Date de Vente</Label>
                    <Input
                      id="saleDate"
                      type="date"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="improvementCosts">Travaux d'Amélioration (€)</Label>
                  <Input
                    id="improvementCosts"
                    type="number"
                    value={improvementCosts}
                    onChange={(e) => setImprovementCosts(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notaryFees">Frais d'Acquisition (€)</Label>
                  <Input
                    id="notaryFees"
                    type="number"
                    value={notaryFees}
                    onChange={(e) => setNotaryFees(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                {assetType === "real_estate" && (
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
                )}
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
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(results.netGain)}</p>
                    <p className="text-sm text-gray-600">Plus-Value Nette</p>
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
                    <span className="font-semibold">{formatCurrency(results.grossCapitalGain)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durée de Détention:</span>
                    <span className="font-semibold">{results.holdingPeriod} ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Abattement:</span>
                    <span className="font-semibold">{formatCurrency(results.allowance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plus-Value Imposable:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableGain)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impôt sur le Revenu:</span>
                    <span className="font-semibold">{formatCurrency(results.incomeTax)}</span>
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

                {isMainResidence === "yes" && assetType === "real_estate" && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Exonération:</strong> Résidence principale - Aucun impôt à payer
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
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Plus-Value Brute</h4>
                  <div className="space-y-1 text-sm">
                    <p>Prix de vente: {formatCurrency(salePrice)}</p>
                    <p>- Prix d'acquisition: {formatCurrency(purchasePrice)}</p>
                    <p>- Frais d'acquisition: {formatCurrency(notaryFees)}</p>
                    <p>- Travaux: {formatCurrency(improvementCosts)}</p>
                    <p className="font-semibold border-t pt-1">= Plus-value brute: {formatCurrency(results.grossCapitalGain)}</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Abattement pour Durée de Détention</h4>
                  <div className="space-y-1 text-sm">
                    <p>Durée de détention: {results.holdingPeriod} ans</p>
                    <p>Abattement: {formatCurrency(results.allowance)}</p>
                    <p className="font-semibold">Plus-value imposable: {formatCurrency(results.taxableGain)}</p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Impôts et Prélèvements Sociaux</h4>
                  <div className="space-y-1 text-sm">
                    <p>Impôt sur le revenu: {formatCurrency(results.incomeTax)}</p>
                    <p>Prélèvements sociaux: {formatCurrency(results.socialContributions)}</p>
                    <p className="font-semibold">Total impôts: {formatCurrency(results.totalTax)}</p>
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
                  <Home className="w-5 h-5" />
                  Plus-Value Immobilière
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Taux d'imposition</h4>
                    <p className="text-sm text-gray-600">19% + 17.2% de prélèvements sociaux</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Abattement</h4>
                    <p className="text-sm text-gray-600">Pour durée de détention (6% par an)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Exonération</h4>
                    <p className="text-sm text-gray-600">Après 22 ans pour l'impôt, 30 ans pour les PS</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Plus-Value Mobilière
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Taux d'imposition</h4>
                    <p className="text-sm text-gray-600">PFU à 30% (12.8% IR + 17.2% PS)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Abattement</h4>
                    <p className="text-sm text-gray-600">Possible sous conditions (si < 2 ans)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Déclaration</h4>
                    <p className="text-sm text-gray-600">Formulaire 2042-C</p>
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

export default FranceCapitalGainsTaxCalculator;
