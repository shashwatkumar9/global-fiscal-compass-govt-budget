
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

const FranceEconomicGrowthCalculator = () => {
  const [growthData, setGrowthData] = useState({
    currentGDP: 0,
    growthRate: 2.0,
    projectionYears: 10,
    investment: 0,
    productivity: 1.5
  });

  const [projections, setProjections] = useState(null);

  const calculateGrowth = () => {
    const yearlyProjections = [];
    let currentGDP = growthData.currentGDP;

    for (let year = 0; year <= growthData.projectionYears; year++) {
      const adjustedGrowth = growthData.growthRate + (growthData.productivity / 100) + (growthData.investment / growthData.currentGDP * 100 * 0.1);
      currentGDP *= Math.pow(1 + adjustedGrowth / 100, year > 0 ? 1 : 0);
      
      yearlyProjections.push({
        year: new Date().getFullYear() + year,
        gdp: currentGDP,
        growth: year > 0 ? adjustedGrowth : 0
      });
    }

    setProjections({
      yearlyProjections,
      totalGrowth: ((yearlyProjections[yearlyProjections.length - 1].gdp / growthData.currentGDP - 1) * 100),
      averageGrowth: yearlyProjections.slice(1).reduce((sum, year) => sum + year.growth, 0) / growthData.projectionYears
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            France Economic Growth Calculator
          </CardTitle>
          <CardDescription>
            Project France's economic growth with advanced modeling and scenario analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current GDP (€ trillions)</Label>
              <Input
                type="number"
                step="0.1"
                value={growthData.currentGDP || ""}
                onChange={(e) => setGrowthData({...growthData, currentGDP: Number(e.target.value)})}
                placeholder="Current GDP"
              />
            </div>
            <div className="space-y-2">
              <Label>Annual Growth Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={growthData.growthRate || ""}
                onChange={(e) => setGrowthData({...growthData, growthRate: Number(e.target.value)})}
                placeholder="Growth rate"
              />
            </div>
            <div className="space-y-2">
              <Label>Investment Level (€ billions)</Label>
              <Input
                type="number"
                value={growthData.investment || ""}
                onChange={(e) => setGrowthData({...growthData, investment: Number(e.target.value)})}
                placeholder="Annual investment"
              />
            </div>
            <div className="space-y-2">
              <Label>Productivity Growth (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={growthData.productivity || ""}
                onChange={(e) => setGrowthData({...growthData, productivity: Number(e.target.value)})}
                placeholder="Productivity growth"
              />
            </div>
          </div>

          <Button onClick={calculateGrowth} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Growth
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <Card>
          <CardHeader>
            <CardTitle>Growth Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={projections.yearlyProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gdp" stroke="#8884d8" name="GDP (€T)" />
                <Line type="monotone" dataKey="growth" stroke="#82ca9d" name="Growth Rate (%)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Total Growth: {projections.totalGrowth.toFixed(1)}% | Average: {projections.averageGrowth.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FranceEconomicGrowthCalculator;
