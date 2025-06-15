import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Calculator, Target, BarChart3, Activity } from "lucide-react";

const UKEconomicGrowthCalculator = () => {
  const [currentGDP, setCurrentGDP] = useState<number>(2800000);
  const [targetGrowthRate, setTargetGrowthRate] = useState<number>(2.5);
  const [projectionYears, setProjectionYears] = useState<number>(10);
  const [inflationRate, setInflationRate] = useState<number>(2.0);

  const generateGrowthProjections = () => {
    const projections = [];
    let nominalGDP = currentGDP;
    let realGDP = currentGDP;
    
    for (let year = 0; year <= projectionYears; year++) {
      projections.push({
        year: new Date().getFullYear() + year,
        nominalGDP: Math.round(nominalGDP),
        realGDP: Math.round(realGDP),
        growthRate: year === 0 ? 0 : targetGrowthRate,
        cumulativeGrowth: year === 0 ? 0 : ((realGDP - currentGDP) / currentGDP * 100)
      });
      
      realGDP *= (1 + targetGrowthRate / 100);
      nominalGDP = realGDP * (1 + inflationRate / 100) ** year;
    }
    
    return projections;
  };

  const projectionData = generateGrowthProjections();
  const finalGDP = projectionData[projectionData.length - 1];
  const totalGrowth = ((finalGDP.realGDP - currentGDP) / currentGDP) * 100;

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
              {`${entry.dataKey}: ${
                entry.dataKey.includes('Growth') || entry.dataKey.includes('Rate')
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Economic Growth Calculator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Project economic growth scenarios and analyze the long-term impact of various growth rates on GDP.
        </p>
      </div>

      {/* Growth Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Growth Projection Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentGDP)}</p>
              <p className="text-gray-600">Current GDP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(finalGDP.realGDP)}</p>
              <p className="text-gray-600">Projected GDP ({projectionYears} years)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{targetGrowthRate.toFixed(1)}%</p>
              <p className="text-gray-600">Annual Growth Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{totalGrowth.toFixed(1)}%</p>
              <p className="text-gray-600">Total Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculate">Growth Parameters</TabsTrigger>
          <TabsTrigger value="projections">Growth Projections</TabsTrigger>
          <TabsTrigger value="analysis">Economic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="calculate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Growth Parameters
              </CardTitle>
              <CardDescription>
                Set the parameters for economic growth projections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentGDP">Current GDP (£ millions)</Label>
                <Input
                  id="currentGDP"
                  type="number"
                  value={currentGDP}
                  onChange={(e) => setCurrentGDP(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="targetGrowthRate">Target Growth Rate (%)</Label>
                <Input
                  id="targetGrowthRate"
                  type="number"
                  value={targetGrowthRate}
                  onChange={(e) => setTargetGrowthRate(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

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
                <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Growth Projections</CardTitle>
              <CardDescription>
                Nominal and real GDP projections over {projectionYears} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="realGDP" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Real GDP" />
                  <Area type="monotone" dataKey="nominalGDP" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Nominal GDP" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Rate Over Time</CardTitle>
              <CardDescription>
                Annual growth rate and cumulative growth over the projection period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="growthRate" stroke="#F59E0B" name="Annual Growth Rate" />
                  <Line type="monotone" dataKey="cumulativeGrowth" stroke="#EC4899" name="Cumulative Growth" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Economic Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold">GDP at the end of projection:</h4>
                  <p className="text-xl text-blue-600">{formatCurrency(finalGDP.realGDP)}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold">Total GDP Growth:</h4>
                  <p className="text-xl text-green-600">{totalGrowth.toFixed(1)}%</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold">Average Annual Growth Rate:</h4>
                  <p className="text-xl text-purple-600">{targetGrowthRate.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UKEconomicGrowthCalculator;
