import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Calculator, Info, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKRevenueProjector = () => {
  const [projectionType, setProjectionType] = useState<string>("baseline");
  const [projectionYears, setProjectionYears] = useState<string>("5");
  const [customFactors, setCustomFactors] = useState({
    economicGrowth: "",
    employmentGrowth: "",
    wageGrowth: "",
    inflationRate: "",
    corporateProfits: ""
  });
  const [results, setResults] = useState<any>(null);

  // UK Government Revenue Sources 2024 (£ billions)
  const currentRevenue = {
    incomeTax: 200,
    nationalInsurance: 150,
    vat: 140,
    corporationTax: 80,
    councilTax: 35,
    businessRates: 30,
    fuelDuty: 25,
    alcoholDuty: 12,
    tobaccoDuty: 8,
    stampDuty: 15,
    capitalGainsTax: 12,
    inheritanceTax: 7,
    otherTaxes: 86
  };

  const totalCurrentRevenue = Object.values(currentRevenue).reduce((sum, val) => sum + val, 0);

  // Economic scenarios
  const scenarios = {
    baseline: { growth: 2.0, employment: 0.5, wages: 3.5, inflation: 2.0, profits: 4.0 },
    optimistic: { growth: 3.5, employment: 1.5, wages: 5.0, inflation: 2.0, profits: 8.0 },
    pessimistic: { growth: 0.5, employment: -1.0, wages: 1.5, inflation: 3.5, profits: -2.0 }
  };

  const revenueElasticity = {
    incomeTax: { growth: 1.2, employment: 1.0, wages: 1.5 },
    nationalInsurance: { growth: 1.1, employment: 1.2, wages: 1.3 },
    vat: { growth: 1.0, employment: 0.8, wages: 0.9 },
    corporationTax: { growth: 1.8, employment: 0.5, profits: 1.4 },
    councilTax: { growth: 0.3, employment: 0.2, wages: 0.4 },
    businessRates: { growth: 0.8, employment: 0.6, wages: 0.3 },
    fuelDuty: { growth: 0.2, employment: 0.3, wages: 0.1 },
    alcoholDuty: { growth: 0.1, employment: 0.2, wages: 0.2 },
    tobaccoDuty: { growth: -0.5, employment: 0.0, wages: 0.0 },
    stampDuty: { growth: 1.5, employment: 0.8, wages: 1.2 },
    capitalGainsTax: { growth: 2.0, employment: 0.3, profits: 2.5 },
    inheritanceTax: { growth: 0.8, employment: 0.1, wages: 1.0 },
    otherTaxes: { growth: 1.0, employment: 0.5, wages: 0.7 }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

  const projectRevenue = () => {
    const years = parseInt(projectionYears);
    let economicFactors;

    if (projectionType === "custom") {
      economicFactors = {
        growth: parseFloat(customFactors.economicGrowth) || 2.0,
        employment: parseFloat(customFactors.employmentGrowth) || 0.5,
        wages: parseFloat(customFactors.wageGrowth) || 3.5,
        inflation: parseFloat(customFactors.inflationRate) || 2.0,
        profits: parseFloat(customFactors.corporateProfits) || 4.0
      };
    } else {
      economicFactors = scenarios[projectionType as keyof typeof scenarios];
    }

    let projections = [];
    
    for (let year = 0; year <= years; year++) {
      const currentYear = 2024 + year;
      let yearRevenue: any = {};
      let totalYearRevenue = 0;

      Object.entries(currentRevenue).forEach(([tax, baseAmount]) => {
        const elasticity = revenueElasticity[tax as keyof typeof revenueElasticity];
        
        let growthFactor = 1;
        if (year > 0) {
          // Apply compound growth based on elasticities
          const cumulativeGrowth = Math.pow(1 + economicFactors.growth / 100, year);
          const cumulativeEmployment = Math.pow(1 + economicFactors.employment / 100, year);
          const cumulativeWages = Math.pow(1 + economicFactors.wages / 100, year);
          const cumulativeProfits = Math.pow(1 + economicFactors.profits / 100, year);
          
          growthFactor = Math.pow(cumulativeGrowth, elasticity.growth || 0) *
                        Math.pow(cumulativeEmployment, elasticity.employment || 0);
          
          // Use wages if available in elasticity, otherwise use profits
          if ('wages' in elasticity) {
            growthFactor *= Math.pow(cumulativeWages, elasticity.wages || 0);
          } else if ('profits' in elasticity) {
            growthFactor *= Math.pow(cumulativeProfits, elasticity.profits || 0);
          }
        }
        
        const projectedAmount = baseAmount * growthFactor;
        yearRevenue[tax] = Math.round(projectedAmount * 10) / 10;
        totalYearRevenue += projectedAmount;
      });

      yearRevenue.total = Math.round(totalYearRevenue * 10) / 10;
      yearRevenue.year = currentYear;
      yearRevenue.growthRate = year === 0 ? 0 : ((totalYearRevenue - projections[year - 1].total) / projections[year - 1].total) * 100;
      
      projections.push(yearRevenue);
    }

    // Calculate revenue composition for final year
    const finalYear = projections[projections.length - 1];
    const revenueComposition = Object.entries(finalYear)
      .filter(([key]) => key !== 'total' && key !== 'year' && key !== 'growthRate')
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
        value: value as number,
        percentage: ((value as number) / finalYear.total) * 100
      }))
      .sort((a, b) => b.value - a.value);

    setResults({
      projections,
      revenueComposition,
      economicAssumptions: economicFactors,
      totalGrowth: ((finalYear.total - projections[0].total) / projections[0].total) * 100,
      averageGrowthRate: projections.slice(1).reduce((sum, p) => sum + p.growthRate, 0) / years
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 1000000000);
  };

  const formatBillions = (amount: number) => {
    return `£${amount.toFixed(1)}B`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <DollarSign className="w-10 h-10 text-green-600" />
          UK Revenue Projector
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Project UK government revenue from various tax sources and economic scenarios with detailed forecasting models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Projection Parameters
            </CardTitle>
            <CardDescription>
              Configure revenue projection scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectionType">Projection Scenario</Label>
              <Select value={projectionType} onValueChange={setProjectionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseline">Baseline Growth</SelectItem>
                  <SelectItem value="optimistic">Optimistic Growth</SelectItem>
                  <SelectItem value="pessimistic">Economic Slowdown</SelectItem>
                  <SelectItem value="custom">Custom Parameters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectionYears">Projection Period</Label>
              <Select value={projectionYears} onValueChange={setProjectionYears}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {projectionType === "custom" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="economicGrowth">GDP Growth Rate (%)</Label>
                  <Input
                    id="economicGrowth"
                    type="number"
                    step="0.1"
                    placeholder="2.0"
                    value={customFactors.economicGrowth}
                    onChange={(e) => setCustomFactors({...customFactors, economicGrowth: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentGrowth">Employment Growth (%)</Label>
                  <Input
                    id="employmentGrowth"
                    type="number"
                    step="0.1"
                    placeholder="0.5"
                    value={customFactors.employmentGrowth}
                    onChange={(e) => setCustomFactors({...customFactors, employmentGrowth: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wageGrowth">Wage Growth (%)</Label>
                  <Input
                    id="wageGrowth"
                    type="number"
                    step="0.1"
                    placeholder="3.5"
                    value={customFactors.wageGrowth}
                    onChange={(e) => setCustomFactors({...customFactors, wageGrowth: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    step="0.1"
                    placeholder="2.0"
                    value={customFactors.inflationRate}
                    onChange={(e) => setCustomFactors({...customFactors, inflationRate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corporateProfits">Corporate Profit Growth (%)</Label>
                  <Input
                    id="corporateProfits"
                    type="number"
                    step="0.1"
                    placeholder="4.0"
                    value={customFactors.corporateProfits}
                    onChange={(e) => setCustomFactors({...customFactors, corporateProfits: e.target.value})}
                  />
                </div>
              </div>
            )}

            <Button onClick={projectRevenue} className="w-full" size="lg">
              Project Revenue
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Current Revenue</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatBillions(results.projections[0].total)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Projected Revenue</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatBillions(results.projections[results.projections.length - 1].total)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Growth</p>
                    <p className="text-lg font-bold text-purple-600">
                      {results.totalGrowth.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg. Growth Rate</p>
                    <p className="text-lg font-bold text-orange-600">
                      {results.averageGrowthRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {results && (
        <Tabs defaultValue="projections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projections">Revenue Projections</TabsTrigger>
            <TabsTrigger value="composition">Revenue Mix</TabsTrigger>
            <TabsTrigger value="sources">By Tax Source</TabsTrigger>
            <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
          </TabsList>

          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [formatBillions(value), 'Total Revenue']} />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Growth Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.projections.slice(1)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Growth Rate']} />
                    <Bar dataKey="growthRate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Composition (Final Year)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={results.revenueComposition.slice(0, 8)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage.toFixed(1)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.revenueComposition.slice(0, 8).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [formatBillions(value), 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.revenueComposition.slice(0, 10).map((source: any, index: number) => (
                      <div key={source.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{source.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${source.percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold">{formatBillions(source.value)}</p>
                          <p className="text-sm text-gray-600">{source.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Major Tax Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [formatBillions(value), 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="incomeTax" stroke="#8884d8" name="Income Tax" />
                    <Line type="monotone" dataKey="nationalInsurance" stroke="#82ca9d" name="National Insurance" />
                    <Line type="monotone" dataKey="vat" stroke="#ffc658" name="VAT" />
                    <Line type="monotone" dataKey="corporationTax" stroke="#ff7300" name="Corporation Tax" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Revenue Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Income Tax</th>
                        <th className="border border-gray-300 p-2">VAT</th>
                        <th className="border border-gray-300 p-2">Corporation Tax</th>
                        <th className="border border-gray-300 p-2">Total Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.map((row: any) => (
                        <tr key={row.year}>
                          <td className="border border-gray-300 p-2 text-center">{row.year}</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.incomeTax)}</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.vat)}</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.corporationTax)}</td>
                          <td className="border border-gray-300 p-2 text-center font-bold">{formatBillions(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>GDP Growth Rate:</span>
                    <span className="font-bold">{results.economicAssumptions.growth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employment Growth:</span>
                    <span className="font-bold">{results.economicAssumptions.employment}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wage Growth:</span>
                    <span className="font-bold">{results.economicAssumptions.wages}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inflation Rate:</span>
                    <span className="font-bold">{results.economicAssumptions.inflation}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corporate Profit Growth:</span>
                    <span className="font-bold">{results.economicAssumptions.profits}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Methodology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Revenue elasticities based on historical relationships</p>
                  <p>• Income taxes respond strongly to wage and employment growth</p>
                  <p>• Corporation tax sensitive to economic growth and profits</p>
                  <p>• VAT linked to consumer spending and employment</p>
                  <p>• Property taxes show limited sensitivity to economic cycles</p>
                  <p>• Compound growth applied over projection period</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-red-600">Economic Risks</h4>
                    <ul className="mt-2 space-y-1">
                      <li>• Recession or economic slowdown</li>
                      <li>• Unemployment increases</li>
                      <li>• Lower than expected growth</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-600">Policy Risks</h4>
                    <ul className="mt-2 space-y-1">
                      <li>• Tax rate changes</li>
                      <li>• Threshold adjustments</li>
                      <li>• New tax reliefs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600">External Risks</h4>
                    <ul className="mt-2 space-y-1">
                      <li>• Global economic conditions</li>
                      <li>• Trade disruptions</li>
                      <li>• Currency fluctuations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>UK Revenue Projection Information:</strong> Based on HM Treasury and HMRC historical data | 
          Elasticity estimates from academic research and government analysis | 
          Projections are indicative and subject to economic conditions and policy changes | 
          Actual revenue may vary significantly from projections due to unforeseen events.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKRevenueProjector;
