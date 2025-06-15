
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

const FrancePublicDebtCalculator = () => {
  const [debtData, setDebtData] = useState({
    currentDebt: 0,
    gdp: 0,
    interestRate: 2.5,
    primaryDeficit: 0,
    projectionYears: 10
  });

  const [analysis, setAnalysis] = useState<{
    debtToGDP: number;
    projections: Array<{year: number; debt: number; debtToGDP: number}>;
    sustainability: string;
  } | null>(null);

  const calculateDebt = () => {
    const debtToGDP = debtData.gdp > 0 ? (debtData.currentDebt / debtData.gdp) * 100 : 0;
    
    const projections = [];
    let currentDebt = debtData.currentDebt;
    let currentGDP = debtData.gdp;
    
    for (let year = 0; year <= debtData.projectionYears; year++) {
      const interestPayment = currentDebt * (debtData.interestRate / 100);
      currentDebt += interestPayment + debtData.primaryDeficit;
      currentGDP *= 1.02; // Assume 2% GDP growth
      
      projections.push({
        year: new Date().getFullYear() + year,
        debt: currentDebt,
        debtToGDP: (currentDebt / currentGDP) * 100
      });
    }

    const sustainability = debtToGDP < 60 ? "Sustainable" : 
                          debtToGDP < 90 ? "Moderate Risk" : "High Risk";

    setAnalysis({ debtToGDP, projections, sustainability });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            France Public Debt Calculator
          </CardTitle>
          <CardDescription>
            Analyze public debt sustainability and future projections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Public Debt (€ billions)</Label>
              <Input
                type="number"
                value={debtData.currentDebt || ""}
                onChange={(e) => setDebtData({...debtData, currentDebt: Number(e.target.value)})}
                placeholder="Total public debt"
              />
            </div>
            <div className="space-y-2">
              <Label>GDP (€ billions)</Label>
              <Input
                type="number"
                value={debtData.gdp || ""}
                onChange={(e) => setDebtData({...debtData, gdp: Number(e.target.value)})}
                placeholder="Gross Domestic Product"
              />
            </div>
            <div className="space-y-2">
              <Label>Average Interest Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={debtData.interestRate || ""}
                onChange={(e) => setDebtData({...debtData, interestRate: Number(e.target.value)})}
                placeholder="Interest rate on debt"
              />
            </div>
            <div className="space-y-2">
              <Label>Primary Deficit (€ billions)</Label>
              <Input
                type="number"
                value={debtData.primaryDeficit || ""}
                onChange={(e) => setDebtData({...debtData, primaryDeficit: Number(e.target.value)})}
                placeholder="Budget deficit excluding interest"
              />
            </div>
          </div>

          <Button onClick={calculateDebt} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Debt Sustainability
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Debt-to-GDP</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analysis.debtToGDP.toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Sustainability</p>
                  <p className={`text-lg font-bold ${
                    analysis.sustainability === "Sustainable" ? "text-green-600" :
                    analysis.sustainability === "Moderate Risk" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {analysis.sustainability}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">EU Maastricht Limit</p>
                  <p className="text-lg font-bold text-gray-600">60%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Debt Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysis.projections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="debtToGDP" stroke="#8884d8" name="Debt-to-GDP (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FrancePublicDebtCalculator;
