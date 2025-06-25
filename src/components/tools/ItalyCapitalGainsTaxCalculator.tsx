
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyCapitalGainsTaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [assetType, setAssetType] = useState<string>("securities");
  const [holdingPeriod, setHoldingPeriod] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateCapitalGainsTax = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const totalExpenses = parseFloat(expenses) || 0;
    const holding = parseInt(holdingPeriod) || 0;
    
    const capitalGain = Math.max(0, sale - purchase - totalExpenses);
    let taxRate = 0;
    let exemption = false;
    
    // Italian Capital Gains Tax Rules
    switch (assetType) {
      case "securities":
        taxRate = 0.26; // 26% on financial instruments
        break;
      case "real_estate":
        if (holding >= 5) {
          exemption = true;
          taxRate = 0;
        } else {
          taxRate = 0.26; // 26% if held less than 5 years
        }
        break;
      case "business_shares":
        if (holding >= 3) {
          taxRate = 0.125; // 12.5% reduced rate for qualified shares
        } else {
          taxRate = 0.26;
        }
        break;
      case "cryptocurrency":
        taxRate = 0.26; // 26% on crypto gains
        break;
      default:
        taxRate = 0.26;
    }
    
    const tax = exemption ? 0 : capitalGain * taxRate;
    const netGain = capitalGain - tax;
    const effectiveRate = capitalGain > 0 ? (tax / capitalGain) * 100 : 0;

    setResults({
      purchasePrice: purchase,
      salePrice: sale,
      expenses: totalExpenses,
      capitalGain,
      tax,
      netGain,
      taxRate: taxRate * 100,
      effectiveRate,
      exemption,
      holdingPeriod: holding
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Capital Gains Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchase-price">Purchase Price (€)</Label>
              <Input
                id="purchase-price"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="Enter purchase price"
              />
            </div>
            <div>
              <Label htmlFor="sale-price">Sale Price (€)</Label>
              <Input
                id="sale-price"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Enter sale price"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="asset-type">Asset Type</Label>
            <Select value={assetType} onValueChange={setAssetType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="securities">Securities & Bonds (26%)</SelectItem>
                <SelectItem value="real_estate">Real Estate</SelectItem>
                <SelectItem value="business_shares">Business Shares</SelectItem>
                <SelectItem value="cryptocurrency">Cryptocurrency (26%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="holding-period">Holding Period (Years)</Label>
              <Input
                id="holding-period"
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                placeholder="Years held"
              />
            </div>
            <div>
              <Label htmlFor="expenses">Transaction Expenses (€)</Label>
              <Input
                id="expenses"
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="Fees, commissions, etc."
              />
            </div>
          </div>

          <Button onClick={calculateCapitalGainsTax} className="w-full">
            Calculate Capital Gains Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Capital Gains Tax Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Purchase Price</p>
                <p className="text-lg font-semibold">€{results.purchasePrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sale Price</p>
                <p className="text-lg font-semibold">€{results.salePrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expenses</p>
                <p className="text-lg font-semibold">€{results.expenses.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capital Gain</p>
                <p className="text-lg font-semibold text-blue-600">€{results.capitalGain.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tax Owed</p>
                <p className="text-lg font-semibold text-red-600">€{results.tax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Gain</p>
                <p className="text-lg font-semibold text-green-600">€{results.netGain.toFixed(2)}</p>
              </div>
            </div>

            {results.exemption && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">Tax Exemption Applied!</p>
                <p className="text-sm text-green-700">Real estate held for 5+ years is exempt from capital gains tax.</p>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Capital Gains Tax Rates:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Securities & Bonds:</strong> 26% flat rate</li>
                <li>• <strong>Real Estate:</strong> 26% if held &lt;5 years, exempt if held ≥5 years</li>
                <li>• <strong>Business Shares:</strong> 26% standard, 12.5% if qualified and held ≥3 years</li>
                <li>• <strong>Cryptocurrency:</strong> 26% on gains above €2,000 per year</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyCapitalGainsTaxCalculator;
