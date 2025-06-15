
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart } from "recharts";
import { TrendingDown, Calculator, AlertTriangle, CheckCircle, Target, Download, FileText } from "lucide-react";

const GermanDeficitCalculator = () => {
  const [calculationType, setCalculationType] = useState("structural");
  const [gdpValue, setGdpValue] = useState("4259.9"); // billion EUR
  const [totalRevenue, setTotalRevenue] = useState("1842.5");
  const [totalExpenditure, setTotalExpenditure] = useState("1956.2");
  const [outputGap, setOutputGap] = useState("-1.2"); // % of potential GDP
  const [cyclicalRevenue, setCyclicalRevenue] = useState("18.4");
  const [cyclicalExpenditure, setCyclicalExpenditure] = useState("12.3");
  const [oneOffMeasures, setOneOffMeasures] = useState("0");

  // German fiscal data for historical analysis
  const historicalData = [
    { year: 2019, totalDeficit: -59.8, structuralDeficit: -35.2, cyclicalDeficit: -24.6, primaryBalance: -12.1, debtToGDP: 59.8 },
    { year: 2020, totalDeficit: -139.6, structuralDeficit: -89.4, cyclicalDeficit: -50.2, primaryBalance: -98.7, debtToGDP: 69.8 },
    { year: 2021, totalDeficit: -130.4, structuralDeficit: -95.1, cyclicalDeficit: -35.3, primaryBalance: -87.9, debtToGDP: 69.3 },
    { year: 2022, totalDeficit: -61.2, structuralDeficit: -58.9, cyclicalDeficit: -2.3, primaryBalance: -18.4, debtToGDP: 66.1 },
    { year: 2023, totalDeficit: -86.7, structuralDeficit: -74.2, cyclicalDeficit: -12.5, primaryBalance: -43.1, debtToGDP: 63.8 },
    { year: 2024, totalDeficit: -105.6, structuralDeficit: -89.3, cyclicalDeficit: -16.3, primaryBalance: -63.2, debtToGDP: 65.2 },
    { year: 2025, totalDeficit: -113.7, structuralDeficit: -98.5, cyclicalDeficit: -15.2, primaryBalance: -75.5, debtToGDP: 66.3 }
  ];

  const calculateDeficits = () => {
    const gdp = parseFloat(gdpValue);
    const revenue = parseFloat(totalRevenue);
    const expenditure = parseFloat(totalExpenditure);
    const gap = parseFloat(outputGap) / 100;
    const cyclRev = parseFloat(cyclicalRevenue);
    const cyclExp = parseFloat(cyclicalExpenditure);
    const oneOff = parseFloat(oneOffMeasures);

    // Nominal/Total Deficit
    const totalDeficit = revenue - expenditure;
    
    // Cyclical Component
    const cyclicalComponent = cyclRev - cyclExp;
    
    // Structural Deficit
    const structuralDeficit = totalDeficit - cyclicalComponent + oneOff;
    
    // Primary Balance (excluding interest payments)
    const interestPayments = expenditure * 0.08; // Assuming 8% of expenditure is interest
    const primaryBalance = totalDeficit + interestPayments;
    
    // Ratios to GDP
    const totalDeficitGDP = (totalDeficit / gdp) * 100;
    const structuralDeficitGDP = (structuralDeficit / gdp) * 100;
    const primaryBalanceGDP = (primaryBalance / gdp) * 100;

    // Debt brake compliance (0.35% of GDP maximum structural deficit)
    const debtBrakeLimit = gdp * 0.0035;
    const debtBrakeCompliance = structuralDeficit >= -debtBrakeLimit;

    // Maastricht compliance (3% of GDP maximum total deficit)
    const maastrichtLimit = gdp * 0.03;
    const maastrichtCompliance = totalDeficit >= -maastrichtLimit;

    return {
      totalDeficit,
      structuralDeficit,
      cyclicalComponent,
      primaryBalance,
      totalDeficitGDP,
      structuralDeficitGDP,
      primaryBalanceGDP,
      debtBrakeCompliance,
      maastrichtCompliance,
      debtBrakeLimit,
      maastrichtLimit
    };
  };

  const deficitResults = calculateDeficits();

  const getProjections = () => {
    const projections = [];
    const baseDeficit = deficitResults.structuralDeficit;
    
    for (let year = 2025; year <= 2030; year++) {
      const scenarioOptimistic = baseDeficit * Math.pow(0.85, year - 2024); // Improving by 15% annually
      const scenarioBaseline = baseDeficit * Math.pow(0.95, year - 2024); // Improving by 5% annually
      const scenarioConservative = baseDeficit * Math.pow(1.02, year - 2024); // Worsening by 2% annually
      
      projections.push({
        year,
        optimistic: scenarioOptimistic,
        baseline: scenarioBaseline,
        conservative: scenarioConservative,
        optimisticGDP: (scenarioOptimistic / parseFloat(gdpValue)) * 100,
        baselineGDP: (scenarioBaseline / parseFloat(gdpValue)) * 100,
        conservativeGDP: (scenarioConservative / parseFloat(gdpValue)) * 100
      });
    }
    
    return projections;
  };

  const projections = getProjections();

  const automaticStabilizers = [
    {
      component: "Unemployment Benefits",
      procyclical: false,
      impact: 8.2,
      description: "Increases during economic downturns"
    },
    {
      component: "Income Tax Revenue",
      procyclical: true,
      impact: 12.5,
      description: "Decreases during recessions"
    },
    {
      component: "Corporate Tax Revenue",
      procyclical: true,
      impact: 6.8,
      description: "Highly sensitive to business cycles"
    },
    {
      component: "VAT Revenue",
      procyclical: true,
      impact: 9.3,
      description: "Falls with reduced consumption"
    },
    {
      component: "Social Security Contributions",
      procyclical: true,
      impact: 11.1,
      description: "Linked to employment levels"
    }
  ];

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(1)}B`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getComplianceIcon = (isCompliant: boolean) => {
    return isCompliant ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-red-500" />
    );
  };

  const getDeficitTrend = () => {
    const recentYears = historicalData.slice(-3);
    const trend = recentYears[2].totalDeficit - recentYears[0].totalDeficit;
    return trend < 0 ? "worsening" : "improving";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            German Deficit Calculator - Advanced Fiscal Analysis
          </CardTitle>
          <p className="text-gray-600">
            Calculate and analyze Germany's budget deficit including structural, cyclical, and primary balance components with compliance monitoring
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structural">Structural Deficit</SelectItem>
                  <SelectItem value="cyclical">Cyclical Analysis</SelectItem>
                  <SelectItem value="primary">Primary Balance</SelectItem>
                  <SelectItem value="total">Total Deficit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gdp-value">GDP (Billion EUR)</Label>
              <Input
                id="gdp-value"
                type="number"
                value={gdpValue}
                onChange={(e) => setGdpValue(e.target.value)}
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="total-revenue">Total Revenue (Billion EUR)</Label>
              <Input
                id="total-revenue"
                type="number"
                value={totalRevenue}
                onChange={(e) => setTotalRevenue(e.target.value)}
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="total-expenditure">Total Expenditure (Billion EUR)</Label>
              <Input
                id="total-expenditure"
                type="number"
                value={totalExpenditure}
                onChange={(e) => setTotalExpenditure(e.target.value)}
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="output-gap">Output Gap (% of potential GDP)</Label>
              <Input
                id="output-gap"
                type="number"
                value={outputGap}
                onChange={(e) => setOutputGap(e.target.value)}
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="one-off-measures">One-off Measures (Billion EUR)</Label>
              <Input
                id="one-off-measures"
                type="number"
                value={oneOffMeasures}
                onChange={(e) => setOneOffMeasures(e.target.value)}
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Deficit</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatBillions(deficitResults.totalDeficit)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPercentage(deficitResults.totalDeficitGDP)} of GDP
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Structural Deficit</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatBillions(deficitResults.structuralDeficit)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPercentage(deficitResults.structuralDeficitGDP)} of GDP
                    </p>
                  </div>
                  <Calculator className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Primary Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(deficitResults.primaryBalance)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPercentage(deficitResults.primaryBalanceGDP)} of GDP
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cyclical Component</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatBillions(deficitResults.cyclicalComponent)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Output gap: {outputGap}%
                    </p>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="analysis" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analysis">Deficit Analysis</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Monitor</TabsTrigger>
              <TabsTrigger value="projections">Future Projections</TabsTrigger>
              <TabsTrigger value="stabilizers">Automatic Stabilizers</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Deficit Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [formatBillions(value), '']} />
                        <Area type="monotone" dataKey="totalDeficit" fill="#ff7300" fillOpacity={0.3} stroke="#ff7300" name="Total Deficit" />
                        <Line type="monotone" dataKey="structuralDeficit" stroke="#8884d8" strokeWidth={2} name="Structural Deficit" />
                        <Line type="monotone" dataKey="cyclicalDeficit" stroke="#00C49F" strokeWidth={2} name="Cyclical Deficit" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deficit Decomposition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        {
                          component: "Structural",
                          value: Math.abs(deficitResults.structuralDeficit),
                          percentage: Math.abs(deficitResults.structuralDeficit) / Math.abs(deficitResults.totalDeficit) * 100
                        },
                        {
                          component: "Cyclical",
                          value: Math.abs(deficitResults.cyclicalComponent),
                          percentage: Math.abs(deficitResults.cyclicalComponent) / Math.abs(deficitResults.totalDeficit) * 100
                        },
                        {
                          component: "One-off",
                          value: Math.abs(parseFloat(oneOffMeasures)),
                          percentage: Math.abs(parseFloat(oneOffMeasures)) / Math.abs(deficitResults.totalDeficit) * 100
                        }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="component" />
                        <YAxis />
                        <Tooltip formatter={(value: number, name: string) => [
                          name === 'value' ? formatBillions(value) : `${value.toFixed(1)}%`,
                          name === 'value' ? 'Amount' : 'Share'
                        ]} />
                        <Bar dataKey="value" fill="#8884d8" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Key Deficit Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Deficit Trend</h4>
                      <div className={`text-lg font-bold ${getDeficitTrend() === "improving" ? "text-green-600" : "text-red-600"}`}>
                        {getDeficitTrend() === "improving" ? "Improving" : "Worsening"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Over past 3 years
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Fiscal Stance</h4>
                      <div className="text-lg font-bold text-blue-600">
                        {deficitResults.structuralDeficit < 0 ? "Expansionary" : "Contractionary"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Structural position
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Interest Burden</h4>
                      <div className="text-lg font-bold text-orange-600">
                        {formatBillions(parseFloat(totalExpenditure) * 0.08)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Est. interest payments
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Debt Sustainability</h4>
                      <div className={`text-lg font-bold ${deficitResults.debtBrakeCompliance ? "text-green-600" : "text-red-600"}`}>
                        {deficitResults.debtBrakeCompliance ? "Sustainable" : "At Risk"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Long-term outlook
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>German Debt Brake Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getComplianceIcon(deficitResults.debtBrakeCompliance)}
                      <div>
                        <div className="font-semibold">
                          Structural Deficit Limit: 0.35% of GDP
                        </div>
                        <div className="text-sm text-gray-600">
                          Current: {formatPercentage(Math.abs(deficitResults.structuralDeficitGDP))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${deficitResults.debtBrakeCompliance ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          width: `${Math.min(Math.abs(deficitResults.structuralDeficitGDP) / 0.35 * 100, 100)}%`
                        }}
                      />
                    </div>
                    <div className="text-sm">
                      <strong>Status:</strong> {deficitResults.debtBrakeCompliance ? "Compliant" : "Non-compliant"}
                    </div>
                    <div className="text-sm text-gray-600">
                      The German debt brake (Schuldenbremse) limits the structural deficit to 0.35% of GDP for the federal government.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>EU Maastricht Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getComplianceIcon(deficitResults.maastrichtCompliance)}
                      <div>
                        <div className="font-semibold">
                          Total Deficit Limit: 3% of GDP
                        </div>
                        <div className="text-sm text-gray-600">
                          Current: {formatPercentage(Math.abs(deficitResults.totalDeficitGDP))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${deficitResults.maastrichtCompliance ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          width: `${Math.min(Math.abs(deficitResults.totalDeficitGDP) / 3 * 100, 100)}%`
                        }}
                      />
                    </div>
                    <div className="text-sm">
                      <strong>Status:</strong> {deficitResults.maastrichtCompliance ? "Compliant" : "Non-compliant"}
                    </div>
                    <div className="text-sm text-gray-600">
                      EU Stability and Growth Pact requires total government deficit below 3% of GDP.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fiscal Rules Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Rule</th>
                          <th className="text-left p-2">Limit</th>
                          <th className="text-left p-2">Current Value</th>
                          <th className="text-left p-2">Compliance</th>
                          <th className="text-left p-2">Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">German Debt Brake</td>
                          <td className="p-2">0.35% of GDP</td>
                          <td className="p-2">{formatPercentage(Math.abs(deficitResults.structuralDeficitGDP))}</td>
                          <td className="p-2">
                            <Badge variant={deficitResults.debtBrakeCompliance ? "default" : "destructive"}>
                              {deficitResults.debtBrakeCompliance ? "Compliant" : "Non-compliant"}
                            </Badge>
                          </td>
                          <td className="p-2">
                            {formatBillions(deficitResults.debtBrakeLimit + deficitResults.structuralDeficit)}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">EU Maastricht Deficit</td>
                          <td className="p-2">3.0% of GDP</td>
                          <td className="p-2">{formatPercentage(Math.abs(deficitResults.totalDeficitGDP))}</td>
                          <td className="p-2">
                            <Badge variant={deficitResults.maastrichtCompliance ? "default" : "destructive"}>
                              {deficitResults.maastrichtCompliance ? "Compliant" : "Non-compliant"}
                            </Badge>
                          </td>
                          <td className="p-2">
                            {formatBillions(deficitResults.maastrichtLimit + deficitResults.totalDeficit)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deficit Projections (2025-2030)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatBillions(value), '']} />
                      <Line type="monotone" dataKey="optimistic" stroke="#00C49F" strokeWidth={2} strokeDasharray="5 5" name="Optimistic" />
                      <Line type="monotone" dataKey="baseline" stroke="#8884d8" strokeWidth={3} name="Baseline" />
                      <Line type="monotone" dataKey="conservative" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" name="Conservative" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Optimistic Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> Strong economic growth, fiscal consolidation, structural reforms
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>2030 Deficit:</span>
                      <span className="font-semibold text-green-600">
                        {formatBillions(projections[projections.length - 1]?.optimistic || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>% of GDP:</span>
                      <span className="font-semibold">
                        {formatPercentage(projections[projections.length - 1]?.optimisticGDP || 0)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Baseline Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> Moderate growth, current policies continue
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>2030 Deficit:</span>
                      <span className="font-semibold">
                        {formatBillions(projections[projections.length - 1]?.baseline || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>% of GDP:</span>
                      <span className="font-semibold">
                        {formatPercentage(projections[projections.length - 1]?.baselineGDP || 0)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Conservative Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <strong>Assumptions:</strong> Economic headwinds, aging costs, limited reforms
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>2030 Deficit:</span>
                      <span className="font-semibold text-orange-600">
                        {formatBillions(projections[projections.length - 1]?.conservative || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>% of GDP:</span>
                      <span className="font-semibold">
                        {formatPercentage(projections[projections.length - 1]?.conservativeGDP || 0)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stabilizers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Automatic Stabilizers Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={automaticStabilizers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="component" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value}B EUR`, 'Impact']} />
                      <Bar dataKey="impact" fill={(entry) => entry.procyclical ? "#ff7300" : "#00C49F"} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Stabilizer Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {automaticStabilizers.map((stabilizer, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{stabilizer.component}</span>
                            <Badge 
                              variant={stabilizer.procyclical ? "destructive" : "default"}
                            >
                              {stabilizer.procyclical ? "Pro-cyclical" : "Counter-cyclical"}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {stabilizer.description}
                          </div>
                          <div className="text-sm font-semibold">
                            Impact: €{stabilizer.impact}B
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stabilization Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Total Stabilizer Effect</span>
                        <span className="font-semibold">
                          €{automaticStabilizers.reduce((sum, s) => sum + s.impact, 0).toFixed(1)}B
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Combined impact of all automatic stabilizers
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Stabilization Ratio</span>
                        <span className="font-semibold">0.35</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Portion of output shocks automatically offset
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Response Time</span>
                        <span className="font-semibold">Immediate</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        No policy lag for automatic responses
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
              Generate Deficit Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanDeficitCalculator;
