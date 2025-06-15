
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

const FranceSpendingTracker = () => {
  const [spendingData, setSpendingData] = useState({
    healthcare: 0,
    education: 0,
    defense: 0,
    social: 0,
    infrastructure: 0,
    administration: 0,
    debt: 0,
    other: 0
  });

  const [analysis, setAnalysis] = useState<{
    totalSpending: number;
    categories: Array<{name: string; amount: number; percentage: number}>;
    efficiency: string;
  } | null>(null);

  const calculateSpending = () => {
    const totalSpending = Object.values(spendingData).reduce((sum, value) => sum + Number(value), 0);
    
    const categories = Object.entries(spendingData).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      amount: Number(value),
      percentage: totalSpending > 0 ? (Number(value) / totalSpending) * 100 : 0
    }));

    const efficiency = totalSpending > 500 ? "High Spending" : 
                      totalSpending > 300 ? "Moderate Spending" : "Low Spending";

    setAnalysis({ totalSpending, categories, efficiency });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            France Spending Tracker
          </CardTitle>
          <CardDescription>
            Track and analyze government spending across different sectors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Healthcare (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.healthcare || ""}
                onChange={(e) => setSpendingData({...spendingData, healthcare: Number(e.target.value)})}
                placeholder="Healthcare spending"
              />
            </div>
            <div className="space-y-2">
              <Label>Education (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.education || ""}
                onChange={(e) => setSpendingData({...spendingData, education: Number(e.target.value)})}
                placeholder="Education spending"
              />
            </div>
            <div className="space-y-2">
              <Label>Defense (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.defense || ""}
                onChange={(e) => setSpendingData({...spendingData, defense: Number(e.target.value)})}
                placeholder="Defense spending"
              />
            </div>
            <div className="space-y-2">
              <Label>Social Programs (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.social || ""}
                onChange={(e) => setSpendingData({...spendingData, social: Number(e.target.value)})}
                placeholder="Social security and welfare"
              />
            </div>
            <div className="space-y-2">
              <Label>Infrastructure (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.infrastructure || ""}
                onChange={(e) => setSpendingData({...spendingData, infrastructure: Number(e.target.value)})}
                placeholder="Infrastructure spending"
              />
            </div>
            <div className="space-y-2">
              <Label>Administration (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.administration || ""}
                onChange={(e) => setSpendingData({...spendingData, administration: Number(e.target.value)})}
                placeholder="Government administration"
              />
            </div>
            <div className="space-y-2">
              <Label>Debt Service (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.debt || ""}
                onChange={(e) => setSpendingData({...spendingData, debt: Number(e.target.value)})}
                placeholder="Interest payments"
              />
            </div>
            <div className="space-y-2">
              <Label>Other (€ billions)</Label>
              <Input
                type="number"
                value={spendingData.other || ""}
                onChange={(e) => setSpendingData({...spendingData, other: Number(e.target.value)})}
                placeholder="Other spending"
              />
            </div>
          </div>

          <Button onClick={calculateSpending} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Analyze Spending
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="trends">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Government Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    €{analysis.totalSpending.toFixed(1)}B
                  </p>
                  <p className="text-gray-600">Annual Government Spending</p>
                  <p className="text-sm text-gray-500 mt-2">Classification: {analysis.efficiency}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysis.categories.filter(cat => cat.amount > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percentage}) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {analysis.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${Number(value).toFixed(1)}B`} />
                  </PieChart>
                </ResponsiveContainer>
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
                  <BarChart data={analysis.categories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${Number(value).toFixed(1)}B`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {analysis.categories.map((category, index) => (
                <Card key={category.name}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{category.name}</h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          €{category.amount.toFixed(1)}B
                        </p>
                        <p className="text-sm text-gray-600">
                          {category.percentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Spending Efficiency</h4>
                  <p className="text-gray-600">
                    Current spending level is classified as {analysis.efficiency.toLowerCase()}. 
                    {analysis.totalSpending > 500 ? " Consider reviewing spending priorities for optimization." :
                     analysis.totalSpending > 300 ? " Spending appears balanced across sectors." :
                     " There may be opportunities to increase investment in key areas."}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Top Spending Categories</h4>
                  <div className="space-y-2">
                    {analysis.categories
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 3)
                      .map((category, index) => (
                        <div key={category.name} className="flex justify-between">
                          <span>{index + 1}. {category.name}</span>
                          <span>€{category.amount.toFixed(1)}B ({category.percentage.toFixed(1)}%)</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceSpendingTracker;
