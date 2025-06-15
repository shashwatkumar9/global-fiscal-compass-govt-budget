
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Calculator, PieChart as PieChartIcon } from "lucide-react";

const FranceBudgetAllocationTool = () => {
  const [allocation, setAllocation] = useState({
    totalBudget: 0,
    healthcare: 25,
    education: 20,
    defense: 15,
    social: 30,
    infrastructure: 10
  });

  const [results, setResults] = useState(null);

  const calculateAllocation = () => {
    const total = allocation.healthcare + allocation.education + allocation.defense + allocation.social + allocation.infrastructure;
    
    const allocatedAmounts = {
      healthcare: (allocation.healthcare / 100) * allocation.totalBudget,
      education: (allocation.education / 100) * allocation.totalBudget,
      defense: (allocation.defense / 100) * allocation.totalBudget,
      social: (allocation.social / 100) * allocation.totalBudget,
      infrastructure: (allocation.infrastructure / 100) * allocation.totalBudget
    };

    const chartData = [
      { name: 'Healthcare', value: allocatedAmounts.healthcare, percentage: allocation.healthcare },
      { name: 'Education', value: allocatedAmounts.education, percentage: allocation.education },
      { name: 'Defense', value: allocatedAmounts.defense, percentage: allocation.defense },
      { name: 'Social Programs', value: allocatedAmounts.social, percentage: allocation.social },
      { name: 'Infrastructure', value: allocatedAmounts.infrastructure, percentage: allocation.infrastructure }
    ];

    setResults({
      allocatedAmounts,
      chartData,
      totalPercentage: total,
      remainingBudget: allocation.totalBudget - Object.values(allocatedAmounts).reduce((sum, val) => sum + val, 0)
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5" />
            France Budget Allocation Tool
          </CardTitle>
          <CardDescription>
            Optimize government budget allocation across different sectors with interactive planning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Total Budget (€ billions)</Label>
            <Input
              type="number"
              value={allocation.totalBudget || ""}
              onChange={(e) => setAllocation({...allocation, totalBudget: Number(e.target.value)})}
              placeholder="Total budget to allocate"
            />
          </div>

          <div className="space-y-6">
            {Object.entries(allocation).slice(1).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) => setAllocation({...allocation, [key]: newValue[0]})}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <Button onClick={calculateAllocation} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Allocation
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={results.chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percentage}) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {results.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {Object.entries(results.allocatedAmounts).map(([sector, amount]) => (
              <Card key={sector}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold capitalize">{sector.replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        €{amount.toFixed(1)}B
                      </p>
                      <p className="text-sm text-gray-600">
                        {allocation[sector]}% of budget
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FranceBudgetAllocationTool;
