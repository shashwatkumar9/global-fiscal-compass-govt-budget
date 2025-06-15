
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calculator, Info, AlertCircle } from "lucide-react";

const UKBudgetAnalyzer = () => {
  const [budgetYear, setBudgetYear] = useState<string>("2024");
  const [analysisType, setAnalysisType] = useState<string>("spending");
  const [results, setResults] = useState<any>(null);

  // UK Budget 2024 data (simplified)
  const budgetData = {
    totalSpending: 1100000000000, // £1.1 trillion
    totalRevenue: 1050000000000, // £1.05 trillion
    deficit: 50000000000, // £50 billion
    departments: [
      { name: "Health & Social Care", amount: 220000000000, percentage: 20 },
      { name: "Education", amount: 110000000000, percentage: 10 },
      { name: "Defence", amount: 55000000000, percentage: 5 },
      { name: "Transport", amount: 44000000000, percentage: 4 },
      { name: "Housing & Communities", amount: 33000000000, percentage: 3 },
      { name: "Work & Pensions", amount: 275000000000, percentage: 25 },
      { name: "Other Departments", amount: 363000000000, percentage: 33 }
    ],
    revenues: [
      { name: "Income Tax", amount: 200000000000, percentage: 19.5 },
      { name: "National Insurance", amount: 150000000000, percentage: 14.7 },
      { name: "VAT", amount: 140000000000, percentage: 13.7 },
      { name: "Corporation Tax", amount: 80000000000, percentage: 7.8 },
      { name: "Business Rates", amount: 30000000000, percentage: 2.9 },
      { name: "Council Tax", amount: 35000000000, percentage: 3.4 },
      { name: "Other Taxes", amount: 415000000000, percentage: 38.0 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  const analyzeBudget = () => {
    const debtToGDPRatio = 85.5; // Approximate UK debt-to-GDP ratio
    const gdp = 2500000000000; // Approximate UK GDP £2.5 trillion
    
    setResults({
      ...budgetData,
      debtToGDPRatio,
      gdp,
      deficitAsPercentageOfGDP: (budgetData.deficit / gdp) * 100,
      spendingAsPercentageOfGDP: (budgetData.totalSpending / gdp) * 100,
      revenueAsPercentageOfGDP: (budgetData.totalRevenue / gdp) * 100
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-blue-600" />
          UK Budget Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Analyze UK government budget allocations, spending patterns, and fiscal policy impacts with comprehensive breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Analysis Parameters
            </CardTitle>
            <CardDescription>
              Configure your budget analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="budgetYear">Budget Year</Label>
              <Select value={budgetYear} onValueChange={setBudgetYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024-25</SelectItem>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-23</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysisType">Analysis Type</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spending">Government Spending</SelectItem>
                  <SelectItem value="revenue">Government Revenue</SelectItem>
                  <SelectItem value="comparison">Spending vs Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={analyzeBudget} className="w-full" size="lg">
              Analyze UK Budget
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>UK Budget Overview {budgetYear}-{parseInt(budgetYear) + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Spending</p>
                    <p className="text-lg font-bold text-blue-600">
                      £{(results.totalSpending / 1000000000).toFixed(0)}B
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg font-bold text-green-600">
                      £{(results.totalRevenue / 1000000000).toFixed(0)}B
                    </p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Deficit</p>
                    <p className="text-lg font-bold text-red-600">
                      £{(results.deficit / 1000000000).toFixed(0)}B
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Debt-to-GDP</p>
                    <p className="text-lg font-bold text-orange-600">
                      {results.debtToGDPRatio}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {results && (
        <Tabs defaultValue="spending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="charts">Visual Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="spending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Government Spending by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.departments.map((dept: any, index: number) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{dept.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold">£{(dept.amount / 1000000000).toFixed(0)}B</p>
                        <p className="text-sm text-gray-600">{dept.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Government Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.revenues.map((revenue: any, index: number) => (
                    <div key={revenue.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{revenue.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${revenue.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold">£{(revenue.amount / 1000000000).toFixed(0)}B</p>
                        <p className="text-sm text-gray-600">{revenue.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.departments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {results.departments.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`£${(value / 1000000000).toFixed(1)}B`, 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.revenues.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`£${(value / 1000000000).toFixed(1)}B`, 'Amount']} />
                      <Bar dataKey="amount" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-blue-600" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Budget deficit: Revenue vs spending gap</p>
            <p>• Debt-to-GDP ratio: Government debt sustainability</p>
            <p>• Spending efficiency across departments</p>
            <p>• Revenue diversification analysis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              Largest Spending Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Work & Pensions (25%)</p>
            <p>• Health & Social Care (20%)</p>
            <p>• Education (10%)</p>
            <p>• Defence (5%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Data based on 2024-25 budget estimates</p>
            <p>• Figures may vary with supplementary estimates</p>
            <p>• Analysis includes central government spending only</p>
            <p>• Local authority spending analyzed separately</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKBudgetAnalyzer;
