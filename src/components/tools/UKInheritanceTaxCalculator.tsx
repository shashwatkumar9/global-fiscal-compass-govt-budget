
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKInheritanceTaxCalculator = () => {
  const [grossEstate, setGrossEstate] = useState<string>("");
  const [debts, setDebts] = useState<string>("");
  const [exemptions, setExemptions] = useState<string>("");
  const [hasMainResidence, setHasMainResidence] = useState<boolean>(false);
  const [residenceValue, setResidenceValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  // UK IHT rates and thresholds for 2024/25
  const NIL_RATE_BAND = 325000;
  const RESIDENCE_NIL_RATE_BAND = 175000;
  const IHT_RATE = 0.4; // 40%

  const calculateTax = () => {
    const grossEstateValue = parseFloat(grossEstate) || 0;
    const totalDebts = parseFloat(debts) || 0;
    const totalExemptions = parseFloat(exemptions) || 0;
    const mainResidenceValue = hasMainResidence ? (parseFloat(residenceValue) || 0) : 0;

    // Calculate net estate
    const netEstate = grossEstateValue - totalDebts;
    
    // Calculate taxable estate after exemptions
    const taxableEstate = Math.max(0, netEstate - totalExemptions);
    
    // Apply nil-rate band
    let remainingEstate = taxableEstate;
    let taxableAmount = 0;
    
    // Standard nil-rate band
    if (remainingEstate > NIL_RATE_BAND) {
      remainingEstate -= NIL_RATE_BAND;
    } else {
      remainingEstate = 0;
    }
    
    // Residence nil-rate band (if applicable)
    let residenceNilRateBandUsed = 0;
    if (hasMainResidence && remainingEstate > 0 && mainResidenceValue > 0) {
      const availableRNRB = Math.min(RESIDENCE_NIL_RATE_BAND, mainResidenceValue);
      residenceNilRateBandUsed = Math.min(availableRNRB, remainingEstate);
      remainingEstate -= residenceNilRateBandUsed;
    }
    
    // Calculate tax on remaining estate
    taxableAmount = Math.max(0, remainingEstate);
    const inheritanceTax = taxableAmount * IHT_RATE;
    
    setResults({
      grossEstate: grossEstateValue,
      netEstate,
      taxableEstate,
      nilRateBandUsed: Math.min(NIL_RATE_BAND, taxableEstate),
      residenceNilRateBandUsed,
      taxableAmount,
      inheritanceTax,
      netEstateAfterTax: netEstate - inheritanceTax
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Inheritance Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Inheritance Tax with nil-rate bands, residence nil-rate bands, and reliefs for 2024/25.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Estate Details</CardTitle>
            <CardDescription>
              Enter the estate information to calculate inheritance tax liability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="grossEstate">Gross Estate Value (£)</Label>
              <Input
                id="grossEstate"
                type="number"
                placeholder="500000"
                value={grossEstate}
                onChange={(e) => setGrossEstate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="debts">Debts and Liabilities (£)</Label>
              <Input
                id="debts"
                type="number"
                placeholder="50000"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exemptions">Exemptions (spouse, charity, etc.) (£)</Label>
              <Input
                id="exemptions"
                type="number"
                placeholder="0"
                value={exemptions}
                onChange={(e) => setExemptions(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasMainResidence"
                  checked={hasMainResidence}
                  onChange={(e) => setHasMainResidence(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="hasMainResidence">
                  Estate includes main residence passed to direct descendants
                </Label>
              </div>

              {hasMainResidence && (
                <div className="space-y-2">
                  <Label htmlFor="residenceValue">Main Residence Value (£)</Label>
                  <Input
                    id="residenceValue"
                    type="number"
                    placeholder="300000"
                    value={residenceValue}
                    onChange={(e) => setResidenceValue(e.target.value)}
                  />
                </div>
              )}
            </div>

            <Button onClick={calculateTax} className="w-full">
              Calculate Inheritance Tax
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>
              UK Inheritance Tax calculation breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Gross Estate:</p>
                    <p className="text-lg">{formatCurrency(results.grossEstate)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Net Estate:</p>
                    <p className="text-lg">{formatCurrency(results.netEstate)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Allowances Applied:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Nil-Rate Band Used:</span>
                      <span>{formatCurrency(results.nilRateBandUsed)}</span>
                    </div>
                    {results.residenceNilRateBandUsed > 0 && (
                      <div className="flex justify-between">
                        <span>Residence Nil-Rate Band Used:</span>
                        <span>{formatCurrency(results.residenceNilRateBandUsed)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Taxable Amount:</span>
                    <span className="text-lg">{formatCurrency(results.taxableAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-red-600">Inheritance Tax (40%):</span>
                    <span className="text-xl font-bold text-red-600">
                      {formatCurrency(results.inheritanceTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Net Estate After Tax:</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatCurrency(results.netEstateAfterTax)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter estate details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>2024/25 UK Inheritance Tax Rates:</strong> Nil-Rate Band: £325,000 | 
          Residence Nil-Rate Band: £175,000 | IHT Rate: 40% | 
          This calculator provides estimates based on current rates. 
          Consult a professional for complex estates or specific circumstances.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKInheritanceTaxCalculator;
