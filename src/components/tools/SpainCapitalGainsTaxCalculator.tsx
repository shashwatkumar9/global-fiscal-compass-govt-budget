
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainCapitalGainsTaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("short");
  const [assetType, setAssetType] = useState("securities");
  const [expenses, setExpenses] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateCapitalGainsTax = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const transactionExpenses = parseFloat(expenses) || 0;
    
    const capitalGain = sale - purchase - transactionExpenses;
    
    if (capitalGain <= 0) {
      setResults({
        purchasePrice: purchase,
        salePrice: sale,
        expenses: transactionExpenses,
        capitalGain,
        taxableGain: 0,
        taxOwed: 0,
        effectiveRate: 0,
        netProceeds: sale - transactionExpenses
      });
      return;
    }

    // Spanish capital gains tax rates (2024)
    let taxRate = 0;
    
    if (capitalGain <= 6000) {
      taxRate = 0.19;
    } else if (capitalGain <= 50000) {
      taxRate = 0.21;
    } else {
      taxRate = 0.23;
    }

    // Special rules for real estate
    if (assetType === "real_estate" && holdingPeriod === "long") {
      // Primary residence exemption considerations
      // Simplified for this calculator
    }

    const taxOwed = capitalGain * taxRate;
    const effectiveRate = (taxOwed / capitalGain) * 100;
    const netProceeds = sale - transactionExpenses - taxOwed;

    setResults({
      purchasePrice: purchase,
      salePrice: sale,
      expenses: transactionExpenses,
      capitalGain,
      taxableGain: capitalGain,
      taxOwed,
      effectiveRate,
      netProceeds,
      taxRate: taxRate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Capital Gains Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchase-price">Purchase Price (€)</Label>
              <Input
                id="purchase-price"
                type="number"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="100000"
              />
            </div>

            <div>
              <Label htmlFor="sale-price">Sale Price (€)</Label>
              <Input
                id="sale-price"
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="150000"
              />
            </div>

            <div>
              <Label htmlFor="asset-type">Asset Type</Label>
              <Select value={assetType} onValueChange={setAssetType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="securities">Securities/Stocks</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="other">Other Assets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="holding-period">Holding Period</Label>
              <Select value={holdingPeriod} onValueChange={setHoldingPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Less than 1 year</SelectItem>
                  <SelectItem value="long">More than 1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="expenses">Transaction Expenses (€)</Label>
              <Input
                id="expenses"
                type="number"
                step="0.01"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="5000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Include broker fees, notary costs, taxes paid on acquisition, etc.
              </p>
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Price:</span>
                  <span className="font-semibold">€{results.purchasePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sale Price:</span>
                  <span className="font-semibold">€{results.salePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Expenses:</span>
                  <span className="font-semibold">€{results.expenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capital Gain/Loss:</span>
                  <span className={`font-semibold ${results.capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{results.capitalGain.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Gain:</span>
                  <span className="font-semibold">€{results.taxableGain.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Owed:</span>
                  <span className="font-semibold text-red-600">€{results.taxOwed.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Rate:</span>
                  <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Proceeds:</span>
                  <span className="font-semibold text-green-600">€{results.netProceeds.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainCapitalGainsTaxCalculator;
