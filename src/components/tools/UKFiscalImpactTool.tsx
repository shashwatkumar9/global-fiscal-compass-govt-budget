
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Calculator, Target, AlertCircle, TrendingUp, Download, Zap } from "lucide-react";

const UKFiscalImpactTool = () => {
  const [policyType, setPolicyType] = useState("");
  const [impactAmount, setImpactAmount] = useState("");
  const [implementationPeriod, setImplementationPeriod] = useState("");
  const [targetSector, setTargetSector] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");

  const fiscalMultipliers = {
    "tax-cut": 1.4,
    "spending-increase": 1.6,
    "infrastructure": 2.1,
    "social-program": 1.2,
    "business-incentive": 1.8
  };

  const sectorImpacts = [
    { sector: "GDP Growth", directImpact: 0.8, indirectImpact: 1.2, totalImpact: 2.0 },
    { sector: "Employment", directImpact: 0.6, indirectImpact: 0.9, totalImpact: 1.5 },
    { sector: "Consumer Spending", directImpact: 1.1, indirectImpact: 0.7, totalImpact: 1.8 },
    { sector: "Business Investment", directImpact: 0.9, indirectImpact: 1.1, totalImpact: 2.0 },
    { sector: "Government Revenue", directImpact: -0.5, indirectImpact: 0.3, totalImpact: -0.2 },
  ];

  const timelineProjections = [
    { year: "Year 1", gdpImpact: 0.2, employment: 0.1, revenue: -0.3 },
    { year: "Year 2", gdpImpact: 0.5, employment: 0.3, revenue: -0.1 },
    { year: "Year 3", gdpImpact: 0.8, employment: 0.6, revenue: 0.1 },
    { year: "Year 4", gdpImpact: 1.1, employment: 0.8, revenue: 0.3 },
    { year: "Year 5", gdpImpact: 1.2, employment: 1.0, revenue: 0.5 },
  ];

  const riskAssessment = [
    { risk: "Implementation", current: 65, target: 85 },
    { risk: "Economic Conditions", current: 70, target: 80 },
    { risk: "Political Support", current: 60, target: 90 },
    { risk: "International Factors", current: 55, target: 75 },
    { risk: "Market Response", current: 75, target: 85 },
  ];

  const calculateFiscalImpact = () => {
    if (!impactAmount || !policyType) return 0;
    const amount = parseFloat(impactAmount);
    const multiplier = fiscalMultipliers[policyType as keyof typeof fiscalMultipliers] || 1.0;
    return amount * multiplier;
  };

  const calculateGDPImpact = () => {
    const fiscalImpact = calculateFiscalImpact();
    return (fiscalImpact / 2800000) * 100; // Assuming UK GDP of £2.8 trillion
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Zap className="w-10 h-10 text-blue-600" />
          UK Fiscal Impact Assessment Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Analyze the economic impact of fiscal policy changes on UK GDP, employment, government revenue, and economic sectors with advanced modeling.
        </p>
      </div>

      {/* Policy Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Policy Parameters
          </CardTitle>
          <CardDescription>Define the fiscal policy change to analyze its economic impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="policyType">Policy Type</Label>
                <Select value={policyType} onValueChange={setPolicyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax-cut">Tax Reduction</SelectItem>
                    <SelectItem value="spending-increase">Government Spending Increase</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure Investment</SelectItem>
                    <SelectItem value="social-program">Social Program Expansion</SelectItem>
                    <SelectItem value="business-incentive">Business Incentives</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="impactAmount">Policy Amount (£ billions)</Label>
                <Input
                  id="impactAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={impactAmount}
                  onChange={(e) => setImpactAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="implementationPeriod">Implementation Period</Label>
                <Select value={implementationPeriod} onValueChange={setImplementationPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-6 months)</SelectItem>
                    <SelectItem value="short">Short-term (6-18 months)</SelectItem>
                    <SelectItem value="medium">Medium-term (1-3 years)</SelectItem>
                    <SelectItem value="long">Long-term (3-5 years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetSector">Target Sector</Label>
                <Select value={targetSector} onValueChange={setTargetSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="policyDescription">Policy Description</Label>
                <Textarea
                  id="policyDescription"
                  placeholder="Describe the policy change in detail..."
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      {impactAmount && policyType && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Fiscal Impact</p>
                  <p className="text-2xl font-bold text-blue-600">£{calculateFiscalImpact().toFixed(1)}B</p>
                  <p className="text-sm text-gray-600">Including multiplier effects</p>
                </div>
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">GDP Impact</p>
                  <p className="text-2xl font-bold text-green-600">{calculateGDPImpact().toFixed(2)}%</p>
                  <p className="text-sm text-gray-600">Estimated GDP change</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Employment Impact</p>
                  <p className="text-2xl font-bold text-purple-600">{(parseFloat(impactAmount || "0") * 15000).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Jobs created/affected</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Risk Score</p>
                  <p className="text-2xl font-bold text-orange-600">Medium</p>
                  <p className="text-sm text-gray-600">Implementation risk</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sectoral Impact Analysis</CardTitle>
            <CardDescription>Direct and indirect effects across economic sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorImpacts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Bar dataKey="directImpact" fill="#8884d8" name="Direct Impact" />
                <Bar dataKey="indirectImpact" fill="#82ca9d" name="Indirect Impact" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline Projections</CardTitle>
            <CardDescription>Economic impact evolution over 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line type="monotone" dataKey="gdpImpact" stroke="#8884d8" name="GDP Impact" />
                <Line type="monotone" dataKey="employment" stroke="#82ca9d" name="Employment" />
                <Line type="monotone" dataKey="revenue" stroke="#ffc658" name="Gov Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Matrix</CardTitle>
          <CardDescription>Evaluate implementation risks and success factors</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={riskAssessment}>
              <PolarGrid />
              <PolarAngleAxis dataKey="risk" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive Impact Assessment</CardTitle>
          <CardDescription>Detailed breakdown of economic effects and policy recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Positive Impacts</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Stimulates economic growth through increased demand
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Creates employment opportunities across sectors
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Enhances productivity and competitiveness
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Improves long-term fiscal sustainability
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Potential Risks</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Short-term increase in government deficit
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Potential inflationary pressure
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Implementation and administrative challenges
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Dependency on economic conditions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Analysis
        </Button>
        <Button variant="outline">
          Generate Report
        </Button>
        <Button variant="outline">
          Share Assessment
        </Button>
      </div>
    </div>
  );
};

export default UKFiscalImpactTool;
