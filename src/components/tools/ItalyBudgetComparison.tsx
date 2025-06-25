
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const ItalyBudgetComparison = () => {
  const [comparisonData, setComparisonData] = useState({
    scenario1Name: "Current Budget",
    scenario2Name: "Proposed Budget",
    scenario1Revenue: "850",
    scenario1Spending: "900",
    scenario2Revenue: "875",
    scenario2Spending: "885",
    comparisonType: "scenarios"
  });

  const [analysis, setAnalysis] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setComparisonData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const compareScenarios = () => {
    const s1Revenue = parseFloat(comparisonData.scenario1Revenue) || 0;
    const s1Spending = parseFloat(comparisonData.scenario1Spending) || 0;
    const s2Revenue = parseFloat(comparisonData.scenario2Revenue) || 0;
    const s2Spending = parseFloat(comparisonData.scenario2Spending) || 0;

    const s1Balance = s1Revenue - s1Spending;
    const s2Balance = s2Revenue - s2Spending;

    const comparison = [
      {
        metric: 'Revenue',
        scenario1: s1Revenue,
        scenario2: s2Revenue,
        difference: s2Revenue - s1Revenue,
        percentChange: s1Revenue > 0 ? ((s2Revenue - s1Revenue) / s1Revenue) * 100 : 0
      },
      {
        metric: 'Spending',
        scenario1: s1Spending,
        scenario2: s2Spending,
        difference: s2Spending - s1Spending,
        percentChange: s1Spending > 0 ? ((s2Spending - s1Spending) / s1Spending) * 100 : 0
      },
      {
        metric: 'Balance',
        scenario1: s1Balance,
        scenario2: s2Balance,
        difference: s2Balance - s1Balance,
        percentChange: s1Balance !== 0 ? ((s2Balance - s1Balance) / Math.abs(s1Balance)) * 100 : 0
      }
    ];

    // EU member comparison data
    const euComparison = [
      { country: 'Italy (S1)', revenue: s1Revenue, spending: s1Spending, balance: s1Balance },
      { country: 'Italy (S2)', revenue: s2Revenue, spending: s2Spending, balance: s2Balance },
      { country: 'Germany', revenue: 1650, spending: 1620, balance: 30 },
      { country: 'France', revenue: 1380, spending: 1450, balance: -70 },
      { country: 'Spain', revenue: 550, spending: 580, balance: -30 }
    ];

    setAnalysis({
      comparison,
      euComparison,
      improvement: s2Balance > s1Balance,
      balanceImprovement: s2Balance - s1Balance
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Budget Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="comparison-type">Comparison Type</Label>
            <Select value={comparisonData.comparisonType} onValueChange={(value) => handleInputChange('comparisonType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select comparison type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scenarios">Budget Scenarios</SelectItem>
                <SelectItem value="years">Year-over-Year</SelectItem>
                <SelectItem value="regions">Regional Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scenario 1</h3>
              
              <div>
                <Label htmlFor="scenario1-name">Scenario Name</Label>
                <Input
                  id="scenario1-name"
                  value={comparisonData.scenario1Name}
                  onChange={(e) => handleInputChange('scenario1Name', e.target.value)}
                  placeholder="Current Budget"
                />
              </div>

              <div>
                <Label htmlFor="scenario1-revenue">Revenue (€ Billions)</Label>
                <Input
                  id="scenario1-revenue"
                  type="number"
                  value={comparisonData.scenario1Revenue}
                  onChange={(e) => handleInputChange('scenario1Revenue', e.target.value)}
                  placeholder="850"
                />
              </div>

              <div>
                <Label htmlFor="scenario1-spending">Spending (€ Billions)</Label>
                <Input
                  id="scenario1-spending"
                  type="number"
                  value={comparisonData.scenario1Spending}
                  onChange={(e) => handleInputChange('scenario1Spending', e.target.value)}
                  placeholder="900"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scenario 2</h3>
              
              <div>
                <Label htmlFor="scenario2-name">Scenario Name</Label>
                <Input
                  id="scenario2-name"
                  value={comparisonData.scenario2Name}
                  onChange={(e) => handleInputChange('scenario2Name', e.target.value)}
                  placeholder="Proposed Budget"
                />
              </div>

              <div>
                <Label htmlFor="scenario2-revenue">Revenue (€ Billions)</Label>
                <Input
                  id="scenario2-revenue"
                  type="number"
                  value={comparisonData.scenario2Revenue}
                  onChange={(e) => handleInputChange('scenario2Revenue', e.target.value)}
                  placeholder="875"
                />
              </div>

              <div>
                <Label htmlFor="scenario2-spending">Spending (€ Billions)</Label>
                <Input
                  id="scenario2-spending"
                  type="number"
                  value={comparisonData.scenario2Spending}
                  onChange={(e) => handleInputChange('scenario2Spending', e.target.value)}
                  placeholder="885"
                />
              </div>
            </div>
          </div>

          <Button onClick={compareScenarios} className="w-full">
            Compare Scenarios
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysis.comparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scenario1" fill="#8884d8" name={comparisonData.scenario1Name} />
                  <Bar dataKey="scenario2" fill="#82ca9d" name={comparisonData.scenario2Name} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EU Context</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysis.euComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="spending" fill="#ff7300" name="Spending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${analysis.improvement ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-sm text-gray-600">Budget Balance Change</p>
                  <p className={`text-2xl font-bold ${analysis.improvement ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.balanceImprovement > 0 ? '+' : ''}€{analysis.balanceImprovement.toFixed(1)}B
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Revenue Change</p>
                  <p className="text-lg font-semibold">
                    {analysis.comparison[0].percentChange > 0 ? '+' : ''}{analysis.comparison[0].percentChange.toFixed(1)}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Spending Change</p>
                  <p className="text-lg font-semibold">
                    {analysis.comparison[1].percentChange > 0 ? '+' : ''}{analysis.comparison[1].percentChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyBudgetComparison;
