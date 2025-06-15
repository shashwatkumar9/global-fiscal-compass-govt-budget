
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calculator, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKGDPCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>("nominal");
  const [year, setYear] = useState<string>("2024");
  const [customValues, setCustomValues] = useState({
    consumption: "",
    investment: "",
    government: "",
    exports: "",
    imports: ""
  });
  const [results, setResults] = useState<any>(null);

  // UK GDP historical data (simplified)
  const historicalGDP = [
    { year: 2019, nominal: 2829, real: 2829, growth: 1.4 },
    { year: 2020, nominal: 2707, real: 2561, growth: -9.8 },
    { year: 2021, nominal: 3131, real: 2703, growth: 7.6 },
    { year: 2022, nominal: 3387, real: 2717, growth: 4.1 },
    { year: 2023, nominal: 3500, real: 2750, growth: 0.5 },
    { year: 2024, nominal: 3600, real: 2800, growth: 1.8 }
  ];

  const gdpComponents = {
    consumption: 1980, // £1.98 trillion (55%)
    investment: 648, // £648 billion (18%)
    government: 792, // £792 billion (22%)
    exports: 1080, // £1.08 trillion (30%)
    imports: 1080, // £1.08 trillion (30%)
    netExports: 0 // Exports - Imports
  };

  const sectorContribution = [
    { name: "Services", value: 79.2, amount: 2851 },
    { name: "Manufacturing", value: 9.7, amount: 349 },
    { name: "Construction", value: 6.1, amount: 220 },
    { name: "Agriculture", value: 0.6, amount: 22 },
    { name: "Mining & Utilities", value: 4.4, amount: 158 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const calculateGDP = () => {
    const consumption = parseFloat(customValues.consumption) || gdpComponents.consumption;
    const investment = parseFloat(customValues.investment) || gdpComponents.investment;
    const government = parseFloat(customValues.government) || gdpComponents.government;
    const exports = parseFloat(customValues.exports) || gdpComponents.exports;
    const imports = parseFloat(customValues.imports) || gdpComponents.imports;
    
    const netExports = exports - imports;
    const totalGDP = consumption + investment + government + netExports;
    
    // Calculate growth rate
    const previousYear = historicalGDP.find(d => d.year === parseInt(year) - 1);
    const growthRate = previousYear ? ((totalGDP - previousYear.nominal) / previousYear.nominal) * 100 : 0;
    
    // Per capita calculations
    const population = 67500000; // UK population ~67.5 million
    const gdpPerCapita = totalGDP * 1000000000 / population; // Convert billions to actual value
    
    setResults({
      totalGDP,
      consumption,
      investment,
      government,
      exports,
      imports,
      netExports,
      growthRate,
      gdpPerCapita,
      components: [
        { name: "Consumption", value: consumption, percentage: (consumption / totalGDP) * 100 },
        { name: "Investment", value: investment, percentage: (investment / totalGDP) * 100 },
        { name: "Government", value: government, percentage: (government / totalGDP) * 100 },
        { name: "Net Exports", value: netExports, percentage: (netExports / totalGDP) * 100 }
      ],
      comparisonData: historicalGDP
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
    return `£${amount.toFixed(0)}B`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-blue-600" />
          UK GDP Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK GDP components, growth rates, and economic indicators with comprehensive analysis tools.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              GDP Parameters
            </CardTitle>
            <CardDescription>
              Configure GDP calculation parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nominal">Nominal GDP</SelectItem>
                  <SelectItem value="real">Real GDP</SelectItem>
                  <SelectItem value="custom">Custom Components</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calculationType === "custom" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="consumption">Private Consumption (£B)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    placeholder="1980"
                    value={customValues.consumption}
                    onChange={(e) => setCustomValues({...customValues, consumption: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment">Investment (£B)</Label>
                  <Input
                    id="investment"
                    type="number"
                    placeholder="648"
                    value={customValues.investment}
                    onChange={(e) => setCustomValues({...customValues, investment: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="government">Government Spending (£B)</Label>
                  <Input
                    id="government"
                    type="number"
                    placeholder="792"
                    value={customValues.government}
                    onChange={(e) => setCustomValues({...customValues, government: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exports">Exports (£B)</Label>
                  <Input
                    id="exports"
                    type="number"
                    placeholder="1080"
                    value={customValues.exports}
                    onChange={(e) => setCustomValues({...customValues, exports: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imports">Imports (£B)</Label>
                  <Input
                    id="imports"
                    type="number"
                    placeholder="1080"
                    value={customValues.imports}
                    onChange={(e) => setCustomValues({...customValues, imports: e.target.value})}
                  />
                </div>
              </div>
            )}

            <Button onClick={calculateGDP} className="w-full" size="lg">
              Calculate UK GDP
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>UK GDP Analysis {year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total GDP</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatBillions(results.totalGDP)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-lg font-bold text-green-600">
                      {results.growthRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">GDP per Capita</p>
                    <p className="text-lg font-bold text-purple-600">
                      £{(results.gdpPerCapita).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Net Exports</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatBillions(results.netExports)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {results && (
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">GDP Components</TabsTrigger>
            <TabsTrigger value="historical">Historical Trends</TabsTrigger>
            <TabsTrigger value="sectors">By Sector</TabsTrigger>
            <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>GDP Components Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.components}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.components.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [formatBillions(value), 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Component Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.components.map((component: any, index: number) => (
                      <div key={component.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{component.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${Math.abs(component.percentage)}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold">{formatBillions(component.value)}</p>
                          <p className="text-sm text-gray-600">{component.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>UK GDP Historical Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={historicalGDP}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any, name: string) => {
                      if (name === 'growth') return [`${value}%`, 'Growth Rate'];
                      return [`£${value}B`, name === 'nominal' ? 'Nominal GDP' : 'Real GDP'];
                    }} />
                    <Legend />
                    <Line type="monotone" dataKey="nominal" stroke="#8884d8" name="Nominal GDP" />
                    <Line type="monotone" dataKey="real" stroke="#82ca9d" name="Real GDP" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GDP by Economic Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorContribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`£${value}B`, 'Contribution']} />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-3">
                    {sectorContribution.map((sector, index) => (
                      <div key={sector.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{sector.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${sector.value}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold">£{sector.amount}B</p>
                          <p className="text-sm text-gray-600">{sector.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>GDP Growth Rate:</span>
                    <span className="font-bold">{results.growthRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GDP per Capita:</span>
                    <span className="font-bold">£{results.gdpPerCapita.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trade Balance:</span>
                    <span className="font-bold">{formatBillions(results.netExports)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consumption Share:</span>
                    <span className="font-bold">{((results.consumption / results.totalGDP) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Share:</span>
                    <span className="font-bold">{((results.investment / results.totalGDP) * 100).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Economic Health Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${results.growthRate > 2 ? 'bg-green-500' : results.growthRate > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span>GDP Growth: {results.growthRate > 2 ? 'Strong' : results.growthRate > 0 ? 'Moderate' : 'Weak'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${Math.abs(results.netExports) < 50 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span>Trade Balance: {Math.abs(results.netExports) < 50 ? 'Balanced' : 'Imbalanced'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${(results.consumption / results.totalGDP) < 0.7 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span>Consumption Dependency: {(results.consumption / results.totalGDP) < 0.7 ? 'Healthy' : 'High'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>UK GDP Information:</strong> GDP calculated using expenditure approach (C + I + G + (X-M)) | 
          Data based on ONS statistics | Real GDP adjusted for inflation | 
          This calculator provides estimates for analysis purposes. Actual GDP figures published by ONS may vary.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKGDPCalculator;
