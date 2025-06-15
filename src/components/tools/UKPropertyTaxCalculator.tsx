
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
  const [region, setRegion] = useState<string>("england");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState<string>("no");
  const [additionalProperty, setAdditionalProperty] = useState<string>("no");
  const [results, setResults] = useState<any>(null);

  const calculatePropertyTax = () => {
    let stampDuty = 0;
    let councilTaxBand = "";
    let councilTaxRange = "";

    // Calculate Stamp Duty Land Tax (SDLT)
    if (propertyType === "residential") {
      if (region === "england" || region === "northern-ireland") {
        // England and Northern Ireland SDLT rates
        if (firstTimeBuyer === "yes" && propertyValue <= 625000) {
          // First-time buyer relief
          if (propertyValue <= 425000) {
            stampDuty = 0;
          } else {
            stampDuty = (propertyValue - 425000) * 0.05;
          }
        } else {
          // Standard rates
          if (propertyValue <= 250000) {
            stampDuty = 0;
          } else if (propertyValue <= 925000) {
            stampDuty = (propertyValue - 250000) * 0.05;
          } else if (propertyValue <= 1500000) {
            stampDuty = 33750 + (propertyValue - 925000) * 0.10;
          } else {
            stampDuty = 91250 + (propertyValue - 1500000) * 0.12;
          }
        }

        // Additional property surcharge
        if (additionalProperty === "yes") {
          stampDuty += propertyValue * 0.03;
        }
      }
    }

    // Calculate Council Tax band (approximate based on property value)
    if (propertyValue <= 40000) {
      councilTaxBand = "A";
      councilTaxRange = "£1,000 - £1,400";
    } else if (propertyValue <= 52000) {
      councilTaxBand = "B";
      councilTaxRange = "£1,200 - £1,600";
    } else if (propertyValue <= 68000) {
      councilTaxBand = "C";
      councilTaxRange = "£1,300 - £1,800";
    } else if (propertyValue <= 88000) {
      councilTaxBand = "D";
      councilTaxRange = "£1,500 - £2,100";
    } else if (propertyValue <= 120000) {
      councilTaxBand = "E";
      councilTaxRange = "£1,800 - £2,500";
    } else if (propertyValue <= 160000) {
      councilTaxBand = "F";
      councilTaxRange = "£2,100 - £2,900";
    } else if (propertyValue <= 320000) {
      councilTaxBand = "G";
      councilTaxRange = "£2,400 - £3,400";
    } else {
      councilTaxBand = "H";
      councilTaxRange = "£3,000 - £4,200";
    }

    setResults({
      propertyValue,
      stampDuty,
      councilTaxBand,
      councilTaxRange,
      totalUpfrontCost: propertyValue + stampDuty,
      propertyType,
      region,
      firstTimeBuyer: firstTimeBuyer === "yes",
      additionalProperty: additionalProperty === "yes"
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
          Calculate UK Council Tax bands and Stamp Duty Land Tax for property transactions across England, Wales, Scotland and Northern Ireland.
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
              Enter your property information
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
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="england">England</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="scotland">Scotland</SelectItem>
                  <SelectItem value="northern-ireland">Northern Ireland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstTimeBuyer">First-time Buyer?</Label>
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
              <Label htmlFor="additionalProperty">Additional Property/Second Home?</Label>
              <Select value={additionalProperty} onValueChange={setAdditionalProperty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
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
                Your UK property tax calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Stamp Duty Land Tax</h3>
                  <div className="flex justify-between items-center">
                    <span>SDLT Amount:</span>
                    <span className="text-xl font-bold text-blue-600">
                      £{results.stampDuty.toFixed(2)}
                    </span>
                  </div>
                  {results.firstTimeBuyer && (
                    <p className="text-sm text-green-600 mt-1">✓ First-time buyer relief applied</p>
                  )}
                  {results.additionalProperty && (
                    <p className="text-sm text-orange-600 mt-1">! Additional property surcharge (3%) applied</p>
                  )}
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Council Tax</h3>
                  <div className="flex justify-between items-center">
                    <span>Council Tax Band:</span>
                    <span className="text-xl font-bold text-green-600">
                      Band {results.councilTaxBand}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Annual Range:</span>
                    <span className="font-semibold">{results.councilTaxRange}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Total Upfront Cost:</span>
                  <span className="text-xl font-bold text-gray-800">
                    £{results.totalUpfrontCost.toLocaleString()}
                  </span>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Property Value:</span>
                    <span>£{results.propertyValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Region:</span>
                    <span className="capitalize">{results.region.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Type:</span>
                    <span className="capitalize">{results.propertyType}</span>
                  </div>
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
              SDLT Rates (England & NI)
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
            <p className="text-xs text-gray-500 mt-2">
              Additional 3% surcharge for additional properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              Council Tax Bands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Band A:</span>
              <span>Up to £40,000</span>
            </div>
            <div className="flex justify-between">
              <span>Band B:</span>
              <span>£40,001 - £52,000</span>
            </div>
            <div className="flex justify-between">
              <span>Band C:</span>
              <span>£52,001 - £68,000</span>
            </div>
            <div className="flex justify-between">
              <span>Band D:</span>
              <span>£68,001 - £88,000</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Based on 1991 property values in England
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
            <p>• Wales and Scotland have different tax systems</p>
            <p>• First-time buyer relief available up to £625,000</p>
            <p>• Council Tax varies significantly by local authority</p>
            <p>• Commercial properties have different rates</p>
            <p className="text-xs text-gray-500 mt-2">
              For official guidance, visit gov.uk/stamp-duty-land-tax
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKPropertyTaxCalculator;
