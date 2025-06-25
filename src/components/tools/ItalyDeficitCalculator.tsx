
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const ItalyDeficitCalculator = () => {
  const [deficitData, setDeficitData] = useState({
    revenue: "850",
    spending: "900",
    scenario: "baseline",
    revenueGrowth: "2.5",
    spendingGrowth: "3.0",
    years: "5"
  });

  const [projections, setProjections] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setDeficitData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDeficit = () => {
    const initialRevenue = parseFloat(deficitData.revenue) || 0;
    const initialSpending = parseFloat(deficitData.spending) || 0;
    const revenueGrowth = parseFloat(deficitData.revenueGrowth) / 100 || 0;
    const spendingGrowth = parseFloat(deficitData.spendingGrowth) / 100 || 0;
    const years = parseInt(deficitData.years) || 5;

    const projectionData = [];
    let revenue = initialRevenue;
    let spending = initialSpending;
    let cumulativeDeficit = 0;

    for (let year = 0; year <= years; year++) {
      const deficit = spending - revenue;
      cumulativeDeficit += deficit;
      
      projectionData.push({
        year: new Date().getFullYear() + year,
        revenue,
        spending,
        deficit,
        cumulativeDeficit,
        deficitToGDPRatio: (deficit / 2100) * 100 // Assuming GDP of €2.1T
      });

      if (year < years) {
        revenue *= (1 + revenueGrowth);
        spending *= (1 + spendingGrowth);
      }
    }

    // Sustainability analysis
    const finalDeficit = projectionData[projectionData.length - 1].deficit;
    const avgDeficitRatio = projectionData.reduce((sum, p) => sum + Math.abs(p.deficitToGDPRatio), 0) / projectionData.length;
    
    const sustainability = {
      isWithinMaastricht: avgDeficitRatio < 3.0,
      trend: finalDeficit < projectionData[0].deficit ? 'improving' : 'worsening',
      riskLevel: avgDeficitRatio > 5 ? 'high' : avgDeficitRatio > 3 ? 'medium' : 'low'
    };

    // Scenarios comparison
    const scenarios = [
      { name: 'Optimistic', deficitChange: -20 },
      { name: 'Baseline', deficitChange: 0 },
      { name: 'Pessimistic', deficitChange: 30 }
    ].map(scenario => ({
      ...scenario,
      finalDeficit: finalDeficit * (1 + scenario.deficitChange / 100)
    }));

    setProjections({
      data: projectionData,
      sustainability,
      scenarios,
      avgDeficitRatio,
      finalDeficit
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Deficit Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="revenue">Current Revenue (€ Billions)</Label>
              <Input
                id="revenue"
                type="number"
                value={deficitData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                placeholder="850"
              />
            </div>

            <div>
              <Label htmlFor="spending">Current Spending (€ Billions)</Label>
              <Input
                id="spending"
                type="number"
                value={deficitData.spending}
                onChange={(e) => handleInputChange('spending', e.target.value)}
                placeholder="900"
              />
            </div>

            <div>
              <Label htmlFor="revenue-growth">Revenue Growth (%)</Label>
              <Input
                id="revenue-growth"
                type="number"
                step="0.1"
                value={deficitData.revenueGrowth}
                onChange={(e) => handleInputChange('revenueGrowth', e.target.value)}
                placeholder="2.5"
              />
            </div>

            <div>
              <Label htmlFor="spending-growth">Spending Growth (%)</Label>
              <Input
                id="spending-growth"
                type="number"
                step="0.1"
                value={deficitData.spendingGrowth}
                onChange={(e) => handleInputChange('spendingGrowth', e.target.value)}
                placeholder="3.0"
              />
            </div>

            <div>
              <Label htmlFor="scenario">Scenario</Label>
              <Select value={deficitData.scenario} onValueChange={(value) => handleInputChange('scenario', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="optimistic">Optimistic</SelectItem>
                  <SelectItem value="baseline">Baseline</SelectItem>
                  <SelectItem value="pessimistic">Pessimistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="years">Projection Years</Label>
              <Input
                id="years"
                type="number"
                value={deficitData.years}
                onChange={(e) => handleInputChange('years', e.target.value)}
                placeholder="5"
              />
            </div>
          </div>

          <Button onClick={calculateDeficit} className="w-full">
            Calculate Deficit Projection
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Deficit Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projections.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="deficit" stroke="#ff7300" name="Annual Deficit (€B)" />
                  <Line type="monotone" dataKey="deficitToGDPRatio" stroke="#8884d8" name="Deficit-to-GDP %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projections.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                  <Bar dataKey="spending" fill="#ff7300" name="Spending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${projections.sustainability.isWithinMaastricht ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-sm text-gray-600">Maastricht Compliance</p>
                  <p className={`text-lg font-semibold ${projections.sustainability.isWithinMaastricht ? 'text-green-600' : 'text-red-600'}`}>
                    {projections.sustainability.isWithinMaastricht ? 'Compliant' : 'Non-Compliant'}
                  </p>
                  <p className="text-xs text-gray-500">Avg deficit: {projections.avgDeficitRatio.toFixed(1)}% of GDP</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Trend</p>
                    <p className={`text-lg font-semibold ${projections.sustainability.trend === 'improving' ? 'text-green-600' : 'text-red-600'}`}>
                      {projections.sustainability.trend.charAt(0).toUpperCase() + projections.sustainability.trend.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <p className={`text-lg font-semibold ${
                      projections.sustainability.riskLevel === 'low' ? 'text-green-600' :
                      projections.sustainability.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {projections.sustainability.riskLevel.charAt(0).toUpperCase() + projections.sustainability.riskLevel.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projections.scenarios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="finalDeficit" fill="#8884d8" name="Final Deficit (€B)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyDeficitCalculator;
