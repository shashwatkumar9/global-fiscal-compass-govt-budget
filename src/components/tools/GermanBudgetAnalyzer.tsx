
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Calculator, FileText, Download } from "lucide-react";

const GermanBudgetAnalyzer = () => {
  const [selectedYear] = useState("2025");
  const [budgetType, setBudgetType] = useState("federal");
  const [comparisonYear, setComparisonYear] = useState("2024");

  // Sample German budget data
  const federalBudgetData = {
    totalRevenue: 362800000000, // €362.8 billion
    totalExpenditure: 476820000000, // €476.82 billion
    deficit: -114020000000, // €-114.02 billion
    debtToGDP: 66.3, // 66.3%
    revenues: [
      { category: "Income Tax", amount: 89200000000, percentage: 24.6 },
      { category: "VAT", amount: 108300000000, percentage: 29.9 },
      { category: "Corporate Tax", amount: 35400000000, percentage: 9.8 },
      { category: "Energy Tax", amount: 40200000000, percentage: 11.1 },
      { category: "Other Taxes", amount: 52100000000, percentage: 14.4 },
      { category: "Non-Tax Revenue", amount: 37600000000, percentage: 10.4 }
    ],
    expenditures: [
      { category: "Social Security", amount: 167500000000, percentage: 35.1 },
      { category: "Defense", amount: 50400000000, percentage: 10.6 },
      { category: "Education & Research", amount: 22100000000, percentage: 4.6 },
      { category: "Transport", amount: 35800000000, percentage: 7.5 },
      { category: "Health", amount: 17900000000, percentage: 3.8 },
      { category: "Interest Payments", amount: 38200000000, percentage: 8.0 },
      { category: "Other", amount: 144920000000, percentage: 30.4 }
    ]
  };

  const yearComparison = [
    { year: "2023", revenue: 348500, expenditure: 445200, deficit: -96700 },
    { year: "2024", revenue: 356200, expenditure: 461800, deficit: -105600 },
    { year: "2025", revenue: 362800, expenditure: 476820, deficit: -114020 }
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatBillions = (amount: number) => {
    return `€${(amount / 1000000000).toFixed(1)}B`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Budget Analyzer - Advanced Analysis Tool
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive analysis of German federal and state budgets with revenue, expenditure, and deficit tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="budget-year">Budget Year</Label>
              <Select value={selectedYear} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget-type">Budget Level</Label>
              <Select value={budgetType} onValueChange={setBudgetType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="federal">Federal (Bund)</SelectItem>
                  <SelectItem value="state">State (Länder)</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="comparison-year">Compare with</Label>
              <Select value={comparisonYear} onValueChange={setComparisonYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(federalBudgetData.totalRevenue)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Expenditure</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatBillions(federalBudgetData.totalExpenditure)}
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Deficit</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatBillions(federalBudgetData.deficit)}
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Debt-to-GDP</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {federalBudgetData.debtToGDP}%
                    </p>
                  </div>
                  <Badge variant="outline" className="text-purple-600">
                    Maastricht: 60%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="expenditure">Expenditure Analysis</TabsTrigger>
              <TabsTrigger value="trends">Historical Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue vs Expenditure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: 'Revenue', amount: federalBudgetData.totalRevenue / 1000000000 },
                        { name: 'Expenditure', amount: federalBudgetData.totalExpenditure / 1000000000 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`€${value}B`, 'Amount']} />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Balance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Deficit as % of GDP</span>
                        <Badge variant="destructive">3.2%</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Exceeds EU fiscal rule (3% maximum)
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Structural Balance</span>
                        <span className="font-semibold">-2.1% of GDP</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Primary Balance</span>
                        <span className="font-semibold">-€75.8B</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Sources Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={federalBudgetData.revenues}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, percentage }) => `${category}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                        >
                          {federalBudgetData.revenues.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatBillions(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {federalBudgetData.revenues.map((item, index) => (
                        <div key={item.category}>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm">{formatBillions(item.amount)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${item.percentage}%`,
                                backgroundColor: colors[index % colors.length]
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenditure" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expenditure by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={federalBudgetData.expenditures}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => formatBillions(value as number)} />
                        <Bar dataKey="amount" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Major Spending Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {federalBudgetData.expenditures.slice(0, 6).map((item, index) => (
                        <div key={item.category} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-sm font-medium">{item.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{formatBillions(item.amount)}</div>
                            <div className="text-xs text-gray-600">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Trends (2023-2025)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={yearComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${value}B`, '']} />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue" />
                      <Line type="monotone" dataKey="expenditure" stroke="#82ca9d" strokeWidth={2} name="Expenditure" />
                      <Line type="monotone" dataKey="deficit" stroke="#ff7300" strokeWidth={2} name="Deficit" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Analysis
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanBudgetAnalyzer;
