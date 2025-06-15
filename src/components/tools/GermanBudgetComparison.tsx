
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Globe, BarChart3, Download, FileText } from "lucide-react";

const GermanBudgetComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState(["Germany", "France", "United Kingdom"]);
  const [comparisonType, setComparisonType] = useState("gdp-ratio");
  const [selectedYear, setSelectedYear] = useState("2025");

  // Sample comparison data for major economies
  const budgetComparisonData = {
    "2025": [
      {
        country: "Germany",
        totalRevenue: 1842.5, // billion EUR
        totalExpenditure: 1956.2,
        deficit: -113.7,
        debtToGDP: 66.3,
        gdp: 4259.9,
        population: 84.4,
        revenuePerCapita: 21833,
        expenditurePerCapita: 23181
      },
      {
        country: "France", 
        totalRevenue: 1394.8,
        totalExpenditure: 1542.1,
        deficit: -147.3,
        debtToGDP: 111.9,
        gdp: 2940.0,
        population: 68.0,
        revenuePerCapita: 20512,
        expenditurePerCapita: 22678
      },
      {
        country: "United Kingdom",
        totalRevenue: 1089.2,
        totalExpenditure: 1234.8,
        deficit: -145.6,
        debtToGDP: 101.1,
        gdp: 3131.0,
        population: 67.5,
        revenuePerCapita: 16136,
        expenditurePerCapita: 18293
      },
      {
        country: "Italy",
        totalRevenue: 853.4,
        totalExpenditure: 982.7,
        deficit: -129.3,
        debtToGDP: 144.4,
        gdp: 2107.7,
        population: 58.9,
        revenuePerCapita: 14493,
        expenditurePerCapita: 16690
      },
      {
        country: "Spain",
        totalRevenue: 512.8,
        totalExpenditure: 589.3,
        deficit: -76.5,
        debtToGDP: 107.7,
        gdp: 1419.0,
        population: 47.4,
        revenuePerCapita: 10823,
        expenditurePerCapita: 12433
      },
      {
        country: "Netherlands",
        totalRevenue: 389.2,
        totalExpenditure: 412.6,
        deficit: -23.4,
        debtToGDP: 50.1,
        gdp: 909.0,
        population: 17.5,
        revenuePerCapita: 22240,
        expenditurePerCapita: 23577
      }
    ]
  };

  const spendingCategories = [
    {
      category: "Social Protection",
      Germany: 35.1,
      France: 32.8,
      "United Kingdom": 28.4,
      Italy: 33.7,
      Spain: 30.2,
      Netherlands: 28.9
    },
    {
      category: "Health",
      Germany: 15.9,
      France: 16.2,
      "United Kingdom": 18.8,
      Italy: 14.1,
      Spain: 14.8,
      Netherlands: 16.7
    },
    {
      category: "Education",
      Germany: 9.3,
      France: 9.6,
      "United Kingdom": 11.2,
      Italy: 7.9,
      Spain: 9.1,
      Netherlands: 10.8
    },
    {
      category: "Defense",
      Germany: 3.2,
      France: 3.9,
      "United Kingdom": 4.8,
      Italy: 2.8,
      Spain: 2.1,
      Netherlands: 2.6
    },
    {
      category: "Interest Payments",
      Germany: 8.0,
      France: 6.8,
      "United Kingdom": 7.2,
      Italy: 12.4,
      Spain: 8.9,
      Netherlands: 4.2
    }
  ];

  const fiscalIndicators = [
    {
      indicator: "Revenue Efficiency",
      Germany: 85,
      France: 82,
      "United Kingdom": 78,
      Italy: 75,
      Spain: 73,
      Netherlands: 88
    },
    {
      indicator: "Expenditure Control",
      Germany: 82,
      France: 75,
      "United Kingdom": 74,
      Italy: 68,
      Spain: 71,
      Netherlands: 86
    },
    {
      indicator: "Debt Sustainability",
      Germany: 78,
      France: 65,
      "United Kingdom": 67,
      Italy: 45,
      Spain: 62,
      Netherlands: 85
    },
    {
      indicator: "Budget Transparency",
      Germany: 88,
      France: 85,
      "United Kingdom": 90,
      Italy: 79,
      Spain: 82,
      Netherlands: 91
    },
    {
      indicator: "Fiscal Discipline",
      Germany: 75,
      France: 68,
      "United Kingdom": 65,
      Italy: 58,
      Spain: 61,
      Netherlands: 83
    }
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000000);
  };

  const getComparisonData = () => {
    const data = budgetComparisonData[selectedYear as keyof typeof budgetComparisonData];
    return data.filter(country => selectedCountries.includes(country.country));
  };

  const availableCountries = ["Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            German Budget Comparison Tool - International Analysis
          </CardTitle>
          <p className="text-gray-600">
            Compare Germany's budget performance with other major European economies and analyze fiscal indicators
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="comparison-year">Comparison Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
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
              <Label htmlFor="comparison-type">Comparison Type</Label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gdp-ratio">As % of GDP</SelectItem>
                  <SelectItem value="absolute">Absolute Values</SelectItem>
                  <SelectItem value="per-capita">Per Capita</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Selected Countries</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedCountries.map(country => (
                  <Badge key={country} variant="secondary">
                    {country}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Budget Overview</TabsTrigger>
              <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
              <TabsTrigger value="performance">Fiscal Performance</TabsTrigger>
              <TabsTrigger value="rankings">Country Rankings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getComparisonData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [
                            comparisonType === 'per-capita' 
                              ? `€${value.toLocaleString()}`
                              : `€${(value).toFixed(1)}B`,
                            'Revenue'
                          ]} 
                        />
                        <Bar 
                          dataKey={comparisonType === 'per-capita' ? 'revenuePerCapita' : 'totalRevenue'} 
                          fill="#8884d8" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Balance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getComparisonData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`€${value.toFixed(1)}B`, 'Deficit']} />
                        <Bar dataKey="deficit" fill="#ff7300" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Debt-to-GDP Ratio Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getComparisonData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Debt-to-GDP']} />
                      <Line type="monotone" dataKey="debtToGDP" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>EU Maastricht Criterion:</strong> Maximum 60% debt-to-GDP ratio. 
                      Countries above this threshold may face fiscal monitoring.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Government Spending by Category (% of Total)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={spendingCategories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      {selectedCountries.map((country, index) => (
                        <Bar 
                          key={country} 
                          dataKey={country} 
                          fill={colors[index % colors.length]} 
                          name={country}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spendingCategories.map((category, index) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCountries.map((country) => (
                          <div key={country} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{country}</span>
                            <Badge variant="outline">
                              {category[country as keyof typeof category]}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fiscal Performance Radar Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={fiscalIndicators}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="indicator" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      {selectedCountries.slice(0, 3).map((country, index) => (
                        <Radar
                          key={country}
                          name={country}
                          dataKey={country}
                          stroke={colors[index]}
                          fill={colors[index]}
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Germany's Fiscal Strengths</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Strong revenue collection efficiency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Moderate debt levels compared to EU average</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>High budget transparency standards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Robust economic fundamentals</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                      <span>Budget deficit above 3% Maastricht limit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                      <span>Debt-to-GDP ratio exceeds 60% target</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                      <span>Lower defense spending than NATO target</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                      <span>Rising interest payment burden</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rankings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Efficiency Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {availableCountries
                        .sort((a, b) => {
                          const aData = fiscalIndicators.find(f => f.indicator === "Revenue Efficiency");
                          const bData = fiscalIndicators.find(f => f.indicator === "Revenue Efficiency");
                          return (bData?.[b as keyof typeof bData] as number || 0) - (aData?.[a as keyof typeof aData] as number || 0);
                        })
                        .map((country, index) => {
                          const score = fiscalIndicators.find(f => f.indicator === "Revenue Efficiency")?.[country as keyof typeof fiscalIndicators[0]] as number;
                          return (
                            <div key={country} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{index + 1}</Badge>
                                <span className={country === 'Germany' ? 'font-bold text-blue-600' : ''}>{country}</span>
                              </div>
                              <span className="font-semibold">{score}/100</span>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Debt Sustainability Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {availableCountries
                        .sort((a, b) => {
                          const aData = fiscalIndicators.find(f => f.indicator === "Debt Sustainability");
                          const bData = fiscalIndicators.find(f => f.indicator === "Debt Sustainability");
                          return (bData?.[b as keyof typeof bData] as number || 0) - (aData?.[a as keyof typeof aData] as number || 0);
                        })
                        .map((country, index) => {
                          const score = fiscalIndicators.find(f => f.indicator === "Debt Sustainability")?.[country as keyof typeof fiscalIndicators[0]] as number;
                          return (
                            <div key={country} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{index + 1}</Badge>
                                <span className={country === 'Germany' ? 'font-bold text-blue-600' : ''}>{country}</span>
                              </div>
                              <span className="font-semibold">{score}/100</span>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Comparison
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

export default GermanBudgetComparison;
