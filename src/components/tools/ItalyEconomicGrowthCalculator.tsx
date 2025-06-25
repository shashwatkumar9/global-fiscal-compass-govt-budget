
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const ItalyEconomicGrowthCalculator = () => {
  const [growthData, setGrowthData] = useState({
    currentGDP: "2100",
    targetGrowthRate: "2.5",
    investmentRate: "20",
    productivityGrowth: "1.5",
    populationGrowth: "0.1",
    years: "10"
  });

  const [projections, setProjections] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setGrowthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateGrowth = () => {
    const currentGDP = parseFloat(growthData.currentGDP) || 0;
    const targetGrowth = parseFloat(growthData.targetGrowthRate) / 100 || 0;
    const years = parseInt(growthData.years) || 10;
    const productivityGrowth = parseFloat(growthData.productivityGrowth) / 100 || 0;
    const populationGrowth = parseFloat(growthData.populationGrowth) / 100 || 0;

    const projectionData = [];
    let gdp = currentGDP;
    
    for (let year = 0; year <= years; year++) {
      projectionData.push({
        year: new Date().getFullYear() + year,
        gdp: gdp,
        perCapitaGDP: gdp / 59.11, // Italy population in millions
        realGrowth: year === 0 ? 0 : targetGrowth * 100
      });
      
      if (year < years) {
        gdp *= (1 + targetGrowth);
      }
    }

    // Growth components analysis
    const components = [
      { name: 'Productivity', contribution: productivityGrowth * 100, target: 60 },
      { name: 'Capital', contribution: 1.2, target: 25 },
      { name: 'Labor', contribution: populationGrowth * 100, target: 15 }
    ];

    setProjections({
      data: projectionData,
      components,
      finalGDP: gdp,
      totalGrowth: ((gdp / currentGDP - 1) * 100),
      avgGrowth: targetGrowth * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Economic Growth Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-gdp">Current GDP (€ Billions)</Label>
              <Input
                id="current-gdp"
                type="number"
                value={growthData.currentGDP}
                onChange={(e) => handleInputChange('currentGDP', e.target.value)}
                placeholder="2100"
              />
            </div>

            <div>
              <Label htmlFor="target-growth">Target Growth Rate (%)</Label>
              <Input
                id="target-growth"
                type="number"
                step="0.1"
                value={growthData.targetGrowthRate}
                onChange={(e) => handleInputChange('targetGrowthRate', e.target.value)}
                placeholder="2.5"
              />
            </div>

            <div>
              <Label htmlFor="productivity-growth">Productivity Growth (%)</Label>
              <Input
                id="productivity-growth"
                type="number"
                step="0.1"
                value={growthData.productivityGrowth}
                onChange={(e) => handleInputChange('productivityGrowth', e.target.value)}
                placeholder="1.5"
              />
            </div>

            <div>
              <Label htmlFor="population-growth">Population Growth (%)</Label>
              <Input
                id="population-growth"
                type="number"
                step="0.1"
                value={growthData.populationGrowth}
                onChange={(e) => handleInputChange('populationGrowth', e.target.value)}
                placeholder="0.1"
              />
            </div>

            <div>
              <Label htmlFor="investment-rate">Investment Rate (% of GDP)</Label>
              <Input
                id="investment-rate"
                type="number"
                value={growthData.investmentRate}
                onChange={(e) => handleInputChange('investmentRate', e.target.value)}
                placeholder="20"
              />
            </div>

            <div>
              <Label htmlFor="years">Projection Years</Label>
              <Input
                id="years"
                type="number"
                value={growthData.years}
                onChange={(e) => handleInputChange('years', e.target.value)}
                placeholder="10"
              />
            </div>
          </div>

          <Button onClick={calculateGrowth} className="w-full">
            Calculate Growth Projection
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Growth Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projections.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="gdp" stroke="#8884d8" name="GDP (€B)" />
                  <Line type="monotone" dataKey="perCapitaGDP" stroke="#82ca9d" name="Per Capita GDP (€000)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Components</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projections.components}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="contribution" fill="#8884d8" name="Current %" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Growth Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Final GDP</p>
                  <p className="text-2xl font-bold text-blue-600">€{projections.finalGDP.toFixed(0)}B</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Growth</p>
                  <p className="text-2xl font-bold text-green-600">{projections.totalGrowth.toFixed(1)}%</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Annual Growth</p>
                  <p className="text-2xl font-bold text-purple-600">{projections.avgGrowth.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyEconomicGrowthCalculator;
