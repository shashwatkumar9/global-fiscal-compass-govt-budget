
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingDown, Calculator, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKPublicDebtCalculator = () => {
  const [scenarioType, setScenarioType] = useState<string>("current");
  const [projectionYears, setProjectionYears] = useState<string>("5");
  const [customParams, setCustomParams] = useState({
    currentDebt: "",
    gdp: "",
    deficitRate: "",
    interestRate: "",
    growthRate: ""
  });
  const [results, setResults] = useState<any>(null);

  // UK Public Debt Historical Data
  const historicalDebt = [
    { year: 2019, debt: 1802, gdp: 2829, ratio: 63.7, interest: 47 },
    { year: 2020, debt: 2206, gdp: 2707, ratio: 81.5, interest: 45 },
    { year: 2021, debt: 2365, gdp: 3131, ratio: 75.6, interest: 43 },
    { year: 2022, debt: 2377, gdp: 3387, ratio: 70.2, interest: 58 },
    { year: 2023, debt: 2537, gdp: 3500, ratio: 72.5, interest: 76 },
    { year: 2024, debt: 2650, gdp: 3600, ratio: 73.6, interest: 85 }
  ];

  const debtComposition = [
    { name: "Gilts (Government Bonds)", value: 2180, percentage: 82.3 },
    { name: "Treasury Bills", value: 265, percentage: 10.0 },
    { name: "NS&I Products", value: 132, percentage: 5.0 },
    { name: "Other Debt", value: 73, percentage: 2.7 }
  ];

  const debtHolders = [
    { name: "Insurance & Pension Funds", value: 45.2 },
    { name: "Banks", value: 18.7 },
    { name: "Overseas Investors", value: 28.1 },
    { name: "Other Financial Institutions", value: 5.3 },
    { name: "Households", value: 2.7 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const calculateDebtProjection = () => {
    const currentDebt = parseFloat(customParams.currentDebt) || 2650; // £2.65 trillion
    const currentGDP = parseFloat(customParams.gdp) || 3600; // £3.6 trillion
    const annualDeficit = parseFloat(customParams.deficitRate) || 2.5; // 2.5% of GDP
    const interestRate = parseFloat(customParams.interestRate) || 3.2; // 3.2% average
    const gdpGrowthRate = parseFloat(customParams.growthRate) || 2.0; // 2% nominal growth
    const years = parseInt(projectionYears);

    let projections = [];
    let debt = currentDebt;
    let gdp = currentGDP;

    for (let i = 0; i <= years; i++) {
      const year = 2024 + i;
      const deficitAmount = gdp * (annualDeficit / 100);
      const interestPayment = debt * (interestRate / 100);
      
      if (i > 0) {
        debt += deficitAmount;
        gdp *= (1 + gdpGrowthRate / 100);
      }
      
      const debtToGDPRatio = (debt / gdp) * 100;
      const interestAsPercentGDP = (interestPayment / gdp) * 100;
      
      projections.push({
        year,
        debt: Math.round(debt),
        gdp: Math.round(gdp),
        ratio: Math.round(debtToGDPRatio * 10) / 10,
        interest: Math.round(interestPayment),
        interestRatio: Math.round(interestAsPercentGDP * 100) / 100
      });
    }

    // Calculate sustainability metrics
    const finalProjection = projections[projections.length - 1];
    const sustainability = {
      isStable: finalProjection.ratio < projections[0].ratio + 10,
      riskLevel: finalProjection.ratio > 100 ? "High" : finalProjection.ratio > 80 ? "Medium" : "Low",
      interestBurden: finalProjection.interestRatio > 4 ? "High" : finalProjection.interestRatio > 2 ? "Medium" : "Low"
    };

    setResults({
      projections,
      sustainability,
      currentMetrics: {
        debt: currentDebt,
        gdp: currentGDP,
        ratio: (currentDebt / currentGDP) * 100,
        interestPayment: currentDebt * (interestRate / 100),
        parameters: {
          deficitRate: annualDeficit,
          interestRate,
          growthRate: gdpGrowthRate
        }
      },
      historicalData: historicalDebt,
      composition: debtComposition,
      holders: debtHolders
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
    return `£${amount}B`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingDown className="w-10 h-10 text-red-600" />
          UK Public Debt Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track UK national debt, debt-to-GDP ratio, sustainability analysis, and government borrowing projections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Debt Analysis Parameters
            </CardTitle>
            <CardDescription>
              Configure debt projection scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="scenarioType">Scenario Type</Label>
              <Select value={scenarioType} onValueChange={setScenarioType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Trajectory</SelectItem>
                  <SelectItem value="optimistic">Optimistic Growth</SelectItem>
                  <SelectItem value="pessimistic">Economic Stress</SelectItem>
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
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scenarioType === "custom" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentDebt">Current Debt (£B)</Label>
                  <Input
                    id="currentDebt"
                    type="number"
                    placeholder="2650"
                    value={customParams.currentDebt}
                    onChange={(e) => setCustomParams({...customParams, currentDebt: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gdp">Current GDP (£B)</Label>
                  <Input
                    id="gdp"
                    type="number"
                    placeholder="3600"
                    value={customParams.gdp}
                    onChange={(e) => setCustomParams({...customParams, gdp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deficitRate">Annual Deficit (% of GDP)</Label>
                  <Input
                    id="deficitRate"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={customParams.deficitRate}
                    onChange={(e) => setCustomParams({...customParams, deficitRate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Average Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    placeholder="3.2"
                    value={customParams.interestRate}
                    onChange={(e) => setCustomParams({...customParams, interestRate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="growthRate">GDP Growth Rate (%)</Label>
                  <Input
                    id="growthRate"
                    type="number"
                    step="0.1"
                    placeholder="2.0"
                    value={customParams.growthRate}
                    onChange={(e) => setCustomParams({...customParams, growthRate: e.target.value})}
                  />
                </div>
              </div>
            )}

            <Button onClick={calculateDebtProjection} className="w-full" size="lg">
              Calculate Debt Projection
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>UK Public Debt Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Current Debt</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatBillions(results.currentMetrics.debt)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Debt-to-GDP</p>
                    <p className="text-lg font-bold text-orange-600">
                      {results.currentMetrics.ratio.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Payment</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatBillions(results.currentMetrics.interestPayment)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <p className={`text-lg font-bold ${
                      results.sustainability.riskLevel === 'High' ? 'text-red-600' :
                      results.sustainability.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {results.sustainability.riskLevel}
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Debt-to-GDP Ratio Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any, name: string) => {
                      if (name === 'ratio') return [`${value}%`, 'Debt-to-GDP Ratio'];
                      if (name === 'interestRatio') return [`${value}%`, 'Interest/GDP'];
                      return [formatBillions(value), name === 'debt' ? 'Total Debt' : 'GDP'];
                    }} />
                    <Legend />
                    <Area type="monotone" dataKey="ratio" stackId="1" stroke="#8884d8" fill="#8884d8" name="Debt-to-GDP Ratio" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projection Data Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Total Debt</th>
                        <th className="border border-gray-300 p-2">GDP</th>
                        <th className="border border-gray-300 p-2">Debt-to-GDP</th>
                        <th className="border border-gray-300 p-2">Interest Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.map((row: any) => (
                        <tr key={row.year}>
                          <td className="border border-gray-300 p-2 text-center">{row.year}</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.debt)}</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.gdp)}</td>
                          <td className="border border-gray-300 p-2 text-center">{row.ratio}%</td>
                          <td className="border border-gray-300 p-2 text-center">{formatBillions(row.interest)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Debt Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={results.historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any, name: string) => {
                      if (name === 'ratio') return [`${value}%`, 'Debt-to-GDP Ratio'];
                      return [formatBillions(value), name === 'debt' ? 'Total Debt' : name === 'interest' ? 'Interest Payment' : 'GDP'];
                    }} />
                    <Legend />
                    <Line type="monotone" dataKey="debt" stroke="#8884d8" name="Total Debt" />
                    <Line type="monotone" dataKey="ratio" stroke="#82ca9d" name="Debt-to-GDP Ratio" />
                    <Line type="monotone" dataKey="interest" stroke="#ffc658" name="Interest Payment" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Debt Composition by Instrument</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.composition}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.composition.map((entry: any, index: number) => (
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
                  <CardTitle>Debt Holders Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.holders.map((holder: any, index: number) => (
                      <div key={holder.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{holder.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${holder.value}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold">{holder.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Debt Trajectory:</span>
                    <span className={`font-bold ${results.sustainability.isStable ? 'text-green-600' : 'text-red-600'}`}>
                      {results.sustainability.isStable ? 'Stable' : 'Unsustainable'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Overall Risk Level:</span>
                    <span className={`font-bold ${
                      results.sustainability.riskLevel === 'High' ? 'text-red-600' :
                      results.sustainability.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {results.sustainability.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Interest Burden:</span>
                    <span className={`font-bold ${
                      results.sustainability.interestBurden === 'High' ? 'text-red-600' :
                      results.sustainability.interestBurden === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {results.sustainability.interestBurden}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Current Debt-to-GDP:</span>
                    <span className="font-bold">{results.currentMetrics.ratio.toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Parameters Used</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Deficit Rate:</span>
                    <span className="font-bold">{results.currentMetrics.parameters.deficitRate}% of GDP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-bold">{results.currentMetrics.parameters.interestRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GDP Growth Rate:</span>
                    <span className="font-bold">{results.currentMetrics.parameters.growthRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projection Period:</span>
                    <span className="font-bold">{projectionYears} years</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Rising interest rates increase debt service costs</p>
                  <p>• Economic slowdown reduces tax revenue</p>
                  <p>• High overseas ownership creates currency risk</p>
                  <p>• Aging population increases spending pressures</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="w-5 h-5 text-blue-600" />
                    Mitigating Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Reserve currency status (Sterling)</p>
                  <p>• Developed financial markets</p>
                  <p>• Strong institutional framework</p>
                  <p>• Diversified economy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    Policy Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Fiscal consolidation measures</p>
                  <p>• Economic growth initiatives</p>
                  <p>• Debt restructuring options</p>
                  <p>• Asset sales and privatization</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>UK Public Debt Information:</strong> Data based on ONS Public Sector Finances bulletins | 
          Debt figures include central government debt, excluding Bank of England | 
          Projections are illustrative and depend on economic conditions | 
          Sustainability analysis based on international best practices and debt thresholds.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKPublicDebtCalculator;
