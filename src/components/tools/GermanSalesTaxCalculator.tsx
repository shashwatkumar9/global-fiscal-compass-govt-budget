
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, ShoppingCart, Store, FileText, AlertTriangle } from 'lucide-react';

interface SalesTaxCalculation {
  netAmount: number;
  vatRate: number;
  vatAmount: number;
  grossAmount: number;
  effectiveRate: number;
}

const GermanSalesTaxCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [calculationType, setCalculationType] = useState<string>('add_vat');
  const [vatRate, setVatRate] = useState<string>('19');
  const [productCategory, setProductCategory] = useState<string>('standard');
  const [businessType, setBusinessType] = useState<string>('b2c');
  const [customerLocation, setCustomerLocation] = useState<string>('germany');
  const [calculation, setCalculation] = useState<SalesTaxCalculation | null>(null);

  // VAT rates by category
  const vatRates: Record<string, number> = {
    '19': 19, // Standard rate
    '7': 7,   // Reduced rate
    '5': 5,   // Super-reduced rate (temporary)
    '0': 0    // Zero rate / exempt
  };

  // Product categories with their VAT rates
  const productCategories: Record<string, string> = {
    'standard': '19',
    'food': '7',
    'books': '7',
    'medical': '7',
    'transport': '7',
    'accommodation': '7',
    'digital_eu': '19',
    'export': '0',
    'financial': '0'
  };

  const calculateSalesTax = () => {
    const selectedVatRate = vatRates[productCategories[productCategory] || vatRate];
    let netAmount: number;
    let vatAmount: number;
    let grossAmount: number;

    if (calculationType === 'add_vat') {
      // Adding VAT to net amount
      netAmount = amount;
      vatAmount = (netAmount * selectedVatRate) / 100;
      grossAmount = netAmount + vatAmount;
    } else {
      // Extracting VAT from gross amount
      grossAmount = amount;
      netAmount = grossAmount / (1 + selectedVatRate / 100);
      vatAmount = grossAmount - netAmount;
    }

    // Special handling for B2B EU transactions
    if (businessType === 'b2b_eu' && customerLocation !== 'germany') {
      vatAmount = 0; // Reverse charge mechanism
      grossAmount = netAmount;
    }

    const effectiveRate = netAmount > 0 ? (vatAmount / netAmount) * 100 : 0;

    setCalculation({
      netAmount,
      vatRate: selectedVatRate,
      vatAmount,
      grossAmount,
      effectiveRate
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Sales Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German sales tax (VAT/Umsatzsteuer) calculator with all rates, business scenarios, and EU regulations
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">All VAT Rates</Badge>
          <Badge variant="secondary">B2B & B2C</Badge>
          <Badge variant="secondary">EU Regulations</Badge>
          <Badge variant="secondary">Reverse Charge</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Sales Information
              </CardTitle>
              <CardDescription>Enter your sales details for VAT calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="1000"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add_vat">Add VAT to Net Amount</SelectItem>
                      <SelectItem value="extract_vat">Extract VAT from Gross</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productCategory">Product Category</Label>
                  <Select value={productCategory} onValueChange={setProductCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Goods (19%)</SelectItem>
                      <SelectItem value="food">Food & Beverages (7%)</SelectItem>
                      <SelectItem value="books">Books & Media (7%)</SelectItem>
                      <SelectItem value="medical">Medical Services (7%)</SelectItem>
                      <SelectItem value="transport">Public Transport (7%)</SelectItem>
                      <SelectItem value="accommodation">Accommodation (7%)</SelectItem>
                      <SelectItem value="digital_eu">Digital Services EU (19%)</SelectItem>
                      <SelectItem value="export">Export (0%)</SelectItem>
                      <SelectItem value="financial">Financial Services (0%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatRate">Manual VAT Rate (%)</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19">19% (Standard)</SelectItem>
                      <SelectItem value="7">7% (Reduced)</SelectItem>
                      <SelectItem value="5">5% (Super-reduced)</SelectItem>
                      <SelectItem value="0">0% (Exempt)</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="b2c">B2C (Business to Consumer)</SelectItem>
                      <SelectItem value="b2b_germany">B2B Germany</SelectItem>
                      <SelectItem value="b2b_eu">B2B EU (Reverse Charge)</SelectItem>
                      <SelectItem value="export">Export (Non-EU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerLocation">Customer Location</Label>
                  <Select value={customerLocation} onValueChange={setCustomerLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="eu">EU Member State</SelectItem>
                      <SelectItem value="non_eu">Non-EU Country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateSalesTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Sales Tax
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
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  Tax Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Net Amount:</span>
                    <span className="font-medium">€{calculation.netAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">VAT Rate:</span>
                    <span className="font-medium">{calculation.vatRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">VAT Amount:</span>
                    <span className="font-medium">€{calculation.vatAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Gross Amount:</span>
                    <span className="text-green-600">€{calculation.grossAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Effective Rate:</span>
                    <span className="font-medium">{calculation.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>

                {businessType === 'b2b_eu' && customerLocation !== 'germany' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      ⚠️ Reverse Charge Mechanism applies - Customer pays VAT in their country
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                German VAT Rates 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Standard Rate:</strong> 19% (most goods/services)</li>
                <li>• <strong>Reduced Rate:</strong> 7% (food, books, transport)</li>
                <li>• <strong>Super-reduced:</strong> 5% (temporary COVID rates)</li>
                <li>• <strong>Zero Rate:</strong> 0% (exports, financial services)</li>
                <li>• <strong>Reverse Charge:</strong> B2B EU transactions</li>
                <li>• <strong>Digital Services:</strong> Customer's country rate</li>
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
                VAT regulations are complex and vary by business type and transaction. 
                Consult a tax advisor for official compliance requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanSalesTaxCalculator;
