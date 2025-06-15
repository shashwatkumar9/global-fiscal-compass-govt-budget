
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from "recharts";
import { Calculator, TrendingUp, Target, BarChart3, Download, Activity } from "lucide-react";

const UKEconomicGrowthCalculator = () => {
  const [baseGDP, setBaseGDP] = useState("2800");
  const [targetGrowthRate, setTargetGrowthRate] = useState("2.5");
  const [timeHorizon, setTimeHorizon] = useState("5");
  const [inflationRate, setInflationRate] = useState("2.0");
  const [productivityGrowth, setProductivityGrowth] = useState("1.5");
  const [populationGrowth, setPopulationGrowth] = useState("0.5");

  const growthDrivers = [
    { factor: "Productivity", weight: 0.4, impact: 2.1 },
    { factor: "Investment", weight: 0.25, impact: 1.8 },
    { factor: "Innovation", weight: 0.2, impact: 2.3 },
    { factor: "Education", weight: 0.1, impact: 1.5 },
    { factor: "Infrastructure", weight: 0.05, impact: 1.7 }
  ];

  const sectorContributions = [
    { sector: "Services", current: 71, projected: 73, growth: 2.8 },
    { sector: "Manufacturing", current: 10, projected: 9, growth: 1.2 },
    { sector: "Construction", current: 6, projected: 6, growth: 2.1 },
    { sector: "Agriculture", current: 1, projected: 1, growth: 0.8 },
    { sector: "Energy", current: 4, projected: 3, growth: -1.2 },
    { sector: "Other", current: 8, projected: 8, growth: 2.0 }
  ];

  const calculateProjectedGDP = () => {
    const base = parseFloat(baseGDP || "0");
    const rate = parseFloat(targetGrowthRate || "0") / 100;
    const years = parseInt(timeHorizon || "0");
    return base * Math.pow(1 + rate, years);
  };

  const calculateRealGrowth = () => {
    const nominal = parseFloat(targetGrowthRate || "0");
    const inflation = parseFloat(inflationRate || "0");
    return nominal - inflation;
  };

  const generateGrowthProjections = () => {
    const base = parseFloat(baseGDP || "0");
    const rate = parseFloat(targetGrowthRate || "0") / 100;
    const years = parseInt(timeHorizon || "0");
    
    return Array.from({ length: years + 1 }, (_, i) => ({
      year: `Year ${i}`,
      nominal: base * Math.pow(1 + rate, i),
      real: base * Math.pow(1 + (rate - parseFloat(inflationRate || "0") / 100), i),
      perCapita: (base * Math.pow(1 + rate, i)) / (67 * Math.pow(1 + parseFloat(populationGrowth || "0") / 100, i))
    }));
  };

  const productivityScenarios = [
    { scenario: "Conservative", productivity: 1.0, gdpGrowth: 1.8 },
    { scenario: "Baseline", productivity: 1.5, gdpGrowth: 2.5 },
    { scenario: "Optimistic", productivity: 2.0, gdpGrowth: 3.2 },
    { scenario: "Transformative", productivity: 2.5, gdpGrowth: 4.0 }
  ];

  const projectionData = generateGrowthProjections();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Activity className="w-10 h-10 text-blue-600" />
          UK Economic Growth Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Calculate UK economic growth projections, analyze productivity trends, and model GDP scenarios with comprehensive economic indicators.
        </p>
      </div>

      {/* Input Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Growth Modeling Parameters
          </CardTitle>
          <CardDescription>Configure economic variables for growth projections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="baseGDP">Base GDP (£ billions)</Label>
                <Input
                  id="baseGDP"
                  type="number"
                  placeholder="2800"
                  value={baseGDP}
                  onChange={(e) => setBaseGDP(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="targetGrowthRate">Target Growth Rate (%)</Label>
                <Input
                  id="targetGrowthRate"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={targetGrowthRate}
                  onChange={(e) => setTargetGrowthRate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  placeholder="2.0"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="productivityGrowth">Productivity Growth (%)</Label>
                <Input
                  id="productivityGrowth"
                  type="number"
                  step="0.1"
                  placeholder="1.5"
                  value={productivityGrowth}
                  onChange={(e) => setProductivityGrowth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="populationGrowth">Population Growth (%)</Label>
                <Input
                  id="populationGrowth"
                  type="number"
                  step="0.1"
                  placeholder="0.5"
                  value={populationGrowth}
                  onChange={(e) => setPopulationGrowth(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projected GDP</p>
                <p className="text-2xl font-bold text-blue-600">£{calculateProjectedGDP().toFixed(0)}B</p>
                <p className="text-sm text-gray-600">In {timeHorizon} years</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Real Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">{calculateRealGrowth().toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Inflation adjusted</p>
              </div>
              <Calculator className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GDP per Capita</p>
                <p className="text-2xl font-bold text-purple-600">£{(calculateProjectedGDP() / 67).toFixed(0)}K</p>
                <p className="text-sm text-gray-600">Per person</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cumulative Growth</p>
                <p className="text-2xl font-bold text-orange-600">
                  {((calculateProjectedGDP() / parseFloat(baseGDP || "1") - 1) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Total increase</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Projections Chart */}
      <Card>
        <CardHeader>
          <CardTitle>GDP Growth Projections</CardTitle>
          <CardDescription>Nominal vs Real GDP growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`£${value.toFixed(0)}B`, '']} />
              <Area type="monotone" dataKey="nominal" fill="#8884d8" stroke="#8884d8" name="Nominal GDP" fillOpacity={0.6} />
              <Line type="monotone" dataKey="real" stroke="#82ca9d" name="Real GDP" strokeWidth={3} />
              <Line type="monotone" dataKey="perCapita" stroke="#ffc658" name="GDP per Capita (K)" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth Drivers and Sector Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Drivers Analysis</CardTitle>
            <CardDescription>Factors contributing to economic growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthDrivers.map((driver) => (
                <div key={driver.factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{driver.factor}</p>
                    <p className="text-xs text-gray-600">Weight: {(driver.weight * 100).toFixed(0)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{driver.impact.toFixed(1)}%</p>
                    <p className="text-xs text-gray-600">Impact</p>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 ml-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(driver.impact / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sectoral Contributions</CardTitle>
            <CardDescription>Economic growth by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorContributions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Bar dataKey="current" fill="#8884d8" name="Current" />
                <Bar dataKey="projected" fill="#82ca9d" name="Projected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Productivity Scenarios</CardTitle>
          <CardDescription>Growth outcomes under different productivity assumptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {productivityScenarios.map((scenario) => (
              <div key={scenario.scenario} className="p-4 border rounded-lg text-center">
                <h4 className="font-semibold mb-2">{scenario.scenario}</h4>
                <p className="text-sm text-gray-600 mb-2">Productivity: {scenario.productivity}%</p>
                <p className="text-2xl font-bold text-blue-600">{scenario.gdpGrowth}%</p>
                <p className="text-sm text-gray-600">GDP Growth</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Recommendations</CardTitle>
          <CardDescription>Strategic actions to achieve growth targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Short-term Actions (1-2 years)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Increase infrastructure investment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Enhance skills and training programs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Support business innovation initiatives
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Improve regulatory efficiency
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Long-term Strategies (3+ years)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Digital transformation acceleration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Green economy transition
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Research and development expansion
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  International trade enhancement
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Projections
        </Button>
        <Button variant="outline">
          Generate Report
        </Button>
        <Button variant="outline">
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

export default UKEconomicGrowthCalculator;
