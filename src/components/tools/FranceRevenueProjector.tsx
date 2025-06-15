
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

interface ProjectionData {
  year: number;
  incomeTax: number;
  corporateTax: number;
  vat: number;
  socialContributions: number;
  propertyTax: number;
  otherTaxes: number;
  total: number;
  growth: number;
}

const FranceRevenueProjector = () => {
  const [revenueData, setRevenueData] = useState({
    incomeTax: 0,
    corporateTax: 0,
    vat: 0,
    socialContributions: 0,
    propertyTax: 0,
    otherTaxes: 0,
    growthRate: 2.5,
    projectionYears: 5
  });

  const [projections, setProjections] = useState<Array<ProjectionData> | null>(null);

  const calculateProjections = () => {
    const projectionData: Array<ProjectionData> = [];
    
    for (let year = 0; year <= revenueData.projectionYears; year++) {
      const growthFactor = Math.pow(1 + revenueData.growthRate / 100, year);
      
      const yearData: ProjectionData = {
        year: new Date().getFullYear() + year,
        incomeTax: revenueData.incomeTax * growthFactor,
        corporateTax: revenueData.corporateTax * growthFactor,
        vat: revenueData.vat * growthFactor,
        socialContributions: revenueData.socialContributions * growthFactor,
        propertyTax: revenueData.propertyTax * growthFactor,
        otherTaxes: revenueData.otherTaxes * growthFactor,
        total: 0,
        growth: year > 0 ? revenueData.growthRate : 0
      };
      
      yearData.total = yearData.incomeTax + yearData.corporateTax + yearData.vat + 
                      yearData.socialContributions + yearData.propertyTax + yearData.otherTaxes;
      
      if (year > 0) {
        const previousTotal = projectionData[year - 1].total;
        yearData.growth = previousTotal > 0 ? ((yearData.total - previousTotal) / previousTotal) * 100 : 0;
      }
      
      projectionData.push(yearData);
    }

    setProjections(projectionData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            France Revenue Projector
          </CardTitle>
          <CardDescription>
            Project government revenue streams with growth scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Income Tax (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.incomeTax || ""}
                onChange={(e) => setRevenueData({...revenueData, incomeTax: Number(e.target.value)})}
                placeholder="Personal income tax"
              />
            </div>
            <div className="space-y-2">
              <Label>Corporate Tax (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.corporateTax || ""}
                onChange={(e) => setRevenueData({...revenueData, corporateTax: Number(e.target.value)})}
                placeholder="Corporate income tax"
              />
            </div>
            <div className="space-y-2">
              <Label>VAT (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.vat || ""}
                onChange={(e) => setRevenueData({...revenueData, vat: Number(e.target.value)})}
                placeholder="Value added tax"
              />
            </div>
            <div className="space-y-2">
              <Label>Social Contributions (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.socialContributions || ""}
                onChange={(e) => setRevenueData({...revenueData, socialContributions: Number(e.target.value)})}
                placeholder="Social security contributions"
              />
            </div>
            <div className="space-y-2">
              <Label>Property Tax (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.propertyTax || ""}
                onChange={(e) => setRevenueData({...revenueData, propertyTax: Number(e.target.value)})}
                placeholder="Property taxes"
              />
            </div>
            <div className="space-y-2">
              <Label>Other Taxes (€ billions)</Label>
              <Input
                type="number"
                value={revenueData.otherTaxes || ""}
                onChange={(e) => setRevenueData({...revenueData, otherTaxes: Number(e.target.value)})}
                placeholder="Other tax revenue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Annual Growth Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={revenueData.growthRate || ""}
                onChange={(e) => setRevenueData({...revenueData, growthRate: Number(e.target.value)})}
                placeholder="Expected growth rate"
              />
            </div>
            <div className="space-y-2">
              <Label>Projection Years</Label>
              <Input
                type="number"
                value={revenueData.projectionYears || ""}
                onChange={(e) => setRevenueData({...revenueData, projectionYears: Number(e.target.value)})}
                placeholder="Years to project"
              />
            </div>
          </div>

          <Button onClick={calculateProjections} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Projections
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={projections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Revenue" strokeWidth={3} />
                  <Line type="monotone" dataKey="incomeTax" stroke="#82ca9d" name="Income Tax" />
                  <Line type="monotone" dataKey="corporateTax" stroke="#ffc658" name="Corporate Tax" />
                  <Line type="monotone" dataKey="vat" stroke="#ff7300" name="VAT" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {projections.map((projection, index) => (
              <Card key={projection.year}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{projection.year}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        €{projection.total.toFixed(1)}B
                      </p>
                      {index > 0 && (
                        <p className="text-sm text-gray-600">
                          Growth: {projection.growth > 0 ? "+" : ""}{projection.growth.toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FranceRevenueProjector;
