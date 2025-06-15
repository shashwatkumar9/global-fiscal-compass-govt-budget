
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { Calculator, TrendingUp, Calendar, ArrowUpDown, Download } from "lucide-react";

const UKBudgetComparison = () => {
  const [comparisonType, setComparisonType] = useState("year-over-year");
  const [selectedSector, setSelectedSector] = useState("all");
  const [baseYear, setBaseYear] = useState("2023");
  const [compareYear, setCompareYear] = useState("2024");

  const yearOverYearData = [
    { department: "Health & Social Care", year2023: 175000, year2024: 180000, change: 5000 },
    { department: "Education", year2023: 55000, year2024: 60000, change: 5000 },
    { department: "Defence", year2023: 42000, year2024: 45000, change: 3000 },
    { department: "Work & Pensions", year2023: 210000, year2024: 220000, change: 10000 },
    { department: "Transport", year2023: 22000, year2024: 25000, change: 3000 },
    { department: "Home Office", year2023: 14000, year2024: 15000, change: 1000 },
  ];

  const historicalTrends = [
    { year: "2020", health: 160000, education: 50000, defence: 40000, pensions: 190000 },
    { year: "2021", health: 165000, education: 52000, defence: 41000, pensions: 200000 },
    { year: "2022", health: 170000, education: 54000, defence: 41500, pensions: 205000 },
    { year: "2023", health: 175000, education: 55000, defence: 42000, pensions: 210000 },
    { year: "2024", health: 180000, education: 60000, defence: 45000, pensions: 220000 },
  ];

  const proposalComparison = [
    { category: "Healthcare Investment", current: 180000, proposed: 195000, difference: 15000 },
    { category: "Education Reform", current: 60000, proposed: 65000, difference: 5000 },
    { category: "Infrastructure", current: 25000, proposed: 30000, difference: 5000 },
    { category: "Social Security", current: 220000, proposed: 225000, difference: 5000 },
    { category: "Defence Spending", current: 45000, proposed: 47000, difference: 2000 },
  ];

  const calculatePercentageChange = (oldValue: number, newValue: number) => {
    return ((newValue - oldValue) / oldValue * 100).toFixed(1);
  };

  const getTotalChange = () => yearOverYearData.reduce((sum, item) => sum + item.change, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <ArrowUpDown className="w-10 h-10 text-blue-600" />
          UK Budget Comparison Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Compare UK government budgets across years, analyze spending trends, and evaluate policy proposals with comprehensive financial analysis.
        </p>
      </div>

      {/* Comparison Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Comparison Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Comparison Type</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-over-year">Year over Year</SelectItem>
                  <SelectItem value="historical">Historical Trends</SelectItem>
                  <SelectItem value="proposals">Policy Proposals</SelectItem>
                  <SelectItem value="international">International Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sector Focus</label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="defence">Defence</SelectItem>
                  <SelectItem value="social">Social Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Base Year</label>
              <Select value={baseYear} onValueChange={setBaseYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-23</SelectItem>
                  <SelectItem value="2021">2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compare Year</label>
              <Select value={compareYear} onValueChange={setCompareYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024-25</SelectItem>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-23</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget Change</p>
                <p className="text-2xl font-bold text-blue-600">£{getTotalChange().toLocaleString()}M</p>
                <p className="text-sm text-green-600">+5.2% from previous year</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Largest Increase</p>
                <p className="text-2xl font-bold text-green-600">Work & Pensions</p>
                <p className="text-sm text-gray-600">+£10,000M (+4.8%)</p>
              </div>
              <ArrowUpDown className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                <p className="text-2xl font-bold text-purple-600">85%</p>
                <p className="text-sm text-gray-600">Budget utilization rate</p>
              </div>
              <Calculator className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {comparisonType === "year-over-year" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Budget Changes</CardTitle>
              <CardDescription>Compare 2023-24 vs 2024-25 allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={yearOverYearData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`£${value}M`, '']} />
                  <Bar dataKey="year2023" fill="#8884d8" name="2023-24" />
                  <Bar dataKey="year2024" fill="#82ca9d" name="2024-25" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Change Analysis</CardTitle>
              <CardDescription>Detailed breakdown of year-over-year changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yearOverYearData.map((item) => (
                  <div key={item.department} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.department}</p>
                      <p className="text-xs text-gray-600">
                        £{item.year2023.toLocaleString()}M → £{item.year2024.toLocaleString()}M
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? '+' : ''}£{item.change.toLocaleString()}M
                      </p>
                      <p className={`text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {calculatePercentageChange(item.year2023, item.year2024)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {comparisonType === "historical" && (
        <Card>
          <CardHeader>
            <CardTitle>Historical Budget Trends (2020-2024)</CardTitle>
            <CardDescription>Track budget evolution across major departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={historicalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`£${value}M`, '']} />
                <Area type="monotone" dataKey="health" stackId="1" stroke="#8884d8" fill="#8884d8" name="Health" />
                <Area type="monotone" dataKey="education" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Education" />
                <Area type="monotone" dataKey="defence" stackId="1" stroke="#ffc658" fill="#ffc658" name="Defence" />
                <Area type="monotone" dataKey="pensions" stackId="1" stroke="#ff7300" fill="#ff7300" name="Pensions" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {comparisonType === "proposals" && (
        <Card>
          <CardHeader>
            <CardTitle>Policy Proposal Impact Analysis</CardTitle>
            <CardDescription>Compare current budget with proposed policy changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposalComparison.map((item) => (
                <div key={item.category} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{item.category}</h4>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">
                        +£{item.difference.toLocaleString()}M
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        (+{calculatePercentageChange(item.current, item.proposed)}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(item.current / item.proposed) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Current: £{item.current.toLocaleString()}M</span>
                    <span>Proposed: £{item.proposed.toLocaleString()}M</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Comparison
        </Button>
        <Button variant="outline">
          Generate Report
        </Button>
        <Button variant="outline">
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

export default UKBudgetComparison;
