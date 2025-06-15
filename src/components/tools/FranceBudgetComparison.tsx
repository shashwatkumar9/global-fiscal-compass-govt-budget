
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Calculator, GitCompare, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const FranceBudgetComparison = () => {
  const [comparisonData, setComparisonData] = useState({
    budget1: { year: 2024, revenue: 0, spending: 0, deficit: 0 },
    budget2: { year: 2025, revenue: 0, spending: 0, deficit: 0 },
    comparisonType: "yearly"
  });

  const [results, setResults] = useState(null);

  const calculateComparison = () => {
    const { budget1, budget2 } = comparisonData;
    
    const changes = {
      revenue: {
        absolute: budget2.revenue - budget1.revenue,
        percentage: budget1.revenue > 0 ? ((budget2.revenue - budget1.revenue) / budget1.revenue) * 100 : 0
      },
      spending: {
        absolute: budget2.spending - budget1.spending,
        percentage: budget1.spending > 0 ? ((budget2.spending - budget1.spending) / budget1.spending) * 100 : 0
      },
      deficit: {
        absolute: budget2.deficit - budget1.deficit,
        percentage: budget1.deficit !== 0 ? ((budget2.deficit - budget1.deficit) / Math.abs(budget1.deficit)) * 100 : 0
      }
    };

    const metrics = [
      { 
        name: "Revenue", 
        budget1: budget1.revenue, 
        budget2: budget2.revenue,
        change: changes.revenue.percentage,
        status: changes.revenue.percentage >= 0 ? "positive" : "negative"
      },
      { 
        name: "Spending", 
        budget1: budget1.spending, 
        budget2: budget2.spending,
        change: changes.spending.percentage,
        status: changes.spending.percentage <= 0 ? "positive" : "negative"
      },
      { 
        name: "Deficit", 
        budget1: budget1.deficit, 
        budget2: budget2.deficit,
        change: changes.deficit.percentage,
        status: budget2.deficit < budget1.deficit ? "positive" : "negative"
      }
    ];

    // Fiscal health indicators
    const healthIndicators = [
      {
        indicator: "Revenue Growth",
        budget1: changes.revenue.percentage || 0,
        budget2: 3.0, // Target
        fullMark: 5
      },
      {
        indicator: "Spending Control",
        budget1: -changes.spending.percentage || 0,
        budget2: 2.0,
        fullMark: 5
      },
      {
        indicator: "Deficit Reduction",
        budget1: -changes.deficit.percentage || 0,
        budget2: 10.0,
        fullMark: 15
      }
    ];

    setResults({
      changes,
      metrics,
      healthIndicators,
      budgetBalance1: budget1.revenue - budget1.spending,
      budgetBalance2: budget2.revenue - budget2.spending,
      fiscalImpact: {
        rating: changes.deficit.percentage < -10 ? "Excellent" : 
                changes.deficit.percentage < 0 ? "Good" : 
                changes.deficit.percentage < 10 ? "Fair" : "Poor",
        summary: `Budget ${budget2.year} shows ${changes.revenue.percentage >= 0 ? 'revenue growth' : 'revenue decline'} and ${changes.spending.percentage <= 0 ? 'spending reduction' : 'spending increase'}.`
      }
    });
  };

  const resetForm = () => {
    setComparisonData({
      budget1: { year: 2024, revenue: 0, spending: 0, deficit: 0 },
      budget2: { year: 2025, revenue: 0, spending: 0, deficit: 0 },
      comparisonType: "yearly"
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            France Budget Comparison
          </CardTitle>
          <CardDescription>
            Compare French government budgets across different periods with detailed variance analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget 1 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Budget Period 1</h3>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select onValueChange={(value) => setComparisonData({
                  ...comparisonData, 
                  budget1: {...comparisonData.budget1, year: Number(value)}
                })} defaultValue="2024">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Revenue (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget1.revenue || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget1: {...comparisonData.budget1, revenue: Number(e.target.value)}
                  })}
                  placeholder="Total government revenue"
                />
              </div>
              <div className="space-y-2">
                <Label>Spending (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget1.spending || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget1: {...comparisonData.budget1, spending: Number(e.target.value)}
                  })}
                  placeholder="Total government spending"
                />
              </div>
              <div className="space-y-2">
                <Label>Deficit (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget1.deficit || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget1: {...comparisonData.budget1, deficit: Number(e.target.value)}
                  })}
                  placeholder="Budget deficit (positive = deficit)"
                />
              </div>
            </div>

            {/* Budget 2 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Budget Period 2</h3>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select onValueChange={(value) => setComparisonData({
                  ...comparisonData, 
                  budget2: {...comparisonData.budget2, year: Number(value)}
                })} defaultValue="2025">
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
                <Label>Revenue (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget2.revenue || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget2: {...comparisonData.budget2, revenue: Number(e.target.value)}
                  })}
                  placeholder="Total government revenue"
                />
              </div>
              <div className="space-y-2">
                <Label>Spending (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget2.spending || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget2: {...comparisonData.budget2, spending: Number(e.target.value)}
                  })}
                  placeholder="Total government spending"
                />
              </div>
              <div className="space-y-2">
                <Label>Deficit (€ billions)</Label>
                <Input
                  type="number"
                  value={comparisonData.budget2.deficit || ""}
                  onChange={(e) => setComparisonData({
                    ...comparisonData,
                    budget2: {...comparisonData.budget2, deficit: Number(e.target.value)}
                  })}
                  placeholder="Budget deficit (positive = deficit)"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateComparison} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Compare Budgets
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="health">Fiscal Health</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.metrics.map((metric) => (
                <Card key={metric.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{metric.name}</h3>
                      <Badge variant={metric.status === "positive" ? "default" : "destructive"}>
                        {metric.change >= 0 ? "+" : ""}{metric.change.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{comparisonData.budget1.year}: €{metric.budget1.toFixed(1)}B</span>
                      <ArrowRight className="w-4 h-4" />
                      <span>{comparisonData.budget2.year}: €{metric.budget2.toFixed(1)}B</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      {metric.change >= 0 ? 
                        <TrendingUp className={`w-4 h-4 mr-1 ${metric.status === "positive" ? "text-green-600" : "text-red-600"}`} /> :
                        <TrendingDown className={`w-4 h-4 mr-1 ${metric.status === "positive" ? "text-green-600" : "text-red-600"}`} />
                      }
                      <span className="text-sm text-gray-600">
                        {Math.abs(results.changes[metric.name.toLowerCase()]?.absolute || 0).toFixed(1)}B change
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Budget Overview Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.metrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value.toFixed(1)}B`} />
                    <Legend />
                    <Bar dataKey="budget1" fill="#8884d8" name={`Budget ${comparisonData.budget1.year}`} />
                    <Bar dataKey="budget2" fill="#82ca9d" name={`Budget ${comparisonData.budget2.year}`} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fiscal Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Overall Rating:</span>
                    <Badge variant={
                      results.fiscalImpact.rating === "Excellent" ? "default" :
                      results.fiscalImpact.rating === "Good" ? "secondary" :
                      results.fiscalImpact.rating === "Fair" ? "outline" : "destructive"
                    }>
                      {results.fiscalImpact.rating}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{results.fiscalImpact.summary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <span className="text-sm text-gray-600">Budget Balance {comparisonData.budget1.year}:</span>
                      <p className={`font-semibold ${results.budgetBalance1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{results.budgetBalance1.toFixed(1)}B {results.budgetBalance1 >= 0 ? 'Surplus' : 'Deficit'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Budget Balance {comparisonData.budget2.year}:</span>
                      <p className={`font-semibold ${results.budgetBalance2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{results.budgetBalance2.toFixed(1)}B {results.budgetBalance2 >= 0 ? 'Surplus' : 'Deficit'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Year-over-Year Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { category: "Revenue", change: results.changes.revenue.percentage },
                    { category: "Spending", change: results.changes.spending.percentage },
                    { category: "Deficit", change: results.changes.deficit.percentage }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Bar dataKey="change" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {Object.entries(results.changes).map(([category, change]) => (
                <Card key={category}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold capitalize">{category} Change</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {change.percentage >= 0 ? "+" : ""}{change.percentage.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600">
                          €{Math.abs(change.absolute).toFixed(1)}B {change.absolute >= 0 ? "increase" : "decrease"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Revenue Analysis</h4>
                  <p className="text-gray-600">
                    Revenue {results.changes.revenue.percentage >= 0 ? "increased" : "decreased"} by €{Math.abs(results.changes.revenue.absolute).toFixed(1)} billion 
                    ({Math.abs(results.changes.revenue.percentage).toFixed(1)}%) from {comparisonData.budget1.year} to {comparisonData.budget2.year}.
                    {results.changes.revenue.percentage >= 3 ? " This represents strong revenue growth." : 
                     results.changes.revenue.percentage >= 0 ? " This shows modest revenue improvement." :
                     " This indicates declining revenue performance."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Spending Analysis</h4>
                  <p className="text-gray-600">
                    Government spending {results.changes.spending.percentage >= 0 ? "increased" : "decreased"} by €{Math.abs(results.changes.spending.absolute).toFixed(1)} billion 
                    ({Math.abs(results.changes.spending.percentage).toFixed(1)}%).
                    {results.changes.spending.percentage <= -2 ? " This shows good spending discipline." :
                     results.changes.spending.percentage <= 2 ? " Spending remains relatively controlled." :
                     " This indicates significant spending growth."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Fiscal Balance</h4>
                  <p className="text-gray-600">
                    The budget deficit {results.changes.deficit.percentage <= 0 ? "improved" : "worsened"} by €{Math.abs(results.changes.deficit.absolute).toFixed(1)} billion.
                    {results.budgetBalance2 > results.budgetBalance1 ? " The fiscal position has strengthened." : " The fiscal position has weakened."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fiscal Health Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={results.healthIndicators}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="indicator" />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                    <Radar name="Actual" dataKey="budget1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="budget2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceBudgetComparison;
