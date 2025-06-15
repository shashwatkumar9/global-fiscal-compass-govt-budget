import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart } from "recharts";
import { TrendingDown, TrendingUp, AlertTriangle, Calculator, Target, DollarSign } from "lucide-react";

const UKDeficitCalculator = () => {
  const [revenue, setRevenue] = useState<number>(800000);
  const [expenditure, setExpenditure] = useState<number>(850000);
  const [targetDeficit, setTargetDeficit] = useState<number>(50000);
  const [projectionYears, setProjectionYears] = useState<number>(5);
  const [growthRate, setGrowthRate] = useState<number>(2.5);

  const deficit = expenditure - revenue;
  const deficitGDPRatio = (deficit / 2800000) * 100; // Assuming GDP of £2.8 trillion
  const isDeficit = deficit > 0;

  // Generate projection data
  const generateProjections = () => {
    const projections = [];
    let currentRevenue = revenue;
    let currentExpenditure = expenditure;
    
    for (let year = 0; year <= projectionYears; year++) {
      const yearDeficit = currentExpenditure - currentRevenue;
      projections.push({
        year: new Date().getFullYear() + year,
        revenue: Math.round(currentRevenue),
        expenditure: Math.round(currentExpenditure),
        deficit: Math.round(yearDeficit),
        deficitGDPRatio: ((yearDeficit / 2800000) * 100).toFixed(2)
      });
      
      currentRevenue *= (1 + growthRate / 100);
      currentExpenditure *= (1 + (growthRate - 0.5) / 100); // Assuming expenditure grows slightly slower
    }
    
    return projections;
  };

  const projectionData = generateProjections();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">Year: {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${String(entry.dataKey).charAt(0).toUpperCase() + String(entry.dataKey).slice(1)}: ${
                entry.dataKey === 'deficitGDPRatio' 
                  ? `${typeof entry.value === 'number' ? entry.value.toFixed(2) : '0.00'}%`
                  : formatCurrency(typeof entry.value === 'number' ? entry.value : 0)
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Deficit Calculator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate and analyze government budget deficits with comprehensive projections and economic impact assessments.
        </p>
      </div>

      {/* Current Deficit Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Current Fiscal Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(revenue)}</p>
              <p className="text-gray-600">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(expenditure)}</p>
              <p className="text-gray-600">Total Expenditure</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {isDeficit ? (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                )}
                <p className={`text-2xl font-bold ${isDeficit ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(Math.abs(deficit))}
                </p>
              </div>
              <p className="text-gray-600">{isDeficit ? 'Budget Deficit' : 'Budget Surplus'}</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${deficitGDPRatio > 3 ? 'text-red-600' : 'text-blue-600'}`}>
                {deficitGDPRatio.toFixed(2)}%
              </p>
              <p className="text-gray-600">% of GDP</p>
            </div>
          </div>

          {deficitGDPRatio > 3 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">
                Warning: Deficit exceeds 3% of GDP (EU fiscal rule threshold)
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="calculate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculate">Calculate Deficit</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="calculate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deficit Calculation</CardTitle>
              <CardDescription>
                Adjust revenue and expenditure to calculate the budget deficit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="revenue">Total Revenue (£ millions)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expenditure">Total Expenditure (£ millions)</Label>
                  <Input
                    id="expenditure"
                    type="number"
                    value={expenditure}
                    onChange={(e) => setExpenditure(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {isDeficit ? (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    )}
                    <span className="text-gray-600">Current Deficit/Surplus:</span>
                  </div>
                  <p className={`text-xl font-bold ${isDeficit ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(Math.abs(deficit))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deficit Projections</CardTitle>
              <CardDescription>
                Multi-year deficit and surplus projections based on growth assumptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Revenue" />
                  <Bar yAxisId="left" dataKey="expenditure" fill="#EF4444" name="Expenditure" />
                  <Line yAxisId="left" type="monotone" dataKey="deficit" stroke="#8B5CF6" strokeWidth={3} name="Deficit/Surplus" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projection Parameters</CardTitle>
              <CardDescription>
                Adjust economic parameters for long-term deficit projections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="projectionYears">Projection Years</Label>
                <Input
                  id="projectionYears"
                  type="number"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="growthRate">Annual Growth Rate (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Deficit Reduction Strategies
              </CardTitle>
              <CardDescription>
                Explore strategies to reduce the budget deficit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="targetDeficit">Target Deficit (£ millions)</Label>
                <Input
                  id="targetDeficit"
                  type="number"
                  value={targetDeficit}
                  onChange={(e) => setTargetDeficit(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold">Revenue Increase</h4>
                  <p className="text-sm text-gray-600">
                    Increasing taxes or finding new revenue streams can help reduce the deficit.
                  </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold">Expenditure Cuts</h4>
                  <p className="text-sm text-gray-600">
                    Reducing government spending across various sectors can lower the deficit.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold">Economic Growth</h4>
                  <p className="text-sm text-gray-600">
                    Stimulating economic growth can increase tax revenues and reduce the deficit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UKDeficitCalculator;
