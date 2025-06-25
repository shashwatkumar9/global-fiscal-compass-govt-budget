
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainVATCalculator = () => {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("21");
  const [calculationType, setCalculationType] = useState("exclusive");
  const [results, setResults] = useState<any>(null);

  const calculateVAT = () => {
    const baseAmount = parseFloat(amount) || 0;
    const rate = parseFloat(vatRate) / 100;

    let netAmount, vatAmount, grossAmount;

    if (calculationType === "exclusive") {
      // Amount is net, calculate VAT and gross
      netAmount = baseAmount;
      vatAmount = netAmount * rate;
      grossAmount = netAmount + vatAmount;
    } else {
      // Amount is gross, calculate net and VAT
      grossAmount = baseAmount;
      netAmount = grossAmount / (1 + rate);
      vatAmount = grossAmount - netAmount;
    }

    setResults({
      netAmount,
      vatAmount,
      grossAmount,
      vatRate: parseFloat(vatRate)
    });
  };

  const getVATDescription = (rate: string) => {
    switch (rate) {
      case "21":
        return "Standard Rate - Most goods and services";
      case "10":
        return "Reduced Rate - Food, transport, hotels";
      case "4":
        return "Super Reduced Rate - Basic necessities, medicines";
      case "0":
        return "Zero Rate - Exports, certain services";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain VAT Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000.00"
              />
            </div>

            <div>
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Add VAT (Net → Gross)</SelectItem>
                  <SelectItem value="inclusive">Remove VAT (Gross → Net)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="vat-rate">VAT Rate (%)</Label>
              <Select value={vatRate} onValueChange={setVatRate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21">21% - Standard Rate</SelectItem>
                  <SelectItem value="10">10% - Reduced Rate</SelectItem>
                  <SelectItem value="4">4% - Super Reduced Rate</SelectItem>
                  <SelectItem value="0">0% - Zero Rate</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {getVATDescription(vatRate)}
              </p>
            </div>
          </div>

          <Button onClick={calculateVAT} className="w-full">
            Calculate VAT
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>VAT Calculation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Net Amount</p>
                  <p className="text-2xl font-bold text-blue-600">€{results.netAmount.toFixed(2)}</p>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">VAT Amount</p>
                  <p className="text-2xl font-bold text-red-600">€{results.vatAmount.toFixed(2)}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Gross Amount</p>
                  <p className="text-2xl font-bold text-green-600">€{results.grossAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Calculation Summary</h4>
                <p className="text-sm">
                  VAT Rate: {results.vatRate}% | 
                  Type: {calculationType === "exclusive" ? "VAT Added" : "VAT Removed"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainVATCalculator;
