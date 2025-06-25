
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [region, setRegion] = useState("madrid");
  const [filingStatus, setFilingStatus] = useState("single");
  const [deductions, setDeductions] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Spanish tax brackets (2024) - simplified
    const federalBrackets = [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ];

    // Regional supplements (simplified)
    const regionalRates = {
      madrid: 0.005,
      catalonia: 0.015,
      andalusia: 0.01,
      valencia: 0.008,
      basque: 0.003
    };

    let federalTax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of federalBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      federalTax += taxableAtThisBracket * bracket.rate;
      remainingIncome -= taxableAtThisBracket;
    }

    const regionalTax = taxableIncome * (regionalRates[region as keyof typeof regionalRates] || 0.01);
    const totalTax = federalTax + regionalTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const marginalRate = getMarginalRate(taxableIncome, federalBrackets, regionalRates[region as keyof typeof regionalRates] || 0.01);
    const netIncome = grossIncome - totalTax;

    setResults({
      grossIncome,
      taxableIncome,
      federalTax,
      regionalTax,
      totalTax,
      netIncome,
      effectiveRate,
      marginalRate
    });
  };

  const getMarginalRate = (income: number, brackets: any[], regionalRate: number) => {
    for (const bracket of brackets) {
      if (income <= bracket.max) {
        return (bracket.rate + regionalRate) * 100;
      }
    }
    return (brackets[brackets.length - 1].rate + regionalRate) * 100;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Income Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">Annual Gross Income (€)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="50000"
              />
            </div>

            <div>
              <Label htmlFor="region">Autonomous Community</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="catalonia">Catalonia</SelectItem>
                  <SelectItem value="andalusia">Andalusia</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="basque">Basque Country</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filing-status">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                  <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deductions">Annual Deductions (€)</Label>
              <Input
                id="deductions"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                placeholder="5000"
              />
            </div>
          </div>

          <Button onClick={calculateTax} className="w-full">
            Calculate Income Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-semibold">€{results.grossIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-semibold">€{results.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Federal Tax:</span>
                  <span className="font-semibold">€{results.federalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Regional Tax:</span>
                  <span className="font-semibold">€{results.regionalTax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tax:</span>
                  <span className="font-semibold text-red-600">€{results.totalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Income:</span>
                  <span className="font-semibold text-green-600">€{results.netIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Rate:</span>
                  <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marginal Rate:</span>
                  <span className="font-semibold">{results.marginalRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainIncomeTaxCalculator;
