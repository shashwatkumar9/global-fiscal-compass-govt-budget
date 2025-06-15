
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, TreeMap } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Calculator, Target, DollarSign, Users, Building, Heart } from "lucide-react";

const FranceSpendingTracker = () => {
  const [spendingData, setSpendingData] = useState({
    // Major spending categories (billions €)
    socialSecurity: 0,
    healthcare: 0,
    education: 0,
    defense: 0,
    infrastructure: 0,
    publicSafety: 0,
    debtService: 0,
    administration: 0,
    environment: 0,
    research: 0,
    // Budget parameters
    totalBudget: 0,
    fiscalYear: new Date().getFullYear(),
    trackingPeriod: "annual",
    targetEfficiency: 85
  });

  const [analysis, setAnalysis] = useState(null);

  const calculateSpendingAnalysis = () => {
    const totalSpending = Object.values(spendingData).slice(0, 10).reduce((sum, val) => sum + val, 0);
    const budgetUtilization = spendingData.totalBudget > 0 ? (totalSpending / spendingData.totalBudget) * 100 : 0;
    
    // Spending breakdown
    const spendingBreakdown = [
      { category: "Social Security", amount: spendingData.socialSecurity, icon: "👥", priority: "high" },
      { category: "Healthcare", amount: spendingData.healthcare, icon: "🏥", priority: "high" },
      { category: "Education", amount: spendingData.education, icon: "📚", priority: "high" },
      { category: "Defense", amount: spendingData.defense, icon: "🛡️", priority: "medium" },
      { category: "Infrastructure", amount: spendingData.infrastructure, icon: "🏗️", priority: "medium" },
      { category: "Public Safety", amount: spendingData.publicSafety, icon: "👮", priority: "medium" },
      { category: "Debt Service", amount: spendingData.debtService, icon: "💳", priority: "high" },
      { category: "Administration", amount: spendingData.administration, icon: "🏛️", priority: "low" },
      { category: "Environment", amount: spendingData.environment, icon: "🌱", priority: "high" },
      { category: "Research", amount: spendingData.research, icon: "🔬", priority: "medium" }
    ].map(item => ({
      ...item,
      percentage: totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0,
      efficiency: Math.random() * 30 + 70, // Simulated efficiency score
      trend: (Math.random() - 0.5) * 20 // Simulated trend
    }));

    // EU comparison data
    const euComparison = [
      { country: "France", social: 31.2, health: 9.3, education: 5.5, defense: 1.8 },
      { country: "Germany", social: 25.1, health: 9.9, education: 4.9, defense: 1.2 },
      { country: "Italy", social: 28.9, health: 8.8, education: 4.1, defense: 1.4 },
      { country: "Spain", social: 21.6, health: 9.1, education: 4.3, defense: 1.0 },
      { country: "EU Average", social: 27.3, health: 8.9, education: 4.8, defense: 1.3 }
    ];

    // Monthly tracking simulation
    const monthlyTracking = Array.from({length: 12}, (_, i) => ({
      month: new Date(0, i).toLocaleString('en', {month: 'short'}),
      actual: (totalSpending / 12) * (0.8 + Math.random() * 0.4),
      budget: totalSpending / 12,
      variance: (Math.random() - 0.5) * 0.2,
      efficiency: spendingData.targetEfficiency + (Math.random() - 0.5) * 20
    }));

    // Performance indicators
    const kpis = {
      spendingEfficiency: spendingBreakdown.reduce((sum, item) => sum + item.efficiency, 0) / spendingBreakdown.length,
      budgetVariance: budgetUtilization - 100,
      prioritySpending: spendingBreakdown.filter(item => item.priority === 'high').reduce((sum, item) => sum + item.percentage, 0),
      administrativeCosts: (spendingData.administration / totalSpending) * 100,
      socialSpending: ((spendingData.socialSecurity + spendingData.healthcare + spendingData.education) / totalSpending) * 100
    };

    // Risk assessment
    const risks = [
      {
        category: "Budget Overrun",
        level: budgetUtilization > 105 ? "high" : budgetUtilization > 100 ? "medium" : "low",
        impact: "Financial sustainability"
      },
      {
        category: "Administrative Efficiency",
        level: kpis.administrativeCosts > 15 ? "high" : kpis.administrativeCosts > 10 ? "medium" : "low",
        impact: "Resource allocation"
      },
      {
        category: "Social Spending Balance",
        level: kpis.socialSpending < 40 ? "high" : kpis.socialSpending < 50 ? "medium" : "low",
        impact: "Social welfare"
      }
    ];

    // Projections for next fiscal year
    const projections = spendingBreakdown.map(item => ({
      ...item,
      projected: item.amount * (1 + (item.trend / 100)),
      recommendedBudget: item.amount * (item.priority === 'high' ? 1.05 : item.priority === 'medium' ? 1.02 : 0.98)
    }));

    setAnalysis({
      totalSpending,
      budgetUtilization,
      spendingBreakdown,
      euComparison,
      monthlyTracking,
      kpis,
      risks,
      projections,
      remainingBudget: spendingData.totalBudget - totalSpending
    });
  };

  const resetForm = () => {
    setSpendingData({
      socialSecurity: 0,
      healthcare: 0,
      education: 0,
      defense: 0,
      infrastructure: 0,
      publicSafety: 0,
      debtService: 0,
      administration: 0,
      environment: 0,
      research: 0,
      totalBudget: 0,
      fiscalYear: new Date().getFullYear(),
      trackingPeriod: "annual",
      targetEfficiency: 85
    });
    setAnalysis(null);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Spending Tracker
          </CardTitle>
          <CardDescription>
            Comprehensive government spending analysis with efficiency tracking and budget monitoring.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalBudget">Total Budget (€ billions)</Label>
              <Input
                id="totalBudget"
                type="number"
                value={spendingData.totalBudget || ""}
                onChange={(e) => setSpendingData({...spendingData, totalBudget: Number(e.target.value)})}
                placeholder="Annual budget allocation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscalYear">Fiscal Year</Label>
              <Select onValueChange={(value) => setSpendingData({...spendingData, fiscalYear: Number(value)})} defaultValue={new Date().getFullYear().toString()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetEfficiency">Target Efficiency (%)</Label>
              <Input
                id="targetEfficiency"
                type="number"
                value={spendingData.targetEfficiency || ""}
                onChange={(e) => setSpendingData({...spendingData, targetEfficiency: Number(e.target.value)})}
                placeholder="Efficiency target"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="socialSecurity">Social Security (€ billions)</Label>
              <Input
                id="socialSecurity"
                type="number"
                value={spendingData.socialSecurity || ""}
                onChange={(e) => setSpendingData({...spendingData, socialSecurity: Number(e.target.value)})}
                placeholder="Pensions, unemployment benefits"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthcare">Healthcare (€ billions)</Label>
              <Input
                id="healthcare"
                type="number"
                value={spendingData.healthcare || ""}
                onChange={(e) => setSpendingData({...spendingData, healthcare: Number(e.target.value)})}
                placeholder="Public health services"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education (€ billions)</Label>
              <Input
                id="education"
                type="number"
                value={spendingData.education || ""}
                onChange={(e) => setSpendingData({...spendingData, education: Number(e.target.value)})}
                placeholder="Schools, universities"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defense">Defense (€ billions)</Label>
              <Input
                id="defense"
                type="number"
                value={spendingData.defense || ""}
                onChange={(e) => setSpendingData({...spendingData, defense: Number(e.target.value)})}
                placeholder="Military spending"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="infrastructure">Infrastructure (€ billions)</Label>
              <Input
                id="infrastructure"
                type="number"
                value={spendingData.infrastructure || ""}
                onChange={(e) => setSpendingData({...spendingData, infrastructure: Number(e.target.value)})}
                placeholder="Roads, transport, utilities"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicSafety">Public Safety (€ billions)</Label>
              <Input
                id="publicSafety"
                type="number"
                value={spendingData.publicSafety || ""}
                onChange={(e) => setSpendingData({...spendingData, publicSafety: Number(e.target.value)})}
                placeholder="Police, fire, emergency"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debtService">Debt Service (€ billions)</Label>
              <Input
                id="debtService"
                type="number"
                value={spendingData.debtService || ""}
                onChange={(e) => setSpendingData({...spendingData, debtService: Number(e.target.value)})}
                placeholder="Interest payments"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="administration">Administration (€ billions)</Label>
              <Input
                id="administration"
                type="number"
                value={spendingData.administration || ""}
                onChange={(e) => setSpendingData({...spendingData, administration: Number(e.target.value)})}
                placeholder="Government operations"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="environment">Environment (€ billions)</Label>
              <Input
                id="environment"
                type="number"
                value={spendingData.environment || ""}
                onChange={(e) => setSpendingData({...spendingData, environment: Number(e.target.value)})}
                placeholder="Climate, conservation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="research">Research & Innovation (€ billions)</Label>
              <Input
                id="research"
                type="number"
                value={spendingData.research || ""}
                onChange={(e) => setSpendingData({...spendingData, research: Number(e.target.value)})}
                placeholder="R&D, innovation programs"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateSpendingAnalysis} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Analyze Spending
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Spending</p>
                      <p className="text-2xl font-bold text-blue-600">
                        €{(analysis.totalSpending / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Budget Utilization</p>
                      <p className={`text-2xl font-bold ${analysis.budgetUtilization > 100 ? 'text-red-600' : 'text-green-600'}`}>
                        {analysis.budgetUtilization.toFixed(1)}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <Progress value={Math.min(analysis.budgetUtilization, 100)} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Efficiency</p>
                      <p className="text-2xl font-bold text-green-600">
                        {analysis.kpis.spendingEfficiency.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Remaining Budget</p>
                      <p className={`text-2xl font-bold ${analysis.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{(analysis.remainingBudget / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <Building className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysis.spendingBreakdown.filter(item => item.amount > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({category, percentage}) => `${category} ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {analysis.spendingBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.risks.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{risk.category}</h4>
                        <p className="text-sm text-gray-600">{risk.impact}</p>
                      </div>
                      <Badge variant={risk.level === 'high' ? 'destructive' : risk.level === 'medium' ? 'secondary' : 'default'}>
                        {risk.level.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analysis.spendingBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {analysis.spendingBreakdown.map((category, index) => (
                <Card key={category.category}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold">{category.category}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={category.priority === 'high' ? 'destructive' : category.priority === 'medium' ? 'secondary' : 'outline'}>
                              {category.priority} priority
                            </Badge>
                            <span className={`text-sm ${category.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {category.trend >= 0 ? '↗' : '↘'} {Math.abs(category.trend).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          €{category.amount.toFixed(1)}B
                        </p>
                        <p className="text-sm text-gray-600">
                          {category.percentage.toFixed(1)}% • Eff: {category.efficiency.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Spending Efficiency:</span>
                    <span className="font-semibold">{analysis.kpis.spendingEfficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysis.kpis.spendingEfficiency} />
                  
                  <div className="flex justify-between items-center">
                    <span>Priority Spending:</span>
                    <span className="font-semibold">{analysis.kpis.prioritySpending.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysis.kpis.prioritySpending} />
                  
                  <div className="flex justify-between items-center">
                    <span>Administrative Costs:</span>
                    <span className={`font-semibold ${analysis.kpis.administrativeCosts > 15 ? 'text-red-600' : 'text-green-600'}`}>
                      {analysis.kpis.administrativeCosts.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={analysis.kpis.administrativeCosts} className={analysis.kpis.administrativeCosts > 15 ? 'bg-red-100' : 'bg-green-100'} />
                  
                  <div className="flex justify-between items-center">
                    <span>Social Spending:</span>
                    <span className="font-semibold">{analysis.kpis.socialSpending.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysis.kpis.socialSpending} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficiency by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analysis.spendingBreakdown} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Bar dataKey="efficiency" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget vs Actual Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysis.monthlyTracking}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Legend />
                    <Line type="monotone" dataKey="budget" stroke="#8884d8" name="Budget" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual Spending" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Efficiency Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysis.monthlyTracking}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Line type="monotone" dataKey="efficiency" stroke="#ff7300" name="Efficiency %" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>EU Spending Comparison (% of GDP)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analysis.euComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="social" stackId="a" fill="#8884d8" name="Social Spending" />
                    <Bar dataKey="health" stackId="a" fill="#82ca9d" name="Healthcare" />
                    <Bar dataKey="education" stackId="a" fill="#ffc658" name="Education" />
                    <Bar dataKey="defense" stackId="a" fill="#ff7c7c" name="Defense" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Next Year Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analysis.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${(value / 1000).toFixed(2)}T`} />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" name="Current" />
                    <Bar dataKey="projected" fill="#82ca9d" name="Projected" />
                    <Bar dataKey="recommendedBudget" fill="#ffc658" name="Recommended" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {analysis.projections.map((item, index) => (
                <Card key={item.category}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <h3 className="font-semibold">{item.category}</h3>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-gray-600">Current → Projected</div>
                        <div className="font-semibold">
                          €{item.amount.toFixed(1)}B → €{item.projected.toFixed(1)}B
                        </div>
                        <div className="text-sm">
                          Recommended: €{item.recommendedBudget.toFixed(1)}B
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceSpendingTracker;
