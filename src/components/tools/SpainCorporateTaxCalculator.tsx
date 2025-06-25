
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainCorporateTaxCalculator = () => {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [companyType, setCompanyType] = useState("standard");
  const [taxCredits, setTaxCredits] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateCorporateTax = () => {
    const grossRevenue = parseFloat(revenue) || 0;
    const totalExpenses = parseFloat(expenses) || 0;
    const credits = parseFloat(taxCredits) || 0;
    
    const taxableIncome = Math.max(0, grossRevenue - totalExpenses);
    
    // Spanish corporate tax rates
    let taxRate = 0.25; // Standard rate 25%
    
    switch (companyType) {
      case "startup":
        taxRate = 0.15; // First 2 years for qualifying startups
        break;
      case "small":
        // First €300,000 at 23%, remainder at 25%
        break;
      case "cooperative":
        taxRate = 0.20;
        break;
      case "standard":
      default:
        taxRate = 0.25;
        break;
    }

    let corporateTax = 0;
    
    if (companyType === "small" && taxableIncome > 0) {
      const firstTranche = Math.min(taxableIncome, 300000);
      const remainingIncome = Math.max(0, taxableIncome - 300000);
      corporateTax = (firstTranche * 0.23) + (remainingIncome * 0.25);
    } else {
      corporateTax = taxableIncome * taxRate;
    }

    const taxAfterCredits = Math.max(0, corporateTax - credits);
    const effectiveRate = taxableIncome > 0 ? (taxAfterCredits / taxableIncome) * 100 : 0;
    const netIncome = taxableIncome - taxAfterCredits;

    setResults({
      grossRevenue,
      totalExpenses,
      taxableIncome,
      corporateTax,
      taxCredits: credits,
      taxAfterCredits,
      netIncome,
      effectiveRate,
      taxRate: taxRate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Corporate Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="revenue">Annual Revenue (€)</Label>
              <Input
                id="revenue"
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="1000000"
              />
            </div>

            <div>
              <Label htmlFor="expenses">Deductible Expenses (€)</Label>
              <Input
                id="expenses"
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="600000"
              />
            </div>

            <div>
              <Label htmlFor="company-type">Company Type</Label>
              <Select value={companyType} onValueChange={setCompanyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Company (25%)</SelectItem>
                  <SelectItem value="small">Small Company (23%/25%)</SelectItem>
                  <SelectItem value="startup">Qualifying Startup (15%)</SelectItem>
                  <SelectItem value="cooperative">Cooperative (20%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tax-credits">Tax Credits (€)</Label>
              <Input
                id="tax-credits"
                type="number"
                value={taxCredits}
                onChange={(e) => setTaxCredits(e.target.value)}
                placeholder="10000"
              />
            </div>
          </div>

          <Button onClick={calculateCorporateTax} className="w-full">
            Calculate Corporate Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Corporate Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Revenue:</span>
                  <span className="font-semibold">€{results.grossRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Expenses:</span>
                  <span className="font-semibold">€{results.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-semibold">€{results.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Corporate Tax (Gross):</span>
                  <span className="font-semibold">€{results.corporateTax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Credits:</span>
                  <span className="font-semibold text-green-600">€{results.taxCredits.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax After Credits:</span>
                  <span className="font-semibold text-red-600">€{results.taxAfterCredits.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Income:</span>
                  <span className="font-semibold text-green-600">€{results.netIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Rate:</span>
                  <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainCorporateTaxCalculator;
