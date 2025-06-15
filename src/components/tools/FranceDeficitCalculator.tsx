
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";
import { Calculator, TrendingDown, AlertTriangle } from "lucide-react";

const FranceDeficitCalculator = () => {
  const [deficitData, setDeficitData] = useState({
    revenue: 0,
    spending: 0,
    gdp: 0,
    targetDeficit: 3.0,
    projectionYears: 5
  });

  const [analysis, setAnalysis] = useState(null);

  const calculateDeficit = () => {
    const currentDeficit = deficitData.spending - deficitData.revenue;
    const deficitToGDP = deficitData.gdp > 0 ? (currentDeficit / deficitData.gdp) * 100 : 0;
    
    // Project deficit over time
    const projections = [];
    for (let year = 0; year <= deficitData.projectionYears; year++) {
      const projectedRevenue = deficitData.revenue * Math.pow(1.025, year); // 2.5% growth
      const projectedSpending = deficitData.spending * Math.pow(1.02, year); // 2% growth
      const projectedDeficit = projectedSpending - projectedRevenue;
      const projectedGDP = deficitData.gdp * Math.pow(1.02, year);
      
      projections.push({
        year: new Date().getFullYear() + year,
        deficit: projectedDeficit,
        deficitToGDP: (projectedDeficit / projectedGDP) * 100,
        revenue: projectedRevenue,
        spending: projectedSpending
      });
    }

    const sustainabilityRating = deficitToGDP <= 3 ? "Sustainable" : 
                                deficitToGDP <= 5 ? "Concerning" : "Unsustainable";

    setAnalysis({
      currentDeficit,
      deficitToGDP,
      projections,
      sustainabilityRating,
      euCompliant: deficitToGDP <= 3,
      requiredAdjustment: Math.max(0, deficitToGDP - deficitData.targetDeficit)
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            France Deficit Calculator
          </CardTitle>
          <CardDescription>
            Calculate and analyze government budget deficit with sustainability projections.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Government Revenue (€ billions)</Label>
              <Input
                type="number"
                value={deficitData.revenue || ""}
                onChange={(e) => setDeficitData({...deficitData, revenue: Number(e.target.value)})}
                placeholder="Total revenue"
              />
            </div>
            <div className="space-y-2">
              <Label>Government Spending (€ billions)</Label>
              <Input
                type="number"
                value={deficitData.spending || ""}
                onChange={(e) => setDeficitData({...deficitData, spending: Number(e.target.value)})}
                placeholder="Total spending"
              />
            </div>
            <div className="space-y-2">
              <Label>GDP (€ billions)</Label>
              <Input
                type="number"
                value={deficitData.gdp || ""}
                onChange={(e) => setDeficitData({...deficitData, gdp: Number(e.target.value)})}
                placeholder="Gross Domestic Product"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Deficit/GDP (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={deficitData.targetDeficit || ""}
                onChange={(e) => setDeficitData({...deficitData, targetDeficit: Number(e.target.value)})}
                placeholder="Target ratio"
              />
            </div>
          </div>

          <Button onClick={calculateDeficit} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Deficit
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Deficit</p>
                    <p className="text-2xl font-bold text-red-600">
                      €{analysis.currentDeficit.toFixed(1)}B
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Deficit/GDP Ratio</p>
                    <p className={`text-2xl font-bold ${analysis.deficitToGDP <= 3 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.deficitToGDP.toFixed(1)}%
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sustainability</p>
                    <Badge variant={
                      analysis.sustainabilityRating === "Sustainable" ? "default" :
                      analysis.sustainabilityRating === "Concerning" ? "secondary" : "destructive"
                    }>
                      {analysis.sustainabilityRating}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deficit Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysis.projections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="deficit" stroke="#ff7c7c" name="Deficit (€B)" />
                  <Line type="monotone" dataKey="deficitToGDP" stroke="#8884d8" name="Deficit/GDP (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EU Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Maastricht Criteria (3% limit):</span>
                  <Badge variant={analysis.euCompliant ? "default" : "destructive"}>
                    {analysis.euCompliant ? "Compliant" : "Non-compliant"}
                  </Badge>
                </div>
                {!analysis.euCompliant && (
                  <p className="text-sm text-gray-600">
                    Required adjustment: {analysis.requiredAdjustment.toFixed(1)} percentage points
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FranceDeficitCalculator;
