
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, PiggyBank, Calculator } from "lucide-react";

interface AnalysisData {
  totalExpenses: number;
  remainingIncome: number;
  savingsRate: number;
  recommendations: Record<string, { recommended: number; actual: number }>;
  chartData: Array<{ name: string; value: number; recommended: number }>;
  pieData: Array<{ name: string; value: number }>;
  budgetHealth: string;
}

const FranceBudgetAnalyzer = () => {
  const [budgetData, setBudgetData] = useState({
    income: 0,
    housing: 0,
    food: 0,
    transportation: 0,
    healthcare: 0,
    entertainment: 0,
    savings: 0,
    other: 0,
    period: "monthly"
  });

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const calculateAnalysis = () => {
    const totalExpenses = budgetData.housing + budgetData.food + budgetData.transportation + 
                         budgetData.healthcare + budgetData.entertainment + budgetData.other;
    const remainingIncome = budgetData.income - totalExpenses - budgetData.savings;
    const savingsRate = budgetData.income > 0 ? (budgetData.savings / budgetData.income) * 100 : 0;
    
    // French budget recommendations
    const recommendations = {
      housing: { recommended: budgetData.income * 0.33, actual: budgetData.housing },
      food: { recommended: budgetData.income * 0.15, actual: budgetData.food },
      transportation: { recommended: budgetData.income * 0.15, actual: budgetData.transportation },
      savings: { recommended: budgetData.income * 0.20, actual: budgetData.savings }
    };

    const chartData = [
      { name: "Housing", value: budgetData.housing, recommended: recommendations.housing.recommended },
      { name: "Food", value: budgetData.food, recommended: recommendations.food.recommended },
      { name: "Transport", value: budgetData.transportation, recommended: recommendations.transportation.recommended },
      { name: "Healthcare", value: budgetData.healthcare, recommended: budgetData.income * 0.08 },
      { name: "Entertainment", value: budgetData.entertainment, recommended: budgetData.income * 0.07 },
      { name: "Savings", value: budgetData.savings, recommended: recommendations.savings.recommended },
      { name: "Other", value: budgetData.other, recommended: budgetData.income * 0.02 }
    ];

    const pieData = chartData.filter(item => item.value > 0);

    setAnalysis({
      totalExpenses,
      remainingIncome,
      savingsRate,
      recommendations,
      chartData,
      pieData,
      budgetHealth: remainingIncome >= 0 ? "healthy" : "deficit"
    });
  };

  const resetForm = () => {
    setBudgetData({
      income: 0,
      housing: 0,
      food: 0,
      transportation: 0,
      healthcare: 0,
      entertainment: 0,
      savings: 0,
      other: 0,
      period: "monthly"
    });
    setAnalysis(null);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Budget Analyzer
          </CardTitle>
          <CardDescription>
            Comprehensive budget analysis with French financial guidelines and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Budget Period</Label>
              <Select onValueChange={(value) => setBudgetData({...budgetData, period: value})} defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">{budgetData.period === "monthly" ? "Monthly" : "Annual"} Income (€)</Label>
              <Input
                id="income"
                type="number"
                value={budgetData.income || ""}
                onChange={(e) => setBudgetData({...budgetData, income: Number(e.target.value)})}
                placeholder="Enter total income"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="housing">Housing & Utilities (€)</Label>
              <Input
                id="housing"
                type="number"
                value={budgetData.housing || ""}
                onChange={(e) => setBudgetData({...budgetData, housing: Number(e.target.value)})}
                placeholder="Rent, mortgage, utilities"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="food">Food & Groceries (€)</Label>
              <Input
                id="food"
                type="number"
                value={budgetData.food || ""}
                onChange={(e) => setBudgetData({...budgetData, food: Number(e.target.value)})}
                placeholder="Food expenses"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation (€)</Label>
              <Input
                id="transportation"
                type="number"
                value={budgetData.transportation || ""}
                onChange={(e) => setBudgetData({...budgetData, transportation: Number(e.target.value)})}
                placeholder="Car, public transport"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthcare">Healthcare (€)</Label>
              <Input
                id="healthcare"
                type="number"
                value={budgetData.healthcare || ""}
                onChange={(e) => setBudgetData({...budgetData, healthcare: Number(e.target.value)})}
                placeholder="Medical expenses"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entertainment">Entertainment (€)</Label>
              <Input
                id="entertainment"
                type="number"
                value={budgetData.entertainment || ""}
                onChange={(e) => setBudgetData({...budgetData, entertainment: Number(e.target.value)})}
                placeholder="Leisure, dining out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Savings & Investments (€)</Label>
              <Input
                id="savings"
                type="number"
                value={budgetData.savings || ""}
                onChange={(e) => setBudgetData({...budgetData, savings: Number(e.target.value)})}
                placeholder="Savings amount"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="other">Other Expenses (€)</Label>
            <Input
              id="other"
              type="number"
              value={budgetData.other || ""}
              onChange={(e) => setBudgetData({...budgetData, other: Number(e.target.value)})}
              placeholder="Miscellaneous expenses"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateAnalysis} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Analyze Budget
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="trends">Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Remaining Income</p>
                      <p className={`text-2xl font-bold ${analysis.remainingIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{analysis.remainingIncome.toFixed(2)}
                      </p>
                    </div>
                    {analysis.remainingIncome >= 0 ? 
                      <TrendingUp className="w-8 h-8 text-green-600" /> : 
                      <TrendingDown className="w-8 h-8 text-red-600" />
                    }
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Savings Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{analysis.savingsRate.toFixed(1)}%</p>
                    </div>
                    <PiggyBank className="w-8 h-8 text-blue-600" />
                  </div>
                  <Progress value={analysis.savingsRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Budget Health</p>
                      <p className={`text-2xl font-bold ${analysis.budgetHealth === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                        {analysis.budgetHealth === 'healthy' ? 'Healthy' : 'Deficit'}
                      </p>
                    </div>
                    {analysis.budgetHealth === 'healthy' ? 
                      <TrendingUp className="w-8 h-8 text-green-600" /> : 
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysis.pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analysis.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actual vs Recommended Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analysis.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Actual" />
                    <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4">
              {Object.entries(analysis.recommendations).map(([category, data]) => {
                const isOverBudget = data.actual > data.recommended;
                const difference = Math.abs(data.actual - data.recommended);
                
                return (
                  <Card key={category}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold capitalize">{category}</h3>
                          <p className="text-sm text-gray-600">
                            Current: €{data.actual.toFixed(2)} | Recommended: €{data.recommended.toFixed(2)}
                          </p>
                        </div>
                        <div className={`text-right ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                          <p className="font-semibold">
                            {isOverBudget ? '+' : '-'}€{difference.toFixed(2)}
                          </p>
                          <p className="text-xs">
                            {isOverBudget ? 'Over budget' : 'Under budget'}
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={data.recommended > 0 ? (data.actual / data.recommended) * 100 : 0} 
                        className={`mt-2 ${isOverBudget ? 'bg-red-100' : 'bg-green-100'}`}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>12-Month Budget Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={Array.from({length: 12}, (_, i) => ({
                    month: `Month ${i + 1}`,
                    savings: analysis.savingsRate > 15 ? budgetData.savings * (1 + 0.02) ** i : budgetData.savings,
                    expenses: analysis.totalExpenses * (1 + 0.01) ** i
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="savings" stroke="#8884d8" name="Projected Savings" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Projected Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceBudgetAnalyzer;
