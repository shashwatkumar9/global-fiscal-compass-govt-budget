
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Users, Heart, FileText, AlertTriangle } from 'lucide-react';

interface InheritanceTaxCalculation {
  inheritanceValue: number;
  exemptionAmount: number;
  taxableAmount: number;
  inheritanceTax: number;
  effectiveRate: number;
  netInheritance: number;
}

const GermanInheritanceTaxCalculator = () => {
  const [inheritanceValue, setInheritanceValue] = useState<number>(500000);
  const [relationship, setRelationship] = useState<string>('child');
  const [propertyValue, setPropertyValue] = useState<number>(300000);
  const [cashAssets, setCashAssets] = useState<number>(150000);
  const [otherAssets, setOtherAssets] = useState<number>(50000);
  const [debts, setDebts] = useState<number>(0);
  const [year, setYear] = useState<string>('2025');
  const [calculation, setCalculation] = useState<InheritanceTaxCalculation | null>(null);

  // Tax-free allowances (Freibeträge) by relationship
  const exemptions: Record<string, number> = {
    'spouse': 500000,
    'child': 400000,
    'grandchild': 200000,
    'parent': 100000,
    'sibling': 20000,
    'other_relative': 20000,
    'unrelated': 20000
  };

  // Tax classes by relationship
  const taxClasses: Record<string, number> = {
    'spouse': 1,
    'child': 1,
    'grandchild': 1,
    'parent': 2,
    'sibling': 2,
    'other_relative': 2,
    'unrelated': 3
  };

  // Tax rates by tax class and inheritance amount
  const getTaxRate = (taxableAmount: number, taxClass: number): number => {
    if (taxClass === 1) {
      if (taxableAmount <= 75000) return 0.07;
      if (taxableAmount <= 300000) return 0.11;
      if (taxableAmount <= 600000) return 0.15;
      if (taxableAmount <= 6000000) return 0.19;
      if (taxableAmount <= 13000000) return 0.23;
      if (taxableAmount <= 26000000) return 0.27;
      return 0.30;
    } else if (taxClass === 2) {
      if (taxableAmount <= 75000) return 0.15;
      if (taxableAmount <= 300000) return 0.20;
      if (taxableAmount <= 600000) return 0.25;
      if (taxableAmount <= 6000000) return 0.30;
      if (taxableAmount <= 13000000) return 0.35;
      if (taxableAmount <= 26000000) return 0.40;
      return 0.43;
    } else {
      if (taxableAmount <= 75000) return 0.30;
      if (taxableAmount <= 300000) return 0.35;
      if (taxableAmount <= 600000) return 0.40;
      if (taxableAmount <= 6000000) return 0.45;
      if (taxableAmount <= 13000000) return 0.50;
      if (taxableAmount <= 26000000) return 0.55;
      return 0.60;
    }
  };

  const calculateInheritanceTax = () => {
    const totalAssets = propertyValue + cashAssets + otherAssets;
    const netInheritanceValue = totalAssets - debts;
    
    const exemptionAmount = exemptions[relationship] || 20000;
    const taxableAmount = Math.max(0, netInheritanceValue - exemptionAmount);
    
    const taxClass = taxClasses[relationship] || 3;
    const taxRate = getTaxRate(taxableAmount, taxClass);
    
    const inheritanceTax = taxableAmount * taxRate;
    const effectiveRate = netInheritanceValue > 0 ? (inheritanceTax / netInheritanceValue) * 100 : 0;
    const netInheritance = netInheritanceValue - inheritanceTax;

    setCalculation({
      inheritanceValue: netInheritanceValue,
      exemptionAmount,
      taxableAmount,
      inheritanceTax,
      effectiveRate,
      netInheritance
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Inheritance Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German inheritance and gift tax calculator (Erbschaftsteuer) with all exemptions, tax classes, and progressive rates
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">All Relationships</Badge>
          <Badge variant="secondary">Tax Classes</Badge>
          <Badge variant="secondary">Exemptions</Badge>
          <Badge variant="secondary">Progressive Rates</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Inheritance Details
              </CardTitle>
              <CardDescription>Enter inheritance value and relationship information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship to Deceased</Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse/Partner</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="grandchild">Grandchild</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other_relative">Other Relative</SelectItem>
                    <SelectItem value="unrelated">Unrelated Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Real Estate Value (€)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    placeholder="300000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashAssets">Cash & Bank Assets (€)</Label>
                  <Input
                    id="cashAssets"
                    type="number"
                    value={cashAssets}
                    onChange={(e) => setCashAssets(Number(e.target.value))}
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="otherAssets">Other Assets (€)</Label>
                  <Input
                    id="otherAssets"
                    type="number"
                    value={otherAssets}
                    onChange={(e) => setOtherAssets(Number(e.target.value))}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debts">Debts & Liabilities (€)</Label>
                  <Input
                    id="debts"
                    type="number"
                    value={debts}
                    onChange={(e) => setDebts(Number(e.target.value))}
                    placeholder="0"
                  />
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

              <Button onClick={calculateInheritanceTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Inheritance Tax
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
                  <Heart className="w-5 h-5 text-red-600" />
                  Tax Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Inheritance Value:</span>
                    <span className="font-medium">€{calculation.inheritanceValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax-Free Allowance:</span>
                    <span className="font-medium text-green-600">€{calculation.exemptionAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxable Amount:</span>
                    <span className="font-medium">€{calculation.taxableAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax Class:</span>
                    <span className="font-medium">{taxClasses[relationship]}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Inheritance Tax:</span>
                    <span className="text-red-600">€{calculation.inheritanceTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Net Inheritance:</span>
                    <span className="text-green-600">€{calculation.netInheritance.toLocaleString()}</span>
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
                Tax-Free Allowances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Spouse:</strong> €500,000</li>
                <li>• <strong>Children:</strong> €400,000</li>
                <li>• <strong>Grandchildren:</strong> €200,000</li>
                <li>• <strong>Parents:</strong> €100,000</li>
                <li>• <strong>Siblings:</strong> €20,000</li>
                <li>• <strong>Others:</strong> €20,000</li>
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
                Inheritance tax calculations can be complex with various exemptions and special rules. 
                Professional tax and legal advice is recommended for estate planning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanInheritanceTaxCalculator;
