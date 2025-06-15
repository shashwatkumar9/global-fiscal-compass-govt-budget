
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Ship, Globe, FileText, AlertTriangle } from 'lucide-react';

interface ImportTaxCalculation {
  goodsValue: number;
  shippingCosts: number;
  insuranceCosts: number;
  customsValue: number;
  customsDuty: number;
  importVAT: number;
  totalTax: number;
  totalCost: number;
  effectiveRate: number;
}

const GermanImportTaxCalculator = () => {
  const [goodsValue, setGoodsValue] = useState<number>(1000);
  const [shippingCosts, setShippingCosts] = useState<number>(50);
  const [insuranceCosts, setInsuranceCosts] = useState<number>(20);
  const [originCountry, setOriginCountry] = useState<string>('china');
  const [productType, setProductType] = useState<string>('electronics');
  const [currency, setCurrency] = useState<string>('eur');
  const [importerType, setImporterType] = useState<string>('private');
  const [calculation, setCalculation] = useState<ImportTaxCalculation | null>(null);

  // Customs duty rates by product type (simplified)
  const customsDutyRates: Record<string, number> = {
    'electronics': 0.038, // 3.8%
    'textiles': 0.12,     // 12%
    'footwear': 0.165,    // 16.5%
    'automotive': 0.10,   // 10%
    'machinery': 0.025,   // 2.5%
    'chemicals': 0.065,   // 6.5%
    'food': 0.155,        // 15.5%
    'books': 0.0,         // 0%
    'medical': 0.0,       // 0%
    'other': 0.065        // 6.5%
  };

  // Preferential rates for certain countries (simplified)
  const preferentialRates: Record<string, number> = {
    'usa': 0.8,      // 20% reduction
    'japan': 0.9,    // 10% reduction  
    'canada': 0.85,  // 15% reduction
    'switzerland': 0.9, // 10% reduction
    'uk': 1.0,       // No preference post-Brexit
    'china': 1.0,    // Standard rates
    'other': 1.0     // Standard rates
  };

  const calculateImportTax = () => {
    // Convert to EUR if needed (simplified - in reality would use current exchange rates)
    const goodsValueEUR = currency === 'usd' ? goodsValue * 0.85 : goodsValue;
    const shippingEUR = currency === 'usd' ? shippingCosts * 0.85 : shippingCosts;
    const insuranceEUR = currency === 'usd' ? insuranceCosts * 0.85 : insuranceCosts;

    // Customs value calculation
    const customsValue = goodsValueEUR + shippingEUR + insuranceEUR;

    // Duty-free allowances for private imports
    let dutyFreeThreshold = 0;
    let vatFreeThreshold = 0;

    if (importerType === 'private') {
      dutyFreeThreshold = 150; // €150 for customs duty
      vatFreeThreshold = 22;   // €22 for VAT (gifts)
    }

    // Calculate customs duty
    const dutyableValue = Math.max(0, customsValue - dutyFreeThreshold);
    const baseDutyRate = customsDutyRates[productType] || 0.065;
    const preferentialMultiplier = preferentialRates[originCountry] || 1.0;
    const effectiveDutyRate = baseDutyRate * preferentialMultiplier;
    const customsDuty = dutyableValue * effectiveDutyRate;

    // Calculate import VAT (19% on customs value + duty)
    const vatableValue = importerType === 'private' ? Math.max(0, customsValue - vatFreeThreshold) : customsValue;
    const importVAT = (vatableValue + customsDuty) * 0.19;

    const totalTax = customsDuty + importVAT;
    const totalCost = customsValue + totalTax;
    const effectiveRate = customsValue > 0 ? (totalTax / customsValue) * 100 : 0;

    setCalculation({
      goodsValue: goodsValueEUR,
      shippingCosts: shippingEUR,
      insuranceCosts: insuranceEUR,
      customsValue,
      customsDuty,
      importVAT,
      totalTax,
      totalCost,
      effectiveRate
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Ship className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Import Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German import tax calculator with customs duties, import VAT, and duty-free allowances for all product types
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Customs Duties</Badge>
          <Badge variant="secondary">Import VAT</Badge>
          <Badge variant="secondary">Duty-Free Allowances</Badge>
          <Badge variant="secondary">All Countries</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Import Information
              </CardTitle>
              <CardDescription>Enter your import details for tax calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goodsValue">Goods Value</Label>
                  <Input
                    id="goodsValue"
                    type="number"
                    value={goodsValue}
                    onChange={(e) => setGoodsValue(Number(e.target.value))}
                    placeholder="1000"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCosts">Shipping Costs</Label>
                  <Input
                    id="shippingCosts"
                    type="number"
                    value={shippingCosts}
                    onChange={(e) => setShippingCosts(Number(e.target.value))}
                    placeholder="50"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceCosts">Insurance Costs</Label>
                  <Input
                    id="insuranceCosts"
                    type="number"
                    value={insuranceCosts}
                    onChange={(e) => setInsuranceCosts(Number(e.target.value))}
                    placeholder="20"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originCountry">Origin Country</Label>
                  <Select value={originCountry} onValueChange={setOriginCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="other">Other Countries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="textiles">Textiles & Clothing</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                      <SelectItem value="automotive">Automotive Parts</SelectItem>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="food">Food Products</SelectItem>
                      <SelectItem value="books">Books & Media</SelectItem>
                      <SelectItem value="medical">Medical Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="importerType">Importer Type</Label>
                <Select value={importerType} onValueChange={setImporterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Individual</SelectItem>
                    <SelectItem value="business">Business/Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateImportTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Import Tax
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
                  <Ship className="w-5 h-5 text-blue-600" />
                  Import Tax Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Goods Value:</span>
                    <span className="font-medium">€{calculation.goodsValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping & Insurance:</span>
                    <span className="font-medium">€{(calculation.shippingCosts + calculation.insuranceCosts).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Customs Value:</span>
                    <span className="font-medium">€{calculation.customsValue.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Customs Duty:</span>
                    <span className="font-medium">€{calculation.customsDuty.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Import VAT (19%):</span>
                    <span className="font-medium">€{calculation.importVAT.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Tax:</span>
                    <span className="text-red-600">€{calculation.totalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Cost:</span>
                    <span className="text-blue-600">€{calculation.totalCost.toFixed(2)}</span>
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
                Duty-Free Allowances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Private Imports (Gifts):</strong> €22 (VAT-free)</li>
                <li>• <strong>Private Imports (Duty):</strong> €150 (duty-free)</li>
                <li>• <strong>Business Imports:</strong> No allowances</li>
                <li>• <strong>Postal Items:</strong> Special thresholds apply</li>
                <li>• <strong>Traveler Allowances:</strong> €300-430</li>
                <li>• <strong>EU Imports:</strong> No duties, VAT only</li>
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
                Import duties vary significantly by product classification (HS codes) and origin. 
                Contact German customs for official duty rates and procedures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanImportTaxCalculator;
