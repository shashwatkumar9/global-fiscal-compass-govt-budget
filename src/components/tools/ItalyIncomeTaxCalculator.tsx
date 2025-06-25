
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyIncomeTaxCalculator = () => {
  const [income, setIncome] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [deductions, setDeductions] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    // Italy Income Tax Brackets 2024 (IRPEF)
    let tax = 0;
    
    if (taxableIncome <= 15000) {
      tax = taxableIncome * 0.23;
    } else if (taxableIncome <= 28000) {
      tax = 15000 * 0.23 + (taxableIncome - 15000) * 0.27;
    } else if (taxableIncome <= 55000) {
      tax = 15000 * 0.23 + 13000 * 0.27 + (taxableIncome - 28000) * 0.38;
    } else if (taxableIncome <= 75000) {
      tax = 15000 * 0.23 + 13000 * 0.27 + 27000 * 0.38 + (taxableIncome - 55000) * 0.41;
    } else {
      tax = 15000 * 0.23 + 13000 * 0.27 + 27000 * 0.38 + 20000 * 0.41 + (taxableIncome - 75000) * 0.43;
    }

    // Regional tax (IRAP) - approximate 3.9%
    const regionalTax = taxableIncome * 0.039;
    
    // Municipal tax (varies by municipality, average 0.8%)
    const municipalTax = taxableIncome * 0.008;
    
    const totalTax = tax + regionalTax + municipalTax;
    const netIncome = grossIncome - totalTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    setResults({
      grossIncome,
      taxableIncome,
      federalTax: tax,
      regionalTax,
      municipalTax,
      totalTax,
      netIncome,
      effectiveRate
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Income Tax Calculator (IRPEF)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="income">Annual Gross Income (€)</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your annual income"
            />
          </div>
          
          <div>
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lombardy">Lombardy</SelectItem>
                <SelectItem value="lazio">Lazio</SelectItem>
                <SelectItem value="campania">Campania</SelectItem>
                <SelectItem value="veneto">Veneto</SelectItem>
                <SelectItem value="sicily">Sicily</SelectItem>
                <SelectItem value="piedmont">Piedmont</SelectItem>
                <SelectItem value="puglia">Puglia</SelectItem>
                <SelectItem value="liguria">Liguria</SelectItem>
                <SelectItem value="tuscany">Tuscany</SelectItem>
                <SelectItem value="emilia_romagna">Emilia-Romagna</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deductions">Total Deductions (€)</Label>
            <Input
              id="deductions"
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="Enter total deductions"
            />
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
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Gross Income</p>
                <p className="text-lg font-semibold">€{results.grossIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxable Income</p>
                <p className="text-lg font-semibold">€{results.taxableIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Federal Tax (IRPEF)</p>
                <p className="text-lg font-semibold text-red-600">€{results.federalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Regional Tax (IRAP)</p>
                <p className="text-lg font-semibold text-red-600">€{results.regionalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Municipal Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.municipalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.totalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Income</p>
                <p className="text-lg font-semibold text-green-600">€{results.netIncome.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Tax Rate</p>
                <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyIncomeTaxCalculator;
