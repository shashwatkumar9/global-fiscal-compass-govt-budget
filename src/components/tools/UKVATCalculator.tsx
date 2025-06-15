
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, Receipt, Info, AlertCircle } from "lucide-react";

const UKVATCalculator = () => {
  const [amount, setAmount] = useState<number>(100);
  const [vatRate, setVatRate] = useState<string>("20");
  const [calculationType, setCalculationType] = useState<string>("exclusive");
  const [results, setResults] = useState<any>(null);

  const calculateVAT = () => {
    const rate = Number(vatRate) / 100;
    let vatAmount = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (calculationType === "exclusive") {
      // Adding VAT to net amount
      netAmount = amount;
      vatAmount = amount * rate;
      grossAmount = amount + vatAmount;
    } else {
      // Extracting VAT from gross amount
      grossAmount = amount;
      netAmount = amount / (1 + rate);
      vatAmount = grossAmount - netAmount;
    }

    setResults({
      netAmount: netAmount.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      grossAmount: grossAmount.toFixed(2),
      vatRate,
      calculationType
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Receipt className="w-10 h-10 text-blue-600" />
          UK VAT Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK VAT at standard 20%, reduced 5%, and zero rates for various goods and services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
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
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="100.00"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatRate">VAT Rate</Label>
              <Select value={vatRate} onValueChange={setVatRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select VAT rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">Standard Rate (20%)</SelectItem>
                  <SelectItem value="5">Reduced Rate (5%)</SelectItem>
                  <SelectItem value="0">Zero Rate (0%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Add VAT (Net → Gross)</SelectItem>
                  <SelectItem value="inclusive">Extract VAT (Gross → Net)</SelectItem>
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
                <Receipt className="w-5 h-5" />
                VAT Results
              </CardTitle>
              <CardDescription>
                Your UK VAT calculation breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Net Amount:</span>
                  <span className="text-xl font-bold text-blue-600">
                    £{results.netAmount}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">VAT ({results.vatRate}%):</span>
                  <span className="text-xl font-bold text-orange-600">
                    £{results.vatAmount}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Gross Amount:</span>
                  <span className="text-xl font-bold text-green-600">
                    £{results.grossAmount}
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
              UK VAT Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Standard Rate:</span>
              <span className="font-semibold">20%</span>
            </div>
            <div className="flex justify-between">
              <span>Reduced Rate:</span>
              <span className="font-semibold">5%</span>
            </div>
            <div className="flex justify-between">
              <span>Zero Rate:</span>
              <span className="font-semibold">0%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Most goods and services use the standard rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              Standard Rate Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Most goods and services</p>
            <p>• Restaurant meals</p>
            <p>• Alcohol and tobacco</p>
            <p>• Petrol and diesel</p>
            <p>• Clothing and footwear</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Reduced/Zero Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>5% Rate:</strong> Domestic fuel, children's car seats</p>
            <p><strong>0% Rate:</strong> Most food, books, newspapers, children's clothes</p>
            <p className="text-xs text-gray-500 mt-2">
              Check gov.uk/vat-rates for complete lists
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKVATCalculator;
