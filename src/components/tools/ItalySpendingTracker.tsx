
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const ItalySpendingTracker = () => {
  const [spendingData, setSpendingData] = useState({
    healthcare: "150",
    education: "65",
    defense: "25",
    infrastructure: "45",
    socialSecurity: "350",
    interestPayments: "85",
    publicAdmin: "75",
    other: "100",
    trackingPeriod: "annual"
  });

  const [analysis, setAnalysis] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setSpendingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeSpending = () => {
    const categories = {
      healthcare: parseFloat(spendingData.healthcare) || 0,
      education: parseFloat(spendingData.education) || 0,
      defense: parseFloat(spendingData.defense) || 0,
      infrastructure: parseFloat(spendingData.infrastructure) || 0,
      socialSecurity: parseFloat(spendingData.socialSecurity) || 0,
      interestPayments: parseFloat(spendingData.interestPayments) || 0,
      publicAdmin: parseFloat(spendingData.publicAdmin) || 0,
      other: parseFloat(spendingData.other) || 0
    };

    const totalSpending = Object.values(categories).reduce((sum, value) => sum + value, 0);

    // Create spending breakdown
    const spendingBreakdown = Object.entries(categories).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      value,
      percentage: (value / totalSpending) * 100,
      color: getColorForCategory(key)
    }));

    // EU comparison (approximate averages)
    const euAverages = {
      healthcare: 16.5,
      education: 10.2,
      defense: 2.8,
      infrastructure: 4.5,
      socialSecurity: 35.8,
      interestPayments: 8.2,
      publicAdmin: 12.5,
      other: 9.5
    };

    const comparison = Object.entries(categories).map(([key, value]) => {
      const percentage = (value / totalSpending) * 100;
      const euAvg = euAverages[key as keyof typeof euAverages];
      return {
        category: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        italy: percentage,
        euAverage: euAvg,
        difference: percentage - euAvg
      };
    });

    // Calculate efficiency metrics
    const gdp = 2100; // Italy's GDP estimate
    const spendingToGDPRatio = (totalSpending / gdp) * 100;
    
    // Priority recommendations
    const recommendations = generateRecommendations(spendingBreakdown, comparison);

    setAnalysis({
      totalSpending,
      spendingBreakdown,
      comparison,
      spendingToGDPRatio,
      recommendations,
      largestCategory: spendingBreakdown.reduce((prev, current) => 
        prev.value > current.value ? prev : current
      )
    });
  };

  const generateRecommendations = (breakdown: any[], comparison: any[]) => {
    const recommendations = [];
    
    // Check for categories significantly above EU average
    comparison.forEach(item => {
      if (item.difference > 5) {
        recommendations.push(`${item.category} spending is ${item.difference.toFixed(1)}% above EU average - consider efficiency improvements`);
      } else if (item.difference < -5) {
        recommendations.push(`${item.category} spending is ${Math.abs(item.difference).toFixed(1)}% below EU average - may need increased investment`);
      }
    });

    // Check for balance
    const socialSpending = breakdown.find(item => item.name === 'Social Security')?.percentage || 0;
    const investmentSpending = (breakdown.find(item => item.name === 'Infrastructure')?.percentage || 0) +
                             (breakdown.find(item => item.name === 'Education')?.percentage || 0);
    
    if (socialSpending > investmentSpending * 3) {
      recommendations.push('Consider rebalancing spending toward growth-enhancing investments');
    }

    return recommendations;
  };

  const getColorForCategory = (category: string) => {
    const colors: { [key: string]: string } = {
      healthcare: '#8884d8',
      education: '#82ca9d',
      defense: '#ffc658',
      infrastructure: '#ff7300',
      socialSecurity: '#00C49F',
      interestPayments: '#FFBB28',
      publicAdmin: '#FF8042',
      other: '#8dd1e1'
    };
    return colors[category] || '#8884d8';
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042', '#8dd1e1'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Spending Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tracking-period">Tracking Period</Label>
            <Select value={spendingData.trackingPeriod} onValueChange={(value) => handleInputChange('trackingPeriod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social & Public Services (€ Billions)</h3>
              
              <div>
                <Label htmlFor="healthcare">Healthcare</Label>
                <Input
                  id="healthcare"
                  type="number"
                  value={spendingData.healthcare}
                  onChange={(e) => handleInputChange('healthcare', e.target.value)}
                  placeholder="150"
                />
              </div>

              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  type="number"
                  value={spendingData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="65"
                />
              </div>

              <div>
                <Label htmlFor="social-security">Social Security</Label>
                <Input
                  id="social-security"
                  type="number"
                  value={spendingData.socialSecurity}
                  onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
                  placeholder="350"
                />
              </div>

              <div>
                <Label htmlFor="public-admin">Public Administration</Label>
                <Input
                  id="public-admin"
                  type="number"
                  value={spendingData.publicAdmin}
                  onChange={(e) => handleInputChange('publicAdmin', e.target.value)}
                  placeholder="75"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Infrastructure & Other (€ Billions)</h3>
              
              <div>
                <Label htmlFor="defense">Defense</Label>
                <Input
                  id="defense"
                  type="number"
                  value={spendingData.defense}
                  onChange={(e) => handleInputChange('defense', e.target.value)}
                  placeholder="25"
                />
              </div>

              <div>
                <Label htmlFor="infrastructure">Infrastructure</Label>
                <Input
                  id="infrastructure"
                  type="number"
                  value={spendingData.infrastructure}
                  onChange={(e) => handleInputChange('infrastructure', e.target.value)}
                  placeholder="45"
                />
              </div>

              <div>
                <Label htmlFor="interest-payments">Interest Payments</Label>
                <Input
                  id="interest-payments"
                  type="number"
                  value={spendingData.interestPayments}
                  onChange={(e) => handleInputChange('interestPayments', e.target.value)}
                  placeholder="85"
                />
              </div>

              <div>
                <Label htmlFor="other">Other Spending</Label>
                <Input
                  id="other"
                  type="number"
                  value={spendingData.other}
                  onChange={(e) => handleInputChange('other', e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <Button onClick={analyzeSpending} className="w-full">
            Analyze Spending
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Spending</p>
                  <p className="text-3xl font-bold text-blue-600">€{analysis.totalSpending.toFixed(1)}B</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Spending-to-GDP Ratio</p>
                    <p className="text-lg font-semibold">{analysis.spendingToGDPRatio.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Largest Category</p>
                    <p className="text-lg font-semibold">{analysis.largestCategory.name}</p>
                    <p className="text-sm text-gray-500">€{analysis.largestCategory.value.toFixed(1)}B</p>
                  </div>
                </div>
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
                    data={analysis.spendingBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage.toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analysis.spendingBreakdown.map((entry: any, index: number) => (
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
              <CardTitle>EU Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysis.comparison} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="italy" fill="#8884d8" name="Italy %" />
                  <Bar dataKey="euAverage" fill="#82ca9d" name="EU Average %" />
                </BarChart>
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
                {analysis.recommendations.length === 0 && (
                  <li className="text-sm text-gray-500">Spending allocation appears balanced compared to EU averages.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalySpendingTracker;
