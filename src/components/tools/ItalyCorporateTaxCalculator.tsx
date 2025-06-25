
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyCorporateTaxCalculator = () => {
  const [revenue, setRevenue] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("standard");
  const [region, setRegion] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateCorporateTax = () => {
    const totalRevenue = parseFloat(revenue) || 0;
    const totalExpenses = parseFloat(expenses) || 0;
    const taxableIncome = Math.max(0, totalRevenue - totalExpenses);
    
    // IRES (Corporate Income Tax) - 24%
    const iresRate = companyType === "startup" ? 0.15 : 0.24; // Startup incentive
    const iresTax = taxableIncome * iresRate;
    
    // IRAP (Regional Production Tax) - varies by region (3.9% standard)
    const irapRate = getIrapRate(region);
    const irapTax = taxableIncome * (irapRate / 100);
    
    const totalTax = iresTax + irapTax;
    const netIncome = taxableIncome - totalTax;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;

    setResults({
      revenue: totalRevenue,
      expenses: totalExpenses,
      taxableIncome,
      iresTax,
      irapTax,
      totalTax,
      netIncome,
      effectiveRate,
      iresRate: iresRate * 100,
      irapRate
    });
  };

  const getIrapRate = (region: string) => {
    const rates: { [key: string]: number } = {
      "lombardy": 3.9,
      "lazio": 4.25,
      "campania": 4.82,
      "veneto": 3.5,
      "sicily": 4.75,
      "piedmont": 3.9,
      "puglia": 4.5,
      "liguria": 3.9,
      "tuscany": 3.9,
      "emilia_romagna": 3.9
    };
    return rates[region] || 3.9;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Corporate Tax Calculator (IRES + IRAP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="revenue">Annual Revenue (€)</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Enter annual revenue"
            />
          </div>

          <div>
            <Label htmlFor="expenses">Annual Expenses (€)</Label>
            <Input
              id="expenses"
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Enter annual expenses"
            />
          </div>

          <div>
            <Label htmlFor="company-type">Company Type</Label>
            <Select value={companyType} onValueChange={setCompanyType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Corporation</SelectItem>
                <SelectItem value="startup">Innovative Startup (first 5 years)</SelectItem>
                <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lombardy">Lombardy (3.9%)</SelectItem>
                <SelectItem value="lazio">Lazio (4.25%)</SelectItem>
                <SelectItem value="campania">Campania (4.82%)</SelectItem>
                <SelectItem value="veneto">Veneto (3.5%)</SelectItem>
                <SelectItem value="sicily">Sicily (4.75%)</SelectItem>
                <SelectItem value="piedmont">Piedmont (3.9%)</SelectItem>
                <SelectItem value="puglia">Puglia (4.5%)</SelectItem>
                <SelectItem value="liguria">Liguria (3.9%)</SelectItem>
                <SelectItem value="tuscany">Tuscany (3.9%)</SelectItem>
                <SelectItem value="emilia_romagna">Emilia-Romagna (3.9%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCorporateTax} className="w-full">
            Calculate Corporate Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Corporate Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Annual Revenue</p>
                <p className="text-lg font-semibold">€{results.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Annual Expenses</p>
                <p className="text-lg font-semibold">€{results.expenses.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxable Income</p>
                <p className="text-lg font-semibold">€{results.taxableIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IRES Tax ({results.iresRate}%)</p>
                <p className="text-lg font-semibold text-red-600">€{results.iresTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IRAP Tax ({results.irapRate}%)</p>
                <p className="text-lg font-semibold text-red-600">€{results.irapTax.toFixed(2)}</p>
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

export default ItalyCorporateTaxCalculator;
