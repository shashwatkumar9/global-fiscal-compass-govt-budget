
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Calculator, CreditCard, Percent } from "lucide-react";

const FrancePublicDebtCalculator = () => {
  const [debtData, setDebtData] = useState({
    totalDebt: 0,
    gdp: 0,
    population: 67500000,
    interestRate: 2.5,
    primaryBalance: 0,
    growthRate: 2.0,
    inflationRate: 2.1,
    timeHorizon: 10,
    scenario: "baseline"
  });

  const [analysis, setAnalysis] = useState(null);

  const calculateDebtAnalysis = () => {
    const debtToGDP = debtData.gdp > 0 ? (debtData.totalDebt / debtData.gdp) * 100 : 0;
    const debtPerCapita = debtData.totalDebt / debtData.population;
    const annualInterest = debtData.totalDebt * (debtData.interestRate / 100);
    
    // Debt sustainability calculations
    const realInterestRate = debtData.interestRate - debtData.inflationRate;
    const realGrowthRate = debtData.growthRate - debtData.inflationRate;
    const stabilizingBalance = (debtToGDP / 100) * (realInterestRate - realGrowthRate) * debtData.gdp;
    
    // Project debt evolution
    const projections = [];
    let currentDebt = debtData.totalDebt;
    let currentGDP = debtData.gdp;
    
    for (let year = 0; year <= debtData.timeHorizon; year++) {
      const interestPayment = currentDebt * (debtData.interestRate / 100);
      const netBorrowing = interestPayment + debtData.primaryBalance;
      
      // Apply different scenarios
      let scenarioMultiplier = 1;
      if (debtData.scenario === "optimistic") {
        scenarioMultiplier = 0.8;
      } else if (debtData.scenario === "pessimistic") {
        scenarioMultiplier = 1.3;
      }
      
      currentDebt += netBorrowing * scenarioMultiplier;
      currentGDP *= (1 + debtData.growthRate / 100);
      
      const debtToGDPRatio = (currentDebt / currentGDP) * 100;
      
      projections.push({
        year: new Date().getFullYear() + year,
        debt: currentDebt / 1000, // Convert to trillions
        gdp: currentGDP / 1000,
        debtToGDP: debtToGDPRatio,
        interestPayment: interestPayment / 1000,
        debtPerCapita: currentDebt / debtData.population
      });
    }

    // Risk assessment
    const riskLevel = debtToGDP > 90 ? "high" : debtToGDP > 60 ? "medium" : "low";
    const maastrichtCompliant = debtToGDP <= 60;
    
    // Debt breakdown by type (simulated)
    const debtComposition = [
      { type: "Government Bonds", amount: debtData.totalDebt * 0.65, percentage: 65 },
      { type: "Treasury Bills", amount: debtData.totalDebt * 0.20, percentage: 20 },
      { type: "External Debt", amount: debtData.totalDebt * 0.10, percentage: 10 },
      { type: "Other", amount: debtData.totalDebt * 0.05, percentage: 5 }
    ];

    // International comparison (EU averages)
    const comparison = [
      { country: "France", debtToGDP: debtToGDP, rating: "AA" },
      { country: "Germany", debtToGDP: 69.8, rating: "AAA" },
      { country: "Italy", debtToGDP: 147.5, rating: "BBB" },
      { country: "Spain", debtToGDP: 117.7, rating: "A" },
      { country: "EU Average", debtToGDP: 83.5, rating: "A+" }
    ];

    setAnalysis({
      debtToGDP,
      debtPerCapita,
      annualInterest,
      stabilizingBalance,
      projections,
      riskLevel,
      maastrichtCompliant,
      debtComposition,
      comparison,
      realInterestRate,
      realGrowthRate
    });
  };

  const resetForm = () => {
    setDebtData({
      totalDebt: 0,
      gdp: 0,
      population: 67500000,
      interestRate: 2.5,
      primaryBalance: 0,
      growthRate: 2.0,
      inflationRate: 2.1,
      timeHorizon: 10,
      scenario: "baseline"
    });
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Public Debt Calculator
          </CardTitle>
          <CardDescription>
            Comprehensive public debt analysis with sustainability projections and EU compliance assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalDebt">Total Public Debt (€ billions)</Label>
              <Input
                id="totalDebt"
                type="number"
                value={debtData.totalDebt || ""}
                onChange={(e) => setDebtData({...debtData, totalDebt: Number(e.target.value)})}
                placeholder="Total government debt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gdp">Nominal GDP (€ billions)</Label>
              <Input
                id="gdp"
                type="number"
                value={debtData.gdp || ""}
                onChange={(e) => setDebtData({...debtData, gdp: Number(e.target.value)})}
                placeholder="Gross Domestic Product"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input
                id="population"
                type="number"
                value={debtData.population || ""}
                onChange={(e) => setDebtData({...debtData, population: Number(e.target.value)})}
                placeholder="Total population"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interestRate">Average Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={debtData.interestRate || ""}
                onChange={(e) => setDebtData({...debtData, interestRate: Number(e.target.value)})}
                placeholder="Interest rate on debt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryBalance">Primary Balance (€ billions)</Label>
              <Input
                id="primaryBalance"
                type="number"
                value={debtData.primaryBalance || ""}
                onChange={(e) => setDebtData({...debtData, primaryBalance: Number(e.target.value)})}
                placeholder="Budget balance excl. interest"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="growthRate">GDP Growth Rate (%)</Label>
              <Input
                id="growthRate"
                type="number"
                step="0.1"
                value={debtData.growthRate || ""}
                onChange={(e) => setDebtData({...debtData, growthRate: Number(e.target.value)})}
                placeholder="Annual GDP growth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                step="0.1"
                value={debtData.inflationRate || ""}
                onChange={(e) => setDebtData({...debtData, inflationRate: Number(e.target.value)})}
                placeholder="Annual inflation rate"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeHorizon">Projection Period (years)</Label>
              <Select onValueChange={(value) => setDebtData({...debtData, timeHorizon: Number(value)})} defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scenario">Economic Scenario</Label>
              <Select onValueChange={(value) => setDebtData({...debtData, scenario: value})} defaultValue="baseline">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="optimistic">Optimistic</SelectItem>
                  <SelectItem value="baseline">Baseline</SelectItem>
                  <SelectItem value="pessimistic">Pessimistic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateDebtAnalysis} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Analyze Debt
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Debt-to-GDP Ratio</p>
                      <p className={`text-2xl font-bold ${analysis.debtToGDP > 60 ? 'text-red-600' : 'text-green-600'}`}>
                        {analysis.debtToGDP.toFixed(1)}%
                      </p>
                    </div>
                    <Percent className="w-8 h-8 text-blue-600" />
                  </div>
                  <Progress value={Math.min(analysis.debtToGDP, 100)} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Debt per Capita</p>
                      <p className="text-2xl font-bold text-orange-600">
                        €{analysis.debtPerCapita.toFixed(0)}
                      </p>
                    </div>
                    <CreditCard className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Annual Interest</p>
                      <p className="text-2xl font-bold text-purple-600">
                        €{(analysis.annualInterest / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Risk Level</p>
                      <p className={`text-2xl font-bold ${
                        analysis.riskLevel === 'low' ? 'text-green-600' : 
                        analysis.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {analysis.riskLevel.toUpperCase()}
                      </p>
                    </div>
                    <AlertTriangle className={`w-8 h-8 ${
                      analysis.riskLevel === 'low' ? 'text-green-600' : 
                      analysis.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>EU Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Maastricht Criteria (60% debt-to-GDP):</span>
                    <span className={`font-semibold ${analysis.maastrichtCompliant ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.maastrichtCompliant ? '✓ Compliant' : '✗ Non-compliant'}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((analysis.debtToGDP / 60) * 100, 100)} 
                    className={analysis.maastrichtCompliant ? 'bg-green-100' : 'bg-red-100'}
                  />
                  <p className="text-sm text-gray-600">
                    Current ratio: {analysis.debtToGDP.toFixed(1)}% vs EU limit: 60%
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Debt Evolution Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analysis.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="right" type="monotone" dataKey="debtToGDP" stroke="#8884d8" name="Debt-to-GDP (%)" />
                    <Line yAxisId="left" type="monotone" dataKey="debt" stroke="#82ca9d" name="Total Debt (€T)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interest Payment Burden</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analysis.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value.toFixed(2)}T`} />
                    <Area type="monotone" dataKey="interestPayment" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} name="Interest Payments" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Debt Composition by Instrument</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysis.debtComposition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {analysis.debtComposition.map((item) => (
                <Card key={item.type}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{item.type}</h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          €{(item.amount / 1000).toFixed(2)}T
                        </p>
                        <p className="text-sm text-gray-600">{item.percentage}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Real Interest Rate:</span>
                    <span className="font-semibold">{analysis.realInterestRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real Growth Rate:</span>
                    <span className="font-semibold">{analysis.realGrowthRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth-Interest Differential:</span>
                    <span className={`font-semibold ${(analysis.realGrowthRate - analysis.realInterestRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(analysis.realGrowthRate - analysis.realInterestRate).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stabilizing Primary Balance:</span>
                    <span className="font-semibold">€{(analysis.stabilizingBalance / 1000).toFixed(2)}T</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Debt Dynamics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {analysis.realGrowthRate > analysis.realInterestRate 
                      ? "✅ Favorable debt dynamics: Growth exceeds interest rates"
                      : "⚠️ Challenging debt dynamics: Interest rates exceed growth"
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    The debt-to-GDP ratio will {analysis.projections[analysis.projections.length - 1].debtToGDP > analysis.debtToGDP ? 'increase' : 'decrease'} over the projection period.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>International Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysis.comparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Bar dataKey="debtToGDP" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {analysis.comparison.map((country) => (
                <Card key={country.country}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{country.country}</h3>
                        <p className="text-sm text-gray-600">Credit Rating: {country.rating}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          {country.debtToGDP.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600">Debt-to-GDP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FrancePublicDebtCalculator;
