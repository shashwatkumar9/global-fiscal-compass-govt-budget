
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";
import { Calculator, Impact, TrendingUp, AlertTriangle } from "lucide-react";

const FranceFiscalImpactTool = () => {
  const [impactData, setImpactData] = useState({
    policyType: "tax_increase",
    magnitude: 0,
    implementation: "immediate",
    duration: 5,
    targetSector: "all"
  });

  const [results, setResults] = useState(null);

  const calculateImpact = () => {
    const baseGDP = 2800; // France GDP in billions
    const baseRevenue = 1200;
    const baseSpending = 1350;

    // Impact multipliers based on policy type
    const multipliers = {
      tax_increase: { revenue: 1.0, gdp: -0.3, employment: -0.2 },
      tax_decrease: { revenue: -1.0, gdp: 0.5, employment: 0.3 },
      spending_increase: { revenue: 0, gdp: 0.8, employment: 0.4 },
      spending_decrease: { revenue: 0, gdp: -0.4, employment: -0.3 }
    };

    const mult = multipliers[impactData.policyType];
    const yearlyImpact = [];

    for (let year = 1; year <= impactData.duration; year++) {
      const impactFactor = impactData.implementation === "gradual" ? year / impactData.duration : 1;
      const revenueImpact = impactData.magnitude * mult.revenue * impactFactor;
      const gdpImpact = impactData.magnitude * mult.gdp * impactFactor * 0.01 * baseGDP;
      const employmentImpact = impactData.magnitude * mult.employment * impactFactor * 0.1;

      yearlyImpact.push({
        year: new Date().getFullYear() + year,
        revenueImpact,
        gdpImpact,
        employmentImpact,
        fiscalBalance: revenueImpact
      });
    }

    const totalImpact = {
      revenue: yearlyImpact.reduce((sum, year) => sum + year.revenueImpact, 0),
      gdp: yearlyImpact[yearlyImpact.length - 1]?.gdpImpact || 0,
      employment: yearlyImpact[yearlyImpact.length - 1]?.employmentImpact || 0
    };

    setResults({
      yearlyImpact,
      totalImpact,
      recommendation: totalImpact.gdp >= 0 ? "Positive economic impact expected" : "Caution: Negative economic impact expected",
      riskLevel: Math.abs(totalImpact.gdp) > 50 ? "high" : Math.abs(totalImpact.gdp) > 20 ? "medium" : "low"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Impact className="w-5 h-5" />
            France Fiscal Impact Tool
          </CardTitle>
          <CardDescription>
            Analyze the economic impact of fiscal policy changes with advanced modeling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Policy Type</Label>
              <Select onValueChange={(value) => setImpactData({...impactData, policyType: value})} defaultValue="tax_increase">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tax_increase">Tax Increase</SelectItem>
                  <SelectItem value="tax_decrease">Tax Decrease</SelectItem>
                  <SelectItem value="spending_increase">Spending Increase</SelectItem>
                  <SelectItem value="spending_decrease">Spending Decrease</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Magnitude (€ billions)</Label>
              <Input
                type="number"
                value={impactData.magnitude || ""}
                onChange={(e) => setImpactData({...impactData, magnitude: Number(e.target.value)})}
                placeholder="Policy magnitude"
              />
            </div>
            <div className="space-y-2">
              <Label>Implementation</Label>
              <Select onValueChange={(value) => setImpactData({...impactData, implementation: value})} defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="gradual">Gradual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (years)</Label>
              <Input
                type="number"
                value={impactData.duration || ""}
                onChange={(e) => setImpactData({...impactData, duration: Number(e.target.value)})}
                placeholder="Policy duration"
              />
            </div>
          </div>

          <Button onClick={calculateImpact} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Impact
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Impact</p>
                    <p className={`text-2xl font-bold ${results.totalImpact.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{results.totalImpact.revenue.toFixed(1)}B
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">GDP Impact</p>
                    <p className={`text-2xl font-bold ${results.totalImpact.gdp >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{results.totalImpact.gdp.toFixed(1)}B
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <Badge variant={results.riskLevel === 'high' ? 'destructive' : results.riskLevel === 'medium' ? 'secondary' : 'default'}>
                      {results.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.yearlyImpact}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenueImpact" stroke="#8884d8" name="Revenue Impact" />
                  <Line type="monotone" dataKey="gdpImpact" stroke="#82ca9d" name="GDP Impact" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FranceFiscalImpactTool;
