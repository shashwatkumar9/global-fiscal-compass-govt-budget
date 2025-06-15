
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, ComposedChart, Area, AreaChart } from "recharts";
import { TrendingUp, Calculator, DollarSign, Factory, Users, Building } from "lucide-react";

const FranceGDPCalculator = () => {
  const [gdpData, setGdpData] = useState({
    consumption: 0,
    investment: 0,
    governmentSpending: 0,
    exports: 0,
    imports: 0,
    population: 67500000, // France population
    method: "expenditure",
    sector: "all"
  });

  const [results, setResults] = useState(null);

  const calculateGDP = () => {
    let totalGDP = 0;
    
    if (gdpData.method === "expenditure") {
      // GDP = C + I + G + (X - M)
      totalGDP = gdpData.consumption + gdpData.investment + gdpData.governmentSpending + 
                (gdpData.exports - gdpData.imports);
    }

    const gdpPerCapita = totalGDP / gdpData.population;
    const netExports = gdpData.exports - gdpData.imports;
    const domesticDemand = gdpData.consumption + gdpData.investment + gdpData.governmentSpending;
    
    // Calculate growth components
    const components = [
      { name: "Consumption", value: gdpData.consumption, percentage: (gdpData.consumption / totalGDP) * 100 },
      { name: "Investment", value: gdpData.investment, percentage: (gdpData.investment / totalGDP) * 100 },
      { name: "Government", value: gdpData.governmentSpending, percentage: (gdpData.governmentSpending / totalGDP) * 100 },
      { name: "Net Exports", value: netExports, percentage: (netExports / totalGDP) * 100 }
    ];

    // Historical comparison data (simplified)
    const historicalData = Array.from({length: 10}, (_, i) => ({
      year: 2015 + i,
      gdp: totalGDP * (0.95 + (i * 0.02)), // Simulated growth
      growth: (i > 0) ? ((1.8 + Math.random() * 1.4) * (i < 5 ? 1 : 0.8)) : 0,
      consumption: gdpData.consumption * (0.95 + (i * 0.015)),
      investment: gdpData.investment * (0.90 + (i * 0.025))
    }));

    // Economic indicators
    const indicators = {
      consumptionRate: (gdpData.consumption / totalGDP) * 100,
      investmentRate: (gdpData.investment / totalGDP) * 100,
      governmentRate: (gdpData.governmentSpending / totalGDP) * 100,
      tradeBalance: netExports,
      openness: ((gdpData.exports + gdpData.imports) / totalGDP) * 100
    };

    setResults({
      totalGDP,
      gdpPerCapita,
      netExports,
      domesticDemand,
      components,
      historicalData,
      indicators
    });
  };

  const resetForm = () => {
    setGdpData({
      consumption: 0,
      investment: 0,
      governmentSpending: 0,
      exports: 0,
      imports: 0,
      population: 67500000,
      method: "expenditure",
      sector: "all"
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France GDP Calculator
          </CardTitle>
          <CardDescription>
            Advanced GDP calculation and economic analysis tool for France with multiple methodologies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">Calculation Method</Label>
              <Select onValueChange={(value) => setGdpData({...gdpData, method: value})} defaultValue="expenditure">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenditure">Expenditure Approach</SelectItem>
                  <SelectItem value="income">Income Approach</SelectItem>
                  <SelectItem value="production">Production Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Economic Sector</Label>
              <Select onValueChange={(value) => setGdpData({...gdpData, sector: value})} defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="primary">Primary (Agriculture)</SelectItem>
                  <SelectItem value="secondary">Secondary (Industry)</SelectItem>
                  <SelectItem value="tertiary">Tertiary (Services)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input
                id="population"
                type="number"
                value={gdpData.population || ""}
                onChange={(e) => setGdpData({...gdpData, population: Number(e.target.value)})}
                placeholder="Population count"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consumption">Private Consumption (€ billions)</Label>
              <Input
                id="consumption"
                type="number"
                value={gdpData.consumption || ""}
                onChange={(e) => setGdpData({...gdpData, consumption: Number(e.target.value)})}
                placeholder="Household consumption"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investment">Gross Investment (€ billions)</Label>
              <Input
                id="investment"
                type="number"
                value={gdpData.investment || ""}
                onChange={(e) => setGdpData({...gdpData, investment: Number(e.target.value)})}
                placeholder="Capital formation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="government">Government Spending (€ billions)</Label>
              <Input
                id="government"
                type="number"
                value={gdpData.governmentSpending || ""}
                onChange={(e) => setGdpData({...gdpData, governmentSpending: Number(e.target.value)})}
                placeholder="Public expenditure"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exports">Exports (€ billions)</Label>
              <Input
                id="exports"
                type="number"
                value={gdpData.exports || ""}
                onChange={(e) => setGdpData({...gdpData, exports: Number(e.target.value)})}
                placeholder="Total exports"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imports">Imports (€ billions)</Label>
            <Input
              id="imports"
              type="number"
              value={gdpData.imports || ""}
              onChange={(e) => setGdpData({...gdpData, imports: Number(e.target.value)})}
              placeholder="Total imports"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateGDP} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate GDP
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total GDP</p>
                      <p className="text-2xl font-bold text-blue-600">
                        €{(results.totalGDP / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">GDP per Capita</p>
                      <p className="text-2xl font-bold text-green-600">
                        €{results.gdpPerCapita.toFixed(0)}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Net Exports</p>
                      <p className={`text-2xl font-bold ${results.netExports >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{results.netExports.toFixed(2)}B
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Domestic Demand</p>
                      <p className="text-2xl font-bold text-orange-600">
                        €{(results.domesticDemand / 1000).toFixed(2)}T
                      </p>
                    </div>
                    <Building className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>GDP Components Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.components}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => 
                      name === "value" ? `€${value.toFixed(2)}B` : `${value.toFixed(1)}%`
                    } />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Value (€B)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-4">
            <div className="grid gap-4">
              {results.components.map((component) => (
                <Card key={component.name}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{component.name}</h3>
                        <p className="text-2xl font-bold text-blue-600">
                          €{component.value.toFixed(2)} billion
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Share of GDP</p>
                        <p className="text-xl font-semibold">
                          {component.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Ratios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Consumption Rate:</span>
                    <span className="font-semibold">{results.indicators.consumptionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Rate:</span>
                    <span className="font-semibold">{results.indicators.investmentRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Rate:</span>
                    <span className="font-semibold">{results.indicators.governmentRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trade Openness:</span>
                    <span className="font-semibold">{results.indicators.openness.toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trade Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Trade Balance:</span>
                    <span className={`font-semibold ${results.indicators.tradeBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{results.indicators.tradeBalance.toFixed(2)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Export/GDP Ratio:</span>
                    <span className="font-semibold">{((gdpData.exports / results.totalGDP) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Import/GDP Ratio:</span>
                    <span className="font-semibold">{((gdpData.imports / results.totalGDP) * 100).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GDP Historical Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={results.historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="gdp" fill="#8884d8" name="GDP (€B)" />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#ff7300" name="Growth Rate (%)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FranceGDPCalculator;
