
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const FranceSalesTaxCalculator = () => {
  const [amount, setAmount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [result, setResult] = useState<{ tax: number; total: number } | null>(null);

  const taxRates = [
    { label: "Standard Rate", value: 20 },
    { label: "Intermediate Rate", value: 10 },
    { label: "Reduced Rate", value: 5.5 },
    { label: "Super Reduced Rate", value: 2.1 },
  ];

  const calculateTax = () => {
    if (amount <= 0) return;
    const tax = (amount * taxRate) / 100;
    const total = amount + tax;
    setResult({ tax, total });
  };

  const resetForm = () => {
    setAmount(0);
    setTaxRate(20);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Sales Tax Calculator (TVA)
          </CardTitle>
          <CardDescription>
            Calculate the French Sales Tax (TVA) on goods and services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (excl. Tax) (€)</Label>
              <Input
                id="amount"
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (TVA)</Label>
              <Select onValueChange={(value) => setTaxRate(Number(value))} defaultValue="20">
                <SelectTrigger>
                  <SelectValue placeholder="Select tax rate" />
                </SelectTrigger>
                <SelectContent>
                  {taxRates.map((rate) => (
                    <SelectItem key={rate.value} value={String(rate.value)}>
                      {rate.label} ({rate.value}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <CardTitle>Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount (excl. Tax):</span>
              <span className="font-semibold">€{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Tax (TVA) at {taxRate}%:</span>
              <span className="font-semibold">€{result.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount (incl. Tax):</span>
              <span>€{result.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FranceSalesTaxCalculator;

