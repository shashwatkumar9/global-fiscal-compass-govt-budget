
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Calculator, Download, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

const UKSpendingTracker = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [actualSpending, setActualSpending] = useState("");

  const departments = [
    "Health and Social Care",
    "Education",
    "Defence",
    "Transport",
    "Work and Pensions",
    "Home Office",
    "Justice",
    "Environment, Food & Rural Affairs",
    "HM Treasury",
    "Foreign, Commonwealth & Development Office"
  ];

  const spendingData = [
    { department: "Health & Social Care", budget: 180000, actual: 175000, variance: -5000 },
    { department: "Education", budget: 60000, actual: 58000, variance: -2000 },
    { department: "Defence", budget: 45000, actual: 46500, variance: 1500 },
    { department: "Work & Pensions", budget: 220000, actual: 218000, variance: -2000 },
    { department: "Transport", budget: 25000, actual: 27000, variance: 2000 },
    { department: "Home Office", budget: 15000, actual: 14800, variance: -200 },
  ];

  const monthlyTrends = [
    { month: "Jan", spending: 15000, budget: 16000 },
    { month: "Feb", spending: 14500, budget: 15500 },
    { month: "Mar", spending: 16000, budget: 16500 },
    { month: "Apr", spending: 15800, budget: 16200 },
    { month: "May", spending: 17000, budget: 16800 },
    { month: "Jun", spending: 16500, budget: 17000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const calculateVariancePercentage = (budget: number, actual: number) => {
    return ((actual - budget) / budget * 100).toFixed(1);
  };

  const getTotalBudget = () => spendingData.reduce((sum, item) => sum + item.budget, 0);
  const getTotalActual = () => spendingData.reduce((sum, item) => sum + item.actual, 0);
  const getTotalVariance = () => getTotalActual() - getTotalBudget();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Government Spending Tracker
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Track and analyze UK government spending across departments, compare with budget allocations, and monitor fiscal performance in real-time.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Spending Analysis Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Financial Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024-25</SelectItem>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-23</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Budget (£ millions)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter budget"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="actual">Actual Spending (£ millions)</Label>
              <Input
                id="actual"
                type="number"
                placeholder="Enter actual"
                value={actualSpending}
                onChange={(e) => setActualSpending(e.target.value)}
              />
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
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">£{getTotalBudget().toLocaleString()}M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actual Spending</p>
                <p className="text-2xl font-bold text-green-600">£{getTotalActual().toLocaleString()}M</p>
              </div>
              <Calculator className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variance</p>
                <p className={`text-2xl font-bold ${getTotalVariance() >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  £{getTotalVariance().toLocaleString()}M
                </p>
              </div>
              <AlertTriangle className={`w-8 h-8 ${getTotalVariance() >= 0 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((getTotalBudget() - getTotalActual()) / getTotalBudget() * 100).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Spending vs Budget</CardTitle>
            <CardDescription>Compare actual spending against allocated budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`£${value}M`, '']} />
                <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
            <CardDescription>Breakdown of spending by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, percent }) => `${department} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="actual"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`£${value}M`, 'Spending']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trends</CardTitle>
          <CardDescription>Track spending patterns throughout the financial year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`£${value}M`, '']} />
              <Line type="monotone" dataKey="budget" stroke="#8884d8" name="Budget" />
              <Line type="monotone" dataKey="spending" stroke="#82ca9d" name="Actual Spending" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Spending Analysis</CardTitle>
          <CardDescription>Comprehensive breakdown of all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Department</th>
                  <th className="text-right p-2">Budget (£M)</th>
                  <th className="text-right p-2">Actual (£M)</th>
                  <th className="text-right p-2">Variance (£M)</th>
                  <th className="text-right p-2">Variance (%)</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {spendingData.map((item) => (
                  <tr key={item.department} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{item.department}</td>
                    <td className="p-2 text-right">£{item.budget.toLocaleString()}</td>
                    <td className="p-2 text-right">£{item.actual.toLocaleString()}</td>
                    <td className={`p-2 text-right ${item.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      £{item.variance.toLocaleString()}
                    </td>
                    <td className={`p-2 text-right ${item.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {calculateVariancePercentage(item.budget, item.actual)}%
                    </td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        Math.abs(item.variance) <= item.budget * 0.05 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {Math.abs(item.variance) <= item.budget * 0.05 ? 'On Track' : 'Alert'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button variant="outline">
          Generate Analysis
        </Button>
      </div>
    </div>
  );
};

export default UKSpendingTracker;
