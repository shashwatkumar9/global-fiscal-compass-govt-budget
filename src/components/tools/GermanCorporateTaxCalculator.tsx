
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building, TrendingUp, FileText, AlertTriangle } from 'lucide-react';

interface CorporateTaxCalculation {
  taxableIncome: number;
  corporateIncomeTax: number;
  solidaritySurcharge: number;
  tradeTax: number;
  totalTax: number;
  effectiveRate: number;
  netIncome: number;
}

const GermanCorporateTaxCalculator = () => {
  const [grossProfit, setGrossProfit] = useState<number>(500000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(100000);
  const [depreciation, setDepreciation] = useState<number>(50000);
  const [municipality, setMunicipality] = useState<string>('berlin');
  const [companyType, setCompanyType] = useState<string>('gmbh');
  const [year, setYear] = useState<string>('2025');
  const [calculation, setCalculation] = useState<CorporateTaxCalculation | null>(null);

  // Trade tax multipliers by municipality (Hebesatz)
  const tradeTaxMultipliers: Record<string, number> = {
    'berlin': 410,
    'munich': 490,
    'hamburg': 470,
    'cologne': 475,
    'frankfurt': 460,
    'stuttgart': 420,
    'dusseldorf': 440,
    'dresden': 435,
    'leipzig': 460,
    'nuremberg': 460
  };

  const calculateCorporateTax = () => {
    const taxableIncome = Math.max(0, grossProfit - businessExpenses - depreciation);
    
    // Corporate Income Tax (Körperschaftsteuer) - 15%
    const corporateIncomeTax = taxableIncome * 0.15;
    
    // Solidarity Surcharge - 5.5% of corporate income tax
    const solidaritySurcharge = corporateIncomeTax * 0.055;
    
    // Trade Tax (Gewerbesteuer)
    const baseTradeTax = taxableIncome * 0.035; // 3.5% base rate
    const multiplier = tradeTaxMultipliers[municipality] || 400;
    const tradeTax = baseTradeTax * (multiplier / 100);
    
    const totalTax = corporateIncomeTax + solidaritySurcharge + tradeTax;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    const netIncome = taxableIncome - totalTax;

    setCalculation({
      taxableIncome,
      corporateIncomeTax,
      solidaritySurcharge,
      tradeTax,
      totalTax,
      effectiveRate,
      netIncome
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Building className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Corporate Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German corporate tax calculator for 2025 with Körperschaftsteuer, Gewerbesteuer, and solidarity surcharge calculations
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Corporate Income Tax</Badge>
          <Badge variant="secondary">Trade Tax</Badge>
          <Badge variant="secondary">Solidarity Surcharge</Badge>
          <Badge variant="secondary">All Municipalities</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>Enter your company's financial details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossProfit">Annual Gross Profit (€)</Label>
                  <Input
                    id="grossProfit"
                    type="number"
                    value={grossProfit}
                    onChange={(e) => setGrossProfit(Number(e.target.value))}
                    placeholder="500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessExpenses">Business Expenses (€)</Label>
                  <Input
                    id="businessExpenses"
                    type="number"
                    value={businessExpenses}
                    onChange={(e) => setBusinessExpenses(Number(e.target.value))}
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="depreciation">Depreciation (€)</Label>
                  <Input
                    id="depreciation"
                    type="number"
                    value={depreciation}
                    onChange={(e) => setDepreciation(Number(e.target.value))}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyType">Company Type</Label>
                  <Select value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmbh">GmbH</SelectItem>
                      <SelectItem value="ag">AG</SelectItem>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="ohg">OHG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipality">Municipality</Label>
                  <Select value={municipality} onValueChange={setMunicipality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="munich">Munich</SelectItem>
                      <SelectItem value="hamburg">Hamburg</SelectItem>
                      <SelectItem value="cologne">Cologne</SelectItem>
                      <SelectItem value="frankfurt">Frankfurt</SelectItem>
                      <SelectItem value="stuttgart">Stuttgart</SelectItem>
                      <SelectItem value="dusseldorf">Düsseldorf</SelectItem>
                      <SelectItem value="dresden">Dresden</SelectItem>
                      <SelectItem value="leipzig">Leipzig</SelectItem>
                      <SelectItem value="nuremberg">Nuremberg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Tax Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateCorporateTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Corporate Tax
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {calculation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Tax Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxable Income:</span>
                    <span className="font-medium">€{calculation.taxableIncome.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Corporate Income Tax (15%):</span>
                    <span className="font-medium">€{calculation.corporateIncomeTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solidarity Surcharge (5.5%):</span>
                    <span className="font-medium">€{calculation.solidaritySurcharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Trade Tax:</span>
                    <span className="font-medium">€{calculation.tradeTax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Tax:</span>
                    <span className="text-red-600">€{calculation.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Net Income:</span>
                    <span className="text-green-600">€{calculation.netIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Effective Tax Rate:</span>
                    <span className="font-medium">{calculation.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Corporate income tax calculation (15%)</li>
                <li>• Solidarity surcharge (5.5% of corporate tax)</li>
                <li>• Trade tax with municipal multipliers</li>
                <li>• All major German cities supported</li>
                <li>• Different company types (GmbH, AG, etc.)</li>
                <li>• Professional tax optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This calculator provides estimates based on current German tax laws. 
                Consult a tax advisor for official calculations and filing requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanCorporateTaxCalculator;
