
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Treemap } from "recharts";
import { TrendingUp, TrendingDown, Building, Users, Shield, BookOpen, Activity } from "lucide-react";

const GermanSpendingTracker = () => {
  const [selectedMinistry, setSelectedMinistry] = useState("all");
  const [spendingCategory, setSpendingCategory] = useState("functional");
  const [timeFrame, setTimeFrame] = useState("annual");
  const [comparisonType, setComparisonType] = useState("budget_vs_actual");

  // German government spending data (in billions of euros)
  const spendingData = {
    totalSpending: 476.82,
    budgetedSpending: 465.00,
    variance: 11.82,
    
    byMinistry: [
      { ministry: "Social Affairs", spending: 167.5, budget: 164.2, percentage: 35.1 },
      { ministry: "Defense", spending: 50.4, budget: 52.0, percentage: 10.6 },
      { ministry: "Transport", spending: 35.8, budget: 34.5, percentage: 7.5 },
      { ministry: "Finance", spending: 38.2, budget: 36.8, percentage: 8.0 },
      { ministry: "Education & Research", spending: 22.1, budget: 21.8, percentage: 4.6 },
      { ministry: "Interior", spending: 18.9, budget: 18.2, percentage: 4.0 },
      { ministry: "Health", spending: 17.9, budget: 17.5, percentage: 3.8 },
      { ministry: "Economic Affairs", spending: 15.3, budget: 16.1, percentage: 3.2 },
      { ministry: "Environment", spending: 12.8, budget: 12.5, percentage: 2.7 },
      { ministry: "Justice", spending: 8.9, budget: 8.7, percentage: 1.9 },
      { ministry: "Foreign Affairs", spending: 7.4, budget: 7.2, percentage: 1.6 },
      { ministry: "Other Ministries", spending: 81.52, budget: 75.5, percentage: 17.1 }
    ],

    byFunction: [
      { function: "Social Protection", spending: 167.5, percentage: 35.1 },
      { function: "General Public Services", spending: 71.2, percentage: 14.9 },
      { function: "Defense", spending: 50.4, percentage: 10.6 },
      { function: "Economic Affairs", spending: 48.3, percentage: 10.1 },
      { function: "Education", spending: 22.1, percentage: 4.6 },
      { function: "Health", spending: 17.9, percentage: 3.8 },
      { function: "Public Order & Safety", spending: 18.9, percentage: 4.0 },
      { function: "Environment Protection", spending: 12.8, percentage: 2.7 },
      { function: "Housing & Community", spending: 8.5, percentage: 1.8 },
      { function: "Recreation & Culture", spending: 5.2, percentage: 1.1 },
      { function: "Other Functions", spending: 54.0, percentage: 11.3 }
    ],

    byType: [
      { type: "Personnel", spending: 95.4, percentage: 20.0 },
      { type: "Social Benefits", spending: 189.2, percentage: 39.7 },
      { type: "Goods & Services", spending: 67.8, percentage: 14.2 },
      { type: "Interest Payments", spending: 38.2, percentage: 8.0 },
      { type: "Investments", spending: 45.6, percentage: 9.6 },
      { type: "Subsidies", spending: 28.7, percentage: 6.0 },
      { type: "Other", spending: 11.9, percentage: 2.5 }
    ]
  };

  const monthlySpending = [
    { month: "Jan", actual: 38.2, budget: 38.8, efficiency: 98.5 },
    { month: "Feb", actual: 35.7, budget: 38.8, efficiency: 92.0 },
    { month: "Mar", actual: 41.3, budget: 38.8, efficiency: 106.4 },
    { month: "Apr", actual: 39.8, budget: 38.8, efficiency: 102.6 },
    { month: "May", actual: 37.9, budget: 38.8, efficiency: 97.7 },
    { month: "Jun", actual: 42.1, budget: 38.8, efficiency: 108.5 },
    { month: "Jul", actual: 39.2, budget: 38.8, efficiency: 101.0 },
    { month: "Aug", actual: 36.8, budget: 38.8, efficiency: 94.8 },
    { month: "Sep", actual: 40.5, budget: 38.8, efficiency: 104.4 },
    { month: "Oct", actual: 41.7, budget: 38.8, efficiency: 107.5 },
    { month: "Nov", actual: 43.2, budget: 38.8, efficiency: 111.3 },
    { month: "Dec", actual: 79.5, budget: 77.5, efficiency: 102.6 }
  ];

  const performanceMetrics = [
    { metric: "Budget Execution Rate", value: 102.5, target: 100, status: "above" },
    { metric: "Administrative Efficiency", value: 94.2, target: 95, status: "below" },
    { metric: "Project Completion Rate", value: 87.8, target: 90, status: "below" },
    { metric: "Digital Spending Share", value: 12.3, target: 15, status: "below" },
    { metric: "Green Spending Share", value: 8.7, target: 10, status: "below" },
    { metric: "Investment Rate", value: 9.6, target: 12, status: "below" }
  ];

  const topPrograms = [
    { program: "Pension Payments", spending: 112.3, ministry: "Social Affairs", growth: 3.2 },
    { program: "Unemployment Benefits", spending: 35.2, ministry: "Social Affairs", growth: -8.5 },
    { program: "Defense Procurement", spending: 22.1, ministry: "Defense", growth: 15.3 },
    { program: "Infrastructure Investment", spending: 18.7, ministry: "Transport", growth: 7.8 },
    { program: "Research & Development", spending: 15.9, ministry: "Education", growth: 12.1 },
    { program: "Healthcare Programs", spending: 14.2, ministry: "Health", growth: 5.4 },
    { program: "Energy Transition", spending: 11.8, ministry: "Environment", growth: 25.7 },
    { program: "Digital Infrastructure", spending: 8.9, ministry: "Transport", growth: 18.9 },
    { program: "Education Support", spending: 7.3, ministry: "Education", growth: 4.1 },
    { program: "Climate Protection", spending: 6.4, ministry: "Environment", growth: 32.1 }
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getVarianceColor = (actual: number, budget: number) => {
    const variance = ((actual - budget) / budget) * 100;
    if (Math.abs(variance) <= 5) return "text-green-600";
    if (Math.abs(variance) <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    if (status === "above") return <Badge variant="default" className="bg-green-100 text-green-800">Above Target</Badge>;
    if (status === "below") return <Badge variant="destructive">Below Target</Badge>;
    return <Badge variant="outline">On Target</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            German Government Spending Tracker
          </CardTitle>
          <p className="text-gray-600">
            Track and analyze German government spending across ministries, programs, and functions with real-time monitoring
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="ministry">Ministry/Department</Label>
              <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ministries</SelectItem>
                  <SelectItem value="social">Social Affairs</SelectItem>
                  <SelectItem value="defense">Defense</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education & Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Spending Category</Label>
              <Select value={spendingCategory} onValueChange={setSpendingCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="functional">By Function</SelectItem>
                  <SelectItem value="ministry">By Ministry</SelectItem>
                  <SelectItem value="type">By Type</SelectItem>
                  <SelectItem value="programs">By Programs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeframe">Time Frame</Label>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="comparison">Comparison Type</Label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget_vs_actual">Budget vs Actual</SelectItem>
                  <SelectItem value="year_over_year">Year over Year</SelectItem>
                  <SelectItem value="per_capita">Per Capita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spending</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(spendingData.totalSpending)}
                    </p>
                  </div>
                  <Building className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Allocated</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatBillions(spendingData.budgetedSpending)}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Variance</p>
                    <p className="text-2xl font-bold text-orange-600">
                      +{formatBillions(spendingData.variance)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Execution Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage((spendingData.totalSpending / spendingData.budgetedSpending) * 100)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={spendingCategory} onValueChange={setSpendingCategory} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="functional">By Function</TabsTrigger>
              <TabsTrigger value="ministry">By Ministry</TabsTrigger>
              <TabsTrigger value="type">By Type</TabsTrigger>
              <TabsTrigger value="programs">Top Programs</TabsTrigger>
            </TabsList>

            <TabsContent value="functional" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Function</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={spendingData.byFunction}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ function: func, percentage }) => `${func}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="spending"
                        >
                          {spendingData.byFunction.map((entry, index) => (
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
                    <CardTitle>Functional Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {spendingData.byFunction.slice(0, 8).map((item, index) => (
                        <div key={item.function}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.function}</span>
                            <div className="text-right">
                              <span className="text-sm font-semibold">{formatBillions(item.spending)}</span>
                              <span className="text-xs text-gray-600 ml-2">({item.percentage}%)</span>
                            </div>
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

            <TabsContent value="ministry" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ministry Spending vs Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={spendingData.byMinistry.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ministry" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => formatBillions(value as number)} />
                        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                        <Bar dataKey="spending" fill="#82ca9d" name="Actual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Variance by Ministry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {spendingData.byMinistry.slice(0, 8).map((item) => {
                        const variance = ((item.spending - item.budget) / item.budget) * 100;
                        return (
                          <div key={item.ministry} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.ministry}</span>
                            <div className="text-right">
                              <span className="text-sm font-semibold">{formatBillions(item.spending)}</span>
                              <span className={`text-xs ml-2 ${getVarianceColor(item.spending, item.budget)}`}>
                                ({variance > 0 ? '+' : ''}{variance.toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="type" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={spendingData.byType}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatBillions(value as number)} />
                        <Bar dataKey="spending" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expenditure Composition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spendingData.byType.map((item, index) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors[index % colors.length] }}
                          />
                          <span className="text-sm font-medium">{item.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{formatBillions(item.spending)}</div>
                          <div className="text-xs text-gray-600">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Government Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPrograms.map((program, index) => (
                      <div key={program.program} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{program.program}</div>
                            <div className="text-sm text-gray-600">{program.ministry}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatBillions(program.spending)}</div>
                          <div className={`text-sm ${program.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {program.growth > 0 ? '+' : ''}{program.growth}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatBillions(value as number)} />
                    <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} name="Actual Spending" />
                    <Line type="monotone" dataKey="budget" stroke="#82ca9d" strokeWidth={2} name="Budgeted" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.metric} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{metric.value}%</span>
                        {getStatusBadge(metric.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanSpendingTracker;
