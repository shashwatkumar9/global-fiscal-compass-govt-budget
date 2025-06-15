
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Euro, FileText, Info, Building } from "lucide-react";

const FranceCorporateTaxCalculator = () => {
  const [revenue, setRevenue] = useState<number>(1000000);
  const [expenses, setExpenses] = useState<number>(800000);
  const [companySize, setCompanySize] = useState<string>("large");
  const [sector, setSector] = useState<string>("general");
  const [researchCredit, setResearchCredit] = useState<number>(0);
  const [otherCredits, setOtherCredits] = useState<number>(0);

  const calculateTax = () => {
    const taxableProfit = Math.max(0, revenue - expenses);
    
    // Standard corporate tax rate in France
    let standardRate = 25; // 25% standard rate for 2025
    
    // Reduced rate for small companies (SME) on profits up to €42,500
    let corporateTax = 0;
    
    if (companySize === "small" && taxableProfit <= 42500) {
      corporateTax = taxableProfit * 0.15; // 15% reduced rate
    } else if (companySize === "small") {
      corporateTax = 42500 * 0.15 + (taxableProfit - 42500) * 0.25;
    } else {
      corporateTax = taxableProfit * (standardRate / 100);
    }

    // Apply tax credits
    const totalCredits = researchCredit + otherCredits;
    const finalTax = Math.max(0, corporateTax - totalCredits);
    
    // Additional contributions
    const socialContribution = taxableProfit > 763000 ? taxableProfit * 0.033 : 0; // 3.3% social contribution
    const totalTax = finalTax + socialContribution;
    
    return {
      taxableProfit,
      corporateTax,
      socialContribution,
      totalCredits,
      finalTax,
      totalTax,
      netProfit: taxableProfit - totalTax,
      effectiveRate: taxableProfit > 0 ? (totalTax / taxableProfit) * 100 : 0
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur d'Impôt sur les Sociétés Français</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez l'impôt sur les sociétés de votre entreprise en France avec les taux et crédits d'impôt 2025.
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
                  Informations Financières
                </CardTitle>
                <CardDescription>
                  Saisissez les données financières de votre entreprise
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
                  <Label htmlFor="expenses">Charges Déductibles (€)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="companySize">Taille de l'Entreprise</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">PME (CA &lt; 250M€)</SelectItem>
                      <SelectItem value="large">Grande Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sector">Secteur d'Activité</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Général</SelectItem>
                      <SelectItem value="innovation">Innovation/R&D</SelectItem>
                      <SelectItem value="digital">Numérique</SelectItem>
                      <SelectItem value="green">Transition Écologique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="researchCredit">Crédit d'Impôt Recherche (€)</Label>
                  <Input
                    id="researchCredit"
                    type="number"
                    value={researchCredit}
                    onChange={(e) => setResearchCredit(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="otherCredits">Autres Crédits d'Impôt (€)</Label>
                  <Input
                    id="otherCredits"
                    type="number"
                    value={otherCredits}
                    onChange={(e) => setOtherCredits(Number(e.target.value))}
                    className="mt-1"
                  />
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
                    <p className="text-sm text-gray-600">Bénéfice Net</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalTax)}</p>
                    <p className="text-sm text-gray-600">Impôt Total</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bénéfice Imposable:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableProfit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IS (25% ou 15%):</span>
                    <span className="font-semibold">{formatCurrency(results.corporateTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contribution Sociale (3.3%):</span>
                    <span className="font-semibold">{formatCurrency(results.socialContribution)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crédits d'Impôt:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(results.totalCredits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Effectif:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                {companySize === "small" && results.taxableProfit <= 42500 && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Taux réduit PME</strong> - 15% jusqu'à 42 500€
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
              <CardTitle>Détail du Calcul IS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Calcul du Bénéfice</h4>
                  <p>Chiffre d'affaires: {formatCurrency(revenue)}</p>
                  <p>Charges déductibles: {formatCurrency(expenses)}</p>
                  <p className="font-semibold">Bénéfice imposable: {formatCurrency(results.taxableProfit)}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Application des Taux</h4>
                  {companySize === "small" ? (
                    <div>
                      <p>Taux PME (15%) sur les premiers 42 500€</p>
                      <p>Taux normal (25%) au-delà</p>
                    </div>
                  ) : (
                    <p>Taux normal: 25%</p>
                  )}
                  <p className="font-semibold">IS calculé: {formatCurrency(results.corporateTax)}</p>
                </div>

                {results.socialContribution > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Contribution Sociale</h4>
                    <p>3.3% sur les bénéfices {'>'}  763 000€</p>
                    <p className="font-semibold">Contribution: {formatCurrency(results.socialContribution)}</p>
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
                  Taux d'IS 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>PME:</strong> 15% jusqu'à 42 500€</p>
                  <p><strong>Taux normal:</strong> 25%</p>
                  <p><strong>Contribution sociale:</strong> 3.3% (si bénéfice {'>'} 763 000€)</p>
                  <p><strong>Taux effectif max:</strong> 28.9%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Crédits d'Impôt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>CIR:</strong> 30% des dépenses R&D</p>
                  <p><strong>CII:</strong> 20% des dépenses innovation</p>
                  <p><strong>Transition numérique:</strong> Jusqu'à 25%</p>
                  <p><strong>Transition écologique:</strong> Divers taux</p>
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
