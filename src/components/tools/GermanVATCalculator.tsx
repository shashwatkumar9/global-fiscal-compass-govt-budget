
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Info, TrendingUp, Receipt, Building, ShoppingCart } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface VATCalculationResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRate: number;
  effectiveRate: number;
  applicableRegulation: string;
  businessCase: string;
}

interface VATInputs {
  amount: number;
  calculationType: 'addVAT' | 'removeVAT' | 'findNet' | 'findGross';
  vatRate: number;
  businessType: 'b2b' | 'b2c' | 'export' | 'import' | 'intraCommunity';
  goodsType: 'standard' | 'reduced' | 'superReduced' | 'exempt' | 'zeroRated';
  customerLocation: 'germany' | 'eu' | 'nonEu';
  isSmallBusiness: boolean;
  reverseCharge: boolean;
  digitalServices: boolean;
  isRegistered: boolean;
}

const GermanVATCalculator: React.FC = () => {
  const t = useTranslations();
  
  const [inputs, setInputs] = useState<VATInputs>({
    amount: 1000,
    calculationType: 'addVAT',
    vatRate: 19,
    businessType: 'b2c',
    goodsType: 'standard',
    customerLocation: 'germany',
    isSmallBusiness: false,
    reverseCharge: false,
    digitalServices: false,
    isRegistered: true
  });

  const [results, setResults] = useState<VATCalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  // German VAT rates for 2025
  const vatRates = {
    standard: 19,
    reduced: 7,
    superReduced: 5, // For certain items like books, newspapers
    exempt: 0,
    zeroRated: 0
  };

  const businessTypes = [
    { value: 'b2c', label: 'Business to Consumer (B2C)' },
    { value: 'b2b', label: 'Business to Business (B2B)' },
    { value: 'export', label: 'Export (Non-EU)' },
    { value: 'import', label: 'Import' },
    { value: 'intraCommunity', label: 'Intra-Community (EU)' }
  ];

  const goodsTypes = [
    { value: 'standard', label: 'Standard Goods (19%)', rate: 19 },
    { value: 'reduced', label: 'Reduced Rate Goods (7%)', rate: 7 },
    { value: 'superReduced', label: 'Books/Newspapers (5%)', rate: 5 },
    { value: 'exempt', label: 'VAT Exempt', rate: 0 },
    { value: 'zeroRated', label: 'Zero-Rated', rate: 0 }
  ];

  const calculationTypes = [
    { value: 'addVAT', label: 'Add VAT to Net Amount' },
    { value: 'removeVAT', label: 'Remove VAT from Gross Amount' },
    { value: 'findNet', label: 'Calculate Net from Gross' },
    { value: 'findGross', label: 'Calculate Gross from Net' }
  ];

  const customerLocations = [
    { value: 'germany', label: 'Germany' },
    { value: 'eu', label: 'European Union' },
    { value: 'nonEu', label: 'Non-EU Country' }
  ];

  // Determine applicable VAT rate based on business rules
  const getApplicableVATRate = (): { rate: number; regulation: string; businessCase: string } => {
    let rate = inputs.vatRate;
    let regulation = 'UStG §12 (Standard Rate)';
    let businessCase = 'Standard domestic transaction';

    // Small business regulation (Kleinunternehmerregelung)
    if (inputs.isSmallBusiness) {
      return {
        rate: 0,
        regulation: 'UStG §19 (Small Business)',
        businessCase: 'Small business exemption - no VAT charged'
      };
    }

    // Export transactions
    if (inputs.businessType === 'export' && inputs.customerLocation === 'nonEu') {
      return {
        rate: 0,
        regulation: 'UStG §4 Nr. 1a (Export)',
        businessCase: 'Export to non-EU country - zero-rated'
      };
    }

    // Intra-Community supplies
    if (inputs.businessType === 'intraCommunity' && inputs.customerLocation === 'eu') {
      if (inputs.isRegistered) {
        return {
          rate: 0,
          regulation: 'UStG §4 Nr. 1b (Intra-Community)',
          businessCase: 'Intra-Community supply to VAT-registered business'
        };
      } else {
        businessCase = 'Intra-Community supply to non-registered customer';
      }
    }

    // Reverse charge mechanism
    if (inputs.reverseCharge && inputs.businessType === 'b2b') {
      return {
        rate: 0,
        regulation: 'UStG §13b (Reverse Charge)',
        businessCase: 'Reverse charge - VAT liability on customer'
      };
    }

    // Digital services rules
    if (inputs.digitalServices && inputs.businessType === 'b2c') {
      if (inputs.customerLocation === 'eu') {
        businessCase = 'Digital services to EU consumer - destination country VAT applies';
        regulation = 'UStG §3a (Digital Services)';
      }
    }

    // Apply goods-specific rates
    const goodsTypeRate = goodsTypes.find(gt => gt.value === inputs.goodsType)?.rate;
    if (goodsTypeRate !== undefined) {
      rate = goodsTypeRate;
      
      if (inputs.goodsType === 'reduced') {
        regulation = 'UStG §12 Abs. 2 (Reduced Rate)';
        businessCase = 'Reduced rate goods (food, books, etc.)';
      } else if (inputs.goodsType === 'exempt') {
        regulation = 'UStG §4 (VAT Exempt)';
        businessCase = 'VAT exempt transaction (healthcare, education, etc.)';
      }
    }

    return { rate, regulation, businessCase };
  };

  // Calculate VAT based on type and business rules
  const calculateVAT = (): void => {
    const { rate, regulation, businessCase } = getApplicableVATRate();
    const vatDecimal = rate / 100;

    let netAmount: number;
    let vatAmount: number;
    let grossAmount: number;

    switch (inputs.calculationType) {
      case 'addVAT':
        // Add VAT to net amount
        netAmount = inputs.amount;
        vatAmount = netAmount * vatDecimal;
        grossAmount = netAmount + vatAmount;
        break;

      case 'removeVAT':
        // Remove VAT from gross amount
        grossAmount = inputs.amount;
        netAmount = grossAmount / (1 + vatDecimal);
        vatAmount = grossAmount - netAmount;
        break;

      case 'findNet':
        // Calculate net from gross
        grossAmount = inputs.amount;
        netAmount = grossAmount / (1 + vatDecimal);
        vatAmount = grossAmount - netAmount;
        break;

      case 'findGross':
        // Calculate gross from net
        netAmount = inputs.amount;
        vatAmount = netAmount * vatDecimal;
        grossAmount = netAmount + vatAmount;
        break;

      default:
        netAmount = inputs.amount;
        vatAmount = 0;
        grossAmount = netAmount;
    }

    const effectiveRate = netAmount > 0 ? (vatAmount / netAmount) : 0;

    setResults({
      netAmount,
      vatAmount,
      grossAmount,
      vatRate: rate,
      effectiveRate,
      applicableRegulation: regulation,
      businessCase
    });
  };

  useEffect(() => {
    calculateVAT();
  }, [inputs]);

  const updateInput = (field: keyof VATInputs, value: any) => {
    setInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      
      // Auto-update VAT rate when goods type changes
      if (field === 'goodsType') {
        const goodsType = goodsTypes.find(gt => gt.value === value);
        if (goodsType) {
          newInputs.vatRate = goodsType.rate;
        }
      }
      
      return newInputs;
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          German VAT Calculator 2025
        </h1>
        <p className="text-gray-600">
          Professional VAT calculation for Germany with all business scenarios and regulations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              VAT Calculation Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={inputs.amount}
                      onChange={(e) => updateInput('amount', Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="calculationType">Calculation Type</Label>
                    <Select value={inputs.calculationType} onValueChange={(value) => updateInput('calculationType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {calculationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goodsType">Goods/Services Type</Label>
                    <Select value={inputs.goodsType} onValueChange={(value) => updateInput('goodsType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {goodsTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vatRate">VAT Rate (%)</Label>
                    <Input
                      id="vatRate"
                      type="number"
                      value={inputs.vatRate}
                      onChange={(e) => updateInput('vatRate', Number(e.target.value))}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={inputs.businessType} onValueChange={(value) => updateInput('businessType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="customerLocation">Customer Location</Label>
                    <Select value={inputs.customerLocation} onValueChange={(value) => updateInput('customerLocation', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {customerLocations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isRegistered"
                        checked={inputs.isRegistered}
                        onCheckedChange={(checked) => updateInput('isRegistered', checked)}
                      />
                      <Label htmlFor="isRegistered">VAT Registered Business</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isSmallBusiness"
                        checked={inputs.isSmallBusiness}
                        onCheckedChange={(checked) => updateInput('isSmallBusiness', checked)}
                      />
                      <Label htmlFor="isSmallBusiness">Small Business (Kleinunternehmer)</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reverseCharge"
                      checked={inputs.reverseCharge}
                      onCheckedChange={(checked) => updateInput('reverseCharge', checked)}
                    />
                    <Label htmlFor="reverseCharge">Reverse Charge Mechanism</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="digitalServices"
                      checked={inputs.digitalServices}
                      onCheckedChange={(checked) => updateInput('digitalServices', checked)}
                    />
                    <Label htmlFor="digitalServices">Digital Services</Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Advanced Rules</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Reverse charge: VAT responsibility shifts to customer</li>
                      <li>• Digital services: Destination country rules apply</li>
                      <li>• Small business: No VAT charged under €22,000 threshold</li>
                      <li>• Intra-Community: Special EU trade rules</li>
                    </ul>
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
              VAT Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-6">
                {/* Main Results */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Net Amount</p>
                    <p className="text-2xl font-bold text-blue-800">{formatCurrency(results.netAmount)}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">VAT Amount</p>
                    <p className="text-2xl font-bold text-red-800">{formatCurrency(results.vatAmount)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Gross Amount</p>
                    <p className="text-2xl font-bold text-green-800">{formatCurrency(results.grossAmount)}</p>
                  </div>
                </div>

                {/* VAT Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">VAT Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Applied VAT Rate:</span>
                      <span className="font-medium">{formatPercentage(results.vatRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Rate:</span>
                      <span className="font-medium">{formatPercentage(results.effectiveRate * 100)}</span>
                    </div>
                  </div>
                </div>

                {/* Legal Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Legal Basis</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{results.applicableRegulation}</p>
                    <p className="text-sm text-gray-600 mt-1">{results.businessCase}</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Calculation Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Amount:</span>
                      <span>{formatCurrency(inputs.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calculation Method:</span>
                      <span>{calculationTypes.find(ct => ct.value === inputs.calculationType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Business Scenario:</span>
                      <span>{businessTypes.find(bt => bt.value === inputs.businessType)?.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              German VAT Rates 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Standard Rate:</span>
                <span className="font-medium">19%</span>
              </div>
              <div className="flex justify-between">
                <span>Reduced Rate:</span>
                <span className="font-medium">7%</span>
              </div>
              <div className="flex justify-between">
                <span>Books/Newspapers:</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Export/EU B2B:</span>
                <span className="font-medium">0%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Business Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              <p><strong>Small Business:</strong> No VAT under €22,000/year</p>
              <p><strong>Reverse Charge:</strong> Customer pays VAT directly</p>
              <p><strong>EU Trade:</strong> Zero-rated with valid VAT ID</p>
              <p><strong>Digital Services:</strong> Destination country VAT</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Legal Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs text-gray-600">
              <p>Based on German VAT Law (UStG) 2025</p>
              <p>All calculations are estimates</p>
              <p>Consult tax advisor for official advice</p>
              <p>Regulations subject to change</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GermanVATCalculator;
