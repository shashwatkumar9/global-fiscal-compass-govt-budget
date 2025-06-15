
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Home, Calculator, Info, AlertCircle } from "lucide-react";

const UKPropertyTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(300000);
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState<string>("no");
  const [additionalProperty, setAdditionalProperty] = useState<string>("no");
  const [councilTaxBand, setCouncilTaxBand] = useState<string>("D");
  const [results, setResults] = useState<any>(null);

  const calculatePropertyTax = () => {
    let stampDuty = 0;
    let councilTax = 0;

    // Calculate Stamp Duty Land Tax
    if (propertyType === "residential") {
      if (firstTimeBuyer === "yes" && propertyValue <= 625000) {
        // First-time buyer relief
        if (propertyValue <= 425000) {
          stampDuty = 0;
        } else {
          stampDuty = (propertyValue - 425000) * 0.05;
        }
      } else {
        // Standard residential rates
        if (propertyValue <= 250000) {
          stampDuty = 0;
        } else if (propertyValue <= 925000) {
          stampDuty = (propertyValue - 250000) * 0.05;
        } else if (propertyValue <= 1500000) {
          stampDuty = (925000 - 250000) * 0.05 + (propertyValue - 925000) * 0.10;
        } else {
          stampDuty = (925000 - 250000) * 0.05 + (1500000 - 925000) * 0.10 + (propertyValue - 1500000) * 0.12;
        }
      }

      // Additional property surcharge
      if (additionalProperty === "yes" && propertyValue > 40000) {
        stampDuty += propertyValue * 0.03;
      }
    }

    // Council Tax (annual estimates by band)
    const councilTaxRates: { [key: string]: number } = {
      "A": 1200,
      "B": 1400,
      "C": 1600,
      "D": 1800,
      "E": 2200,
      "F": 2600,
      "G": 3000,
      "H": 3600
    };

    councilTax = councilTaxRates[councilTaxBand] || 1800;

    setResults({
      propertyValue,
      stampDuty,
      councilTax,
      totalUpfront: stampDuty,
      monthlyCouncilTax: councilTax / 12,
      propertyType,
      firstTimeBuyer,
      additionalProperty
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Home className="w-10 h-10 text-blue-600" />
          UK Property Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Council Tax bands and Stamp Duty Land Tax for property transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Property Details
            </CardTitle>
            <CardDescription>
              Enter your property information for tax calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="propertyValue">Property Value (£)</Label>
              <Input
                id="propertyValue"
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                placeholder="300000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstTimeBuyer">First-Time Buyer?</Label>
              <Select value={firstTimeBuyer} onValueChange={setFirstTimeBuyer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalProperty">Additional Property?</Label>
              <Select value={additionalProperty} onValueChange={setAdditionalProperty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (Buy-to-let/Second home)</SelectItem>
                  <SelectItem value="no">No (Main residence)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="councilTaxBand">Council Tax Band</Label>
              <Select value={councilTaxBand} onValueChange={setCouncilTaxBand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Band A (Up to £40,000)</SelectItem>
                  <SelectItem value="B">Band B (£40,001 - £52,000)</SelectItem>
                  <SelectItem value="C">Band C (£52,001 - £68,000)</SelectItem>
                  <SelectItem value="D">Band D (£68,001 - £88,000)</SelectItem>
                  <SelectItem value="E">Band E (£88,001 - £120,000)</SelectItem>
                  <SelectItem value="F">Band F (£120,001 - £160,000)</SelectItem>
                  <SelectItem value="G">Band G (£160,001 - £320,000)</SelectItem>
                  <SelectItem value="H">Band H (Over £320,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculatePropertyTax} className="w-full" size="lg">
              Calculate Property Tax
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Tax Results
              </CardTitle>
              <CardDescription>
                Your UK property tax breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Property Value</p>
                  <p className="font-semibold text-lg">£{results.propertyValue.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Stamp Duty Land Tax:</span>
                  <span className="text-xl font-bold text-red-600">
                    £{results.stampDuty.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Annual Council Tax:</span>
                  <span className="text-xl font-bold text-blue-600">
                    £{results.councilTax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Council Tax:</span>
                  <span className="font-semibold">£{results.monthlyCouncilTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Total Upfront Cost:</span>
                  <span className="text-xl font-bold text-orange-600">
                    £{results.totalUpfront.toFixed(2)}
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
              Stamp Duty Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Up to £250,000:</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between">
              <span>£250,001 - £925,000:</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between">
              <span>£925,001 - £1.5m:</span>
              <span>10%</span>
            </div>
            <div className="flex justify-between">
              <span>Over £1.5m:</span>
              <span>12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              First-Time Buyer Relief
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• No stamp duty up to £425,000</p>
            <p>• 5% on amount between £425,001 - £625,000</p>
            <p>• Must be your only or main residence</p>
            <p>• Property value under £625,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• 3% surcharge on additional properties over £40,000</p>
            <p>• Council Tax varies by local authority</p>
            <p>• Some properties may be exempt from Council Tax</p>
            <p>• Students and single person discounts available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKPropertyTaxCalculator;
