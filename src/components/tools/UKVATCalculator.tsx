
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText, Info, AlertCircle } from "lucide-react";

const UKVATCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [vatRate, setVatRate] = useState<string>("20");
  const [calculationType, setCalculationType] = useState<string>("add");
  const [results, setResults] = useState<any>(null);

  const calculateVAT = () => {
    const rate = parseFloat(vatRate) / 100;
    let vatAmount = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (calculationType === "add") {
      // Adding VAT to net amount
      netAmount = amount;
      vatAmount = netAmount * rate;
      grossAmount = netAmount + vatAmount;
    } else {
      // Removing VAT from gross amount
      grossAmount = amount;
      netAmount = grossAmount / (1 + rate);
      vatAmount = grossAmount - netAmount;
    }

    setResults({
      netAmount: netAmount,
      vatAmount: vatAmount,
      grossAmount: grossAmount,
      vatRate: parseFloat(vatRate),
      calculationType
    });
  };

  const vatRateInfo = {
    "20": "Standard Rate - Most goods and services",
    "5": "Reduced Rate - Domestic fuel, children's car seats, etc.",
    "0": "Zero Rate - Most food, books, children's clothes, etc."
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK VAT Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK VAT at standard 20%, reduced 5%, and zero rates. Add or remove VAT from prices for HMRC compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              VAT Calculation
            </CardTitle>
            <CardDescription>
              Enter amount and select VAT rate and calculation type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (£)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="1000.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatRate">VAT Rate</Label>
              <Select value={vatRate} onValueChange={setVatRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select VAT rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20% - Standard Rate</SelectItem>
                  <SelectItem value="5">5% - Reduced Rate</SelectItem>
                  <SelectItem value="0">0% - Zero Rate</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {vatRateInfo[vatRate as keyof typeof vatRateInfo]}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add VAT to net amount</SelectItem>
                  <SelectItem value="remove">Remove VAT from gross amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateVAT} className="w-full" size="lg">
              Calculate VAT
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                VAT Calculation Results
              </CardTitle>
              <CardDescription>
                {results.calculationType === "add" ? "VAT added to net amount" : "VAT removed from gross amount"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Net Amount (excluding VAT):</span>
                  <span className="text-lg font-bold text-blue-600">
                    £{results.netAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">VAT Amount ({results.vatRate}%):</span>
                  <span className="text-lg font-bold text-orange-600">
                    £{results.vatAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Gross Amount (including VAT):</span>
                  <span className="text-xl font-bold text-green-600">
                    £{results.grossAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>VAT Rate Applied:</span>
                  <span className="font-semibold">{results.vatRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Calculation Method:</span>
                  <span className="font-semibold">
                    {results.calculationType === "add" ? "Add VAT" : "Remove VAT"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-blue-600" />
              VAT Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">Standard Rate (20%)</p>
              <p className="text-gray-600">Most goods and services</p>
            </div>
            <div>
              <p className="font-semibold">Reduced Rate (5%)</p>
              <p className="text-gray-600">Domestic fuel, children's car seats, etc.</p>
            </div>
            <div>
              <p className="font-semibold">Zero Rate (0%)</p>
              <p className="text-gray-600">Most food, books, children's clothes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              VAT Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Registration Threshold:</span>
              <span className="font-semibold">£85,000</span>
            </div>
            <div className="flex justify-between">
              <span>Deregistration Threshold:</span>
              <span className="font-semibold">£83,000</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Annual turnover thresholds for mandatory VAT registration
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• VAT must be charged by VAT-registered businesses</p>
            <p>• Some items are exempt from VAT entirely</p>
            <p>• Digital services may have different VAT rules</p>
            <p>• Keep accurate records for HMRC compliance</p>
            <p className="text-xs text-gray-500 mt-2">
              For official guidance, visit gov.uk/vat
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKVATCalculator;
