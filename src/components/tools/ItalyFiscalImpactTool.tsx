
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const ItalyFiscalImpactTool = () => {
  const [impactData, setImpactData] = useState({
    policyType: "tax_cut",
    magnitude: "10",
    targetGroup: "middle_class",
    duration: "permanent",
    currentDeficit: "50"
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setImpactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateImpact = () => {
    const magnitude = parseFloat(impactData.magnitude) || 0;
    const currentDeficit = parseFloat(impactData.currentDeficit) || 0;
    
    // Simplified fiscal multipliers for Italy
    const multipliers = {
      tax_cut: { middle_class: 1.2, high_income: 0.6, businesses: 0.8 },
      spending_increase: { infrastructure: 1.5, social: 1.1, healthcare: 1.3 },
      tax_increase: { middle_class: -1.0, high_income: -0.4, businesses: -0.7 }
    };

    let multiplier = 1.0;
    if (impactData.policyType === 'tax_cut' || impactData.policyType === 'tax_increase') {
      multiplier = multipliers[impactData.policyType][impactData.targetGroup as keyof typeof multipliers.tax_cut] || 1.0;
    } else if (impactData.policyType === 'spending_increase') {
      multiplier = multipliers.spending_increase[impactData.targetGroup as keyof typeof multipliers.spending_increase] || 1.0;
    }

    const gdpImpact = magnitude * multiplier;
    const revenueImpact = impactData.policyType === 'tax_cut' ? -magnitude : 
                         impactData.policyType === 'tax_increase' ? magnitude : 
                         -magnitude * 0.3; // Spending increases cost money
    
    const netDeficitImpact = currentDeficit - revenueImpact + (impactData.policyType === 'spending_increase' ? magnitude : 0);
    
    // Multi-year projections
    const projections = [];
    for (let year = 1; year <= 5; year++) {
      const decayFactor = impactData.duration === 'temporary' ? Math.max(0, 1 - year * 0.3) : 1;
      projections.push({
        year,
        gdpImpact: gdpImpact * decayFactor,
        revenueImpact: revenueImpact * decayFactor,
        deficitImpact: netDeficitImpact * decayFactor
      });
    }

    setResults({
      directImpact: {
        gdp: gdpImpact,
        revenue: revenueImpact,
        deficit: netDeficitImpact
      },
      projections,
      multiplier,
      recommendations: generateRecommendations(impactData, gdpImpact, revenueImpact)
    });
  };

  const generateRecommendations = (data: any, gdpImpact: number, revenueImpact: number) => {
    const recommendations = [];
    
    if (gdpImpact > 0 && revenueImpact < 0) {
      recommendations.push("Policy stimulates growth but reduces revenue - monitor debt sustainability");
    }
    
    if (data.policyType === 'tax_cut' && data.targetGroup === 'middle_class') {
      recommendations.push("Middle-class tax cuts typically have high consumption multipliers in Italy");
    }
    
    if (data.policyType === 'spending_increase' && data.targetGroup === 'infrastructure') {
      recommendations.push("Infrastructure spending can boost long-term productivity and competitiveness");
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Fiscal Impact Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="policy-type">Policy Type</Label>
              <Select value={impactData.policyType} onValueChange={(value) => handleInputChange('policyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tax_cut">Tax Cut</SelectItem>
                  <SelectItem value="tax_increase">Tax Increase</SelectItem>
                  <SelectItem value="spending_increase">Spending Increase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="target-group">Target Group/Sector</Label>
              <Select value={impactData.targetGroup} onValueChange={(value) => handleInputChange('targetGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="middle_class">Middle Class</SelectItem>
                  <SelectItem value="high_income">High Income</SelectItem>
                  <SelectItem value="businesses">Businesses</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="social">Social Programs</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="magnitude">Policy Magnitude (€ Billions)</Label>
              <Input
                id="magnitude"
                type="number"
                value={impactData.magnitude}
                onChange={(e) => handleInputChange('magnitude', e.target.value)}
                placeholder="10"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={impactData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="temporary">Temporary (3 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="current-deficit">Current Deficit (€ Billions)</Label>
            <Input
              id="current-deficit"
              type="number"
              value={impactData.currentDeficit}
              onChange={(e) => handleInputChange('currentDeficit', e.target.value)}
              placeholder="50"
            />
          </div>

          <Button onClick={calculateImpact} className="w-full">
            Calculate Fiscal Impact
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Immediate Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">GDP Impact</p>
                  <p className={`text-2xl font-bold ${results.directImpact.gdp >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.directImpact.gdp >= 0 ? '+' : ''}€{results.directImpact.gdp.toFixed(1)}B
                  </p>
                  <p className="text-xs text-gray-500">Multiplier: {results.multiplier}x</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Impact</p>
                    <p className={`text-lg font-semibold ${results.directImpact.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.directImpact.revenue >= 0 ? '+' : ''}€{results.directImpact.revenue.toFixed(1)}B
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">New Deficit</p>
                    <p className={`text-lg font-semibold ${results.directImpact.deficit <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{Math.abs(results.directImpact.deficit).toFixed(1)}B
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5-Year Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.projections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="gdpImpact" stroke="#8884d8" name="GDP Impact" />
                  <Line type="monotone" dataKey="revenueImpact" stroke="#82ca9d" name="Revenue Impact" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Policy Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyFiscalImpactTool;
