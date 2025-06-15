
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Building, Euro, TrendingUp, FileText } from "lucide-react";

const FranceCorporateTaxCalculator = () => {
  const [revenue, setRevenue] = useState<number>(500000);
  const [expenses, setExpenses] = useState<number>(300000);
  const [depreciation, setDepreciation] = useState<number>(20000);
  const [financialCharges, setFinancialCharges] = useState<number>(10000);
  const [companyType, setCompanyType] = useState<string>("sarl");
  const [taxYear, setTaxYear] = useState<string>("2025");
  const [isSmallCompany, setIsSmallCompany] = useState<string>("no");

  // French corporate tax rates for 2025
  const getTaxRate = () => {
    if (isSmallCompany === "yes") {
      return 15; // Reduced rate for small companies (up to €42,500)
    }
    return 25; // Standard rate
  };

  const calculateCorporateTax = () => {
    const taxableProfit = Math.max(0, revenue - expenses - depreciation - financialCharges);
    const standardRate = 25;
    const reducedRate = 15;
    const reducedRateThreshold = 42500;

    let corporateTax = 0;
    
    if (isSmallCompany === "yes" && taxableProfit <= reducedRateThreshold) {
      corporateTax = taxableProfit * (reducedRate / 100);
    } else if (isSmallCompany === "yes" && taxableProfit > reducedRateThreshold) {
      corporateTax = reducedRateThreshold * (reducedRate / 100) + 
                     (taxableProfit - reducedRateThreshold) * (standardRate / 100);
    } else {
      corporateTax = taxableProfit * (standardRate / 100);
    }

    // CVAE (Cotisation sur la Valeur Ajoutée des Entreprises) - simplified calculation
    const cvae = revenue > 152500 ? Math.min(revenue * 0.015, taxableProfit * 0.015) : 0;

    // CET (Contribution Économique Territoriale) = CFE + CVAE
    const cfe = revenue > 5000 ? 500 : 0; // Simplified CFE calculation
    const cet = cfe + cvae;

    const totalTax = corporateTax + cet;
    const netProfit = taxableProfit - totalTax;
    const effectiveRate = taxableProfit > 0 ? (totalTax / taxableProfit) * 100 : 0;

    return {
      revenue,
      totalExpenses: expenses + depreciation + financialCharges,
      taxableProfit,
      corporateTax,
      cvae,
      cfe,
      cet,
      totalTax,
      netProfit,
      effectiveRate
    };
  };

  const results = calculateCorporateTax();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Company types in France
  const companyTypes = {
    "sarl": "SARL (Société à Responsabilité Limitée)",
    "sas": "SAS (Société par Actions Simplifiée)",
    "sa": "SA (Société Anonyme)",
    "eurl": "EURL (Entreprise Unipersonnelle à Responsabilité Limitée)",
    "sasu": "SASU (Société par Actions Simplifiée Unipersonnelle)"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur d'Impôt sur les Sociétés Français</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez l'impôt sur les sociétés français avec les taux 2025 et la contribution économique territoriale.
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
                  <Building className="w-5 h-5" />
                  Informations de l'Entreprise
                </CardTitle>
                <CardDescription>
                  Saisissez les données financières de votre société
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="revenue">Chiffre d'Affaires (€)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expenses">Charges d'Exploitation (€)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="depreciation">Amortissements (€)</Label>
                  <Input
                    id="depreciation"
                    type="number"
                    value={depreciation}
                    onChange={(e) => setDepreciation(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="financialCharges">Charges Financières (€)</Label>
                  <Input
                    id="financialCharges"
                    type="number"
                    value={financialCharges}
                    onChange={(e) => setFinancialCharges(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="companyType">Forme Juridique</Label>
                  <Select value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(companyTypes).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="isSmallCompany">Éligible au Taux Réduit</Label>
                  <Select value={isSmallCompany} onValueChange={setIsSmallCompany}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Oui (PME)</SelectItem>
                      <SelectItem value="no">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    Taux réduit de 15% jusqu'à 42 500€ de bénéfice
                  </p>
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
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.netProfit)}</p>
                    <p className="text-sm text-gray-600">Résultat Net</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalTax)}</p>
                    <p className="text-sm text-gray-600">Impôts Total</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chiffre d'Affaires:</span>
                    <span className="font-semibold">{formatCurrency(results.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Charges:</span>
                    <span className="font-semibold">{formatCurrency(results.totalExpenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Résultat Imposable:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableProfit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impôt sur les Sociétés:</span>
                    <span className="font-semibold">{formatCurrency(results.corporateTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CVAE:</span>
                    <span className="font-semibold">{formatCurrency(results.cvae)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CFE:</span>
                    <span className="font-semibold">{formatCurrency(results.cfe)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CET Total:</span>
                    <span className="font-semibold">{formatCurrency(results.cet)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Effectif:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Taux appliqué:</strong> {getTaxRate()}% {isSmallCompany === "yes" ? "(taux réduit PME)" : "(taux normal)"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détail du Calcul de l'IS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Calcul du Résultat Imposable</h4>
                  <div className="space-y-1 text-sm">
                    <p>Chiffre d'affaires: {formatCurrency(revenue)}</p>
                    <p>- Charges d'exploitation: {formatCurrency(expenses)}</p>
                    <p>- Amortissements: {formatCurrency(depreciation)}</p>
                    <p>- Charges financières: {formatCurrency(financialCharges)}</p>
                    <p className="font-semibold border-t pt-1">= Résultat imposable: {formatCurrency(results.taxableProfit)}</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Calcul de l'Impôt sur les Sociétés</h4>
                  <div className="space-y-1 text-sm">
                    {isSmallCompany === "yes" && results.taxableProfit <= 42500 ? (
                      <p>Taux réduit 15%: {formatCurrency(results.taxableProfit)} × 15% = {formatCurrency(results.corporateTax)}</p>
                    ) : isSmallCompany === "yes" && results.taxableProfit > 42500 ? (
                      <div>
                        <p>Tranche 1 (15%): {formatCurrency(42500)} × 15% = {formatCurrency(42500 * 0.15)}</p>
                        <p>Tranche 2 (25%): {formatCurrency(results.taxableProfit - 42500)} × 25% = {formatCurrency((results.taxableProfit - 42500) * 0.25)}</p>
                        <p className="font-semibold">Total IS: {formatCurrency(results.corporateTax)}</p>
                      </div>
                    ) : (
                      <p>Taux normal 25%: {formatCurrency(results.taxableProfit)} × 25% = {formatCurrency(results.corporateTax)}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Contribution Économique Territoriale (CET)</h4>
                  <div className="space-y-1 text-sm">
                    <p>CFE (Cotisation Foncière): {formatCurrency(results.cfe)}</p>
                    <p>CVAE (Cotisation sur la VA): {formatCurrency(results.cvae)}</p>
                    <p className="font-semibold">Total CET: {formatCurrency(results.cet)}</p>
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
                  <FileText className="w-5 h-5" />
                  Taux d'Imposition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Taux Normal</h4>
                    <p className="text-sm text-gray-600">25% depuis 2022</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Taux Réduit PME</h4>
                    <p className="text-sm text-gray-600">15% jusqu'à 42 500€</p>
                    <p className="text-sm text-gray-600">Conditions: CA < 10M€, capital détenu à 75% par personnes physiques</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Échéances Fiscales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Acomptes</h4>
                    <p className="text-sm text-gray-600">15 mars, 15 juin, 15 septembre, 15 décembre</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Solde</h4>
                    <p className="text-sm text-gray-600">15 du 4e mois suivant la clôture</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Déclaration</h4>
                    <p className="text-sm text-gray-600">3 mois après la clôture</p>
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

export default FranceCorporateTaxCalculator;
