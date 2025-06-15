
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from "recharts";
import { Calculator, TrendingDown, TrendingUp, AlertTriangle, Download, Target } from "lucide-react";

const UKDeficitCalculator = () => {
  const [revenue, setRevenue] = useState("800000");
  const [expenditure, setExpenditure] = useState("850000");
  const [projectionYears, setProjectionYears] = useState("5");
  const [economicScenario, setEconomicScenario] = useState("baseline");
  const [fiscalPolicy, setFiscalPolicy] = useState("neutral");

  const revenueBreakdown = [
    { source: "Income Tax", amount: 200000, percentage: 25 },
    { source: "VAT", amount: 160000, percentage: 20 },
    { source: "Corporation Tax", amount: 80000, percentage: 10 },
    { source: "National Insurance", amount: 160000, percentage: 20 },
    { source: "Fuel Duty", amount: 32000, percentage: 4 },
    { source: "Council Tax", amount: 40000, percentage: 5 },
    { source: "Other", amount: 128000, percentage: 16 }
  ];

  const expenditureBreakdown = [
    { category: "Health", amount: 180000, percentage: 21.2 },
    { category: "Pensions", amount: 220000, percentage: 25.9 },
    { category: "Education", amount: 60000, percentage: 7.1 },
    { category: "Defence", amount: 45000, percentage: 5.3 },
    { category: "Interest Payments", amount: 55000, percentage: 6.5 },
    { category: "Transport", amount: 25000, percentage: 2.9 },
    { category: "Other", amount: 265000, percentage: 31.1 }
  ];

  const historicalData = [
    { year: "2019", deficit: -25000, debtToGDP: 85.2, gdp: 2200000 },
    { year: "2020", deficit: -320000, debtToGDP: 103.7, gdp: 2100000 },
    { year: "2021", deficit: -150000, debtToGDP: 95.1, gdp: 2300000 },
    { year: "2022", deficit: -120000, debtToGDP: 96.6, gdp: 2400000 },
    { year: "2023", deficit: -100000, debtToGDP: 98.2, gdp: 2500000 },
    { year: "2024", deficit: -50000, debtToGDP: 95.8, gdp: 2600000 }
  ];

  const calculateDeficit = () => {
    return parseFloat(expenditure || "0") - parseFloat(revenue || "0");
  };

  const calculateDeficitAsGDPPercentage = () => {
    const gdp = 2600000; // £2.6 trillion estimate
    const deficit = calculateDeficit();
    return (deficit / gdp) * 100;
  };

  const generateProjections = () => {
    const years = parseInt(projectionYears || "5");
    const baseDeficit = calculateDeficit();
    const baseRevenue = parseFloat(revenue || "0");
    const baseExpenditure = parseFloat(expenditure || "0");
    
    const scenarios = {
      "optimistic": { revenueGrowth: 0.04, expenditureGrowth: 0.02 },
      "baseline": { revenueGrowth: 0.025, expenditureGrowth: 0.025 },
      "pessimistic": { revenueGrowth: 0.01, expenditureGrowth: 0.035 }
    };
    
    const scenario = scenarios[economicScenario as keyof typeof scenarios];
    
    return Array.from({ length: years + 1 }, (_, i) => {
      const projectedRevenue = baseRevenue * Math.pow(1 + scenario.revenueGrowth, i);
      const projectedExpenditure = baseExpenditure * Math.pow(1 + scenario.expenditureGrowth, i);
      const deficit = projectedExpenditure - projectedRevenue;
      
      return {
        year: `Year ${i}`,
        revenue: projectedRevenue,
        expenditure: projectedExpenditure,
        deficit: deficit,
        deficitGDP: (deficit / (2600000 * Math.pow(1.025, i))) * 100
      };
    });
  };

  const projectionData = generateProjections();

  const debtSustainabilityIndicators = [
    { indicator: "Debt-to-GDP Ratio", current: 95.8, target: 90.0, status: "moderate" },
    { indicator: "Interest-to-Revenue", current: 6.9, target: 8.0, status: "good" },
    { indicator: "Primary Balance", current: -1.2, target: 0.5, status: "poor" },
    { indicator: "Debt Maturity", current: 14.2, target: 12.0, status: "good" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-100";
      case "moderate": return "text-yellow-600 bg-yellow-100";
      case "poor": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Government Deficit Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Calculate UK government deficit, analyze fiscal balance projections, and assess debt sustainability with comprehensive financial modeling.
        </p>
      </div>

      {/* Input Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Fiscal Parameters
          </CardTitle>
          <CardDescription>Enter government revenue and expenditure for deficit analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="revenue">Total Revenue (£ millions)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="800000"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expenditure">Total Expenditure (£ millions)</Label>
                <Input
                  id="expenditure"
                  type="number"
                  placeholder="850000"
                  value={expenditure}
                  onChange={(e) => setExpenditure(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="projectionYears">Projection Period (years)</Label>
                <Select value={projectionYears} onValueChange={setProjectionYears}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="economicScenario">Economic Scenario</Label>
                <Select value={economicScenario} onValueChange={setEconomicScenario}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optimistic">Optimistic Growth</SelectItem>
                    <SelectItem value="baseline">Baseline Scenario</SelectItem>
                    <SelectItem value="pessimistic">Conservative Outlook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fiscalPolicy">Fiscal Policy Stance</Label>
                <Select value={fiscalPolicy} onValueChange={setFiscalPolicy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expansionary">Expansionary</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="contractionary">Contractionary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Current Deficit</h4>
                <p className="text-2xl font-bold text-blue-700">
                  £{Math.abs(calculateDeficit()).toLocaleString()}M
                </p>
                <p className="text-sm text-blue-600">
                  {calculateDeficitAsGDPPercentage().toFixed(1)}% of GDP
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fiscal Balance</p>
                <p className={`text-2xl font-bold ${calculateDeficit() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {calculateDeficit() > 0 ? 'Deficit' : 'Surplus'}
                </p>
                <p className="text-sm text-gray-600">
                  £{Math.abs(calculateDeficit()).toLocaleString()}M
                </p>
              </div>
              {calculateDeficit() > 0 ? 
                <TrendingDown className="w-8 h-8 text-red-600" /> : 
                <TrendingUp className="w-8 h-8 text-green-600" />
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deficit/GDP Ratio</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.abs(calculateDeficitAsGDPPercentage()).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">of GDP</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interest Burden</p>
                <p className="text-2xl font-bold text-purple-600">£55,000M</p>
                <p className="text-sm text-gray-600">6.9% of revenue</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Debt Sustainability</p>
                <p className="text-2xl font-bold text-orange-600">Moderate</p>
                <p className="text-sm text-gray-600">Risk level</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projections Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Deficit Projections</CardTitle>
          <CardDescription>Fiscal balance outlook over {projectionYears} years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => [
                name === 'deficitGDP' ? `${value.toFixed(1)}%` : `£${value.toLocaleString()}M`,
                name === 'deficitGDP' ? 'Deficit/GDP' : name.charAt(0).toUpperCase() + name.slice(1)
              ]} />
              <Area yAxisId="left" type="monotone" dataKey="deficit" fill="#ff7300" stroke="#ff7300" name="deficit" fillOpacity={0.6} />
              <Line yAxisId="right" type="monotone" dataKey="deficitGDP" stroke="#8884d8" strokeWidth={3} name="deficitGDP" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue and Expenditure Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Government income sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`£${value.toLocaleString()}M`, 'Amount']} />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenditure Breakdown</CardTitle>
            <CardDescription>Government spending categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenditureBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`£${value.toLocaleString()}M`, 'Amount']} />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Historical Context */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Deficit Trends</CardTitle>
          <CardDescription>UK fiscal balance over recent years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => [
                name === 'debtToGDP' ? `${value}%` : `£${value.toLocaleString()}M`,
                name === 'debtToGDP' ? 'Debt-to-GDP' : name === 'deficit' ? 'Deficit' : 'GDP'
              ]} />
              <Line yAxisId="left" type="monotone" dataKey="deficit" stroke="#ff7300" strokeWidth={3} name="deficit" />
              <Line yAxisId="right" type="monotone" dataKey="debtToGDP" stroke="#8884d8" strokeWidth={2} name="debtToGDP" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sustainability Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Debt Sustainability Indicators</CardTitle>
          <CardDescription>Key metrics for fiscal health assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debtSustainabilityIndicators.map((indicator) => (
              <div key={indicator.indicator} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{indicator.indicator}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(indicator.status)}`}>
                    {indicator.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{indicator.current}%</p>
                    <p className="text-sm text-gray-600">Current</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-600">{indicator.target}%</p>
                    <p className="text-sm text-gray-600">Target</p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      indicator.status === 'good' ? 'bg-green-500' :
                      indicator.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((indicator.current / indicator.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Analysis
        </Button>
        <Button variant="outline">
          Generate Report
        </Button>
        <Button variant="outline">
          Share Projections
        </Button>
      </div>
    </div>
  );
};

export default UKDeficitCalculator;
