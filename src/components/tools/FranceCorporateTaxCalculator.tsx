
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Euro, FileText, Info, Building } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const FranceCorporateTaxCalculator = () => {
  const t = useTranslations();
  
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.tools?.franceCorporateTax?.title || "France Corporate Tax Calculator"}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.tools?.franceCorporateTax?.description || "Calculate your French corporate tax with 2025 rates and tax credits."}
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">{t.common?.calculator || "Calculator"}</TabsTrigger>
          <TabsTrigger value="breakdown">{t.common?.breakdown || "Breakdown"}</TabsTrigger>
          <TabsTrigger value="guide">{t.common?.guide || "Guide"}</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {t.tools?.franceCorporateTax?.financialInfo || "Financial Information"}
                </CardTitle>
                <CardDescription>
                  {t.tools?.franceCorporateTax?.enterCompanyData || "Enter your company's financial data"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="revenue">{t.tools?.franceCorporateTax?.revenue || "Revenue"} (€)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expenses">{t.tools?.franceCorporateTax?.expenses || "Deductible Expenses"} (€)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="companySize">{t.tools?.franceCorporateTax?.companySize || "Company Size"}</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">{t.tools?.franceCorporateTax?.sme || "SME"} (CA &lt; 250M€)</SelectItem>
                      <SelectItem value="large">{t.tools?.franceCorporateTax?.largeCompany || "Large Company"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sector">{t.tools?.franceCorporateTax?.sector || "Business Sector"}</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t.tools?.franceCorporateTax?.general || "General"}</SelectItem>
                      <SelectItem value="innovation">{t.tools?.franceCorporateTax?.innovation || "Innovation/R&D"}</SelectItem>
                      <SelectItem value="digital">{t.tools?.franceCorporateTax?.digital || "Digital"}</SelectItem>
                      <SelectItem value="green">{t.tools?.franceCorporateTax?.green || "Green Transition"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="researchCredit">{t.tools?.franceCorporateTax?.researchCredit || "Research Tax Credit"} (€)</Label>
                  <Input
                    id="researchCredit"
                    type="number"
                    value={researchCredit}
                    onChange={(e) => setResearchCredit(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="otherCredits">{t.tools?.franceCorporateTax?.otherCredits || "Other Tax Credits"} (€)</Label>
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
                  {t.common?.results || "Calculation Results"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.netProfit)}</p>
                    <p className="text-sm text-gray-600">{t.tools?.franceCorporateTax?.netProfit || "Net Profit"}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalTax)}</p>
                    <p className="text-sm text-gray-600">{t.tools?.franceCorporateTax?.totalTax || "Total Tax"}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.tools?.franceCorporateTax?.taxableProfit || "Taxable Profit"}:</span>
                    <span className="font-semibold">{formatCurrency(results.taxableProfit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.tools?.franceCorporateTax?.corporateTax || "Corporate Tax"} (25% or 15%):</span>
                    <span className="font-semibold">{formatCurrency(results.corporateTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.tools?.franceCorporateTax?.socialContribution || "Social Contribution"} (3.3%):</span>
                    <span className="font-semibold">{formatCurrency(results.socialContribution)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.tools?.franceCorporateTax?.taxCredits || "Tax Credits"}:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(results.totalCredits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.tools?.franceCorporateTax?.effectiveRate || "Effective Rate"}:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                {companySize === "small" && results.taxableProfit <= 42500 && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>{t.tools?.franceCorporateTax?.reducedRate || "SME Reduced Rate"}</strong> - 15% {t.tools?.franceCorporateTax?.upTo || "up to"} €42,500
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
              <CardTitle>{t.tools?.franceCorporateTax?.calculationBreakdown || "Corporate Tax Calculation Breakdown"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t.tools?.franceCorporateTax?.profitCalculation || "Profit Calculation"}</h4>
                  <p>{t.tools?.franceCorporateTax?.revenue || "Revenue"}: {formatCurrency(revenue)}</p>
                  <p>{t.tools?.franceCorporateTax?.expenses || "Deductible expenses"}: {formatCurrency(expenses)}</p>
                  <p className="font-semibold">{t.tools?.franceCorporateTax?.taxableProfit || "Taxable profit"}: {formatCurrency(results.taxableProfit)}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{t.tools?.franceCorporateTax?.rateApplication || "Rate Application"}</h4>
                  {companySize === "small" ? (
                    <div>
                      <p>{t.tools?.franceCorporateTax?.smeRate || "SME rate"} (15%) {t.tools?.franceCorporateTax?.firstAmount || "on first"} €42,500</p>
                      <p>{t.tools?.franceCorporateTax?.normalRate || "Normal rate"} (25%) {t.tools?.franceCorporateTax?.beyond || "beyond"}</p>
                    </div>
                  ) : (
                    <p>{t.tools?.franceCorporateTax?.normalRate || "Normal rate"}: 25%</p>
                  )}
                  <p className="font-semibold">{t.tools?.franceCorporateTax?.calculatedTax || "Calculated corporate tax"}: {formatCurrency(results.corporateTax)}</p>
                </div>

                {results.socialContribution > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{t.tools?.franceCorporateTax?.socialContribution || "Social Contribution"}</h4>
                    <p>3.3% {t.tools?.franceCorporateTax?.onProfitsOver || "on profits over"} €763,000</p>
                    <p className="font-semibold">{t.tools?.franceCorporateTax?.contribution || "Contribution"}: {formatCurrency(results.socialContribution)}</p>
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
                  {t.tools?.franceCorporateTax?.taxRates2025 || "2025 Corporate Tax Rates"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>{t.tools?.franceCorporateTax?.sme || "SME"}:</strong> 15% {t.tools?.franceCorporateTax?.upTo || "up to"} €42,500</p>
                  <p><strong>{t.tools?.franceCorporateTax?.normalRate || "Normal rate"}:</strong> 25%</p>
                  <p><strong>{t.tools?.franceCorporateTax?.socialContribution || "Social contribution"}:</strong> 3.3% ({t.tools?.franceCorporateTax?.ifProfitOver || "if profit >"} €763,000)</p>
                  <p><strong>{t.tools?.franceCorporateTax?.maxEffectiveRate || "Max effective rate"}:</strong> 28.9%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t.tools?.franceCorporateTax?.taxCredits || "Tax Credits"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>CIR:</strong> 30% {t.tools?.franceCorporateTax?.rdExpenses || "of R&D expenses"}</p>
                  <p><strong>CII:</strong> 20% {t.tools?.franceCorporateTax?.innovationExpenses || "of innovation expenses"}</p>
                  <p><strong>{t.tools?.franceCorporateTax?.digitalTransition || "Digital transition"}:</strong> {t.tools?.franceCorporateTax?.upTo || "Up to"} 25%</p>
                  <p><strong>{t.tools?.franceCorporateTax?.greenTransition || "Green transition"}:</strong> {t.tools?.franceCorporateTax?.variousRates || "Various rates"}</p>
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
