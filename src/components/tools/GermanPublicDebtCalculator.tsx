import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Calculator, Target, Clock } from "lucide-react";

const GermanPublicDebtCalculator = () => {
  const [selectedLevel, setSelectedLevel] = useState("federal");
  const [projectionYear, setProjectionYear] = useState("2030");
  const [customGDP, setCustomGDP] = useState("");
  const [customInterestRate, setCustomInterestRate] = useState("2.5");
  const [customDeficit, setCustomDeficit] = useState("");

  // German public debt data (in billions of euros)
  const debtData = {
    totalDebt: 2710.0,           // €2.71 trillion
    federalDebt: 1680.0,         // Federal government debt
    stateDebt: 650.0,            // State (Länder) debt
    municipalDebt: 170.0,        // Municipal debt
    socialSecurityDebt: 210.0,   // Social security funds debt
    gdp: 4090.0,                 // Current GDP
    debtToGDPRatio: 66.3,        // Debt-to-GDP ratio
    interestPayments: 38.2,      // Annual interest payments
    averageInterestRate: 1.4,    // Average interest rate on debt
    maturityProfile: [
      { year: "2025", maturity: 285.0 },
      { year: "2026", maturity: 320.0 },
      { year: "2027", maturity: 275.0 },
      { year: "2028", maturity: 245.0 },
      { year: "2029", maturity: 190.0 },
      { year: "2030+", maturity: 1395.0 }
    ]
  };

  const historicalDebt = [
    { year: "2019", debt: 2047, gdp: 3449, ratio: 59.4, interest: 42.8 },
    { year: "2020", debt: 2303, gdp: 3337, ratio: 69.0, interest: 40.2 },
    { year: "2021", debt: 2472, gdp: 3571, ratio: 69.2, interest: 38.9 },
    { year: "2022", debt: 2563, gdp: 3876, ratio: 66.1, interest: 37.5 },
    { year: "2023", debt: 2635, gdp: 4030, ratio: 65.4, interest: 36.8 },
    { year: "2024", debt: 2680, gdp: 4055, ratio: 66.1, interest: 37.2 },
    { year: "2025", debt: 2710, gdp: 4090, ratio: 66.3, interest: 38.2 }
  ];

  const euComparison = [
    { country: "Germany", debtRatio: 66.3, status: "Above limit" },
    { country: "France", debtRatio: 110.6, status: "Well above limit" },
    { country: "Italy", debtRatio: 144.4, status: "Well above limit" },
    { country: "Spain", debtRatio: 107.7, status: "Well above limit" },
    { country: "Netherlands", debtRatio: 47.4, status: "Below limit" },
    { country: "EU Limit", debtRatio: 60.0, status: "Maastricht Criterion" }
  ];

  const sustainabilityIndicators = {
    primaryBalance: -75.8,       // Primary balance (deficit without interest)
    debtStabilizingBalance: -2.8, // Required balance to stabilize debt
    ageingCosts: 4.2,           // Projected aging-related cost increase (% of GDP)
    s2Indicator: 2.1,           // S2 sustainability indicator
    fiscalSpace: 15.8           // Fiscal space before crisis threshold
  };

  // Create properly colored data for EU comparison chart
  const euComparisonData = [
    { country: "Germany", debtRatio: 66.3, status: "Above limit", color: "#ff8042" },
    { country: "France", debtRatio: 110.6, status: "Well above limit", color: "#ff8042" },
    { country: "Italy", debtRatio: 144.4, status: "Well above limit", color: "#ff8042" },
    { country: "Spain", debtRatio: 107.7, status: "Well above limit", color: "#ff8042" },
    { country: "Netherlands", debtRatio: 47.4, status: "Below limit", color: "#00C49F" },
    { country: "EU Limit", debtRatio: 60.0, status: "Maastricht Criterion", color: "#ff0000" }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000000);
  };

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const calculateDebtProjection = (years: number) => {
    const currentDebt = debtData.totalDebt;
    const gdp = customGDP ? parseFloat(customGDP) : debtData.gdp;
    const interestRate = parseFloat(customInterestRate) / 100;
    const deficitRate = customDeficit ? parseFloat(customDeficit) / 100 : 0.028; // 2.8% of GDP

    let debt = currentDebt;
    let projectedGDP = gdp;
    const projections = [];

    for (let i = 1; i <= years; i++) {
      const interestPayment = debt * interestRate;
      const primaryDeficit = projectedGDP * deficitRate;
      debt += interestPayment + primaryDeficit;
      projectedGDP *= 1.024; // 2.4% nominal GDP growth assumption
      
      projections.push({
        year: 2025 + i,
        debt: debt,
        gdp: projectedGDP,
        ratio: (debt / projectedGDP) * 100,
        interest: interestPayment
      });
    }

    return projections;
  };

  const projections = calculateDebtProjection(parseInt(projectionYear) - 2025);

  const getDebtLevelColor = (ratio: number) => {
    if (ratio <= 60) return "text-green-600";
    if (ratio <= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getDebtLevelStatus = (ratio: number) => {
    if (ratio <= 60) return "Sustainable";
    if (ratio <= 90) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Public Debt Calculator - Sustainability Analysis
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive analysis of Germany's public debt, sustainability metrics, and long-term projections
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="debt-level">Government Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="federal">Federal Government</SelectItem>
                  <SelectItem value="state">State Governments</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                  <SelectItem value="total">Total Public Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="projection-year">Project to Year</Label>
              <Select value={projectionYear} onValueChange={setProjectionYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2030">2030</SelectItem>
                  <SelectItem value="2035">2035</SelectItem>
                  <SelectItem value="2040">2040</SelectItem>
                  <SelectItem value="2050">2050</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                value={customInterestRate}
                onChange={(e) => setCustomInterestRate(e.target.value)}
                placeholder="2.5"
              />
            </div>
            <div>
              <Label htmlFor="custom-gdp">Custom GDP (€B)</Label>
              <Input
                id="custom-gdp"
                value={customGDP}
                onChange={(e) => setCustomGDP(e.target.value)}
                placeholder={debtData.gdp.toString()}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Public Debt</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatBillions(debtData.totalDebt)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Debt-to-GDP Ratio</p>
                    <p className={`text-2xl font-bold ${getDebtLevelColor(debtData.debtToGDPRatio)}`}>
                      {debtData.debtToGDPRatio}%
                    </p>
                  </div>
                  <Badge variant="outline" className="text-orange-600">
                    EU: 60%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interest Payments</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(debtData.interestPayments)}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sustainability</p>
                    <p className={`text-lg font-bold ${getDebtLevelColor(debtData.debtToGDPRatio)}`}>
                      {getDebtLevelStatus(debtData.debtToGDPRatio)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="composition">Debt Composition</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="projections">Projections</TabsTrigger>
              <TabsTrigger value="comparison">EU Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Debt Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={historicalDebt}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="debt" fill="#8884d8" name="Debt (€B)" />
                        <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="#ff7300" strokeWidth={2} name="Debt-to-GDP (%)" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Debt Maturity Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={debtData.maturityProfile}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatBillions(value as number), 'Maturity']} />
                        <Bar dataKey="maturity" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="composition" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Debt by Government Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Federal Government</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatBillions(debtData.federalDebt)}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({((debtData.federalDebt / debtData.totalDebt) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-blue-500" 
                          style={{ width: `${(debtData.federalDebt / debtData.totalDebt) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span>State Governments</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatBillions(debtData.stateDebt)}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({((debtData.stateDebt / debtData.totalDebt) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-green-500" 
                          style={{ width: `${(debtData.stateDebt / debtData.totalDebt) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Municipal</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatBillions(debtData.municipalDebt)}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({((debtData.municipalDebt / debtData.totalDebt) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-yellow-500" 
                          style={{ width: `${(debtData.municipalDebt / debtData.totalDebt) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Social Security</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatBillions(debtData.socialSecurityDebt)}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({((debtData.socialSecurityDebt / debtData.totalDebt) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-purple-500" 
                          style={{ width: `${(debtData.socialSecurityDebt / debtData.totalDebt) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Debt Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Interest Rate</span>
                      <span className="font-semibold">{debtData.averageInterestRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Interest/Revenue Ratio</span>
                      <span className="font-semibold">10.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Debt per Capita</span>
                      <span className="font-semibold">€32,580</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Annual Debt Change</span>
                      <span className="font-semibold text-red-600">+€30B</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Maastricht Compliance</span>
                      <Badge variant="destructive">Non-compliant</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sustainability Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Primary Balance</span>
                      <span className="font-semibold text-red-600">
                        {formatBillions(sustainabilityIndicators.primaryBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Debt-Stabilizing Balance</span>
                      <span className="font-semibold">
                        {formatBillions(sustainabilityIndicators.debtStabilizingBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Aging Costs (2025-2070)</span>
                      <span className="font-semibold text-orange-600">
                        +{sustainabilityIndicators.ageingCosts}% of GDP
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>S2 Indicator</span>
                      <span className="font-semibold">
                        {sustainabilityIndicators.s2Indicator}% of GDP
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fiscal Space</span>
                      <span className="font-semibold text-green-600">
                        {sustainabilityIndicators.fiscalSpace}% of GDP
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Medium-term sustainability risk</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Risk Factors:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Aging population increasing healthcare and pension costs</li>
                        <li>• Rising interest rates affecting debt service costs</li>
                        <li>• Potential economic slowdowns reducing revenues</li>
                        <li>• Climate change adaptation investments needed</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Mitigating Factors:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Strong institutional framework (debt brake)</li>
                        <li>• High credit rating and market confidence</li>
                        <li>• Diversified economy with strong exports</li>
                        <li>• Moderate debt levels compared to EU peers</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Debt Projections to {projectionYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={[...historicalDebt, ...projections]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area yAxisId="left" dataKey="debt" fill="#8884d8" fillOpacity={0.3} name="Debt (€B)" />
                      <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="#ff7300" strokeWidth={2} name="Debt-to-GDP (%)" />
                      <Line yAxisId="right" type="monotone" dataKey={60} stroke="#ff0000" strokeDasharray="5 5" name="Maastricht Limit" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {projections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Projection Results for {projectionYear}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Projected Debt</div>
                        <div className="text-xl font-bold">
                          {formatBillions(projections[projections.length - 1].debt)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Debt-to-GDP Ratio</div>
                        <div className={`text-xl font-bold ${getDebtLevelColor(projections[projections.length - 1].ratio)}`}>
                          {projections[projections.length - 1].ratio.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Annual Interest</div>
                        <div className="text-xl font-bold">
                          {formatBillions(projections[projections.length - 1].interest)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Sustainability</div>
                        <div className={`text-lg font-bold ${getDebtLevelColor(projections[projections.length - 1].ratio)}`}>
                          {getDebtLevelStatus(projections[projections.length - 1].ratio)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>EU Debt Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={euComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Debt-to-GDP Ratio']} />
                      <Bar dataKey="debtRatio">
                        {euComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanPublicDebtCalculator;
