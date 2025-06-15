
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Download, FileText } from "lucide-react";

const GermanFiscalImpactTool = () => {
  const [policyType, setPolicyType] = useState("tax-change");
  const [impactAmount, setImpactAmount] = useState("10000000000"); // 10 billion EUR
  const [timeHorizon, setTimeHorizon] = useState("5");
  const [implementationYear, setImplementationYear] = useState("2026");
  const [multiplierEffect, setMultiplierEffect] = useState("1.2");

  // Sample baseline economic data
  const baselineData = {
    gdp: 4259.9, // billion EUR
    totalRevenue: 1842.5,
    totalExpenditure: 1956.2,
    deficit: -113.7,
    debtToGDP: 66.3,
    growthRate: 1.2,
    unemploymentRate: 5.8,
    inflationRate: 2.1
  };

  const calculateFiscalImpact = () => {
    const amount = parseFloat(impactAmount) / 1000000000; // Convert to billions
    const years = parseInt(timeHorizon);
    const multiplier = parseFloat(multiplierEffect);
    
    const impacts = [];
    
    for (let year = 0; year <= years; year++) {
      const baseYear = parseInt(implementationYear) + year;
      
      let revenueImpact = 0;
      let expenditureImpact = 0;
      let gdpImpact = 0;
      
      switch (policyType) {
        case "tax-increase":
          revenueImpact = amount * (1 - year * 0.05); // Diminishing returns
          gdpImpact = -amount * 0.3 * multiplier; // Negative GDP impact
          break;
        case "tax-reduction":
          revenueImpact = -amount;
          gdpImpact = amount * 0.5 * multiplier; // Positive GDP impact
          break;
        case "spending-increase":
          expenditureImpact = amount;
          gdpImpact = amount * 0.8 * multiplier; // Fiscal multiplier effect
          break;
        case "spending-cut":
          expenditureImpact = -amount;
          gdpImpact = -amount * 0.6 * multiplier; // Negative GDP impact
          break;
        case "infrastructure":
          expenditureImpact = amount;
          gdpImpact = amount * 1.5 * multiplier * (1 + year * 0.1); // Growing returns
          break;
      }
      
      const newRevenue = baselineData.totalRevenue + revenueImpact;
      const newExpenditure = baselineData.totalExpenditure + expenditureImpact;
      const newDeficit = newRevenue - newExpenditure;
      const newGDP = baselineData.gdp + gdpImpact;
      const newDebtToGDP = ((baselineData.debtToGDP / 100) * baselineData.gdp - newDeficit) / newGDP * 100;
      
      impacts.push({
        year: baseYear,
        revenue: newRevenue,
        expenditure: newExpenditure,
        deficit: newDeficit,
        gdp: newGDP,
        debtToGDP: newDebtToGDP,
        revenueChange: revenueImpact,
        expenditureChange: expenditureImpact,
        gdpChange: gdpImpact
      });
    }
    
    return impacts;
  };

  const fiscalImpacts = calculateFiscalImpact();

  const policyOptions = [
    { value: "tax-increase", label: "Tax Increase", icon: TrendingUp },
    { value: "tax-reduction", label: "Tax Reduction", icon: TrendingDown },
    { value: "spending-increase", label: "Government Spending Increase", icon: TrendingUp },
    { value: "spending-cut", label: "Government Spending Cut", icon: TrendingDown },
    { value: "infrastructure", label: "Infrastructure Investment", icon: CheckCircle }
  ];

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const getImpactColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getImpactIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Fiscal Impact Assessment Tool
          </CardTitle>
          <p className="text-gray-600">
            Analyze the fiscal and economic impact of proposed policy changes on Germany's budget and economy
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="policy-type">Policy Type</Label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {policyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="impact-amount">Policy Amount (EUR)</Label>
              <Input
                id="impact-amount"
                type="number"
                value={impactAmount}
                onChange={(e) => setImpactAmount(e.target.value)}
                placeholder="10000000000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Annual impact: {formatBillions(parseFloat(impactAmount || "0") / 1000000000)}
              </p>
            </div>
            <div>
              <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
              <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="implementation-year">Implementation Year</Label>
              <Select value={implementationYear} onValueChange={setImplementationYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="multiplier-effect">Fiscal Multiplier</Label>
              <Select value={multiplierEffect} onValueChange={setMultiplierEffect}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.8">Conservative (0.8)</SelectItem>
                  <SelectItem value="1.2">Moderate (1.2)</SelectItem>
                  <SelectItem value="1.5">Optimistic (1.5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="impact-summary" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="impact-summary">Impact Summary</TabsTrigger>
              <TabsTrigger value="projections">Fiscal Projections</TabsTrigger>
              <TabsTrigger value="economic-effects">Economic Effects</TabsTrigger>
              <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="impact-summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Revenue Impact</p>
                        <p className={`text-2xl font-bold ${getImpactColor(fiscalImpacts[0]?.revenueChange || 0)}`}>
                          {formatBillions(fiscalImpacts[0]?.revenueChange || 0)}
                        </p>
                      </div>
                      {getImpactIcon(fiscalImpacts[0]?.revenueChange || 0)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Expenditure Impact</p>
                        <p className={`text-2xl font-bold ${getImpactColor(fiscalImpacts[0]?.expenditureChange || 0)}`}>
                          {formatBillions(fiscalImpacts[0]?.expenditureChange || 0)}
                        </p>
                      </div>
                      {getImpactIcon(fiscalImpacts[0]?.expenditureChange || 0)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">GDP Impact</p>
                        <p className={`text-2xl font-bold ${getImpactColor(fiscalImpacts[0]?.gdpChange || 0)}`}>
                          {formatBillions(fiscalImpacts[0]?.gdpChange || 0)}
                        </p>
                      </div>
                      {getImpactIcon(fiscalImpacts[0]?.gdpChange || 0)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Deficit Impact</p>
                        <p className={`text-2xl font-bold ${getImpactColor(fiscalImpacts[0]?.deficit - baselineData.deficit || 0)}`}>
                          {formatBillions((fiscalImpacts[0]?.deficit || 0) - baselineData.deficit)}
                        </p>
                      </div>
                      {getImpactIcon((fiscalImpacts[0]?.deficit || 0) - baselineData.deficit)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Impact Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Policy Type:</span>
                      <Badge variant="outline">
                        {policyOptions.find(p => p.value === policyType)?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Implementation Timeline:</span>
                      <span className="font-semibold">{implementationYear} - {parseInt(implementationYear) + parseInt(timeHorizon)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Annual Policy Size:</span>
                      <span className="font-semibold">{formatBillions(parseFloat(impactAmount) / 1000000000)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fiscal Multiplier:</span>
                      <span className="font-semibold">{multiplierEffect}x</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Cumulative GDP Impact:</span>
                      <span className={`font-semibold ${getImpactColor(fiscalImpacts.reduce((sum, year) => sum + (year.gdpChange || 0), 0))}`}>
                        {formatBillions(fiscalImpacts.reduce((sum, year) => sum + (year.gdpChange || 0), 0))}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      {(fiscalImpacts[0]?.deficit || 0) / (fiscalImpacts[0]?.gdp || 1) * 100 <= 3 ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm">
                        EU Deficit Rule (3% of GDP): {((fiscalImpacts[0]?.deficit || 0) / (fiscalImpacts[0]?.gdp || 1) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(fiscalImpacts[0]?.debtToGDP || 0) <= 60 ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm">
                        EU Debt Rule (60% of GDP): {(fiscalImpacts[0]?.debtToGDP || 0).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {parseFloat(impactAmount) / 1000000000 / (fiscalImpacts[0]?.gdp || 1) * 100 <= 0.5 ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                      )}
                      <span className="text-sm">
                        Debt Brake Compliance: {(parseFloat(impactAmount) / 1000000000 / (fiscalImpacts[0]?.gdp || 1) * 100).toFixed(2)}% of GDP
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fiscal Balance Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={fiscalImpacts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatBillions(value), '']} />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue" />
                      <Line type="monotone" dataKey="expenditure" stroke="#82ca9d" strokeWidth={2} name="Expenditure" />
                      <Line type="monotone" dataKey="deficit" stroke="#ff7300" strokeWidth={2} name="Balance" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Debt-to-GDP Ratio Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={fiscalImpacts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Debt-to-GDP']} />
                      <Area type="monotone" dataKey="debtToGDP" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Reference:</strong> EU Maastricht criterion requires debt-to-GDP ratio below 60%. 
                      German debt brake limits structural deficit to 0.35% of GDP.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="economic-effects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>GDP Impact Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={fiscalImpacts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatBillions(value), 'GDP']} />
                      <Area type="monotone" dataKey="gdp" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Economic Multiplier Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Direct Economic Impact</span>
                        <span className="font-semibold">{formatBillions(parseFloat(impactAmount) / 1000000000)}</span>
                      </div>
                      <div className="text-sm text-gray-600">Initial policy amount</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Multiplier Effect</span>
                        <span className="font-semibold">{multiplierEffect}x</span>
                      </div>
                      <div className="text-sm text-gray-600">Applied fiscal multiplier</div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Total GDP Impact (Year 1)</span>
                        <span className={`font-semibold ${getImpactColor(fiscalImpacts[0]?.gdpChange || 0)}`}>
                          {formatBillions(fiscalImpacts[0]?.gdpChange || 0)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Including multiplier effects</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Secondary Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Employment Impact</div>
                      <div className="text-sm text-gray-600">
                        Estimated {Math.abs((fiscalImpacts[0]?.gdpChange || 0) * 20000).toLocaleString()} jobs {(fiscalImpacts[0]?.gdpChange || 0) > 0 ? 'created' : 'affected'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Tax Revenue Feedback</div>
                      <div className="text-sm text-gray-600">
                        Additional tax revenue from economic activity: {formatBillions((fiscalImpacts[0]?.gdpChange || 0) * 0.2)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Regional Distribution</div>
                      <div className="text-sm text-gray-600">
                        Impact varies by federal state and economic structure
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Optimistic Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> High fiscal multiplier (1.5x), strong economic growth, positive market response
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>GDP Impact:</span>
                        <span className="font-semibold text-green-600">
                          {formatBillions((fiscalImpacts[0]?.gdpChange || 0) * 1.25)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deficit Impact:</span>
                        <span className="font-semibold">
                          {formatBillions(((fiscalImpacts[0]?.deficit || 0) - baselineData.deficit) * 0.8)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employment:</span>
                        <span className="font-semibold text-green-600">
                          +{Math.abs((fiscalImpacts[0]?.gdpChange || 0) * 25000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Base Case Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> Current multiplier settings, moderate economic conditions
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>GDP Impact:</span>
                        <span className="font-semibold">
                          {formatBillions(fiscalImpacts[0]?.gdpChange || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deficit Impact:</span>
                        <span className="font-semibold">
                          {formatBillions((fiscalImpacts[0]?.deficit || 0) - baselineData.deficit)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employment:</span>
                        <span className="font-semibold">
                          {(fiscalImpacts[0]?.gdpChange || 0) > 0 ? '+' : ''}{Math.abs((fiscalImpacts[0]?.gdpChange || 0) * 20000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Conservative Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> Low fiscal multiplier (0.8x), economic headwinds, market uncertainty
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>GDP Impact:</span>
                        <span className="font-semibold text-red-600">
                          {formatBillions((fiscalImpacts[0]?.gdpChange || 0) * 0.6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deficit Impact:</span>
                        <span className="font-semibold">
                          {formatBillions(((fiscalImpacts[0]?.deficit || 0) - baselineData.deficit) * 1.2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employment:</span>
                        <span className="font-semibold text-red-600">
                          {(fiscalImpacts[0]?.gdpChange || 0) > 0 ? '+' : ''}{Math.abs((fiscalImpacts[0]?.gdpChange || 0) * 12000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Analysis
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Impact Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanFiscalImpactTool;
