
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';

interface CapitalGainsTaxCalculation {
  capitalGain: number;
  taxableGain: number;
  capitalGainsTax: number;
  solidaritySurcharge: number;
  churchTax: number;
  totalTax: number;
  netGain: number;
  effectiveRate: number;
}

const GermanCapitalGainsTaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(50000);
  const [salePrice, setSalePrice] = useState<number>(75000);
  const [purchaseDate, setPurchaseDate] = useState<string>('2020-01-01');
  const [saleDate, setSaleDate] = useState<string>('2025-01-01');
  const [assetType, setAssetType] = useState<string>('stocks');
  const [churchTaxRate, setChurchTaxRate] = useState<number>(8);
  const [isChurchMember, setIsChurchMember] = useState<string>('no');
  const [calculation, setCalculation] = useState<CapitalGainsTaxCalculation | null>(null);

  const calculateCapitalGainsTax = () => {
    const capitalGain = Math.max(0, salePrice - purchasePrice);
    
    // Calculate holding period in years
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const holdingPeriodYears = (sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    let taxableGain = capitalGain;
    let capitalGainsTax = 0;
    let solidaritySurcharge = 0;
    let churchTax = 0;

    // Different rules based on asset type and holding period
    if (assetType === 'stocks' || assetType === 'bonds') {
      // Abgeltungsteuer (25% flat tax on capital gains from securities)
      capitalGainsTax = taxableGain * 0.25;
      solidaritySurcharge = capitalGainsTax * 0.055;
      churchTax = isChurchMember === 'yes' ? capitalGainsTax * (churchTaxRate / 100) : 0;
    } else if (assetType === 'real_estate') {
      if (holdingPeriodYears >= 10) {
        // Real estate held for 10+ years is tax-free
        taxableGain = 0;
        capitalGainsTax = 0;
      } else {
        // Real estate held for less than 10 years - progressive tax rate (simplified to 25%)
        capitalGainsTax = taxableGain * 0.25;
        solidaritySurcharge = capitalGainsTax * 0.055;
        churchTax = isChurchMember === 'yes' ? capitalGainsTax * (churchTaxRate / 100) : 0;
      }
    } else if (assetType === 'crypto') {
      if (holdingPeriodYears >= 1) {
        // Crypto held for 1+ years is tax-free
        taxableGain = 0;
        capitalGainsTax = 0;
      } else {
        // Crypto held for less than 1 year - progressive tax rate (simplified to 25%)
        capitalGainsTax = taxableGain * 0.25;
        solidaritySurcharge = capitalGainsTax * 0.055;
        churchTax = isChurchMember === 'yes' ? capitalGainsTax * (churchTaxRate / 100) : 0;
      }
    }

    const totalTax = capitalGainsTax + solidaritySurcharge + churchTax;
    const netGain = capitalGain - totalTax;
    const effectiveRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0;

    setCalculation({
      capitalGain,
      taxableGain,
      capitalGainsTax,
      solidaritySurcharge,
      churchTax,
      totalTax,
      netGain,
      effectiveRate
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Capital Gains Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German capital gains tax calculator for stocks, real estate, crypto, and other investments with Abgeltungsteuer calculations
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Abgeltungsteuer</Badge>
          <Badge variant="secondary">Real Estate</Badge>
          <Badge variant="secondary">Cryptocurrency</Badge>
          <Badge variant="secondary">Holding Periods</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Investment Details
              </CardTitle>
              <CardDescription>Enter your investment purchase and sale information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price (€)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price (€)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    placeholder="75000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleDate">Sale Date</Label>
                  <Input
                    id="saleDate"
                    type="date"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select value={assetType} onValueChange={setAssetType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stocks">Stocks/Shares</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="other">Other Investments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isChurchMember">Church Tax Member</Label>
                  <Select value={isChurchMember} onValueChange={setIsChurchMember}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {isChurchMember === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="churchTaxRate">Church Tax Rate (%)</Label>
                    <Select value={churchTaxRate.toString()} onValueChange={(v) => setChurchTaxRate(Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8% (Most states)</SelectItem>
                        <SelectItem value="9">9% (Bavaria & Baden-Württemberg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button onClick={calculateCapitalGainsTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Capital Gains Tax
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
                    <span className="text-sm text-gray-600">Capital Gain:</span>
                    <span className="font-medium">€{calculation.capitalGain.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxable Gain:</span>
                    <span className="font-medium">€{calculation.taxableGain.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Capital Gains Tax (25%):</span>
                    <span className="font-medium">€{calculation.capitalGainsTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solidarity Surcharge:</span>
                    <span className="font-medium">€{calculation.solidaritySurcharge.toLocaleString()}</span>
                  </div>
                  {calculation.churchTax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Church Tax:</span>
                      <span className="font-medium">€{calculation.churchTax.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Tax:</span>
                    <span className="text-red-600">€{calculation.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Net Gain:</span>
                    <span className="text-green-600">€{calculation.netGain.toLocaleString()}</span>
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
                <Calendar className="w-5 h-5" />
                Holding Period Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Stocks/Bonds:</strong> 25% flat tax (Abgeltungsteuer)</li>
                <li>• <strong>Real Estate:</strong> Tax-free after 10 years</li>
                <li>• <strong>Crypto:</strong> Tax-free after 1 year</li>
                <li>• <strong>Solidarity Surcharge:</strong> 5.5% of capital gains tax</li>
                <li>• <strong>Church Tax:</strong> 8-9% if applicable</li>
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
                Complex situations may require professional tax advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanCapitalGainsTaxCalculator;
