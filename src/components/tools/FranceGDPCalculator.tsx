
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

const FranceGDPCalculator = () => {
  const [gdpData, setGdpData] = useState({
    consumption: 0,
    investment: 0,
    government: 0,
    exports: 0,
    imports: 0
  });

  const [result, setResult] = useState<{ gdp: number; components: Array<{name: string; value: number}> } | null>(null);

  const calculateGDP = () => {
    const gdp = gdpData.consumption + gdpData.investment + gdpData.government + gdpData.exports - gdpData.imports;
    
    const components = [
      { name: "Consumption", value: gdpData.consumption },
      { name: "Investment", value: gdpData.investment },
      { name: "Government", value: gdpData.government },
      { name: "Exports", value: gdpData.exports },
      { name: "Imports", value: -gdpData.imports }
    ];

    setResult({ gdp, components });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            France GDP Calculator
          </CardTitle>
          <CardDescription>
            Calculate GDP using the expenditure approach: C + I + G + (X - M)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Consumer Spending (€ billions)</Label>
              <Input
                type="number"
                value={gdpData.consumption || ""}
                onChange={(e) => setGdpData({...gdpData, consumption: Number(e.target.value)})}
                placeholder="Private consumption"
              />
            </div>
            <div className="space-y-2">
              <Label>Investment (€ billions)</Label>
              <Input
                type="number"
                value={gdpData.investment || ""}
                onChange={(e) => setGdpData({...gdpData, investment: Number(e.target.value)})}
                placeholder="Business investment"
              />
            </div>
            <div className="space-y-2">
              <Label>Government Spending (€ billions)</Label>
              <Input
                type="number"
                value={gdpData.government || ""}
                onChange={(e) => setGdpData({...gdpData, government: Number(e.target.value)})}
                placeholder="Government expenditure"
              />
            </div>
            <div className="space-y-2">
              <Label>Exports (€ billions)</Label>
              <Input
                type="number"
                value={gdpData.exports || ""}
                onChange={(e) => setGdpData({...gdpData, exports: Number(e.target.value)})}
                placeholder="Total exports"
              />
            </div>
            <div className="space-y-2">
              <Label>Imports (€ billions)</Label>
              <Input
                type="number"
                value={gdpData.imports || ""}
                onChange={(e) => setGdpData({...gdpData, imports: Number(e.target.value)})}
                placeholder="Total imports"
              />
            </div>
          </div>

          <Button onClick={calculateGDP} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate GDP
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GDP Calculation Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-blue-600">
                  €{result.gdp.toFixed(1)} billion
                </p>
                <p className="text-gray-600">Total GDP</p>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.components}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${Number(value).toFixed(1)}B`, '']} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FranceGDPCalculator;
