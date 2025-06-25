
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const ItalyRevenueProjector = () => {
  const [revenueData, setRevenueData] = useState({
    currentRevenue: "850",
    incomeTaxGrowth: "2.5",
    vatGrowth: "3.0",
    corporateTaxGrowth: "1.8",
    otherTaxGrowth: "2.0",
    economicGrowth: "1.2",
    inflationRate: "2.5",
    years: "5"
  });

  const [projections, setProjections] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setRevenueData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRevenue = () => {
    const baseRevenue = parseFloat(revenueData.currentRevenue) || 0;
    const years = parseInt(revenueData.years) || 5;
    
    // Tax composition (estimated percentages)
    const taxComposition = {
      incomeTax: 0.35,
      vat: 0.25,
      corporateTax: 0.15,
      socialSecurity: 0.15,
      other: 0.10
    };

    const growthRates = {
      incomeTax: parseFloat(revenueData.incomeTaxGrowth) / 100 || 0,
      vat: parseFloat(revenueData.vatGrowth) / 100 || 0,
      corporateTax: parseFloat(revenueData.corporateTaxGrowth) / 100 || 0,
      socialSecurity: parseFloat(revenueData.economicGrowth) / 100 || 0,
      other: parseFloat(revenueData.otherTaxGrowth) / 100 || 0
    };

    const projectionData = [];
    
    for (let year = 0; year <= years; year++) {
      const yearData: any = {
        year: new Date().getFullYear() + year,
        total: 0
      };

      // Calculate each tax category
      Object.entries(taxComposition).forEach(([taxType, percentage]) => {
        const baseAmount = baseRevenue * percentage;
        const growthRate = growthRates[taxType as keyof typeof growthRates];
        const projectedAmount = baseAmount * Math.pow(1 + growthRate, year);
        
        yearData[taxType] = projectedAmount;
        yearData.total += projectedAmount;
      });

      projectionData.push(yearData);
    }

    // Calculate revenue elasticity
    const economicGrowth = parseFloat(revenueData.economicGrowth) / 100;
    const totalRevenueGrowth = (projectionData[projectionData.length - 1].total / baseRevenue - 1) / years;
    const elasticity = economicGrowth > 0 ? totalRevenueGrowth / economicGrowth : 0;

    // Tax breakdown for the final year
    const finalYear = projectionData[projectionData.length - 1];
    const taxBreakdown = [
      { name: 'Income Tax', value: finalYear.incomeTax, color: '#8884d8' },
      { name: 'VAT', value: finalYear.vat, color: '#82ca9d' },
      { name: 'Corporate Tax', value: finalYear.corporateTax, color: '#ffc658' },
      { name: 'Social Security', value: finalYear.socialSecurity, color: '#ff7300' },
      { name: 'Other', value: finalYear.other, color: '#00C49F' }
    ];

    setProjections({
      data: projectionData,
      taxBreakdown,
      elasticity,
      totalGrowth: ((finalYear.total / baseRevenue - 1) * 100),
      avgAnnualGrowth: totalRevenueGrowth * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Revenue Projector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Base Revenue</h3>
              
              <div>
                <Label htmlFor="current-revenue">Current Total Revenue (€ Billions)</Label>
                <Input
                  id="current-revenue"
                  type="number"
                  value={revenueData.currentRevenue}
                  onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                  placeholder="850"
                />
              </div>

              <div>
                <Label htmlFor="years">Projection Years</Label>
                <Input
                  id="years"
                  type="number"
                  value={revenueData.years}
                  onChange={(e) => handleInputChange('years', e.target.value)}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Growth Assumptions (%)</h3>
              
              <div>
                <Label htmlFor="income-tax-growth">Income Tax Growth</Label>
                <Input
                  id="income-tax-growth"
                  type="number"
                  step="0.1"
                  value={revenueData.incomeTaxGrowth}
                  onChange={(e) => handleInputChange('incomeTaxGrowth', e.target.value)}
                  placeholder="2.5"
                />
              </div>

              <div>
                <Label htmlFor="vat-growth">VAT Growth</Label>
                <Input
                  id="vat-growth"
                  type="number"
                  step="0.1"
                  value={revenueData.vatGrowth}
                  onChange={(e) => handleInputChange('vatGrowth', e.target.value)}
                  placeholder="3.0"
                />
              </div>

              <div>
                <Label htmlFor="corporate-tax-growth">Corporate Tax Growth</Label>
                <Input
                  id="corporate-tax-growth"
                  type="number"
                  step="0.1"
                  value={revenueData.corporateTaxGrowth}
                  onChange={(e) => handleInputChange('corporateTaxGrowth', e.target.value)}
                  placeholder="1.8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="economic-growth">Economic Growth Rate (%)</Label>
              <Input
                id="economic-growth"
                type="number"
                step="0.1"
                value={revenueData.economicGrowth}
                onChange={(e) => handleInputChange('economicGrowth', e.target.value)}
                placeholder="1.2"
              />
            </div>

            <div>
              <Label htmlFor="other-tax-growth">Other Taxes Growth (%)</Label>
              <Input
                id="other-tax-growth"
                type="number"
                step="0.1"
                value={revenueData.otherTaxGrowth}
                onChange={(e) => handleInputChange('otherTaxGrowth', e.target.value)}
                placeholder="2.0"
              />
            </div>
          </div>

          <Button onClick={calculateRevenue} className="w-full">
            Project Revenue
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projections.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${Number(value).toFixed(1)}B`} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} name="Total Revenue" />
                  <Line type="monotone" dataKey="incomeTax" stroke="#82ca9d" name="Income Tax" />
                  <Line type="monotone" dataKey="vat" stroke="#ffc658" name="VAT" />
                  <Line type="monotone" dataKey="corporateTax" stroke="#ff7300" name="Corporate Tax" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Composition (Final Year)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projections.taxBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${Number(value).toFixed(1)}B`} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Growth</p>
                  <p className="text-2xl font-bold text-blue-600">{projections.totalGrowth.toFixed(1)}%</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Annual Growth</p>
                  <p className="text-2xl font-bold text-green-600">{projections.avgAnnualGrowth.toFixed(1)}%</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Revenue Elasticity</p>
                  <p className="text-2xl font-bold text-purple-600">{projections.elasticity.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Insights</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Revenue elasticity of {projections.elasticity.toFixed(2)} indicates {projections.elasticity > 1 ? 'high' : 'moderate'} sensitivity to economic growth</li>
                  <li>• VAT and income tax are the largest revenue contributors</li>
                  <li>• Projected total revenue in final year: €{projections.data[projections.data.length - 1].total.toFixed(1)}B</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyRevenueProjector;
