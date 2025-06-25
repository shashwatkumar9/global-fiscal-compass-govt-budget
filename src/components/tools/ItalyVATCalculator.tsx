
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyVATCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("22");
  const [calculationType, setCalculationType] = useState<string>("exclusive");
  const [results, setResults] = useState<any>(null);

  const calculateVAT = () => {
    const baseAmount = parseFloat(amount) || 0;
    const rate = parseFloat(vatRate) || 0;
    
    let netAmount, vatAmount, grossAmount;
    
    if (calculationType === "exclusive") {
      // Amount is exclusive of VAT
      netAmount = baseAmount;
      vatAmount = (netAmount * rate) / 100;
      grossAmount = netAmount + vatAmount;
    } else {
      // Amount is inclusive of VAT
      grossAmount = baseAmount;
      netAmount = grossAmount / (1 + rate / 100);
      vatAmount = grossAmount - netAmount;
    }

    setResults({
      netAmount,
      vatAmount,
      grossAmount,
      vatRate: rate
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Italy VAT Calculator (IVA)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (€)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <Label htmlFor="calculation-type">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">Amount Exclusive of VAT</SelectItem>
                <SelectItem value="inclusive">Amount Inclusive of VAT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vat-rate">VAT Rate (%)</Label>
            <Select value={vatRate} onValueChange={setVatRate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="22">Standard Rate - 22%</SelectItem>
                <SelectItem value="10">Reduced Rate - 10%</SelectItem>
                <SelectItem value="5">Super Reduced Rate - 5%</SelectItem>
                <SelectItem value="4">Special Rate - 4%</SelectItem>
                <SelectItem value="0">Zero Rate - 0%</SelectItem>
              </SelectContent>
            </Select>
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
                  <p className="text-xl font-bold text-blue-600">€{results.netAmount.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">VAT Amount ({results.vatRate}%)</p>
                  <p className="text-xl font-bold text-red-600">€{results.vatAmount.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Gross Amount</p>
                  <p className="text-xl font-bold text-green-600">€{results.grossAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">VAT Rates in Italy:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>22%</strong> - Standard rate (most goods and services)</li>
                  <li>• <strong>10%</strong> - Reduced rate (tourism, food, pharmaceuticals)</li>
                  <li>• <strong>5%</strong> - Super reduced rate (social housing)</li>
                  <li>• <strong>4%</strong> - Special rate (essential goods, books, newspapers)</li>
                  <li>• <strong>0%</strong> - Zero rate (exports, certain medical equipment)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyVATCalculator;
