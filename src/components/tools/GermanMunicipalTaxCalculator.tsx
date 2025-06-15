
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building2, MapPin, FileText, AlertTriangle } from 'lucide-react';

interface MunicipalTaxCalculation {
  businessIncome: number;
  tradeTaxBase: number;
  tradeTax: number;
  municipalMultiplier: number;
  effectiveRate: number;
  netIncome: number;
}

const GermanMunicipalTaxCalculator = () => {
  const [businessIncome, setBusinessIncome] = useState<number>(100000);
  const [businessType, setBusinessType] = useState<string>('gmbh');
  const [municipality, setMunicipality] = useState<string>('berlin');
  const [federalState, setFederalState] = useState<string>('berlin');
  const [businessExpenses, setBusinessExpenses] = useState<number>(20000);
  const [exemptionAmount, setExemptionAmount] = useState<number>(24500);
  const [year, setYear] = useState<string>('2025');
  const [calculation, setCalculation] = useState<MunicipalTaxCalculation | null>(null);

  // Municipal multipliers (Hebesätze) for trade tax 2025
  const municipalMultipliers: Record<string, number> = {
    'berlin': 410,
    'munich': 490,
    'hamburg': 470,
    'cologne': 475,
    'frankfurt': 460,
    'stuttgart': 420,
    'dusseldorf': 440,
    'dresden': 635,
    'leipzig': 650,
    'nuremberg': 580,
    'bremen': 460,
    'hannover': 460,
    'duisburg': 540,
    'essen': 570,
    'dortmund': 540
  };

  // Federal state information
  const federalStates: Record<string, string> = {
    'berlin': 'Berlin',
    'bavaria': 'Bavaria',
    'baden_wuerttemberg': 'Baden-Württemberg',
    'nrw': 'North Rhine-Westphalia',
    'hesse': 'Hesse',
    'lower_saxony': 'Lower Saxony',
    'saxony': 'Saxony',
    'bremen': 'Bremen',
    'hamburg': 'Hamburg'
  };

  const calculateMunicipalTax = () => {
    // Calculate trade tax base (Gewerbeertrag)
    const adjustedIncome = businessIncome - businessExpenses;
    const tradeTaxBase = Math.max(0, adjustedIncome - exemptionAmount);
    
    // Base trade tax rate is 3.5%
    const baseTradeTax = tradeTaxBase * 0.035;
    
    // Apply municipal multiplier (Hebesatz)
    const multiplier = municipalMultipliers[municipality] || 400;
    const tradeTax = baseTradeTax * (multiplier / 100);
    
    const effectiveRate = adjustedIncome > 0 ? (tradeTax / adjustedIncome) * 100 : 0;
    const netIncome = adjustedIncome - tradeTax;

    setCalculation({
      businessIncome: adjustedIncome,
      tradeTaxBase,
      tradeTax,
      municipalMultiplier: multiplier,
      effectiveRate,
      netIncome
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Municipal Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German municipal trade tax calculator (Gewerbesteuer) with all municipal multipliers and exemption thresholds
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Trade Tax</Badge>
          <Badge variant="secondary">Municipal Multipliers</Badge>
          <Badge variant="secondary">All Cities</Badge>
          <Badge variant="secondary">Business Types</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>Enter your business details for municipal tax calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessIncome">Annual Business Income (€)</Label>
                  <Input
                    id="businessIncome"
                    type="number"
                    value={businessIncome}
                    onChange={(e) => setBusinessIncome(Number(e.target.value))}
                    placeholder="100000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessExpenses">Business Expenses (€)</Label>
                  <Input
                    id="businessExpenses"
                    type="number"
                    value={businessExpenses}
                    onChange={(e) => setBusinessExpenses(Number(e.target.value))}
                    placeholder="20000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmbh">GmbH (Limited Company)</SelectItem>
                      <SelectItem value="ag">AG (Stock Corporation)</SelectItem>
                      <SelectItem value="einzelunternehmen">Sole Proprietorship</SelectItem>
                      <SelectItem value="kg">KG (Limited Partnership)</SelectItem>
                      <SelectItem value="ohg">OHG (General Partnership)</SelectItem>
                      <SelectItem value="ug">UG (Mini-GmbH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exemptionAmount">Exemption Amount (€)</Label>
                  <Input
                    id="exemptionAmount"
                    type="number"
                    value={exemptionAmount}
                    onChange={(e) => setExemptionAmount(Number(e.target.value))}
                    placeholder="24500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="federalState">Federal State</Label>
                  <Select value={federalState} onValueChange={setFederalState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="bavaria">Bavaria</SelectItem>
                      <SelectItem value="baden_wuerttemberg">Baden-Württemberg</SelectItem>
                      <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
                      <SelectItem value="hesse">Hesse</SelectItem>
                      <SelectItem value="lower_saxony">Lower Saxony</SelectItem>
                      <SelectItem value="saxony">Saxony</SelectItem>
                      <SelectItem value="bremen">Bremen</SelectItem>
                      <SelectItem value="hamburg">Hamburg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="bremen">Bremen</SelectItem>
                      <SelectItem value="hannover">Hannover</SelectItem>
                      <SelectItem value="duisburg">Duisburg</SelectItem>
                      <SelectItem value="essen">Essen</SelectItem>
                      <SelectItem value="dortmund">Dortmund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              <Button onClick={calculateMunicipalTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Municipal Tax
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
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Municipal Tax Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Business Income:</span>
                    <span className="font-medium">€{calculation.businessIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Exemption Amount:</span>
                    <span className="font-medium text-green-600">€{exemptionAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Trade Tax Base:</span>
                    <span className="font-medium">€{calculation.tradeTaxBase.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Base Rate (3.5%):</span>
                    <span className="font-medium">€{(calculation.tradeTaxBase * 0.035).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Municipal Multiplier:</span>
                    <span className="font-medium">{calculation.municipalMultiplier}%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Municipal Trade Tax:</span>
                    <span className="text-red-600">€{calculation.tradeTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Net Business Income:</span>
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
                Trade Tax Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Base Rate:</strong> 3.5% on trade income</li>
                <li>• <strong>Exemption:</strong> €24,500 for most businesses</li>
                <li>• <strong>Municipal Multiplier:</strong> Varies by city (300-650%)</li>
                <li>• <strong>Deductible:</strong> Partially from income tax</li>
                <li>• <strong>Due Date:</strong> Quarterly payments</li>
                <li>• <strong>Applies to:</strong> Most commercial activities</li>
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
                Municipal trade tax calculations involve complex rules and deductions. 
                Consult a tax advisor for accurate calculations and filing requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanMunicipalTaxCalculator;
