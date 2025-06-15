
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Euro, FileText, Info, TrendingUp } from "lucide-react";

const FranceIncomeTaxCalculator = () => {
  const [grossIncome, setGrossIncome] = useState<number>(50000);
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [dependents, setDependents] = useState<number>(0);
  const [professionalExpenses, setProfessionalExpenses] = useState<number>(0);
  const [socialContributions, setSocialContributions] = useState<number>(0);
  const [pensionContributions, setPensionContributions] = useState<number>(0);

  // French tax brackets for 2025 (progressive rates)
  const taxBrackets = [
    { min: 0, max: 11294, rate: 0 },
    { min: 11294, max: 28797, rate: 11 },
    { min: 28797, max: 82341, rate: 30 },
    { min: 82341, max: 177106, rate: 41 },
    { min: 177106, max: Infinity, rate: 45 }
  ];

  // Family quotient calculation (quotient familial)
  const getFamilyQuotient = () => {
    let quotient = maritalStatus === "married" || maritalStatus === "civil_union" ? 2 : 1;
    if (dependents > 0) {
      if (dependents <= 2) {
        quotient += dependents * 0.5;
      } else {
        quotient += 1 + (dependents - 2); // First 2 children = 0.5 each, others = 1 each
      }
    }
    return quotient;
  };

  const calculateTax = () => {
    const deductions = professionalExpenses + socialContributions + pensionContributions;
    const taxableIncome = Math.max(0, grossIncome - deductions);
    const familyQuotient = getFamilyQuotient();
    const quotientIncome = taxableIncome / familyQuotient;

    let tax = 0;
    for (const bracket of taxBrackets) {
      if (quotientIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(quotientIncome - bracket.min, bracket.max - bracket.min);
        tax += (taxableAtThisBracket * bracket.rate) / 100;
      }
    }

    const totalTax = tax * familyQuotient;
    
    // CSG and CRDS (social contributions on investment income)
    const csgCrds = taxableIncome * 0.172; // 17.2% on investment income
    
    return {
      taxableIncome,
      incomeTax: totalTax,
      csgCrds,
      totalTax: totalTax + csgCrds,
      netIncome: grossIncome - totalTax - csgCrds,
      effectiveRate: ((totalTax + csgCrds) / grossIncome) * 100,
      marginalRate: getCurrentMarginalRate(quotientIncome)
    };
  };

  const getCurrentMarginalRate = (quotientIncome: number) => {
    for (const bracket of taxBrackets) {
      if (quotientIncome >= bracket.min && quotientIncome < bracket.max) {
        return bracket.rate;
      }
    }
    return taxBrackets[taxBrackets.length - 1].rate;
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculateur d'Impôt sur le Revenu Français</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculez votre impôt sur le revenu français 2025 avec le quotient familial et toutes les déductions.
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
                  Informations Fiscales
                </CardTitle>
                <CardDescription>
                  Saisissez vos informations pour calculer votre impôt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="grossIncome">Revenu Brut Annuel (€)</Label>
                  <Input
                    id="grossIncome"
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="maritalStatus">Situation Familiale</Label>
                  <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Célibataire</SelectItem>
                      <SelectItem value="married">Marié(e)</SelectItem>
                      <SelectItem value="civil_union">Pacsé(e)</SelectItem>
                      <SelectItem value="divorced">Divorcé(e)</SelectItem>
                      <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dependents">Nombre de Personnes à Charge</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="professionalExpenses">Frais Professionnels (€)</Label>
                  <Input
                    id="professionalExpenses"
                    type="number"
                    value={professionalExpenses}
                    onChange={(e) => setProfessionalExpenses(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="socialContributions">Cotisations Sociales Déductibles (€)</Label>
                  <Input
                    id="socialContributions"
                    type="number"
                    value={socialContributions}
                    onChange={(e) => setSocialContributions(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="pensionContributions">Cotisations Retraite (€)</Label>
                  <Input
                    id="pensionContributions"
                    type="number"
                    value={pensionContributions}
                    onChange={(e) => setPensionContributions(Number(e.target.value))}
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
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.netIncome)}</p>
                    <p className="text-sm text-gray-600">Revenu Net</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalTax)}</p>
                    <p className="text-sm text-gray-600">Impôt Total</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenu Imposable:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impôt sur le Revenu:</span>
                    <span className="font-semibold">{formatCurrency(results.incomeTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CSG/CRDS:</span>
                    <span className="font-semibold">{formatCurrency(results.csgCrds)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quotient Familial:</span>
                    <span className="font-semibold">{getFamilyQuotient()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Effectif:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux Marginal:</span>
                    <span className="font-semibold">{results.marginalRate}%</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Revenu Net Mensuel:</strong> {formatCurrency(results.netIncome / 12)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détail du Calcul par Tranches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxBrackets.map((bracket, index) => {
                  const quotientIncome = results.taxableIncome / getFamilyQuotient();
                  const isApplicable = quotientIncome > bracket.min;
                  const taxableAtBracket = isApplicable ? 
                    Math.min(quotientIncome - bracket.min, bracket.max - bracket.min) : 0;
                  const taxAtBracket = (taxableAtBracket * bracket.rate) / 100;

                  return (
                    <div key={index} className={`p-4 rounded-lg border ${isApplicable ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">
                            Tranche {index + 1}: {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}
                          </p>
                          <p className="text-sm text-gray-600">Taux: {bracket.rate}%</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(taxAtBracket * getFamilyQuotient())}</p>
                          <p className="text-sm text-gray-600">
                            Sur {formatCurrency(taxableAtBracket)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                  Quotient Familial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Célibataire:</strong> 1 part</p>
                  <p><strong>Couple marié/pacsé:</strong> 2 parts</p>
                  <p><strong>1er et 2e enfant:</strong> 0,5 part chacun</p>
                  <p><strong>3e enfant et suivants:</strong> 1 part chacun</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Déductions Courantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Frais professionnels:</strong> 10% minimum</p>
                  <p><strong>Cotisations retraite:</strong> Plafond 2024</p>
                  <p><strong>CSG déductible:</strong> 6,8% sur revenus</p>
                  <p><strong>Pensions alimentaires:</strong> Sans plafond</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FranceIncomeTaxCalculator;
