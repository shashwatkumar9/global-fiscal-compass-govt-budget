
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ItalyPublicDebtCalculator = () => {
  const [debtData, setDebtData] = useState({
    currentDebt: "2800",
    gdp: "2100",
    interestRate: "3.5",
    primarySurplus: "-50",
    growthRate: "1.2",
    years: "10"
  });

  const [projections, setProjections] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setDebtData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDebtProjection = () => {
    const initialDebt = parseFloat(debtData.currentDebt) || 0;
    const gdp = parseFloat(debtData.gdp) || 0;
    const interestRate = parseFloat(debtData.interestRate) / 100 || 0;
    const primarySurplus = parseFloat(debtData.primarySurplus) || 0;
    const growthRate = parseFloat(debtData.growthRate) / 100 || 0;
    const years = parseInt(debtData.years) || 10;

    const projectionData = [];
    let currentDebt = initialDebt;
    let currentGDP = gdp;

    for (let year = 0; year <= years; year++) {
      const debtToGDPRatio = (currentDebt / currentGDP) * 100;
      const interestPayments = currentDebt * interestRate;
      const debtService = interestPayments - primarySurplus;
      
      projectionData.push({
        year: new Date().getFullYear() + year,
        debt: currentDebt,
        gdp: currentGDP,
        debtToGDPRatio,
        interestPayments,
        debtService
      });

      if (year < years) {
        currentDebt += debtService;
        currentGDP *= (1 + growthRate);
      }
    }

    // Debt composition (estimated)
    const debtComposition = [
      { name: 'Government Bonds', value: initialDebt * 0.65, color: '#8884d8' },
      { name: 'Treasury Bills', value: initialDebt * 0.20, color: '#82ca9d' },
      { name: 'EU/International', value: initialDebt * 0.10, color: '#ffc658' },
      { name: 'Other', value: initialDebt * 0.05, color: '#ff7300' }
    ];

    // Calculate sustainability metrics
    const finalRatio = projectionData[projectionData.length - 1].debtToGDPRatio;
    const initialRatio = (initialDebt / gdp) * 100;
    const ratioDifference = finalRatio - initialRatio;
    
    const sustainability = {
      isStable: Math.abs(ratioDifference) < 5,
      isImproving: ratioDifference < -2,
      isDeterioring: ratioDifference > 5,
      avgInterestPayments: projectionData.reduce((sum, p) => sum + p.interestPayments, 0) / projectionData.length
    };

    setProjections({
      data: projectionData,
      composition: debtComposition,
      sustainability,
      initialRatio,
      finalRatio,
      ratioDifference
    });
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy Public Debt Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Position</h3>
              
              <div>
                <Label htmlFor="current-debt">Current Public Debt (€ Billions)</Label>
                <Input
                  id="current-debt"
                  type="number"
                  value={debtData.currentDebt}
                  onChange={(e) => handleInputChange('currentDebt', e.target.value)}
                  placeholder="2800"
                />
              </div>

              <div>
                <Label htmlFor="gdp">Current GDP (€ Billions)</Label>
                <Input
                  id="gdp"
                  type="number"
                  value={debtData.gdp}
                  onChange={(e) => handleInputChange('gdp', e.target.value)}
                  placeholder="2100"
                />
              </div>

              <div>
                <Label htmlFor="interest-rate">Average Interest Rate (%)</Label>
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.1"
                  value={debtData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="3.5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Projection Parameters</h3>
              
              <div>
                <Label htmlFor="primary-surplus">Primary Surplus (€ Billions)</Label>
                <Input
                  id="primary-surplus"
                  type="number"
                  value={debtData.primarySurplus}
                  onChange={(e) => handleInputChange('primarySurplus', e.target.value)}
                  placeholder="-50"
                />
                <p className="text-xs text-gray-500 mt-1">Negative values indicate deficit</p>
              </div>

              <div>
                <Label htmlFor="growth-rate">GDP Growth Rate (%)</Label>
                <Input
                  id="growth-rate"
                  type="number"
                  step="0.1"
                  value={debtData.growthRate}
                  onChange={(e) => handleInputChange('growthRate', e.target.value)}
                  placeholder="1.2"
                />
              </div>

              <div>
                <Label htmlFor="years">Projection Years</Label>
                <Input
                  id="years"
                  type="number"
                  value={debtData.years}
                  onChange={(e) => handleInputChange('years', e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <Button onClick={calculateDebtProjection} className="w-full">
            Calculate Debt Projection
          </Button>
        </CardContent>
      </Card>

      {projections && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Debt-to-GDP Ratio Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projections.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${Number(value).toFixed(1)}%`, 'Debt-to-GDP Ratio']} />
                  <Legend />
                  <Line type="monotone" dataKey="debtToGDPRatio" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Ratio</p>
                  <p className="text-lg font-semibold">{projections.initialRatio.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Projected Ratio</p>
                  <p className={`text-lg font-semibold ${projections.ratioDifference < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {projections.finalRatio.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debt Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projections.composition}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projections.composition.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${Number(value).toFixed(0)}B`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sustainability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${projections.sustainability.isImproving ? 'bg-green-50' : projections.sustainability.isDeterioring ? 'bg-red-50' : 'bg-yellow-50'}`}>
                  <p className="text-sm text-gray-600">Debt Trajectory</p>
                  <p className={`text-lg font-semibold ${projections.sustainability.isImproving ? 'text-green-600' : projections.sustainability.isDeterioring ? 'text-red-600' : 'text-yellow-600'}`}>
                    {projections.sustainability.isImproving ? 'Improving' : projections.sustainability.isDeterioring ? 'Deteriorating' : 'Stable'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Avg Interest Payments</p>
                  <p className="text-lg font-semibold">€{projections.sustainability.avgInterestPayments.toFixed(1)}B</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Change in Ratio</p>
                  <p className={`text-lg font-semibold ${projections.ratioDifference < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {projections.ratioDifference > 0 ? '+' : ''}{projections.ratioDifference.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItalyPublicDebtCalculator;
