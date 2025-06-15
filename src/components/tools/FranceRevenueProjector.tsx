
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, ComposedChart, Area, AreaChart } from "recharts";
import { TrendingUp, Calculator, Euro, Building2, Users, Factory } from "lucide-react";

const FranceRevenueProjector = () => {
  const [revenueData, setRevenueData] = useState({
    // Current tax revenues (billions €)
    incomeTax: 0,
    corporateTax: 0,
    vat: 0,
    socialContributions: 0,
    propertyTax: 0,
    otherTaxes: 0,
    // Economic parameters
    gdpGrowth: 2.0,
    inflationRate: 2.1,
    unemploymentRate: 7.5,
    // Policy scenarios
    taxPolicy: "current",
    economicScenario: "baseline",
    projectionYears: 5
  });

  const [projections, setProjections] = useState(null);

  const calculateProjections = () => {
    const currentTotal = revenueData.incomeTax + revenueData.corporateTax + revenueData.vat + 
                        revenueData.socialContributions + revenueData.propertyTax + revenueData.otherTaxes;

    // Define growth multipliers based on scenarios
    const scenarioMultipliers = {
      optimistic: { gdp: 1.2, employment: 1.15, tax: 1.1 },
      baseline: { gdp: 1.0, employment: 1.0, tax: 1.0 },
      pessimistic: { gdp: 0.8, employment: 0.85, tax: 0.9 }
    };

    const policyMultipliers = {
      current: { income: 1.0, corporate: 1.0, vat: 1.0, social: 1.0 },
      increase: { income: 1.05, corporate: 1.08, vat: 1.03, social: 1.02 },
      decrease: { income: 0.95, corporate: 0.92, vat: 0.97, social: 0.98 },
      reform: { income: 1.02, corporate: 0.95, vat: 1.05, social: 1.03 }
    };

    const multiplier = scenarioMultipliers[revenueData.economicScenario];
    const policyMult = policyMultipliers[revenueData.taxPolicy];

    // Generate year-by-year projections
    const yearlyProjections = [];
    const monthlyProjections = [];
    
    for (let year = 0; year <= revenueData.projectionYears; year++) {
      const growthFactor = Math.pow(1 + (revenueData.gdpGrowth * multiplier.gdp) / 100, year);
      const inflationFactor = Math.pow(1 + revenueData.inflationRate / 100, year);
      
      // Calculate each revenue stream
      const projectedRevenues = {
        year: new Date().getFullYear() + year,
        incomeTax: revenueData.incomeTax * growthFactor * policyMult.income * multiplier.tax,
        corporateTax: revenueData.corporateTax * growthFactor * policyMult.corporate * multiplier.tax,
        vat: revenueData.vat * growthFactor * policyMult.vat * multiplier.tax,
        socialContributions: revenueData.socialContributions * growthFactor * policyMult.social * multiplier.employment,
        propertyTax: revenueData.propertyTax * inflationFactor * multiplier.tax,
        otherTaxes: revenueData.otherTaxes * growthFactor * multiplier.tax
      };

      projectedRevenues.total = Object.values(projectedRevenues).slice(1).reduce((sum, val) => sum + val, 0);
      projectedRevenues.growth = year > 0 ? ((projectedRevenues.total / currentTotal - 1) * 100) : 0;
      
      yearlyProjections.push(projectedRevenues);

      // Generate monthly breakdown for current year + 1
      if (year === 1) {
        for (let month = 1; month <= 12; month++) {
          const seasonalFactors = {
            1: 1.1, 2: 0.9, 3: 1.2, 4: 1.0, 5: 0.95, 6: 1.05,
            7: 0.9, 8: 0.85, 9: 1.1, 10: 1.05, 11: 1.0, 12: 1.15
          };
          
          monthlyProjections.push({
            month: `${year === 1 ? new Date().getFullYear() + 1 : new Date().getFullYear()}-${month.toString().padStart(2, '0')}`,
            revenue: (projectedRevenues.total / 12) * (seasonalFactors[month] || 1),
            incomeTax: (projectedRevenues.incomeTax / 12) * (seasonalFactors[month] || 1),
            vat: (projectedRevenues.vat / 12) * (seasonalFactors[month] || 1)
          });
        }
      }
    }

    // Revenue composition analysis
    const currentComposition = [
      { source: "Income Tax", amount: revenueData.incomeTax, percentage: (revenueData.incomeTax / currentTotal) * 100 },
      { source: "Corporate Tax", amount: revenueData.corporateTax, percentage: (revenueData.corporateTax / currentTotal) * 100 },
      { source: "VAT", amount: revenueData.vat, percentage: (revenueData.vat / currentTotal) * 100 },
      { source: "Social Contributions", amount: revenueData.socialContributions, percentage: (revenueData.socialContributions / currentTotal) * 100 },
      { source: "Property Tax", amount: revenueData.propertyTax, percentage: (revenueData.propertyTax / currentTotal) * 100 },
      { source: "Other Taxes", amount: revenueData.otherTaxes, percentage: (revenueData.otherTaxes / currentTotal) * 100 }
    ];

    // Risk analysis
    const volatility = {
      incomeTax: 15, // %
      corporateTax: 25,
      vat: 8,
      socialContributions: 5,
      propertyTax: 3,
      otherTaxes: 12
    };

    // Calculate revenue at risk (1% probability)
    const revenueAtRisk = currentTotal * 0.15; // 15% potential loss in extreme scenario

    setProjections({
      yearlyProjections,
      monthlyProjections,
      currentComposition,
      currentTotal,
      projectedTotal: yearlyProjections[yearlyProjections.length - 1].total,
      averageGrowth: yearlyProjections.slice(1).reduce((sum, year) => sum + year.growth, 0) / revenueData.projectionYears,
      volatility,
      revenueAtRisk,
      confidence: revenueData.economicScenario === 'baseline' ? 85 : revenueData.economicScenario === 'optimistic' ? 70 : 60
    });
  };

  const resetForm = () => {
    setRevenueData({
      incomeTax: 0,
      corporateTax: 0,
      vat: 0,
      socialContributions: 0,
      propertyTax: 0,
      otherTaxes: 0,
      gdpGrowth: 2.0,
      inflationRate: 2.1,
      unemploymentRate: 7.5,
      taxPolicy: "current",
      economicScenario: "baseline",
      projectionYears: 5
    });
    setProjections(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Revenue Projector
          </CardTitle>
          <CardDescription>
            Advanced government revenue forecasting with multiple scenarios and detailed breakdowns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incomeTax">Income Tax Revenue (€ billions)</Label>
              <Input
                id="incomeTax"
                type="number"
                value={revenueData.incomeTax || ""}
                onChange={(e) => setRevenueData({...revenueData, incomeTax: Number(e.target.value)})}
                placeholder="Personal income tax"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateTax">Corporate Tax Revenue (€ billions)</Label>
              <Input
                id="corporateTax"
                type="number"
                value={revenueData.corporateTax || ""}
                onChange={(e) => setRevenueData({...revenueData, corporateTax: Number(e.target.value)})}
                placeholder="Business tax revenue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat">VAT Revenue (€ billions)</Label>
              <Input
                id="vat"
                type="number"
                value={revenueData.vat || ""}
                onChange={(e) => setRevenueData({...revenueData, vat: Number(e.target.value)})}
                placeholder="Value-added tax"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="socialContributions">Social Contributions (€ billions)</Label>
              <Input
                id="socialContributions"
                type="number"
                value={revenueData.socialContributions || ""}
                onChange={(e) => setRevenueData({...revenueData, socialContributions: Number(e.target.value)})}
                placeholder="Social security contributions"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Property Tax Revenue (€ billions)</Label>
              <Input
                id="propertyTax"
                type="number"
                value={revenueData.propertyTax || ""}
                onChange={(e) => setRevenueData({...revenueData, propertyTax: Number(e.target.value)})}
                placeholder="Property-related taxes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherTaxes">Other Tax Revenue (€ billions)</Label>
              <Input
                id="otherTaxes"
                type="number"
                value={revenueData.otherTaxes || ""}
                onChange={(e) => setRevenueData({...revenueData, otherTaxes: Number(e.target.value)})}
                placeholder="Excise, customs, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gdpGrowth">GDP Growth Rate (%)</Label>
              <Input
                id="gdpGrowth"
                type="number"
                step="0.1"
                value={revenueData.gdpGrowth || ""}
                onChange={(e) => setRevenueData({...revenueData, gdpGrowth: Number(e.target.value)})}
                placeholder="Annual GDP growth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                step="0.1"
                value={revenueData.inflationRate || ""}
                onChange={(e) => setRevenueData({...revenueData, inflationRate: Number(e.target.value)})}
                placeholder="Annual inflation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unemploymentRate">Unemployment Rate (%)</Label>
              <Input
                id="unemploymentRate"
                type="number"
                step="0.1"
                value={revenueData.unemploymentRate || ""}
                onChange={(e) => setRevenueData({...revenueData, unemploymentRate: Number(e.target.value)})}
                placeholder="Unemployment rate"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxPolicy">Tax Policy Scenario</Label>
              <Select onValueChange={(value) => setRevenueData({...revenueData, taxPolicy: value})} defaultValue="current">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Policy</SelectItem>
                  <SelectItem value="increase">Tax Increases</SelectItem>
                  <SelectItem value="decrease">Tax Cuts</SelectItem>
                  <SelectItem value="reform">Tax Reform</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="economicScenario">Economic Scenario</Label>
              <Select onValueChange={(value) => setRevenueData({...revenueData, economicScenario: value})} defaultValue="baseline">
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
            <div className="space-y-2">
              <Label htmlFor="projectionYears">Projection Period</Label>
              <Select onValueChange={(value) => setRevenueData({...revenueData, projectionYears: Number(value)})} defaultValue="5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateProjections} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Generate Projections
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {projections && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">
                        €{(projections.currentTotal / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <Euro className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Projected Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        €{(projections.projectedTotal / 1000).toFixed(2)}T
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
                      <p className="text-sm text-gray-600">Average Growth</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {projections.averageGrowth.toFixed(1)}%
                      </p>
                    </div>
                    <Building2 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Confidence Level</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {projections.confidence}%
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={projections.yearlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Revenue" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source (Yearly)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={projections.yearlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="incomeTax" stackId="a" fill="#8884d8" name="Income Tax" />
                    <Bar yAxisId="left" dataKey="corporateTax" stackId="a" fill="#82ca9d" name="Corporate Tax" />
                    <Bar yAxisId="left" dataKey="vat" stackId="a" fill="#ffc658" name="VAT" />
                    <Bar yAxisId="left" dataKey="socialContributions" stackId="a" fill="#ff7c7c" name="Social Contributions" />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#ff7300" name="Growth Rate (%)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {projections.yearlyProjections.slice(1).map((year) => (
                <Card key={year.year}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{year.year}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          €{(year.total / 1000).toFixed(2)}T
                        </p>
                        <p className="text-sm text-gray-600">
                          Growth: {year.growth.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>Income Tax: €{year.incomeTax.toFixed(1)}B</div>
                      <div>Corporate Tax: €{year.corporateTax.toFixed(1)}B</div>
                      <div>VAT: €{year.vat.toFixed(1)}B</div>
                      <div>Social Contributions: €{year.socialContributions.toFixed(1)}B</div>
                      <div>Property Tax: €{year.propertyTax.toFixed(1)}B</div>
                      <div>Other Taxes: €{year.otherTaxes.toFixed(1)}B</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Distribution (Next Year)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projections.monthlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Total Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={projections.monthlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="incomeTax" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="vat" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Revenue Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projections.currentComposition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {projections.currentComposition.map((source) => (
                <Card key={source.source}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{source.source}</h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          €{source.amount.toFixed(1)}B
                        </p>
                        <p className="text-sm text-gray-600">
                          {source.percentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Volatility by Source</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(projections.volatility).map(([source, vol]) => (
                    <div key={source} className="flex justify-between items-center">
                      <span className="capitalize">{source.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{vol}%</span>
                        <div className={`w-3 h-3 rounded-full ${
                          vol > 20 ? 'bg-red-500' : vol > 10 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Revenue at Risk (1% probability):</span>
                    <span className="font-semibold text-red-600">
                      €{(projections.revenueAtRisk / 1000).toFixed(2)}T
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projection Confidence:</span>
                    <span className="font-semibold">{projections.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Volatile Source:</span>
                    <span className="font-semibold text-orange-600">Corporate Tax</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Stable Source:</span>
                    <span className="font-semibold text-green-600">Property Tax</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Current scenario: <strong className="capitalize">{revenueData.economicScenario}</strong> with <strong className="capitalize">{revenueData.taxPolicy.replace('_', ' ')}</strong> tax policy
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600">Optimistic Scenario</h4>
                      <p className="text-sm text-gray-600">+20% higher growth, lower unemployment</p>
                      <p className="text-lg font-bold">€{((projections.projectedTotal * 1.2) / 1000).toFixed(2)}T</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600">Baseline Scenario</h4>
                      <p className="text-sm text-gray-600">Current projections</p>
                      <p className="text-lg font-bold">€{(projections.projectedTotal / 1000).toFixed(2)}T</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-red-600">Pessimistic Scenario</h4>
                      <p className="text-sm text-gray-600">-20% slower growth, higher unemployment</p>
                      <p className="text-lg font-bold">€{((projections.projectedTotal * 0.8) / 1000).toFixed(2)}T</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceRevenueProjector;
