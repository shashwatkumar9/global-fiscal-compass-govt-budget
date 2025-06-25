
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const ItalyGDPCalculator = () => {
  const [gdpData, setGdpData] = useState({
    consumption: "",
    investment: "",
    governmentSpending: "",
    exports: "",
    imports: "",
    method: "expenditure"
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setGdpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateGDP = () => {
    const consumption = parseFloat(gdpData.consumption) || 0;
    const investment = parseFloat(gdpData.investment) || 0;
    const government = parseFloat(gdpData.governmentSpending) || 0;
    const exports = parseFloat(gdpData.exports) || 0;
    const imports = parseFloat(gdpData.imports) || 0;

    // GDP = C + I + G + (X - M)
    const netExports = exports - imports;
    const totalGDP = consumption + investment + government + netExports;

    const components = [
      { name: 'Consumption', value: consumption, percentage: (consumption / totalGDP) * 100 },
      { name: 'Investment', value: investment, percentage: (investment / totalGDP) * 100 },
      { name: 'Government', value: government, percentage: (government / totalGDP) * 100 },
      { name: 'Net Exports', value: netExports, percentage: (netExports / totalGDP) * 100 }
    ];

    // Italy's actual GDP for comparison (approximate 2023 figure)
    const actualItalyGDP = 2100; // €2.1 trillion
    const comparisonRatio = (totalGDP / actualItalyGDP) * 100;

    setResults({
      totalGDP,
      components,
      netExports,
      actualItalyGDP,
      comparisonRatio,
      perCapita: totalGDP / 59.11 // Italy's population in millions
    });
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy GDP Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="method">Calculation Method</Label>
              <Select value={gdpData.method} onValueChange={(value) => handleInputChange('method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenditure">Expenditure Approach</SelectItem>
                  <SelectItem value="income">Income Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GDP Components (€ Billions)</h3>
              
              <div>
                <Label htmlFor="consumption">Private Consumption (C)</Label>
                <Input
                  id="consumption"
                  type="number"
                  value={gdpData.consumption}
                  onChange={(e) => handleInputChange('consumption', e.target.value)}
                  placeholder="e.g., 1200"
                />
              </div>

              <div>
                <Label htmlFor="investment">Gross Investment (I)</Label>
                <Input
                  id="investment"
                  type="number"
                  value={gdpData.investment}
                  onChange={(e) => handleInputChange('investment', e.target.value)}
                  placeholder="e.g., 350"
                />
              </div>

              <div>
                <Label htmlFor="government">Government Spending (G)</Label>
                <Input
                  id="government"
                  type="number"
                  value={gdpData.governmentSpending}
                  onChange={(e) => handleInputChange('governmentSpending', e.target.value)}
                  placeholder="e.g., 400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trade Components (€ Billions)</h3>
              
              <div>
                <Label htmlFor="exports">Exports (X)</Label>
                <Input
                  id="exports"
                  type="number"
                  value={gdpData.exports}
                  onChange={(e) => handleInputChange('exports', e.target.value)}
                  placeholder="e.g., 550"
                />
              </div>

              <div>
                <Label htmlFor="imports">Imports (M)</Label>
                <Input
                  id="imports"
                  type="number"
                  value={gdpData.imports}
                  onChange={(e) => handleInputChange('imports', e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>
            </div>
          </div>

          <Button onClick={calculateGDP} className="w-full">
            Calculate GDP
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total GDP</p>
                  <p className="text-3xl font-bold text-blue-600">€{results.totalGDP.toFixed(2)}B</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">GDP per Capita</p>
                    <p className="text-lg font-semibold">€{(results.perCapita * 1000).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Exports</p>
                    <p className={`text-lg font-semibold ${results.netExports >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{results.netExports.toFixed(2)}B
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Comparison to Italy's Actual GDP</p>
                  <p className="text-lg font-semibold">{results.comparisonRatio.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">Italy's 2023 GDP: €{results.actualItalyGDP}B</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GDP Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.components}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`€${value}B`, name]} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyGDPCalculator;
