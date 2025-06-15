
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area, AreaChart } from "recharts";
import { TrendingUp, Calculator, Globe, Building, Users, DollarSign } from "lucide-react";

const GermanGDPCalculator = () => {
  const [calculationMethod, setCalculationMethod] = useState("expenditure");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [inflation, setInflation] = useState("2.1");
  const [customConsumption, setCustomConsumption] = useState("");
  const [customInvestment, setCustomInvestment] = useState("");
  const [customGovernment, setCustomGovernment] = useState("");
  const [customExports, setCustomExports] = useState("");
  const [customImports, setCustomImports] = useState("");

  // German GDP data (in billions of euros)
  const germanGDPData = {
    nominalGDP: 4090.00, // €4.09 trillion
    realGDP: 3850.00,    // €3.85 trillion (2015 prices)
    gdpPerCapita: 49200,
    gdpGrowth: 1.4,      // 1.4% growth
    population: 83200000,
    
    // Expenditure approach components
    expenditure: {
      consumption: 2450.00,    // Private consumption
      investment: 820.00,      // Gross fixed capital formation
      government: 780.00,      // Government expenditure
      exports: 1890.00,        // Exports of goods and services
      imports: 1850.00         // Imports of goods and services
    },
    
    // Income approach components
    income: {
      wages: 1950.00,          // Compensation of employees
      profits: 720.00,         // Operating surplus
      taxes: 320.00,           // Taxes on production
      depreciation: 600.00,    // Consumption of fixed capital
      netFactor: -500.00       // Net factor income from abroad
    },
    
    // Production approach by sector
    production: {
      agriculture: 25.00,      // 0.6%
      industry: 1020.00,       // 24.9%
      manufacturing: 920.00,   // 22.5%
      construction: 220.00,    // 5.4%
      services: 2750.00,       // 67.2%
      publicSector: 280.00     // 6.8%
    }
  };

  const historicalData = [
    { year: "2019", nominal: 3449, real: 3449, growth: 1.1 },
    { year: "2020", nominal: 3337, real: 3217, growth: -3.7 },
    { year: "2021", nominal: 3571, real: 3306, growth: 2.6 },
    { year: "2022", nominal: 3876, real: 3388, growth: 1.8 },
    { year: "2023", nominal: 4030, real: 3850, growth: -0.3 },
    { year: "2024", nominal: 4055, real: 3850, growth: 0.0 },
    { year: "2025", nominal: 4090, real: 3904, growth: 1.4 }
  ];

  const sectorData = Object.entries(germanGDPData.production).map(([sector, value]) => ({
    sector: sector.charAt(0).toUpperCase() + sector.slice(1),
    value: value,
    percentage: ((value / germanGDPData.nominalGDP) * 100).toFixed(1)
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000000);
  };

  const formatBillions = (amount: number) => {
    return `€${amount.toFixed(0)}B`;
  };

  const calculateExpenditureGDP = () => {
    const consumption = customConsumption ? parseFloat(customConsumption) : germanGDPData.expenditure.consumption;
    const investment = customInvestment ? parseFloat(customInvestment) : germanGDPData.expenditure.investment;
    const government = customGovernment ? parseFloat(customGovernment) : germanGDPData.expenditure.government;
    const exports = customExports ? parseFloat(customExports) : germanGDPData.expenditure.exports;
    const imports = customImports ? parseFloat(customImports) : germanGDPData.expenditure.imports;

    return consumption + investment + government + (exports - imports);
  };

  const calculateIncomeGDP = () => {
    const { wages, profits, taxes, depreciation, netFactor } = germanGDPData.income;
    return wages + profits + taxes + depreciation + netFactor;
  };

  const calculateProductionGDP = () => {
    return Object.values(germanGDPData.production).reduce((sum, value) => sum + value, 0);
  };

  const getRealGDP = (nominalGDP: number, inflationRate: number) => {
    return nominalGDP / (1 + inflationRate / 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            German GDP Calculator - Comprehensive Economic Analysis
          </CardTitle>
          <p className="text-gray-600">
            Calculate Germany's GDP using expenditure, income, and production approaches with real-time adjustments
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="calculation-method">Calculation Method</Label>
              <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenditure">Expenditure Approach (C+I+G+NX)</SelectItem>
                  <SelectItem value="income">Income Approach</SelectItem>
                  <SelectItem value="production">Production Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025 (Projected)</SelectItem>
                  <SelectItem value="2024">2024 (Estimated)</SelectItem>
                  <SelectItem value="2023">2023 (Actual)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="inflation">Inflation Rate (%)</Label>
              <Input
                id="inflation"
                value={inflation}
                onChange={(e) => setInflation(e.target.value)}
                placeholder="2.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nominal GDP</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatBillions(germanGDPData.nominalGDP)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Real GDP</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatBillions(getRealGDP(germanGDPData.nominalGDP, parseFloat(inflation)))}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">GDP per Capita</p>
                    <p className="text-2xl font-bold text-purple-600">
                      €{germanGDPData.gdpPerCapita.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">GDP Growth</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {germanGDPData.gdpGrowth}%
                    </p>
                  </div>
                  <Badge variant="outline" className="text-orange-600">
                    YoY
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={calculationMethod} onValueChange={setCalculationMethod} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="expenditure">Expenditure Method</TabsTrigger>
              <TabsTrigger value="income">Income Method</TabsTrigger>
              <TabsTrigger value="production">Production Method</TabsTrigger>
            </TabsList>

            <TabsContent value="expenditure" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GDP Components (C + I + G + NX)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="consumption">Consumption (C)</Label>
                        <Input
                          id="consumption"
                          value={customConsumption}
                          onChange={(e) => setCustomConsumption(e.target.value)}
                          placeholder={germanGDPData.expenditure.consumption.toString()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="investment">Investment (I)</Label>
                        <Input
                          id="investment"
                          value={customInvestment}
                          onChange={(e) => setCustomInvestment(e.target.value)}
                          placeholder={germanGDPData.expenditure.investment.toString()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="government">Government (G)</Label>
                        <Input
                          id="government"
                          value={customGovernment}
                          onChange={(e) => setCustomGovernment(e.target.value)}
                          placeholder={germanGDPData.expenditure.government.toString()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="exports">Exports</Label>
                        <Input
                          id="exports"
                          value={customExports}
                          onChange={(e) => setCustomExports(e.target.value)}
                          placeholder={germanGDPData.expenditure.exports.toString()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="imports">Imports</Label>
                        <Input
                          id="imports"
                          value={customImports}
                          onChange={(e) => setCustomImports(e.target.value)}
                          placeholder={germanGDPData.expenditure.imports.toString()}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Calculated GDP:</span>
                        <span className="font-bold text-lg">
                          {formatBillions(calculateExpenditureGDP())}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Formula: C + I + G + (X - M)
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expenditure Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: 'Consumption', value: germanGDPData.expenditure.consumption },
                        { name: 'Investment', value: germanGDPData.expenditure.investment },
                        { name: 'Government', value: germanGDPData.expenditure.government },
                        { name: 'Net Exports', value: germanGDPData.expenditure.exports - germanGDPData.expenditure.imports }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatBillions(value as number), 'Value']} />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(germanGDPData.income).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-semibold">{formatBillions(value)}</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total GDP (Income):</span>
                        <span>{formatBillions(calculateIncomeGDP())}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Income Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(germanGDPData.income).map(([key, value]) => ({
                        name: key.replace(/([A-Z])/g, ' $1').trim(),
                        value: Math.abs(value)
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatBillions(value as number), 'Value']} />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="production" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GDP by Sector</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sectorData.map((item, index) => (
                        <div key={item.sector}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.sector}</span>
                            <div className="text-right">
                              <span className="text-sm font-semibold">{formatBillions(item.value)}</span>
                              <span className="text-xs text-gray-600 ml-2">({item.percentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total GDP (Production):</span>
                      <span>{formatBillions(calculateProductionGDP())}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sectoral Contribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sectorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatBillions(value as number), 'Value']} />
                        <Bar dataKey="value" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Historical GDP Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="nominal" fill="#8884d8" name="Nominal GDP (€B)" />
                  <Bar yAxisId="left" dataKey="real" fill="#82ca9d" name="Real GDP (€B)" />
                  <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#ff7300" strokeWidth={2} name="Growth Rate (%)" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanGDPCalculator;
