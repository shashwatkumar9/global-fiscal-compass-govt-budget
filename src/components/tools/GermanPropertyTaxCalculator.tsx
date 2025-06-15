
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Home, MapPin, FileText, AlertTriangle } from 'lucide-react';

interface PropertyTaxCalculation {
  assessedValue: number;
  basicTaxAmount: number;
  municipalTax: number;
  totalAnnualTax: number;
  monthlyTax: number;
  effectiveRate: number;
}

const GermanPropertyTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [propertyType, setPropertyType] = useState<string>('residential');
  const [propertySize, setPropertySize] = useState<number>(100);
  const [municipality, setMunicipality] = useState<string>('berlin');
  const [federalState, setFederalState] = useState<string>('berlin');
  const [year, setYear] = useState<string>('2025');
  const [calculation, setCalculation] = useState<PropertyTaxCalculation | null>(null);

  // Municipal multipliers (Hebesatz) for property tax
  const municipalMultipliers: Record<string, number> = {
    'berlin': 810,
    'munich': 535,
    'hamburg': 540,
    'cologne': 470,
    'frankfurt': 460,
    'stuttgart': 420,
    'dusseldorf': 440,
    'dresden': 635,
    'leipzig': 650,
    'nuremberg': 580
  };

  // Basic tax rates by federal state (new system from 2025)
  const basicTaxRates: Record<string, { residential: number; commercial: number }> = {
    'berlin': { residential: 0.31, commercial: 0.34 },
    'bavaria': { residential: 0.30, commercial: 0.33 },
    'baden_wuerttemberg': { residential: 0.32, commercial: 0.35 },
    'nrw': { residential: 0.31, commercial: 0.34 },
    'hesse': { residential: 0.31, commercial: 0.34 },
    'lower_saxony': { residential: 0.30, commercial: 0.33 },
    'saxony': { residential: 0.29, commercial: 0.32 },
    'thuringia': { residential: 0.29, commercial: 0.32 }
  };

  const calculatePropertyTax = () => {
    // Simplified assessed value calculation (typically 70-90% of market value)
    const assessedValue = propertyValue * 0.8;
    
    // Basic tax rate per mille
    const stateRates = basicTaxRates[federalState] || basicTaxRates['berlin'];
    const basicRate = propertyType === 'residential' ? stateRates.residential : stateRates.commercial;
    
    // Basic tax amount (per mille of assessed value)
    const basicTaxAmount = (assessedValue * basicRate) / 1000;
    
    // Municipal multiplier
    const multiplier = municipalMultipliers[municipality] || 600;
    
    // Final municipal tax
    const municipalTax = basicTaxAmount * (multiplier / 100);
    
    const totalAnnualTax = municipalTax;
    const monthlyTax = totalAnnualTax / 12;
    const effectiveRate = (totalAnnualTax / propertyValue) * 100;

    setCalculation({
      assessedValue,
      basicTaxAmount,
      municipalTax,
      totalAnnualTax,
      monthlyTax,
      effectiveRate
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Property Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German property tax calculator (Grundsteuer) for 2025 with new reform calculations and municipal multipliers
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Grundsteuer Reform 2025</Badge>
          <Badge variant="secondary">Municipal Multipliers</Badge>
          <Badge variant="secondary">All Property Types</Badge>
          <Badge variant="secondary">Federal States</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Information
              </CardTitle>
              <CardDescription>Enter your property details for tax calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Market Value (€)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    placeholder="500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertySize">Property Size (m²)</Label>
                  <Input
                    id="propertySize"
                    type="number"
                    value={propertySize}
                    onChange={(e) => setPropertySize(Number(e.target.value))}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="thuringia">Thuringia</SelectItem>
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

              <Button onClick={calculatePropertyTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Property Tax
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
                  <MapPin className="w-5 h-5 text-green-600" />
                  Tax Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Property Value:</span>
                    <span className="font-medium">€{propertyValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Assessed Value:</span>
                    <span className="font-medium">€{calculation.assessedValue.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Basic Tax Amount:</span>
                    <span className="font-medium">€{calculation.basicTaxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Municipal Tax:</span>
                    <span className="font-medium">€{calculation.municipalTax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Annual Property Tax:</span>
                    <span className="text-red-600">€{calculation.totalAnnualTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Monthly Property Tax:</span>
                    <span className="text-blue-600">€{calculation.monthlyTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Effective Tax Rate:</span>
                    <span className="font-medium">{calculation.effectiveRate.toFixed(3)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Property Tax Reform 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• New assessment based on current market values</li>
                <li>• Federal state-specific tax rates</li>
                <li>• Municipal multipliers (Hebesatz)</li>
                <li>• Separate rates for residential/commercial</li>
                <li>• Updated calculation methods</li>
                <li>• Transition period until 2030</li>
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
                Property tax calculations are complex and may vary by specific location and property characteristics. 
                Consult local tax authorities for official assessments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanPropertyTaxCalculator;
