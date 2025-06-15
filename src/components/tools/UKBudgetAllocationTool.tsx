
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Sankey, TreeMap } from "recharts";
import { Calculator, Target, PieChart as PieChartIcon, Settings, Download, Shuffle } from "lucide-react";

const UKBudgetAllocationTool = () => {
  const [totalBudget, setTotalBudget] = useState("800000");
  const [optimizationGoal, setOptimizationGoal] = useState("balanced");
  const [constraints, setConstraints] = useState("standard");

  const [allocations, setAllocations] = useState({
    health: 35,
    education: 15,
    defence: 8,
    pensions: 25,
    transport: 5,
    housing: 3,
    environment: 2,
    justice: 3,
    other: 4
  });

  const departments = [
    { key: "health", name: "Health & Social Care", priority: "high", current: 35, optimal: 38, color: "#8884d8" },
    { key: "education", name: "Education", priority: "high", current: 15, optimal: 18, color: "#82ca9d" },
    { key: "defence", name: "Defence", priority: "medium", current: 8, optimal: 7, color: "#ffc658" },
    { key: "pensions", name: "Pensions & Benefits", priority: "high", current: 25, optimal: 23, color: "#ff7300" },
    { key: "transport", name: "Transport", priority: "medium", current: 5, optimal: 6, color: "#8dd1e1" },
    { key: "housing", name: "Housing", priority: "medium", current: 3, optimal: 4, color: "#d084d0" },
    { key: "environment", name: "Environment", priority: "high", current: 2, optimal: 3, color: "#87d068" },
    { key: "justice", name: "Justice", priority: "low", current: 3, optimal: 2, color: "#ffc0cb" },
    { key: "other", name: "Other", priority: "low", current: 4, optimal: 3, color: "#ffb347" }
  ];

  const optimizationScenarios = {
    "balanced": { health: 35, education: 16, defence: 8, pensions: 24, transport: 6, housing: 4, environment: 3, justice: 2, other: 2 },
    "growth": { health: 32, education: 20, defence: 7, pensions: 22, transport: 8, housing: 5, environment: 2, justice: 2, other: 2 },
    "social": { health: 40, education: 18, defence: 6, pensions: 28, transport: 3, housing: 3, environment: 1, justice: 1, other: 0 },
    "infrastructure": { health: 30, education: 14, defence: 8, pensions: 22, transport: 12, housing: 8, environment: 3, justice: 2, other: 1 }
  };

  const updateAllocation = (dept: string, value: number[]) => {
    setAllocations(prev => ({
      ...prev,
      [dept]: value[0]
    }));
  };

  const normalizeAllocations = () => {
    const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const normalized = Object.fromEntries(
      Object.entries(allocations).map(([key, val]) => [key, (val / total) * 100])
    );
    setAllocations(normalized);
  };

  const applyOptimization = (scenario: string) => {
    const newAllocations = optimizationScenarios[scenario as keyof typeof optimizationScenarios];
    setAllocations(newAllocations);
  };

  const calculateAmount = (percentage: number) => {
    return (parseFloat(totalBudget || "0") * percentage / 100);
  };

  const efficiencyScore = departments.reduce((score, dept) => {
    const difference = Math.abs(allocations[dept.key as keyof typeof allocations] - dept.optimal);
    return score + (10 - difference);
  }, 0) / departments.length;

  const pieData = departments.map(dept => ({
    name: dept.name,
    value: allocations[dept.key as keyof typeof allocations],
    amount: calculateAmount(allocations[dept.key as keyof typeof allocations]),
    color: dept.color
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <PieChartIcon className="w-10 h-10 text-blue-600" />
          UK Budget Allocation Optimizer
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Optimize UK government budget allocation across departments with strategic planning tools and efficiency analysis.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Allocation Parameters
          </CardTitle>
          <CardDescription>Configure budget size and optimization preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="totalBudget">Total Budget (£ millions)</Label>
              <Input
                id="totalBudget"
                type="number"
                placeholder="800000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="optimizationGoal">Optimization Goal</Label>
              <Select value={optimizationGoal} onValueChange={setOptimizationGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced Development</SelectItem>
                  <SelectItem value="growth">Economic Growth</SelectItem>
                  <SelectItem value="social">Social Welfare</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure Focus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="constraints">Constraints</Label>
              <Select value={constraints} onValueChange={setConstraints}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Constraints</SelectItem>
                  <SelectItem value="strict">Strict Limits</SelectItem>
                  <SelectItem value="flexible">Flexible Bounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => applyOptimization(optimizationGoal)}>
              <Shuffle className="w-4 h-4 mr-2" />
              Auto-Optimize
            </Button>
            <Button variant="outline" onClick={normalizeAllocations}>
              Normalize to 100%
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Allocation</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Object.values(allocations).reduce((sum, val) => sum + val, 0).toFixed(1)}%
                </p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                <p className="text-2xl font-bold text-green-600">{efficiencyScore.toFixed(1)}/10</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Largest Allocation</p>
                <p className="text-2xl font-bold text-purple-600">
                  {departments.find(d => allocations[d.key as keyof typeof allocations] === Math.max(...Object.values(allocations)))?.name.split('&')[0] || 'Health'}
                </p>
              </div>
              <PieChartIcon className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Balance</p>
                <p className={`text-2xl font-bold ${Math.abs(Object.values(allocations).reduce((sum, val) => sum + val, 0) - 100) < 1 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(Object.values(allocations).reduce((sum, val) => sum + val, 0) - 100) < 1 ? 'Balanced' : 'Unbalanced'}
                </p>
              </div>
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Allocation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Department Allocation Controls</CardTitle>
          <CardDescription>Adjust budget allocation percentages by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departments.map((dept) => (
              <div key={dept.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">{dept.name}</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      £{calculateAmount(allocations[dept.key as keyof typeof allocations]).toFixed(0)}M
                    </span>
                    <span className="font-bold text-blue-600 min-w-[60px] text-right">
                      {allocations[dept.key as keyof typeof allocations].toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Slider
                  value={[allocations[dept.key as keyof typeof allocations]]}
                  onValueChange={(value) => updateAllocation(dept.key, value)}
                  max={50}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current vs Optimal: {dept.current}% vs {dept.optimal}%</span>
                  <span className={`px-2 py-1 rounded ${
                    dept.priority === 'high' ? 'bg-red-100 text-red-800' :
                    dept.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {dept.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Visual breakdown of budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current vs Optimal Allocation</CardTitle>
            <CardDescription>Compare current allocation with optimal distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departments.map(dept => ({
                name: dept.name.split(' ')[0],
                current: allocations[dept.key as keyof typeof allocations],
                optimal: dept.optimal,
                difference: allocations[dept.key as keyof typeof allocations] - dept.optimal
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, '']} />
                <Bar dataKey="current" fill="#8884d8" name="Current" />
                <Bar dataKey="optimal" fill="#82ca9d" name="Optimal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Results */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Analysis & Recommendations</CardTitle>
          <CardDescription>Strategic insights and optimization suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Key Insights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Health & Social Care receives largest allocation at {allocations.health.toFixed(1)}%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Current efficiency score: {efficiencyScore.toFixed(1)}/10
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Environment allocation below optimal by {(3 - allocations.environment).toFixed(1)}%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Total budget allocation: {Object.values(allocations).reduce((sum, val) => sum + val, 0).toFixed(1)}%
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Optimization Suggestions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Consider increasing education funding for long-term growth
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Environment allocation could support climate commitments
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  Transport investment may boost economic productivity
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Review 'Other' category for potential reallocation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Allocation
        </Button>
        <Button variant="outline">
          Save Configuration
        </Button>
        <Button variant="outline">
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default UKBudgetAllocationTool;
