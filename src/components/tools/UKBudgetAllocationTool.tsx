import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Treemap } from "recharts";
import { Calculator, PieChart as PieChartIcon, BarChart3, Users, TrendingUp, AlertCircle } from "lucide-react";

interface BudgetAllocation {
  health: number;
  education: number;
  defence: number;
  pensions: number;
  transport: number;
  housing: number;
  environment: number;
  justice: number;
  other: number;
}

const UKBudgetAllocationTool = () => {
  const [totalBudget, setTotalBudget] = useState<number>(850000);
  const [allocations, setAllocations] = useState<BudgetAllocation>({
    health: 180000,
    education: 120000,
    defence: 55000,
    pensions: 140000,
    transport: 35000,
    housing: 25000,
    environment: 15000,
    justice: 30000,
    other: 250000
  });

  const [customAllocations, setCustomAllocations] = useState<BudgetAllocation>({ ...allocations });

  const handleAllocationChange = (category: keyof BudgetAllocation, value: number) => {
    const newAllocations = { ...customAllocations, [category]: value };
    setCustomAllocations(newAllocations);
  };

  const applyCustomAllocations = () => {
    setAllocations(customAllocations);
  };

  const resetToDefaults = () => {
    const defaultAllocations: BudgetAllocation = {
      health: 180000,
      education: 120000,
      defence: 55000,
      pensions: 140000,
      transport: 35000,
      housing: 25000,
      environment: 15000,
      justice: 30000,
      other: 250000
    };
    setAllocations(defaultAllocations);
    setCustomAllocations(defaultAllocations);
  };

  const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0);
  const remainingBudget = totalBudget - totalAllocated;
  const isOverBudget = remainingBudget < 0;

  // Prepare data for charts
  const pieData = Object.entries(allocations).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    percentage: ((amount / totalBudget) * 100).toFixed(1)
  }));

  const barData = pieData.map(item => ({
    category: item.name,
    amount: item.value,
    percentage: parseFloat(item.percentage)
  }));

  const treemapData = pieData.map(item => ({
    name: item.name,
    size: item.value,
    percentage: item.percentage
  }));

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16', '#EC4899'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.payload.name}</p>
          <p className="text-blue-600">
            Amount: {formatCurrency(typeof data.value === 'number' ? data.value : 0)}
          </p>
          <p className="text-gray-600">
            Percentage: {typeof data.payload.percentage === 'string' ? data.payload.percentage : '0'}%
          </p>
        </div>
      );
    }
    return null;
  };

  const TreemapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-blue-600">
            Amount: {formatCurrency(typeof data.size === 'number' ? data.size : 0)}
          </p>
          <p className="text-gray-600">
            Percentage: {typeof data.percentage === 'string' ? data.percentage : '0'}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Budget Allocation Tool</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Analyze and optimize government budget allocations across different sectors with interactive visualization tools.
        </p>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Budget Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
              <p className="text-gray-600">Total Budget</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAllocated)}</p>
              <p className="text-gray-600">Total Allocated</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                {formatCurrency(Math.abs(remainingBudget))}
              </p>
              <p className="text-gray-600">{isOverBudget ? 'Over Budget' : 'Remaining'}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {((totalAllocated / totalBudget) * 100).toFixed(1)}%
              </p>
              <p className="text-gray-600">Utilized</p>
            </div>
          </div>
          
          {isOverBudget && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">Warning: Budget allocation exceeds total budget by {formatCurrency(Math.abs(remainingBudget))}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="allocate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allocate">Allocate Budget</TabsTrigger>
          <TabsTrigger value="visualize">Visualizations</TabsTrigger>
          <TabsTrigger value="analyze">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="allocate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>
                Adjust budget allocations for different government sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="totalBudget">Total Budget (£ millions)</Label>
                  <Input
                    id="totalBudget"
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(customAllocations).map(([category, amount]) => (
                    <div key={category}>
                      <Label htmlFor={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)} (£ millions)
                      </Label>
                      <Input
                        id={category}
                        type="number"
                        value={amount}
                        onChange={(e) => handleAllocationChange(category as keyof BudgetAllocation, Number(e.target.value))}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {((amount / totalBudget) * 100).toFixed(1)}% of total budget
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button onClick={applyCustomAllocations} className="flex-1">
                    Apply Changes
                  </Button>
                  <Button onClick={resetToDefaults} variant="outline" className="flex-1">
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Budget Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sector Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Treemap</CardTitle>
              <CardDescription>Hierarchical view of budget allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <Treemap
                  data={treemapData}
                  dataKey="size"
                  ratio={4/3}
                  stroke="#fff"
                  fill="#3B82F6"
                >
                  <Tooltip content={<TreemapTooltip />} />
                </Treemap>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Impact Analysis
              </CardTitle>
              <CardDescription>
                Assess the socio-economic impact of budget changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-lg font-semibold text-blue-600">Health Sector</p>
                    <p className="text-sm text-gray-500">Impact on public health services</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-lg font-semibold text-green-600">Education Sector</p>
                    <p className="text-sm text-gray-500">Effect on educational outcomes</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-lg font-semibold text-orange-600">Defence Sector</p>
                    <p className="text-sm text-gray-500">Influence on national security</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UKBudgetAllocationTool;
