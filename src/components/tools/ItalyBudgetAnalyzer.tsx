
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ItalyBudgetAnalyzer = () => {
  const [budgetData, setBudgetData] = useState({
    totalRevenue: "",
    personalIncome: "",
    corporateIncome: "",
    vat: "",
    otherTaxes: "",
    totalExpenditure: "",
    healthcare: "",
    education: "",
    defense: "",
    infrastructure: "",
    socialSecurity: "",
    otherExpenses: ""
  });

  const [analysis, setAnalysis] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setBudgetData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeBudget = () => {
    const revenue = parseFloat(budgetData.totalRevenue) || 0;
    const expenditure = parseFloat(budgetData.totalExpenditure) || 0;
    const balance = revenue - expenditure;
    
    const revenueBreakdown = [
      { name: 'Personal Income Tax', value: parseFloat(budgetData.personalIncome) || 0, color: '#8884d8' },
      { name: 'Corporate Income Tax', value: parseFloat(budgetData.corporateIncome) || 0, color: '#82ca9d' },
      { name: 'VAT', value: parseFloat(budgetData.vat) || 0, color: '#ffc658' },
      { name: 'Other Taxes', value: parseFloat(budgetData.otherTaxes) || 0, color: '#ff7300' }
    ];

    const expenditureBreakdown = [
      { name: 'Healthcare', value: parseFloat(budgetData.healthcare) || 0, color: '#8884d8' },
      { name: 'Education', value: parseFloat(budgetData.education) || 0, color: '#82ca9d' },
      { name: 'Defense', value: parseFloat(budgetData.defense) || 0, color: '#ffc658' },
      { name: 'Infrastructure', value: parseFloat(budgetData.infrastructure) || 0, color: '#ff7300' },
      { name: 'Social Security', value: parseFloat(budgetData.socialSecurity) || 0, color: '#00C49F' },
      { name: 'Other Expenses', value: parseFloat(budgetData.otherExpenses) || 0, color: '#FFBB28' }
    ];

    const comparisonData = [
      { category: 'Revenue', amount: revenue },
      { category: 'Expenditure', amount: expenditure },
      { category: 'Balance', amount: balance }
    ];

    // Calculate key ratios
    const debtToGdpRatio = 134.8; // Italy's current debt-to-GDP ratio
    const deficitToGdpRatio = revenue > 0 ? (Math.abs(balance) / revenue) * 100 : 0;
    
    setAnalysis({
      revenue,
      expenditure,
      balance,
      revenueBreakdown,
      expenditureBreakdown,
      comparisonData,
      debtToGdpRatio,
      deficitToGdpRatio,
      balanceStatus: balance >= 0 ? 'surplus' : 'deficit',
      recommendations: generateRecommendations(balance, revenue, expenditure)
    });
  };

  const generateRecommendations = (balance: number, revenue: number, expenditure: number) => {
    const recommendations = [];
    
    if (balance < 0) {
      recommendations.push("Consider reducing non-essential expenditures to improve fiscal balance");
      recommendations.push("Explore opportunities to increase tax collection efficiency");
    }
    
    if (expenditure > 0) {
      const healthcareRatio = (parseFloat(budgetData.healthcare) || 0) / expenditure;
      if (healthcareRatio < 0.15) {
        recommendations.push("Healthcare spending below EU average - consider increasing allocation");
      }
      
      const educationRatio = (parseFloat(budgetData.education) || 0) / expenditure;
      if (educationRatio < 0.10) {
        recommendations.push("Education spending could be increased to match EU standards");
      }
    }
    
    return recommendations;
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Budget Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Revenue (€ Billions)</h3>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="total-revenue">Total Revenue</Label>
                  <Input
                    id="total-revenue"
                    type="number"
                    value={budgetData.totalRevenue}
                    onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
                    placeholder="Total revenue"
                  />
                </div>
                <div>
                  <Label htmlFor="personal-income">Personal Income Tax</Label>
                  <Input
                    id="personal-income"
                    type="number"
                    value={budgetData.personalIncome}
                    onChange={(e) => handleInputChange('personalIncome', e.target.value)}
                    placeholder="Personal income tax"
                  />
                </div>
                <div>
                  <Label htmlFor="corporate-income">Corporate Income Tax</Label>
                  <Input
                    id="corporate-income"
                    type="number"
                    value={budgetData.corporateIncome}
                    onChange={(e) => handleInputChange('corporateIncome', e.target.value)}
                    placeholder="Corporate income tax"
                  />
                </div>
                <div>
                  <Label htmlFor="vat">VAT Revenue</Label>
                  <Input
                    id="vat"
                    type="number"
                    value={budgetData.vat}
                    onChange={(e) => handleInputChange('vat', e.target.value)}
                    placeholder="VAT revenue"
                  />
                </div>
                <div>
                  <Label htmlFor="other-taxes">Other Taxes</Label>
                  <Input
                    id="other-taxes"
                    type="number"
                    value={budgetData.otherTaxes}
                    onChange={(e) => handleInputChange('otherTaxes', e.target.value)}
                    placeholder="Other taxes"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Expenditure (€ Billions)</h3>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="total-expenditure">Total Expenditure</Label>
                  <Input
                    id="total-expenditure"
                    type="number"
                    value={budgetData.totalExpenditure}
                    onChange={(e) => handleInputChange('totalExpenditure', e.target.value)}
                    placeholder="Total expenditure"
                  />
                </div>
                <div>
                  <Label htmlFor="healthcare">Healthcare</Label>
                  <Input
                    id="healthcare"
                    type="number"
                    value={budgetData.healthcare}
                    onChange={(e) => handleInputChange('healthcare', e.target.value)}
                    placeholder="Healthcare spending"
                  />
                </div>
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    type="number"
                    value={budgetData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="Education spending"
                  />
                </div>
                <div>
                  <Label htmlFor="defense">Defense</Label>
                  <Input
                    id="defense"
                    type="number"
                    value={budgetData.defense}
                    onChange={(e) => handleInputChange('defense', e.target.value)}
                    placeholder="Defense spending"
                  />
                </div>
                <div>
                  <Label htmlFor="infrastructure">Infrastructure</Label>
                  <Input
                    id="infrastructure"
                    type="number"
                    value={budgetData.infrastructure}
                    onChange={(e) => handleInputChange('infrastructure', e.target.value)}
                    placeholder="Infrastructure spending"
                  />
                </div>
                <div>
                  <Label htmlFor="social-security">Social Security</Label>
                  <Input
                    id="social-security"
                    type="number"
                    value={budgetData.socialSecurity}
                    onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
                    placeholder="Social security spending"
                  />
                </div>
                <div>
                  <Label htmlFor="other-expenses">Other Expenses</Label>
                  <Input
                    id="other-expenses"
                    type="number"
                    value={budgetData.otherExpenses}
                    onChange={(e) => handleInputChange('otherExpenses', e.target.value)}
                    placeholder="Other expenses"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={analyzeBudget} className="w-full">
            Analyze Budget
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${analysis.balanceStatus === 'surplus' ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-sm text-gray-600">Fiscal Balance</p>
                  <p className={`text-2xl font-bold ${analysis.balanceStatus === 'surplus' ? 'text-green-600' : 'text-red-600'}`}>
                    €{Math.abs(analysis.balance).toFixed(2)}B {analysis.balanceStatus === 'surplus' ? 'Surplus' : 'Deficit'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg font-semibold text-green-600">€{analysis.revenue.toFixed(2)}B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expenditure</p>
                    <p className="text-lg font-semibold text-red-600">€{analysis.expenditure.toFixed(2)}B</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Debt-to-GDP Ratio</p>
                    <p className="text-lg font-semibold">{analysis.debtToGdpRatio}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deficit-to-Revenue Ratio</p>
                    <p className="text-lg font-semibold">{analysis.deficitToGdpRatio.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysis.revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analysis.revenueBreakdown.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${value}B`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expenditure Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysis.expenditureBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analysis.expenditureBreakdown.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${value}B`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyBudgetAnalyzer;
