
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKSalesTaxCalculator = () => {
  const [annualTurnover, setAnnualTurnover] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("standard");
  const [vatScheme, setVatScheme] = useState<string>("standard");
  const [standardRateGoods, setStandardRateGoods] = useState<string>("");
  const [reducedRateGoods, setReducedRateGoods] = useState<string>("");
  const [zeroRateGoods, setZeroRateGoods] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  // UK VAT rates and thresholds for 2024/25
  const VAT_REGISTRATION_THRESHOLD = 85000;
  const VAT_DEREGISTRATION_THRESHOLD = 83000;
  const STANDARD_VAT_RATE = 0.2; // 20%
  const REDUCED_VAT_RATE = 0.05; // 5%
  const ZERO_VAT_RATE = 0; // 0%

  const calculateVAT = () => {
    const turnover = parseFloat(annualTurnover) || 0;
    const standardGoods = parseFloat(standardRateGoods) || 0;
    const reducedGoods = parseFloat(reducedRateGoods) || 0;
    const zeroGoods = parseFloat(zeroRateGoods) || 0;
    
    const totalGoods = standardGoods + reducedGoods + zeroGoods;
    
    // Calculate VAT liability
    let vatOnSales = 0;
    if (turnover >= VAT_REGISTRATION_THRESHOLD || vatScheme !== "none") {
      vatOnSales = (standardGoods * STANDARD_VAT_RATE) + (reducedGoods * REDUCED_VAT_RATE);
    }
    
    // Calculate flat rate scheme VAT (simplified)
    let flatRateVAT = 0;
    if (vatScheme === "flatrate") {
      const flatRatePercentage = businessType === "retail" ? 0.075 : 
                                businessType === "catering" ? 0.125 :
                                businessType === "services" ? 0.14 : 0.14;
      flatRateVAT = turnover * flatRatePercentage;
    }
    
    const finalVATLiability = vatScheme === "flatrate" ? flatRateVAT : vatOnSales;
    
    // Registration requirements
    const mustRegister = turnover >= VAT_REGISTRATION_THRESHOLD;
    const canDeregister = turnover < VAT_DEREGISTRATION_THRESHOLD;
    
    // Calculate net prices and gross prices
    const netTurnover = vatScheme === "none" ? turnover : turnover / (1 + 0.2);
    const grossTurnover = vatScheme === "none" ? turnover * 1.2 : turnover;
    
    setResults({
      turnover,
      netTurnover,
      grossTurnover,
      vatOnSales,
      flatRateVAT,
      finalVATLiability,
      mustRegister,
      canDeregister,
      vatScheme,
      businessType,
      standardGoods,
      reducedGoods,
      zeroGoods,
      totalGoods,
      effectiveVATRate: turnover > 0 ? (finalVATLiability / turnover) * 100 : 0
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Sales Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK VAT obligations, registration requirements, and compliance for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>
              Enter your business information for VAT calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annualTurnover">Annual Turnover (£)</Label>
              <Input
                id="annualTurnover"
                type="number"
                placeholder="100000"
                value={annualTurnover}
                onChange={(e) => setAnnualTurnover(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="standard">General Business</option>
                <option value="retail">Retail</option>
                <option value="catering">Catering/Food</option>
                <option value="services">Professional Services</option>
                <option value="construction">Construction</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatScheme">VAT Scheme</Label>
              <select
                id="vatScheme"
                value={vatScheme}
                onChange={(e) => setVatScheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="none">Not VAT Registered</option>
                <option value="standard">Standard VAT Scheme</option>
                <option value="flatrate">Flat Rate Scheme</option>
              </select>
            </div>

            {vatScheme === "standard" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="standardRateGoods">Standard Rate Sales (20%) (£)</Label>
                  <Input
                    id="standardRateGoods"
                    type="number"
                    placeholder="80000"
                    value={standardRateGoods}
                    onChange={(e) => setStandardRateGoods(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reducedRateGoods">Reduced Rate Sales (5%) (£)</Label>
                  <Input
                    id="reducedRateGoods"
                    type="number"
                    placeholder="10000"
                    value={reducedRateGoods}
                    onChange={(e) => setReducedRateGoods(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zeroRateGoods">Zero Rate Sales (0%) (£)</Label>
                  <Input
                    id="zeroRateGoods"
                    type="number"
                    placeholder="10000"
                    value={zeroRateGoods}
                    onChange={(e) => setZeroRateGoods(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button onClick={calculateVAT} className="w-full">
              Calculate VAT Liability
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>VAT Calculation Results</CardTitle>
            <CardDescription>
              Your VAT obligations and registration requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Annual Turnover:</p>
                    <p className="text-lg">{formatCurrency(results.turnover)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">VAT Liability:</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(results.finalVATLiability)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Registration Status:</h4>
                  <div className="space-y-2">
                    {results.mustRegister ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 font-medium">⚠️ Must Register for VAT</p>
                        <p className="text-sm text-red-700">Your turnover exceeds £85,000 threshold</p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 font-medium">✅ VAT Registration Optional</p>
                        <p className="text-sm text-green-700">Below £85,000 threshold</p>
                      </div>
                    )}
                    
                    {results.canDeregister && results.vatScheme !== "none" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 font-medium">ℹ️ Can Deregister</p>
                        <p className="text-sm text-blue-700">Below £83,000 deregistration threshold</p>
                      </div>
                    )}
                  </div>
                </div>

                {results.vatScheme === "standard" && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Sales Breakdown:</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Standard Rate (20%):</span>
                          <span>{formatCurrency(results.standardGoods)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reduced Rate (5%):</span>
                          <span>{formatCurrency(results.reducedGoods)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zero Rate (0%):</span>
                          <span>{formatCurrency(results.zeroGoods)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold">Effective VAT Rate:</span>
                  <span className="text-xl font-bold">{results.effectiveVATRate.toFixed(1)}%</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter business details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>2024/25 UK VAT Information:</strong> Registration Threshold: £85,000 | 
          Standard Rate: 20% | Reduced Rate: 5% | Zero Rate: 0% | 
          This calculator provides estimates for planning purposes. 
          Consult HMRC or a qualified accountant for complex VAT situations and compliance requirements.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKSalesTaxCalculator;
