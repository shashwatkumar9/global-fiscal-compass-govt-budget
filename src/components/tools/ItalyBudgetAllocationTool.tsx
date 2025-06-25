
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const ItalyBudgetAllocationTool = () => {
  const [allocation, setAllocation] = useState({
    totalBudget: 900,
    healthcare: 18,
    education: 8,
    defense: 3,
    infrastructure: 5,
    socialSecurity: 40,
    debt: 10,
    other: 16
  });

  const [optimized, setOptimized] = useState<any>(null);

  const handleSliderChange = (category: string, value: number[]) => {
    const newValue = value[0];
    const oldValue = allocation[category as keyof typeof allocation] as number;
    const difference = newValue - oldValue;
    
    // Adjust "other" to maintain 100%
    const newOther = Math.max(0, (allocation.other as number) - difference);
    
    setAllocation(prev => ({
      ...prev,
      [category]: newValue,
      other: newOther
    }));
  };

  const optimizeAllocation = () => {
    const currentData = Object.entries(allocation)
      .filter(([key]) => key !== 'totalBudget')
      .map(([key, value]) => ({
        category: key.charAt(0).toUpperCase() + key.slice(1),
        current: (value as number),
        amount: ((value as number) / 100) * allocation.totalBudget,
        optimal: getOptimalAllocation(key),
        efficiency: Math.random() * 0.4 + 0.6 // Simulated efficiency score
      }));

    setOptimized({
      data: currentData,
      totalEfficiency: currentData.reduce((sum, item) => sum + item.efficiency, 0) / currentData.length,
      recommendations: generateRecommendations(currentData)
    });
  };

  const getOptimalAllocation = (category: string) => {
    const optimal: { [key: string]: number } = {
      healthcare: 16,
      education: 12,
      defense: 4,
      infrastructure: 8,
      socialSecurity: 35,
      debt: 12,
      other: 13
    };
    return optimal[category] || 10;
  };

  const generateRecommendations = (data: any[]) => {
    const recommendations = [];
    
    data.forEach(item => {
      const difference = item.current - item.optimal;
      if (Math.abs(difference) > 3) {
        if (difference > 0) {
          recommendations.push(`Consider reducing ${item.category} allocation by ${difference.toFixed(1)}%`);
        } else {
          recommendations.push(`Consider increasing ${item.category} investment by ${Math.abs(difference).toFixed(1)}%`);
        }
      }
    });

    return recommendations;
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = Object.entries(allocation)
    .filter(([key]) => key !== 'totalBudget')
    .map(([key, value], index) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value as number,
      color: COLORS[index % COLORS.length]
    }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Budget Allocation Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="total-budget">Total Budget (€ Billions)</Label>
            <Input
              id="total-budget"
              type="number"
              value={allocation.totalBudget}
              onChange={(e) => setAllocation(prev => ({ ...prev, totalBudget: parseFloat(e.target.value) || 900 }))}
              placeholder="900"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Budget Allocation (%)</h3>
            
            {Object.entries(allocation)
              .filter(([key]) => key !== 'totalBudget')
              .map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <span className="text-sm font-medium">
                      {value}% (€{((value as number / 100) * allocation.totalBudget).toFixed(1)}B)
                    </span>
                  </div>
                  <Slider
                    value={[value as number]}
                    onValueChange={(newValue) => handleSliderChange(key, newValue)}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm">
                Total Allocation: {Object.entries(allocation)
                  .filter(([key]) => key !== 'totalBudget')
                  .reduce((sum, [, value]) => sum + (value as number), 0)}%
              </p>
            </div>
          </div>

          <Button onClick={optimizeAllocation} className="w-full">
            Analyze Allocation
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {optimized && (
          <Card>
            <CardHeader>
              <CardTitle>Optimization Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={optimized.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" name="Current %" />
                  <Bar dataKey="optimal" fill="#82ca9d" name="Optimal %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {optimized && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Overall Efficiency Score</p>
                <p className="text-2xl font-bold text-blue-600">{(optimized.totalEfficiency * 100).toFixed(1)}%</p>
              </div>
              
              <ul className="space-y-2">
                {optimized.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyBudgetAllocationTool;
