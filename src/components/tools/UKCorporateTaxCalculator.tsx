
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, Building, Info, AlertCircle } from "lucide-react";

const UKCorporateTaxCalculator = () => {
  const [profit, setProfit] = useState<number>(100000);
  const [companyType, setCompanyType] = useState<string>("trading");
  const [allowableExpenses, setAllowableExpenses] = useState<number>(0);
  const [capitalAllowances, setCapitalAllowances] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const calculateCorporationTax = () => {
    // UK Corporation Tax rates 2024
    const smallCompanyRate = 0.19; // 19% for profits up to £50,000
    const mainRate = 0.25; // 25% for profits over £250,000
    const lowerThreshold = 50000;
    const upperThreshold = 250000;
    
    const taxableProfit = Math.max(0, profit - allowableExpenses - capitalAllowances);
    let corporationTax = 0;
    let effectiveRate = 0;
    let marginalReliefRate = 0;

    if (taxableProfit <= lowerThreshold) {
      // Small company rate
      corporationTax = taxableProfit * smallCompanyRate;
      effectiveRate = smallCompanyRate;
    } else if (taxableProfit >= upperThreshold) {
      // Main rate
      corporationTax = taxableProfit * mainRate;
      effectiveRate = mainRate;
    } else {
      // Marginal relief applies
      const marginalReliefFraction = 3/200; // 1.5%
      marginalReliefRate = marginalReliefFraction * ((upperThreshold - taxableProfit) / taxableProfit);
      effectiveRate = mainRate - marginalReliefRate;
      corporationTax = taxableProfit * effectiveRate;
    }

    const profitAfterTax = taxableProfit - corporationTax;

    setResults({
      grossProfit: profit,
      allowableExpenses,
      capitalAllowances,
      taxableProfit,
      corporationTax,
      profitAfterTax,
      effectiveRate: effectiveRate * 100,
      marginalReliefRate: marginalReliefRate * 100
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Building className="w-10 h-10 text-blue-600" />
          UK Corporation Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Corporation Tax for companies, including small company rates, marginal relief, and main rate for 2024.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Company Details
            </CardTitle>
            <CardDescription>
              Enter your company's profit and expense information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profit">Annual Profit Before Tax (£)</Label>
              <Input
                id="profit"
                type="number"
                value={profit}
                onChange={(e) => setProfit(Number(e.target.value))}
                placeholder="100000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type</Label>
              <Select value={companyType} onValueChange={setCompanyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trading">Trading Company</SelectItem>
                  <SelectItem value="investment">Investment Company</SelectItem>
                  <SelectItem value="close">Close Company</SelectItem>
                  <SelectItem value="charity">Charitable Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowableExpenses">Allowable Business Expenses (£)</Label>
              <Input
                id="allowableExpenses"
                type="number"
                value={allowableExpenses}
                onChange={(e) => setAllowableExpenses(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capitalAllowances">Capital Allowances (£)</Label>
              <Input
                id="capitalAllowances"
                type="number"
                value={capitalAllowances}
                onChange={(e) => setCapitalAllowances(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <Button onClick={calculateCorporationTax} className="w-full" size="lg">
              Calculate Corporation Tax
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Corporation Tax Results
              </CardTitle>
              <CardDescription>
                Your UK Corporation Tax calculation for 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Gross Profit</p>
                  <p className="font-semibold">£{results.grossProfit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Business Expenses</p>
                  <p className="font-semibold text-red-600">-£{results.allowableExpenses.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Capital Allowances</p>
                  <p className="font-semibold text-red-600">-£{results.capitalAllowances.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taxable Profit</p>
                  <p className="font-semibold">£{results.taxableProfit.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Corporation Tax:</span>
                  <span className="text-xl font-bold text-red-600">
                    £{results.corporationTax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Profit After Tax:</span>
                  <span className="text-xl font-bold text-green-600">
                    £{results.profitAfterTax.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Effective Rate:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                  {results.marginalReliefRate > 0 && (
                    <div className="flex justify-between">
                      <span>Marginal Relief:</span>
                      <span className="font-semibold text-green-600">{results.marginalReliefRate.toFixed(2)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-blue-600" />
              Corporation Tax Rates 2024
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Small Company Rate:</span>
              <span className="font-semibold">19%</span>
            </div>
            <div className="flex justify-between">
              <span>Main Rate:</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Lower Threshold:</span>
              <span>£50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Upper Threshold:</span>
              <span>£250,000</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Marginal relief applies between thresholds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              Allowable Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Office costs and business premises</p>
            <p>• Travel and subsistence</p>
            <p>• Staff costs and training</p>
            <p>• Resale goods and raw materials</p>
            <p>• Marketing and advertising</p>
            <p className="text-xs text-gray-500 mt-2">
              Must be incurred wholly for business purposes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Corporation Tax return due 12 months after accounting period end</p>
            <p>• Tax payment due 9 months and 1 day after period end</p>
            <p>• Large companies may need quarterly payments</p>
            <p>• Digital tax obligations apply</p>
            <p className="text-xs text-gray-500 mt-2">
              For official guidance, visit gov.uk/corporation-tax
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKCorporateTaxCalculator;
