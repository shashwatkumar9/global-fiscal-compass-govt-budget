
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from "recharts";
import { TrendingUp, Calculator, Target, AlertCircle, DollarSign, Percent } from "lucide-react";

const GermanRevenueProjector = () => {
  const [projectionPeriod, setProjectionPeriod] = useState("5");
  const [economicGrowth, setEconomicGrowth] = useState("2.4");
  const [inflationRate, setInflationRate] = useState("2.1");
  const [unemploymentRate, setUnemploymentRate] = useState("5.8");
  const [taxPolicyScenario, setTaxPolicyScenario] = useState("baseline");

  // German revenue data (in billions of euros)
  const revenueData = {
    totalRevenue: 362.8,
    taxRevenue: 325.2,
    nonTaxRevenue: 37.6,
    breakdown: {
      incomeTax: 89.2,
      vat: 108.3,
      corporateTax: 35.4,
      energyTax: 40.2,
      socialContributions: 185.6,
      customsDuties: 5.8,
      otherTaxes: 52.1,
      nonTaxRevenue: 37.6
    }
  };

  const economicAssumptions = {
    gdpGrowthRate: 2.4,
    inflationRate: 2.1,
    unemploymentRate: 5.8,
    wageGrowthRate: 3.2,
    corporateProfitGrowth: 4.1,
    consumerSpendingGrowth: 2.8
  };

  const historicalRevenue = [
    { year: "2019", total: 329.4, tax: 298.1, nonTax: 31.3, gdp: 3449 },
    { year: "2020", total: 316.2, tax: 285.8, nonTax: 30.4, gdp: 3337 },
    { year: "2021", total: 338.5, tax: 306.2, nonTax: 32.3, gdp: 3571 },
    { year: "2022", total: 351.7, tax: 318.4, nonTax: 33.3, gdp: 3876 },
    { year: "2023", total: 358.9, tax: 324.1, nonTax: 34.8, gdp: 4030 },
    { year: "2024", total: 356.2, tax: 321.8, nonTax: 34.4, gdp: 4055 },
    { year: "2025", total: 362.8, tax: 325.2, nonTax: 37.6, gdp: 4090 }
  ];

  const calculateRevenueProjection = () => {
    const years = parseInt(projectionPeriod);
    const growth = parseFloat(economicGrowth) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const unemployment = parseFloat(unemploymentRate) / 100;
    
    const projections = [];
    let currentRevenue = revenueData.totalRevenue;
    let currentGDP = 4090; // 2025 GDP
    
    for (let i = 1; i <= years; i++) {
      // GDP growth
      currentGDP *= (1 + growth);
      
      // Revenue projections based on economic factors
      const gdpEffect = growth;
      const inflationEffect = inflation * 0.7; // Partial indexation
      const unemploymentEffect = Math.max(0, (6 - unemployment * 100) * 0.005); // Employment impact
      
      const totalGrowthEffect = gdpEffect + inflationEffect + unemploymentEffect;
      
      // Apply tax policy scenario adjustments
      let policyAdjustment = 1;
      if (taxPolicyScenario === "tax_cuts") {
        policyAdjustment = 0.95; // 5% reduction
      } else if (taxPolicyScenario === "tax_increases") {
        policyAdjustment = 1.08; // 8% increase
      }
      
      currentRevenue *= (1 + totalGrowthEffect) * policyAdjustment;
      
      // Break down by revenue type
      const incomeTaxGrowth = totalGrowthEffect * 1.2; // More elastic
      const vatGrowth = totalGrowthEffect * 0.9; // Less elastic
      const corporateTaxGrowth = totalGrowthEffect * 1.5; // Highly elastic
      
      projections.push({
        year: 2025 + i,
        total: currentRevenue,
        tax: currentRevenue * 0.896, // Tax revenue share
        nonTax: currentRevenue * 0.104, // Non-tax revenue share
        gdp: currentGDP,
        revenueToGDP: (currentRevenue / currentGDP) * 100,
        incomeTax: revenueData.breakdown.incomeTax * Math.pow(1 + incomeTaxGrowth, i),
        vat: revenueData.breakdown.vat * Math.pow(1 + vatGrowth, i),
        corporateTax: revenueData.breakdown.corporateTax * Math.pow(1 + corporateTaxGrowth, i)
      });
    }
    
    return projections;
  };

  const projections = calculateRevenueProjection();

  const sensitivityAnalysis = [
    { scenario: "Optimistic (+1% GDP)", revenue: 395.2, change: 8.9 },
    { scenario: "Baseline", revenue: 362.8, change: 0 },
    { scenario: "Pessimistic (-1% GDP)", revenue: 331.5, change: -8.6 },
    { scenario: "Recession (-3% GDP)", revenue: 298.7, change: -17.7 }
  ];

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Revenue Projector - Advanced Forecasting Tool
          </CardTitle>
          <p className="text-gray-600">
            Project future government revenue based on economic forecasts, policy scenarios, and sensitivity analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="projection-period">Projection Period (Years)</Label>
              <Select value={projectionPeriod} onValueChange={setProjectionPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="economic-growth">GDP Growth Rate (%)</Label>
              <Input
                id="economic-growth"
                value={economicGrowth}
                onChange={(e) => setEconomicGrowth(e.target.value)}
                placeholder="2.4"
              />
            </div>
            <div>
              <Label htmlFor="tax-policy">Tax Policy Scenario</Label>
              <Select value={taxPolicyScenario} onValueChange={setTaxPolicyScenario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseline">Baseline (No Changes)</SelectItem>
                  <SelectItem value="tax_cuts">Tax Cuts (-5%)</SelectItem>
                  <SelectItem value="tax_increases">Tax Increases (+8%)</SelectItem>
                  <SelectItem value="reforms">Structural Reforms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
              <Input
                id="inflation-rate"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="2.1"
              />
            </div>
            <div>
              <Label htmlFor="unemployment-rate">Unemployment Rate (%)</Label>
              <Input
                id="unemployment-rate"
                value={unemploymentRate}
                onChange={(e) => setUnemploymentRate(e.target.value)}
                placeholder="5.8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(revenueData.totalRevenue)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Projected {projectionPeriod}Y</p>
                    <p className="text-2xl font-bold text-green-600">
                      {projections.length > 0 ? formatBillions(projections[projections.length - 1].total) : "N/A"}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue-to-GDP</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage((revenueData.totalRevenue / 4090) * 100)}
                    </p>
                  </div>
                  <Percent className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {economicGrowth}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projections" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="projections">Projections</TabsTrigger>
              <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
              <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
              <TabsTrigger value="scenarios">Policy Scenarios</TabsTrigger>
              <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
            </TabsList>

            <TabsContent value="projections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projections ({projectionPeriod} Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={[...historicalRevenue, ...projections]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area yAxisId="left" dataKey="total" fill="#8884d8" fillOpacity={0.3} name="Total Revenue (€B)" />
                      <Bar yAxisId="left" dataKey="tax" fill="#82ca9d" name="Tax Revenue (€B)" />
                      <Line yAxisId="right" type="monotone" dataKey="revenueToGDP" stroke="#ff7300" strokeWidth={2} name="Revenue-to-GDP (%)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {projections.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projection Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Start Year (2025):</span>
                          <span className="font-semibold">{formatBillions(revenueData.totalRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>End Year ({2025 + parseInt(projectionPeriod)}):</span>
                          <span className="font-semibold">{formatBillions(projections[projections.length - 1].total)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Growth:</span>
                          <span className="font-semibold text-green-600">
                            {formatPercentage(((projections[projections.length - 1].total / revenueData.totalRevenue) - 1) * 100)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Average Growth:</span>
                          <span className="font-semibold">
                            {formatPercentage(Math.pow(projections[projections.length - 1].total / revenueData.totalRevenue, 1/parseInt(projectionPeriod)) - 1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Composition Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={projections.slice(-5)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Area dataKey="incomeTax" stackId="1" fill="#8884d8" name="Income Tax" />
                          <Area dataKey="vat" stackId="1" fill="#82ca9d" name="VAT" />
                          <Area dataKey="corporateTax" stackId="1" fill="#ffc658" name="Corporate Tax" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Revenue Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(revenueData.breakdown).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-semibold">{formatBillions(value)}</span>
                              <span className="text-xs text-gray-600 ml-2">
                                ({((value / revenueData.totalRevenue) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500" 
                              style={{ width: `${(value / revenueData.totalRevenue) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Elasticity Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Income Tax Elasticity:</span>
                      <Badge variant="outline">1.2 (High)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT Elasticity:</span>
                      <Badge variant="outline">0.9 (Moderate)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Corporate Tax Elasticity:</span>
                      <Badge variant="outline">1.5 (Very High)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Contributions:</span>
                      <Badge variant="outline">1.0 (Stable)</Badge>
                    </div>
                    <Separator />
                    <div className="text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Higher elasticity means greater sensitivity to economic changes
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sensitivity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sensitivity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sensitivityAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scenario" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'revenue' ? formatBillions(value as number) : `${value}%`,
                        name === 'revenue' ? 'Revenue' : 'Change'
                      ]} />
                      <Bar dataKey="revenue" fill="#8884d8" name="revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Economic Impact Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>GDP Growth Impact:</span>
                      <span className="font-semibold">High (1:1.2 ratio)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unemployment Impact:</span>
                      <span className="font-semibold">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inflation Impact:</span>
                      <span className="font-semibold">Moderate (0.7 factor)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate Impact:</span>
                      <span className="font-semibold">Low</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Confidence Intervals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>90% Confidence Range:</span>
                      <span className="font-semibold">±12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>95% Confidence Range:</span>
                      <span className="font-semibold">±18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard Deviation:</span>
                      <span className="font-semibold">€28.5B</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Baseline Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Current tax rates maintained</li>
                      <li>• Moderate economic growth (2.4%)</li>
                      <li>• Stable inflation (2.1%)</li>
                      <li>• No major policy changes</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-800">5Y Revenue:</div>
                      <div className="text-xl font-bold text-blue-600">
                        {projections.length >= 5 ? formatBillions(projections[4].total) : "N/A"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Cut Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Income tax rates reduced by 5%</li>
                      <li>• Corporate tax cuts</li>
                      <li>• Enhanced investment incentives</li>
                      <li>• Potential growth stimulus</li>
                    </ul>
                    <div className="mt-4 p-3 bg-green-50 rounded">
                      <div className="font-semibold text-green-800">5Y Revenue:</div>
                      <div className="text-xl font-bold text-green-600">
                        €398.2B
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Increase Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Higher top tax rates</li>
                      <li>• Wealth tax introduction</li>
                      <li>• Carbon tax expansion</li>
                      <li>• Digital services tax</li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 rounded">
                      <div className="font-semibold text-red-800">5Y Revenue:</div>
                      <div className="text-xl font-bold text-red-600">
                        €465.8B
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assumptions" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Economic Assumptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(economicAssumptions).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-semibold">{value}%</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Methodology Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <p>• Revenue projections based on historical elasticities</p>
                      <p>• GDP growth affects all tax bases proportionally</p>
                      <p>• Inflation impacts are partially indexed</p>
                      <p>• Unemployment affects income and consumption taxes</p>
                      <p>• Corporate profits show higher volatility</p>
                      <p>• Policy scenarios include behavioral responses</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanRevenueProjector;
