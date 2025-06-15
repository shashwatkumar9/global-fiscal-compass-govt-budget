
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, Activity } from "lucide-react";

const FranceFiscalImpactTool = () => {
  const [policyData, setPolicyData] = useState({
    taxChange: 0,
    spendingChange: 0,
    gdp: 0,
    multiplier: 1.5
  });

  const [impact, setImpact] = useState<{
    directImpact: number;
    multiplierEffect: number;
    totalImpact: number;
    gdpImpact: number;
    rating: string;
  } | null>(null);

  const calculateImpact = () => {
    const netFiscalChange = policyData.spendingChange - policyData.taxChange;
    const directImpact = netFiscalChange;
    const multiplierEffect = netFiscalChange * (policyData.multiplier - 1);
    const totalImpact = directImpact + multiplierEffect;
    const gdpImpact = policyData.gdp > 0 ? (totalImpact / policyData.gdp) * 100 : 0;
    
    const rating = Math.abs(gdpImpact) < 1 ? "Low Impact" :
                   Math.abs(gdpImpact) < 3 ? "Moderate Impact" : "High Impact";

    setImpact({
      directImpact,
      multiplierEffect,
      totalImpact,
      gdpImpact,
      rating
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            France Fiscal Impact Tool
          </CardTitle>
          <CardDescription>
            Analyze the economic impact of fiscal policy changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tax Change (€ billions)</Label>
              <Input
                type="number"
                value={policyData.taxChange || ""}
                onChange={(e) => setPolicyData({...policyData, taxChange: Number(e.target.value)})}
                placeholder="Tax increase (+) or decrease (-)"
              />
            </div>
            <div className="space-y-2">
              <Label>Spending Change (€ billions)</Label>
              <Input
                type="number"
                value={policyData.spendingChange || ""}
                onChange={(e) => setPolicyData({...policyData, spendingChange: Number(e.target.value)})}
                placeholder="Spending increase (+) or decrease (-)"
              />
            </div>
            <div className="space-y-2">
              <Label>GDP (€ billions)</Label>
              <Input
                type="number"
                value={policyData.gdp || ""}
                onChange={(e) => setPolicyData({...policyData, gdp: Number(e.target.value)})}
                placeholder="Current GDP"
              />
            </div>
            <div className="space-y-2">
              <Label>Fiscal Multiplier</Label>
              <Input
                type="number"
                step="0.1"
                value={policyData.multiplier || ""}
                onChange={(e) => setPolicyData({...policyData, multiplier: Number(e.target.value)})}
                placeholder="Economic multiplier effect"
              />
            </div>
          </div>

          <Button onClick={calculateImpact} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Fiscal Impact
          </Button>
        </CardContent>
      </Card>

      {impact && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Direct Impact</p>
                  <p className="text-xl font-bold text-blue-600">
                    €{impact.directImpact.toFixed(1)}B
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Multiplier Effect</p>
                  <p className="text-xl font-bold text-green-600">
                    €{impact.multiplierEffect.toFixed(1)}B
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Impact</p>
                  <p className="text-xl font-bold text-purple-600">
                    €{impact.totalImpact.toFixed(1)}B
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">GDP Impact</p>
                  <p className="text-xl font-bold text-orange-600">
                    {impact.gdpImpact >= 0 ? "+" : ""}{impact.gdpImpact.toFixed(2)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Overall Impact Rating:</span>
                <Badge variant={
                  impact.rating === "Low Impact" ? "secondary" :
                  impact.rating === "Moderate Impact" ? "default" : "destructive"
                }>
                  {impact.rating}
                </Badge>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { name: "Direct", value: impact.directImpact },
                  { name: "Multiplier", value: impact.multiplierEffect },
                  { name: "Total", value: impact.totalImpact }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${Number(value).toFixed(1)}B`} />
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

export default FranceFiscalImpactTool;
