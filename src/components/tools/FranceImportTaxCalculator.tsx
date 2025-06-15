
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const FranceImportTaxCalculator = () => {
  const [itemValue, setItemValue] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [result, setResult] = useState<{ customsDuty: number, vat: number, totalTax: number, totalCost: number } | null>(null);

  const calculateTax = () => {
    if (itemValue <= 0) return;

    const customsBase = itemValue + shippingCost;
    // Simplified customs duty calculation (e.g., 3% average)
    const customsDuty = customsBase > 150 ? customsBase * 0.03 : 0;
    
    // VAT is calculated on item value + shipping + customs duty
    const vatBase = customsBase + customsDuty;
    const vat = vatBase * 0.20; // Standard VAT rate 20%

    const totalTax = customsDuty + vat;
    const totalCost = itemValue + shippingCost + totalTax;

    setResult({ customsDuty, vat, totalTax, totalCost });
  };

  const resetForm = () => {
    setItemValue(0);
    setShippingCost(0);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Import Tax Calculator
          </CardTitle>
          <CardDescription>
            Estimate customs duty and VAT on goods imported into France from outside the EU.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemValue">Item Value (€)</Label>
              <Input
                id="itemValue"
                type="number"
                value={itemValue || ""}
                onChange={(e) => setItemValue(Number(e.target.value))}
                placeholder="Value of goods"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingCost">Shipping & Insurance Cost (€)</Label>
              <Input
                id="shippingCost"
                type="number"
                value={shippingCost || ""}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                placeholder="Cost of shipping"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={calculateTax} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Import Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Customs Duty:</span>
              <span className="font-semibold">€{result.customsDuty.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT (20%):</span>
              <span className="font-semibold">€{result.vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-red-600">Total Import Tax:</span>
              <span className="text-red-600">€{result.totalTax.toFixed(2)}</span>
            </div>
            <hr/>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Landed Cost:</span>
              <span>€{result.totalCost.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FranceImportTaxCalculator;

