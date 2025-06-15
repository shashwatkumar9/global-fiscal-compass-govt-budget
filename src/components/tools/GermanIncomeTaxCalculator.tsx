
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Info, TrendingUp, Users, Home, Building } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface TaxCalculationResult {
  grossIncome: number;
  taxableIncome: number;
  incomeTax: number;
  solidarityTax: number;
  churchTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
  monthlyNet: number;
  childBenefits: {
    kindergeld: number;
    taxSavings: number;
    recommendation: string;
    benefit: number;
  };
}

interface TaxInputs {
  grossIncome: number;
  taxClass: number;
  federalState: string;
  isChurchMember: boolean;
  children: number;
  maritalStatus: string;
  spouseIncome: number;
  workExpenses: number;
  commuteDistance: number;
  workDays: number;
  homeOfficeDays: number;
  specialExpenses: number;
  extraordinaryExpenses: number;
}

const GermanIncomeTaxCalculator: React.FC = () => {
  const t = useTranslations();
  
  const [inputs, setInputs] = useState<TaxInputs>({
    grossIncome: 50000,
    taxClass: 1,
    federalState: 'NW',
    isChurchMember: false,
    children: 0,
    maritalStatus: 'single',
    spouseIncome: 0,
    workExpenses: 1230,
    commuteDistance: 0,
    workDays: 220,
    homeOfficeDays: 0,
    specialExpenses: 0,
    extraordinaryExpenses: 0
  });

  const [results, setResults] = useState<TaxCalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const germanStates = [
    { code: 'BW', name: 'Baden-Württemberg' },
    { code: 'BY', name: 'Bavaria (Bayern)' },
    { code: 'BE', name: 'Berlin' },
    { code: 'BB', name: 'Brandenburg' },
    { code: 'HB', name: 'Bremen' },
    { code: 'HH', name: 'Hamburg' },
    { code: 'HE', name: 'Hesse (Hessen)' },
    { code: 'MV', name: 'Mecklenburg-Vorpommern' },
    { code: 'NI', name: 'Lower Saxony (Niedersachsen)' },
    { code: 'NW', name: 'North Rhine-Westphalia' },
    { code: 'RP', name: 'Rhineland-Palatinate' },
    { code: 'SL', name: 'Saarland' },
    { code: 'SN', name: 'Saxony (Sachsen)' },
    { code: 'ST', name: 'Saxony-Anhalt' },
    { code: 'SH', name: 'Schleswig-Holstein' },
    { code: 'TH', name: 'Thuringia (Thüringen)' }
  ];

  const taxClasses = [
    { value: 1, label: 'Class 1 - Single' },
    { value: 2, label: 'Class 2 - Single Parent' },
    { value: 3, label: 'Class 3 - Married (Higher Earner)' },
    { value: 4, label: 'Class 4 - Married (Equal Income)' },
    { value: 5, label: 'Class 5 - Married (Lower Earner)' },
    { value: 6, label: 'Class 6 - Second Job' }
  ];

  // German tax calculation logic
  const calculateIncomeTax = (taxableIncome: number): number => {
    if (taxableIncome <= 12096) {
      return 0;
    } else if (taxableIncome <= 17444) {
      return (taxableIncome - 12096) * 0.14;
    } else if (taxableIncome <= 66760) {
      const y = (taxableIncome - 17444) / 10000;
      return (922.98 * y + 1400) * y;
    } else if (taxableIncome <= 277825) {
      return 0.42 * taxableIncome - 9972.28;
    } else {
      return 0.45 * taxableIncome - 17927.68;
    }
  };

  const calculateSolidarityTax = (incomeTax: number, maritalStatus: string): number => {
    const threshold = maritalStatus === 'married' ? 39900 : 19950;
    const fullThreshold = maritalStatus === 'married' ? 44550 : 22275;
    
    if (incomeTax <= threshold) {
      return 0;
    } else if (incomeTax >= fullThreshold) {
      return incomeTax * 0.055;
    } else {
      const excessAmount = incomeTax - threshold;
      const slidingRange = fullThreshold - threshold;
      const factor = excessAmount / slidingRange;
      return incomeTax * 0.055 * factor;
    }
  };

  const calculateChurchTax = (incomeTax: number, state: string, isChurchMember: boolean): number => {
    if (!isChurchMember) return 0;
    
    const rate = ['BW', 'BY'].includes(state) ? 0.08 : 0.09;
    return incomeTax * rate;
  };

  const calculateChildBenefits = (taxableIncome: number, children: number, marginalRate: number) => {
    if (children === 0) {
      return { kindergeld: 0, taxSavings: 0, recommendation: 'none', benefit: 0 };
    }

    let kindergeldAnnual = 0;
    for (let i = 1; i <= children; i++) {
      if (i <= 2) kindergeldAnnual += 250 * 12;
      else if (i === 3) kindergeldAnnual += 256 * 12;
      else kindergeldAnnual += 282 * 12;
    }

    const taxSavings = 9540 * children * marginalRate;
    
    return {
      kindergeld: kindergeldAnnual,
      taxSavings: taxSavings,
      recommendation: taxSavings > kindergeldAnnual ? 'allowance' : 'benefit',
      benefit: Math.max(kindergeldAnnual, taxSavings)
    };
  };

  const calculateCommuteDeduction = (distance: number, workDays: number): number => {
    if (distance === 0) return 0;
    
    const first20km = Math.min(distance, 20) * 0.30 * workDays;
    const above20km = Math.max(0, distance - 20) * 0.38 * workDays;
    return Math.min(first20km + above20km, 4500);
  };

  const calculateHomeOfficeDeduction = (days: number): number => {
    return Math.min(days * 6, 1260);
  };

  const calculateMarginalRate = (taxableIncome: number): number => {
    if (taxableIncome <= 12096) return 0;
    if (taxableIncome <= 17444) return 0.14;
    if (taxableIncome <= 66760) {
      const y = (taxableIncome - 17444) / 10000;
      return (1845.96 * y + 1400) / 10000;
    }
    if (taxableIncome <= 277825) return 0.42;
    return 0.45;
  };

  const calculateTax = (): void => {
    const commuteDeduction = calculateCommuteDeduction(inputs.commuteDistance, inputs.workDays);
    const homeOfficeDeduction = calculateHomeOfficeDeduction(inputs.homeOfficeDays);
    
    const totalWorkExpenses = Math.max(1230, inputs.workExpenses + commuteDeduction + homeOfficeDeduction);
    
    let basicAllowance = 12096;
    let singleParentRelief = 0;
    
    if (inputs.taxClass === 2) {
      singleParentRelief = 4260 + Math.max(0, inputs.children - 1) * 240;
    } else if (inputs.taxClass === 3) {
      basicAllowance = 24192; // Double allowance for tax class 3
    }
    
    const totalDeductions = basicAllowance + totalWorkExpenses + inputs.specialExpenses + 
                           inputs.extraordinaryExpenses + singleParentRelief;
    
    const taxableIncome = Math.max(0, inputs.grossIncome - totalDeductions);
    const incomeTax = Math.max(0, calculateIncomeTax(taxableIncome));
    const solidarityTax = calculateSolidarityTax(incomeTax, inputs.maritalStatus);
    const churchTax = calculateChurchTax(incomeTax, inputs.federalState, inputs.isChurchMember);
    const totalTax = incomeTax + solidarityTax + churchTax;
    const netIncome = inputs.grossIncome - totalTax;
    const effectiveRate = inputs.grossIncome > 0 ? (totalTax / inputs.grossIncome) : 0;
    const marginalRate = calculateMarginalRate(taxableIncome);
    const childBenefits = calculateChildBenefits(taxableIncome, inputs.children, marginalRate);

    setResults({
      grossIncome: inputs.grossIncome,
      taxableIncome,
      incomeTax,
      solidarityTax,
      churchTax,
      totalTax,
      netIncome,
      effectiveRate,
      marginalRate,
      monthlyNet: netIncome / 12,
      childBenefits
    });
  };

  useEffect(() => {
    calculateTax();
  }, [inputs]);

  const updateInput = (field: keyof TaxInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          German Income Tax Calculator 2025
        </h1>
        <p className="text-gray-600">
          Professional tax calculation for Germany with all deductions and allowances
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Tax Calculation Inputs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="deductions">Deductions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="grossIncome">Annual Gross Income (€)</Label>
                    <Input
                      id="grossIncome"
                      type="number"
                      value={inputs.grossIncome}
                      onChange={(e) => updateInput('grossIncome', Number(e.target.value))}
                      min="0"
                      step="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxClass">Tax Class (Steuerklasse)</Label>
                    <Select value={String(inputs.taxClass)} onValueChange={(value) => updateInput('taxClass', Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {taxClasses.map((tc) => (
                          <SelectItem key={tc.value} value={String(tc.value)}>
                            {tc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="federalState">Federal State</Label>
                    <Select value={inputs.federalState} onValueChange={(value) => updateInput('federalState', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {germanStates.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personal" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="churchMember"
                      checked={inputs.isChurchMember}
                      onCheckedChange={(checked) => updateInput('isChurchMember', checked)}
                    />
                    <Label htmlFor="churchMember">Church Tax Member</Label>
                  </div>

                  <div>
                    <Label htmlFor="children">Number of Children</Label>
                    <Input
                      id="children"
                      type="number"
                      value={inputs.children}
                      onChange={(e) => updateInput('children', Number(e.target.value))}
                      min="0"
                      max="10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select value={inputs.maritalStatus} onValueChange={(value) => updateInput('maritalStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {inputs.maritalStatus === 'married' && (
                    <div>
                      <Label htmlFor="spouseIncome">Spouse Annual Income (€)</Label>
                      <Input
                        id="spouseIncome"
                        type="number"
                        value={inputs.spouseIncome}
                        onChange={(e) => updateInput('spouseIncome', Number(e.target.value))}
                        min="0"
                        step="100"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="deductions" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workExpenses">Additional Work Expenses (€)</Label>
                    <Input
                      id="workExpenses"
                      type="number"
                      value={inputs.workExpenses}
                      onChange={(e) => updateInput('workExpenses', Number(e.target.value))}
                      min="1230"
                      step="10"
                    />
                    <p className="text-sm text-gray-500 mt-1">Minimum €1,230 automatically applied</p>
                  </div>

                  <div>
                    <Label htmlFor="commuteDistance">Daily Commute Distance (km)</Label>
                    <Input
                      id="commuteDistance"
                      type="number"
                      value={inputs.commuteDistance}
                      onChange={(e) => updateInput('commuteDistance', Number(e.target.value))}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="workDays">Annual Work Days</Label>
                    <Input
                      id="workDays"
                      type="number"
                      value={inputs.workDays}
                      onChange={(e) => updateInput('workDays', Number(e.target.value))}
                      min="0"
                      max="365"
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeOfficeDays">Home Office Days</Label>
                    <Input
                      id="homeOfficeDays"
                      type="number"
                      value={inputs.homeOfficeDays}
                      onChange={(e) => updateInput('homeOfficeDays', Number(e.target.value))}
                      min="0"
                      max="365"
                    />
                    <p className="text-sm text-gray-500 mt-1">€6 per day, max €1,260</p>
                  </div>

                  <div>
                    <Label htmlFor="specialExpenses">Special Expenses (€)</Label>
                    <Input
                      id="specialExpenses"
                      type="number"
                      value={inputs.specialExpenses}
                      onChange={(e) => updateInput('specialExpenses', Number(e.target.value))}
                      min="0"
                      step="10"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tax Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Gross Income</p>
                    <p className="text-2xl font-bold text-blue-800">{formatCurrency(results.grossIncome)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Net Income</p>
                    <p className="text-2xl font-bold text-green-800">{formatCurrency(results.netIncome)}</p>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Tax Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Taxable Income:</span>
                      <span className="font-medium">{formatCurrency(results.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Tax:</span>
                      <span className="font-medium">{formatCurrency(results.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Solidarity Surcharge:</span>
                      <span className="font-medium">{formatCurrency(results.solidarityTax)}</span>
                    </div>
                    {inputs.isChurchMember && (
                      <div className="flex justify-between">
                        <span>Church Tax:</span>
                        <span className="font-medium">{formatCurrency(results.churchTax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Total Tax:</span>
                      <span>{formatCurrency(results.totalTax)}</span>
                    </div>
                  </div>
                </div>

                {/* Tax Rates */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Tax Rates</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Effective Rate</p>
                      <p className="text-lg font-bold">{formatPercentage(results.effectiveRate)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Marginal Rate</p>
                      <p className="text-lg font-bold">{formatPercentage(results.marginalRate)}</p>
                    </div>
                  </div>
                </div>

                {/* Monthly Income */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">Monthly Net Income</p>
                  <p className="text-2xl font-bold text-yellow-800">{formatCurrency(results.monthlyNet)}</p>
                </div>

                {/* Child Benefits */}
                {inputs.children > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Child Benefits
                    </h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600">Recommended: {results.childBenefits.recommendation === 'benefit' ? 'Child Benefit (Kindergeld)' : 'Child Allowance (Kinderfreibetrag)'}</p>
                      <p className="text-lg font-bold text-purple-800">{formatCurrency(results.childBenefits.benefit)}</p>
                      <p className="text-xs text-purple-600 mt-1">
                        Child Benefit: {formatCurrency(results.childBenefits.kindergeld)} | 
                        Tax Savings: {formatCurrency(results.childBenefits.taxSavings)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tax Year 2025</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Basic allowance: €12,096</li>
                <li>• Employee allowance: €1,230 (minimum)</li>
                <li>• Home office: €6/day (max €1,260)</li>
                <li>• Commute: €0.30/km first 20km, €0.38/km above</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Legal Basis</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Einkommensteuergesetz (EStG) §32a</li>
                <li>• Current as of January 1, 2025</li>
                <li>• All calculations are estimates</li>
                <li>• Consult tax advisor for official advice</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GermanIncomeTaxCalculator;
