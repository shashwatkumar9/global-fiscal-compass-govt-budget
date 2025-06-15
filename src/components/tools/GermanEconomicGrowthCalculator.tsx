
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart } from "recharts";
import { TrendingUp, Calculator, BarChart3, Target, Download, FileText } from "lucide-react";

const GermanEconomicGrowthCalculator = () => {
  const [growthModel, setGrowthModel] = useState("solow-swan");
  const [baselineGDP, setBaselineGDP] = useState("4259.9"); // 2025 baseline
  const [investmentRate, setInvestmentRate] = useState("21.5"); // % of GDP
  const [savingsRate, setSavingsRate] = useState("28.1"); // % of GDP
  const [populationGrowth, setPopulationGrowth] = useState("-0.2"); // % annually
  const [tfpGrowth, setTfpGrowth] = useState("0.8"); // Total Factor Productivity growth
  const [projectionYears, setProjectionYears] = useState("10");

  // German economic fundamentals
  const economicData = {
    currentGDP: 4259.9, // billion EUR
    laborForce: 45.7, // million
    capitalStock: 15800, // billion EUR
    productivity: 93.2, // index
    unemployment: 5.8, // %
    inflation: 2.1, // %
    interestRate: 3.5, // %
    exportShare: 47.1, // % of GDP
    importShare: 40.2 // % of GDP
  };

  const calculateSolowGrowth = () => {
    const years = parseInt(projectionYears);
    const s = parseFloat(investmentRate) / 100; // savings/investment rate
    const n = parseFloat(populationGrowth) / 100; // population growth
    const g = parseFloat(tfpGrowth) / 100; // TFP growth
    const delta = 0.05; // depreciation rate
    const alpha = 0.35; // capital share
    
    const projections = [];
    let gdp = parseFloat(baselineGDP);
    let capital = economicData.capitalStock;
    let labor = economicData.laborForce;
    
    for (let year = 0; year <= years; year++) {
      const currentYear = 2025 + year;
      
      // Solow-Swan model calculations
      const outputPerWorker = Math.pow(capital / labor, alpha);
      const marginalProductCapital = alpha * outputPerWorker / (capital / labor);
      const investment = s * gdp;
      const depreciation = delta * capital;
      
      // Growth components
      const capitalGrowth = (investment - depreciation) / capital;
      const laborGrowth = n;
      const tfpContribution = g;
      
      // Total GDP growth
      const gdpGrowth = alpha * capitalGrowth + (1 - alpha) * laborGrowth + tfpContribution;
      
      projections.push({
        year: currentYear,
        gdp: gdp,
        gdpGrowth: gdpGrowth * 100,
        gdpPerCapita: gdp * 1000000000 / (84400000 * Math.pow(1 + n, year)), // per capita
        investment: investment,
        consumption: gdp * (1 - s),
        productivity: economicData.productivity * Math.pow(1 + g, year),
        capitalStock: capital,
        laborForce: labor
      });
      
      // Update for next iteration
      gdp *= (1 + gdpGrowth);
      capital += investment - depreciation;
      labor *= (1 + n);
    }
    
    return projections;
  };

  const calculateEndogenousGrowth = () => {
    const years = parseInt(projectionYears);
    const baseGrowth = parseFloat(tfpGrowth) / 100;
    const investmentEffect = (parseFloat(investmentRate) - 20) / 100 * 0.5; // Investment above 20% boosts growth
    const humanCapitalEffect = 0.3; // Education and skills contribution
    
    const projections = [];
    let gdp = parseFloat(baselineGDP);
    
    for (let year = 0; year <= years; year++) {
      const currentYear = 2025 + year;
      
      // Endogenous growth factors
      const rndEffect = Math.min(year * 0.05, 0.5); // R&D accumulation effect
      const spilloverEffect = Math.log(1 + year) * 0.1; // Knowledge spillovers
      const institutionalEffect = 0.2; // German institutional quality
      
      const totalGrowthRate = baseGrowth + investmentEffect + humanCapitalEffect + rndEffect + spilloverEffect + institutionalEffect;
      
      projections.push({
        year: currentYear,
        gdp: gdp,
        gdpGrowth: totalGrowthRate * 100,
        gdpPerCapita: gdp * 1000000000 / 84400000,
        innovation: rndEffect * 100,
        humanCapital: humanCapitalEffect * 100,
        spillovers: spilloverEffect * 100
      });
      
      gdp *= (1 + totalGrowthRate);
    }
    
    return projections;
  };

  const getProjections = () => {
    switch (growthModel) {
      case "solow-swan":
        return calculateSolowGrowth();
      case "endogenous":
        return calculateEndogenousGrowth();
      default:
        return calculateSolowGrowth();
    }
  };

  const projections = getProjections();

  const scenarioComparison = [
    {
      scenario: "Conservative",
      avgGrowth: 0.8,
      gdp2035: 4680,
      description: "Low investment, aging population, limited innovation"
    },
    {
      scenario: "Baseline",
      avgGrowth: 1.3,
      gdp2035: 5140,
      description: "Current trends continue, moderate reforms"
    },
    {
      scenario: "Optimistic",
      avgGrowth: 2.1,
      gdp2035: 5980,
      description: "High investment in digitalization, green transition, immigration"
    }
  ];

  const growthDrivers = [
    {
      driver: "Capital Investment",
      impact: parseFloat(investmentRate) > 22 ? "High" : parseFloat(investmentRate) > 18 ? "Medium" : "Low",
      description: "Physical and digital infrastructure investment"
    },
    {
      driver: "Innovation & R&D",
      impact: "High",
      description: "Germany's strong R&D sector (3.1% of GDP)"
    },
    {
      driver: "Human Capital",
      impact: "High", 
      description: "Education system and skilled workforce"
    },
    {
      driver: "Demographics",
      impact: "Negative",
      description: "Aging population and workforce decline"
    },
    {
      driver: "Digitalization",
      impact: "Medium",
      description: "Digital transformation of economy"
    },
    {
      driver: "Green Transition",
      impact: "Medium",
      description: "Renewable energy and climate investments"
    }
  ];

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-orange-600";
      case "Negative": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            German Economic Growth Calculator - Advanced Modeling
          </CardTitle>
          <p className="text-gray-600">
            Model Germany's long-term economic growth using Solow-Swan and endogenous growth theories with key economic drivers
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="growth-model">Growth Model</Label>
              <Select value={growthModel} onValueChange={setGrowthModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solow-swan">Solow-Swan Model</SelectItem>
                  <SelectItem value="endogenous">Endogenous Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investment-rate">Investment Rate (% of GDP)</Label>
              <Input
                id="investment-rate"
                type="number"
                value={investmentRate}
                onChange={(e) => setInvestmentRate(e.target.value)}
                step="0.1"
                min="10"
                max="40"
              />
            </div>
            <div>
              <Label htmlFor="tfp-growth">TFP Growth (%)</Label>
              <Input
                id="tfp-growth"
                type="number"
                value={tfpGrowth}
                onChange={(e) => setTfpGrowth(e.target.value)}
                step="0.1"
                min="-2"
                max="5"
              />
            </div>
            <div>
              <Label htmlFor="projection-years">Projection Period</Label>
              <Select value={projectionYears} onValueChange={setProjectionYears}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current GDP</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(parseFloat(baselineGDP))}
                    </p>
                  </div>
                  <Calculator className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Projected GDP ({2025 + parseInt(projectionYears)})</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatBillions(projections[projections.length - 1]?.gdp || 0)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Annual Growth</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(
                        projections.reduce((sum, year) => sum + (year.gdpGrowth || 0), 0) / projections.length
                      )}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Growth</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatPercentage(
                        ((projections[projections.length - 1]?.gdp || 0) / parseFloat(baselineGDP) - 1) * 100
                      )}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projections" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projections">Growth Projections</TabsTrigger>
              <TabsTrigger value="drivers">Growth Drivers</TabsTrigger>
              <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
              <TabsTrigger value="components">Growth Components</TabsTrigger>
            </TabsList>

            <TabsContent value="projections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>GDP Growth Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'gdp' ? formatBillions(value) : formatPercentage(value),
                          name === 'gdp' ? 'GDP' : 'Growth Rate'
                        ]} 
                      />
                      <Area yAxisId="left" type="monotone" dataKey="gdp" fill="#8884d8" fillOpacity={0.3} stroke="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="gdpGrowth" stroke="#ff7300" strokeWidth={3} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>GDP Per Capita Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={projections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`€${(value).toLocaleString()}`, 'GDP per capita']} />
                        <Line type="monotone" dataKey="gdpPerCapita" stroke="#00C49F" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Economic Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Investment Rate:</span>
                      <Badge variant="outline">{investmentRate}% of GDP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TFP Growth:</span>
                      <Badge variant="outline">{tfpGrowth}% annually</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Population Growth:</span>
                      <Badge variant="outline">{populationGrowth}% annually</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Cumulative Growth:</span>
                      <span className="font-semibold text-green-600">
                        {formatPercentage(((projections[projections.length - 1]?.gdp || 0) / parseFloat(baselineGDP) - 1) * 100)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="drivers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Drivers Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {growthDrivers.map((driver, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div>
                            <div className="font-medium">{driver.driver}</div>
                            <div className="text-sm text-gray-600">{driver.description}</div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={getImpactColor(driver.impact)}
                          >
                            {driver.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[
                        { category: "Physical Capital", impact: 25 },
                        { category: "Digital Infrastructure", impact: 30 },
                        { category: "R&D", impact: 35 },
                        { category: "Education", impact: 20 },
                        { category: "Green Technology", impact: 15 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`${value}%`, 'Growth Impact']} />
                        <Bar dataKey="impact" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Short-term (1-3 years)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Increase R&D spending to 3.5% of GDP</li>
                        <li>• Accelerate digital infrastructure</li>
                        <li>• Streamline business regulations</li>
                        <li>• Attract skilled immigration</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Medium-term (3-7 years)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Major education system reform</li>
                        <li>• Green energy transition</li>
                        <li>• Infrastructure modernization</li>
                        <li>• Capital market development</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Long-term (7+ years)</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Demographic transition management</li>
                        <li>• Pension system sustainability</li>
                        <li>• Climate adaptation investments</li>
                        <li>• EU integration deepening</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {scenarioComparison.map((scenario, index) => (
                      <Card key={index} className={index === 1 ? "border-blue-500 border-2" : ""}>
                        <CardHeader>
                          <CardTitle className={`text-lg ${index === 0 ? 'text-red-600' : index === 1 ? 'text-blue-600' : 'text-green-600'}`}>
                            {scenario.scenario}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Avg. Growth:</span>
                            <Badge variant="outline">{scenario.avgGrowth}%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>GDP 2035:</span>
                            <span className="font-semibold">{formatBillions(scenario.gdp2035)}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {scenario.description}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { year: 2025, Conservative: 4260, Baseline: 4260, Optimistic: 4260 },
                      { year: 2027, Conservative: 4328, Baseline: 4371, Optimistic: 4441 },
                      { year: 2030, Conservative: 4433, Baseline: 4560, Optimistic: 4748 },
                      { year: 2035, Conservative: 4680, Baseline: 5140, Optimistic: 5980 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatBillions(value), '']} />
                      <Line type="monotone" dataKey="Conservative" stroke="#ff0000" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="Baseline" stroke="#0088fe" strokeWidth={3} />
                      <Line type="monotone" dataKey="Optimistic" stroke="#00c49f" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="space-y-4">
              {growthModel === "solow-swan" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Solow-Swan Growth Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={projections}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [formatBillions(value), '']} />
                          <Area type="monotone" dataKey="investment" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="consumption" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Capital and Productivity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={projections}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="capitalStock" stroke="#ff7300" strokeWidth={2} name="Capital Stock" />
                          <Line type="monotone" dataKey="productivity" stroke="#00C49F" strokeWidth={2} name="Productivity" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}

              {growthModel === "endogenous" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Endogenous Growth Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={projections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, '']} />
                        <Area type="monotone" dataKey="innovation" stackId="1" stroke="#8884d8" fill="#8884d8" name="Innovation" />
                        <Area type="monotone" dataKey="humanCapital" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Human Capital" />
                        <Area type="monotone" dataKey="spillovers" stackId="1" stroke="#ffc658" fill="#ffc658" name="Knowledge Spillovers" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Projections
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Growth Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanEconomicGrowthCalculator;
