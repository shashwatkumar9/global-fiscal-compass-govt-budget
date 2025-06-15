
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Percent, ShoppingCart, FileText } from "lucide-react";

const FranceVATCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [vatRate, setVatRate] = useState<string>("20");
  const [calculationType, setCalculationType] = useState<string>("add");
  const [businessType, setBusinessType] = useState<string>("standard");

  // French VAT rates
  const vatRates = {
    "20": { rate: 20, name: "Taux normal", description: "Biens et services standard" },
    "10": { rate: 10, name: "Taux intermédiaire", description: "Restauration, transport, logement" },
    "5.5": { rate: 5.5, name: "Taux réduit", description: "Livres, produits alimentaires" },
    "2.1": { rate: 2.1, name: "Taux super-réduit", description: "Médicaments, presse" }
  };

  const calculateVAT = () => {
    const rate = parseFloat(vatRate);
    let priceExcludingVAT: number;
    let vatAmount: number;
    let priceIncludingVAT: number;

    if (calculationType === "add") {
      // Adding VAT to amount
      priceExcludingVAT = amount;
      vatAmount = (amount * rate) / 100;
      priceIncludingVAT = amount + vatAmount;
    } else {
      // Removing VAT from amount
      priceIncludingVAT = amount;
      priceExcludingVAT = amount / (1 + rate / 100);
      vatAmount = amount - priceExcludingVAT;
    }

    return {
      priceExcludingVAT,
      vatAmount,
      priceIncludingVAT,
      vatRate: rate
    };
  };

  const results = calculateVAT();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // VAT examples by category
  const vatExamples = [
    { category: "Alimentation de base", rate: 5.5, examples: ["Pain", "Lait", "Fruits", "Légumes"] },
    { category: "Restauration", rate: 10, examples: ["Restaurants", "Hôtels", "Bars"] },
    { category: "Biens standard", rate: 20, examples: ["Vêtements", "Électronique", "Meubles"] },
    { category: "Services", rate: 20, examples: ["Coiffure", "Réparation", "Conseil"] }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur de TVA Française</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez la TVA française avec les différents taux en vigueur (20%, 10%, 5,5%, 2,1%).
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculateur</TabsTrigger>
          <TabsTrigger value="rates">Taux de TVA</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calcul de TVA
                </CardTitle>
                <CardDescription>
                  Calculez le montant HT, TVA et TTC
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="calculationType">Type de calcul</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Ajouter la TVA (HT → TTC)</SelectItem>
                      <SelectItem value="remove">Retirer la TVA (TTC → HT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="vatRate">Taux de TVA</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vatRates).map(([rate, info]) => (
                        <SelectItem key={rate} value={rate}>
                          {info.rate}% - {info.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {vatRates[vatRate as keyof typeof vatRates]?.description}
                  </p>
                </div>

                <div>
                  <Label htmlFor="businessType">Type d'activité</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Entreprise standard</SelectItem>
                      <SelectItem value="auto_entrepreneur">Auto-entrepreneur</SelectItem>
                      <SelectItem value="association">Association</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Résultats du Calcul
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prix HT:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.priceExcludingVAT)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">TVA ({results.vatRate}%):</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatCurrency(results.vatAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prix TTC:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.priceIncludingVAT)}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <p><strong>Calcul effectué:</strong></p>
                  {calculationType === "add" ? (
                    <div>
                      <p>HT: {formatCurrency(amount)}</p>
                      <p>TVA: {formatCurrency(amount)} × {results.vatRate}% = {formatCurrency(results.vatAmount)}</p>
                      <p>TTC: {formatCurrency(amount)} + {formatCurrency(results.vatAmount)} = {formatCurrency(results.priceIncludingVAT)}</p>
                    </div>
                  ) : (
                    <div>
                      <p>TTC: {formatCurrency(amount)}</p>
                      <p>HT: {formatCurrency(amount)} ÷ 1.{results.vatRate.toString().replace('.', '')} = {formatCurrency(results.priceExcludingVAT)}</p>
                      <p>TVA: {formatCurrency(amount)} - {formatCurrency(results.priceExcludingVAT)} = {formatCurrency(results.vatAmount)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vatExamples.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {category.category} - {category.rate}%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{example}</span>
                        <span className="font-semibold text-blue-600">{category.rate}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Obligations TVA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Seuils de franchise</h4>
                    <p className="text-sm text-gray-600">Services: 36 800 €</p>
                    <p className="text-sm text-gray-600">Ventes: 91 900 €</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Déclaration</h4>
                    <p className="text-sm text-gray-600">Mensuelle ou trimestrielle</p>
                    <p className="text-sm text-gray-600">Selon le chiffre d'affaires</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cas Particuliers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Auto-entrepreneur</h4>
                    <p className="text-sm text-gray-600">Franchise de TVA sous seuils</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Export</h4>
                    <p className="text-sm text-gray-600">TVA à 0% hors UE</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Intracommunautaire</h4>
                    <p className="text-sm text-gray-600">Autoliquidation</p>
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

export default FranceVATCalculator;
