
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, PoundSterling, FileText, Info, PieChart } from "lucide-react";
import { Treemap, ResponsiveContainer, Cell } from 'recharts';

const UKBudgetAllocationTool = () => {
  const [totalBudget, setTotalBudget] = useState<number>(100000000);
  const [healthcarePercent, setHealthcarePercent] = useState<number>(25);
  const [educationPercent, setEducationPercent] = useState<number>(20);
  const [defensePercent, setDefensePercent] = useState<number>(15);
  const [transportPercent, setTransportPercent] = useState<number>(10);
  const [socialSecurityPercent, setSocialSecurityPercent] = useState<number>(15);
  const [otherPercent, setOtherPercent] = useState<number>(15);

  const calculateAllocations = () => {
    const totalPercentage = healthcarePercent + educationPercent + defensePercent + 
                           transportPercent + socialSecurityPercent + otherPercent;
    
    const healthcare = (totalBudget * healthcarePercent) / 100;
    const education = (totalBudget * educationPercent) / 100;
    const defense = (totalBudget * defensePercent) / 100;
    const transport = (totalBudget * transportPercent) / 100;
    const socialSecurity = (totalBudget * socialSecurityPercent) / 100;
    const other = (totalBudget * otherPercent) / 100;

    return {
      totalPercentage,
      allocations: {
        healthcare,
        education,
        defense,
        transport,
        socialSecurity,
        other
      },
      isValid: Math.abs(totalPercentage - 100) < 0.01
    };
  };

  const results = calculateAllocations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const chartData = [
    { name: 'Healthcare', size: results.allocations.healthcare, percentage: `${healthcarePercent}%` },
    { name: 'Education', size: results.allocations.education, percentage: `${educationPercent}%` },
    { name: 'Defense', size: results.allocations.defense, percentage: `${defensePercent}%` },
    { name: 'Transport', size: results.allocations.transport, percentage: `${transportPercent}%` },
    { name: 'Social Security', size: results.allocations.socialSecurity, percentage: `${socialSecurityPercent}%` },
    { name: 'Other', size: results.allocations.other, percentage: `${otherPercent}%` }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Budget Allocation Tool</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Plan and visualize UK government budget allocations across key departments and services.
        </p>
      </div>

      <Tabs defaultValue="allocator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allocator">Budget Allocator</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="allocator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Budget Allocation
                </CardTitle>
                <CardDescription>
                  Allocate the total budget across different departments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="totalBudget">Total Budget (£)</Label>
                  <Input
                    id="totalBudget"
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="healthcare">Healthcare (%)</Label>
                    <Input
                      id="healthcare"
                      type="number"
                      min="0"
                      max="100"
                      value={healthcarePercent}
                      onChange={(e) => setHealthcarePercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.healthcare)}</p>
                  </div>

                  <div>
                    <Label htmlFor="education">Education (%)</Label>
                    <Input
                      id="education"
                      type="number"
                      min="0"
                      max="100"
                      value={educationPercent}
                      onChange={(e) => setEducationPercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.education)}</p>
                  </div>

                  <div>
                    <Label htmlFor="defense">Defense (%)</Label>
                    <Input
                      id="defense"
                      type="number"
                      min="0"
                      max="100"
                      value={defensePercent}
                      onChange={(e) => setDefensePercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.defense)}</p>
                  </div>

                  <div>
                    <Label htmlFor="transport">Transport (%)</Label>
                    <Input
                      id="transport"
                      type="number"
                      min="0"
                      max="100"
                      value={transportPercent}
                      onChange={(e) => setTransportPercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.transport)}</p>
                  </div>

                  <div>
                    <Label htmlFor="socialSecurity">Social Security (%)</Label>
                    <Input
                      id="socialSecurity"
                      type="number"
                      min="0"
                      max="100"
                      value={socialSecurityPercent}
                      onChange={(e) => setSocialSecurityPercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.socialSecurity)}</p>
                  </div>

                  <div>
                    <Label htmlFor="other">Other (%)</Label>
                    <Input
                      id="other"
                      type="number"
                      min="0"
                      max="100"
                      value={otherPercent}
                      onChange={(e) => setOtherPercent(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">{formatCurrency(results.allocations.other)}</p>
                  </div>
                </div>

                {!results.isValid && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Warning:</strong> Total percentage is {results.totalPercentage.toFixed(1)}%. 
                      It should equal 100%.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Budget Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
                  <p className="text-sm text-gray-600">Total Budget</p>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={chartData}
                      dataKey="size"
                      stroke="#fff"
                      fill="#8884d8"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Treemap>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {chartData.map((item, index) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{formatCurrency(item.size)}</span>
                        <span className="text-sm text-gray-600 ml-2">{item.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Largest Allocations</h4>
                  {chartData
                    .sort((a, b) => b.size - a.size)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={item.name} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium">{index + 1}. {item.name}</span>
                          <span className="font-semibold">{formatCurrency(item.size)}</span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Budget Efficiency</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      <strong>Per Capita Allocation:</strong> {formatCurrency(totalBudget / 67000000)}
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Budget Balance:</strong> {results.isValid ? "✓ Balanced" : "⚠ Unbalanced"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  UK Budget Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Total UK Budget (2024):</strong> ~£1.1 trillion</p>
                  <p><strong>Healthcare (NHS):</strong> ~£180 billion</p>
                  <p><strong>Education:</strong> ~£100 billion</p>
                  <p><strong>Defense:</strong> ~£50 billion</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Budget Planning Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Balance:</strong> Ensure total allocations equal 100%</p>
                  <p><strong>Priorities:</strong> Consider current policy priorities</p>
                  <p><strong>Efficiency:</strong> Monitor per-capita spending</p>
                  <p><strong>Comparison:</strong> Compare with historical data</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UKBudgetAllocationTool;
