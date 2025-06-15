
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Sankey } from "recharts";
import { Calculator, Target, AlertTriangle, CheckCircle, Download, FileText, RotateCcw } from "lucide-react";

const GermanBudgetAllocationTool = () => {
  const [totalBudget, setTotalBudget] = useState("476820000000"); // 476.82 billion EUR
  const [budgetYear, setBudgetYear] = useState("2025");
  const [allocationMode, setAllocationMode] = useState("percentage");
  
  // Budget categories with current German allocations
  const [allocations, setAllocations] = useState({
    socialSecurity: 35.1,
    defense: 10.6,
    education: 4.6,
    transport: 7.5,
    health: 3.8,
    interestPayments: 8.0,
    environment: 2.1,
    economicAffairs: 6.8,
    publicOrder: 3.2,
    housing: 1.8,
    culture: 1.4,
    other: 15.1
  });

  const budgetCategories = [
    { key: "socialSecurity", label: "Social Security & Labor", description: "Unemployment benefits, pensions, social welfare", priority: "high" },
    { key: "defense", label: "Defense", description: "Military spending, NATO commitments", priority: "medium" },
    { key: "education", label: "Education & Research", description: "Universities, schools, research funding", priority: "high" },
    { key: "transport", label: "Transport", description: "Roads, railways, digital infrastructure", priority: "high" },
    { key: "health", label: "Health", description: "Public health, hospitals, medical research", priority: "high" },
    { key: "interestPayments", label: "Interest Payments", description: "Government debt servicing", priority: "fixed" },
    { key: "environment", label: "Environment", description: "Climate protection, renewable energy", priority: "medium" },
    { key: "economicAffairs", label: "Economic Affairs", description: "Business support, innovation, trade", priority: "medium" },
    { key: "publicOrder", label: "Public Order & Safety", description: "Police, courts, fire services", priority: "medium" },
    { key: "housing", label: "Housing & Community", description: "Social housing, urban development", priority: "low" },
    { key: "culture", label: "Culture & Recreation", description: "Arts, sports, cultural preservation", priority: "low" },
    { key: "other", label: "Other Functions", description: "Administration, international cooperation", priority: "low" }
  ];

  const calculateAbsoluteValues = () => {
    const budget = parseFloat(totalBudget);
    const values = {};
    Object.keys(allocations).forEach(key => {
      values[key] = (allocations[key] / 100) * budget;
    });
    return values;
  };

  const absoluteValues = calculateAbsoluteValues();

  const updateAllocation = (key: string, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const getBalanceStatus = () => {
    const total = getTotalAllocation();
    if (Math.abs(total - 100) < 0.1) return "balanced";
    if (total > 100) return "overallocated";
    return "underallocated";
  };

  const resetToDefaults = () => {
    setAllocations({
      socialSecurity: 35.1,
      defense: 10.6,
      education: 4.6,
      transport: 7.5,
      health: 3.8,
      interestPayments: 8.0,
      environment: 2.1,
      economicAffairs: 6.8,
      publicOrder: 3.2,
      housing: 1.8,
      culture: 1.4,
      other: 15.1
    });
  };

  const getPieChartData = () => {
    return budgetCategories.map(category => ({
      name: category.label,
      value: allocations[category.key],
      amount: absoluteValues[category.key]
    }));
  };

  const getComparisonData = () => {
    return budgetCategories.map(category => ({
      category: category.label,
      current: allocations[category.key],
      recommended: getRecommendedAllocation(category.key),
      difference: allocations[category.key] - getRecommendedAllocation(category.key)
    }));
  };

  const getRecommendedAllocation = (key: string) => {
    // OECD averages for developed countries
    const recommendations = {
      socialSecurity: 33.5,
      defense: 3.1,
      education: 11.2,
      transport: 8.4,
      health: 16.8,
      interestPayments: 6.2,
      environment: 3.8,
      economicAffairs: 5.9,
      publicOrder: 3.8,
      housing: 2.1,
      culture: 2.2,
      other: 3.0
    };
    return recommendations[key] || 5.0;
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0', '#FFAB00', '#67B7DC'];

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      case "fixed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Budget Allocation Tool - Interactive Planning
          </CardTitle>
          <p className="text-gray-600">
            Simulate different budget allocation scenarios and analyze their impact on government priorities and fiscal balance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="budget-year">Budget Year</Label>
              <Select value={budgetYear} onValueChange={setBudgetYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="total-budget">Total Budget (EUR)</Label>
              <Input
                id="total-budget"
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {formatBillions(parseFloat(totalBudget))}
              </p>
            </div>
            <div>
              <Label htmlFor="allocation-mode">Allocation Mode</Label>
              <Select value={allocationMode} onValueChange={setAllocationMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="absolute">Absolute Values</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className={`${getBalanceStatus() === "balanced" ? "bg-green-50" : getBalanceStatus() === "overallocated" ? "bg-red-50" : "bg-yellow-50"}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Allocation</p>
                    <p className="text-2xl font-bold">
                      {getTotalAllocation().toFixed(1)}%
                    </p>
                  </div>
                  {getBalanceStatus() === "balanced" ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(parseFloat(totalBudget) * (100 - getTotalAllocation()) / 100)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center justify-center">
                <Button onClick={resetToDefaults} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Current
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="allocation" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="allocation">Budget Allocation</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="allocation" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {budgetCategories.map((category, index) => (
                  <Card key={category.key}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{category.label}</h4>
                            <Badge variant="outline" className={getPriorityColor(category.priority)}>
                              {category.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Slider
                                value={[allocations[category.key]]}
                                onValueChange={(value) => updateAllocation(category.key, value[0])}
                                max={50}
                                min={0}
                                step={0.1}
                                className="w-full"
                                disabled={category.priority === "fixed"}
                              />
                            </div>
                            <div className="w-20">
                              <Input
                                type="number"
                                value={allocations[category.key].toFixed(1)}
                                onChange={(e) => updateAllocation(category.key, parseFloat(e.target.value) || 0)}
                                step="0.1"
                                min="0"
                                max="50"
                                className="text-center"
                                disabled={category.priority === "fixed"}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {allocationMode === "percentage" 
                              ? `${allocations[category.key].toFixed(1)}%`
                              : formatBillions(absoluteValues[category.key])
                            }
                          </div>
                          <div className="text-sm text-gray-600">
                            {allocationMode === "percentage"
                              ? formatBillions(absoluteValues[category.key])
                              : `${allocations[category.key].toFixed(1)}%`
                            }
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={getPieChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getPieChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Allocation by Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={getPieChartData()} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip formatter={(value: number) => [formatBillions(value), 'Amount']} />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current vs. OECD Recommended Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getComparisonData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="current" fill="#8884d8" name="Current Allocation" />
                      <Bar dataKey="recommended" fill="#82ca9d" name="OECD Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Allocation Gaps Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getComparisonData()
                        .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
                        .slice(0, 6)
                        .map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                            <span className="text-sm font-medium">{item.category}</span>
                            <Badge 
                              variant={item.difference > 0 ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {item.difference > 0 ? "+" : ""}{item.difference.toFixed(1)}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policy Implications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Strong social security coverage</li>
                        <li>• Adequate defense spending</li>
                        <li>• Infrastructure investment focus</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Education below OECD average</li>
                        <li>• Health spending gap</li>
                        <li>• Environmental investment needed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Economic Impact Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span>GDP Multiplier Effect</span>
                        <span className="font-semibold">1.2x</span>
                      </div>
                      <div className="text-sm text-gray-600">Estimated economic impact of spending changes</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Employment Impact</span>
                        <span className="font-semibold">+/-{Math.abs(getTotalAllocation() - 100) * 50000} jobs</span>
                      </div>
                      <div className="text-sm text-gray-600">Estimated direct and indirect employment effects</div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Fiscal Balance</span>
                        <span className={`font-semibold ${getBalanceStatus() === "balanced" ? "text-green-600" : "text-red-600"}`}>
                          {getBalanceStatus() === "balanced" ? "Balanced" : getBalanceStatus() === "overallocated" ? "Over Budget" : "Under Budget"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Impact Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {(allocations.education + allocations.health).toFixed(1)}%
                        </div>
                        <div className="text-sm text-blue-800">Social Investment</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {(allocations.environment + allocations.transport * 0.3).toFixed(1)}%
                        </div>
                        <div className="text-sm text-green-800">Green Investment</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {allocations.defense.toFixed(1)}%
                        </div>
                        <div className="text-sm text-purple-800">Security</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {allocations.interestPayments.toFixed(1)}%
                        </div>
                        <div className="text-sm text-orange-800">Debt Service</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Sustainability Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Debt Brake Compliance</h4>
                      <div className="text-sm">
                        German debt brake limits structural deficit to 0.35% of GDP. 
                        Current allocation {getBalanceStatus() === "balanced" ? "complies" : "may violate"} with fiscal rules.
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Long-term Viability</h4>
                      <div className="text-sm">
                        High social security and interest payments create {allocations.socialSecurity + allocations.interestPayments > 45 ? "high" : "moderate"} 
                        budget rigidity for future adjustments.
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Investment Priority</h4>
                      <div className="text-sm">
                        {(allocations.education + allocations.transport + allocations.environment) > 15 
                          ? "Strong" : "Weak"} focus on future-oriented investments.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Allocation
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Budget Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanBudgetAllocationTool;
