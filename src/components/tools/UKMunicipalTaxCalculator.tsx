
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKMunicipalTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [councilTaxBand, setCouncilTaxBand] = useState<string>("D");
  const [localAuthority, setLocalAuthority] = useState<string>("average");
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [businessRates, setBusinessRates] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  // Council Tax band values (England)
  const councilTaxBands = {
    A: { min: 0, max: 40000, ratio: 6/9 },
    B: { min: 40001, max: 52000, ratio: 7/9 },
    C: { min: 52001, max: 68000, ratio: 8/9 },
    D: { min: 68001, max: 88000, ratio: 1 },
    E: { min: 88001, max: 120000, ratio: 11/9 },
    F: { min: 120001, max: 160000, ratio: 13/9 },
    G: { min: 160001, max: 320000, ratio: 15/9 },
    H: { min: 320001, max: Infinity, ratio: 18/9 }
  };

  // Average Council Tax rates by local authority type (2024/25 estimates)
  const councilTaxRates = {
    average: 1800,
    london: 1450,
    metropolitan: 1750,
    county: 1850,
    unitary: 1900
  };

  const calculateMunicipalTax = () => {
    const value = parseFloat(propertyValue) || 0;
    const businessRV = parseFloat(businessRates) || 0;
    
    let councilTax = 0;
    let businessRatesAmount = 0;
    let totalMunicipalTax = 0;
    
    // Calculate Council Tax for residential properties
    if (propertyType === "residential") {
      const baseRate = councilTaxRates[localAuthority as keyof typeof councilTaxRates];
      const bandRatio = councilTaxBands[councilTaxBand as keyof typeof councilTaxBands].ratio;
      councilTax = baseRate * bandRatio;
    }
    
    // Calculate Business Rates for commercial properties
    if (propertyType === "commercial" && businessRV > 0) {
      const multiplier = businessRV > 51000 ? 0.512 : 0.499; // 2024/25 rates
      businessRatesAmount = businessRV * multiplier;
      
      // Small business rate relief
      if (businessRV <= 15000) {
        businessRatesAmount *= 0.5; // 50% relief
      } else if (businessRV <= 51000) {
        const reliefPercent = Math.max(0, (51000 - businessRV) / 36000 * 0.5);
        businessRatesAmount *= (1 - reliefPercent);
      }
    }
    
    totalMunicipalTax = councilTax + businessRatesAmount;
    
    // Calculate band information
    const currentBand = councilTaxBands[councilTaxBand as keyof typeof councilTaxBands];
    const suggestedBand = getSuggestedBand(value);
    
    setResults({
      propertyValue: value,
      councilTaxBand,
      councilTax,
      businessRatesAmount,
      businessRV,
      totalMunicipalTax,
      monthlyAmount: totalMunicipalTax / 12,
      localAuthority,
      propertyType,
      currentBand,
      suggestedBand,
      bandCorrect: suggestedBand === councilTaxBand
    });
  };

  const getSuggestedBand = (value: number): string => {
    for (const [band, range] of Object.entries(councilTaxBands)) {
      if (value >= range.min && value <= range.max) {
        return band;
      }
    }
    return "H";
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
          UK Municipal Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Council Tax and Business Rates for residential and commercial properties.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>
              Enter property information for municipal tax calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="propertyValue">Property Value (£)</Label>
              <Input
                id="propertyValue"
                type="number"
                placeholder="250000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="residential">Residential Property</option>
                <option value="commercial">Commercial Property</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localAuthority">Local Authority Type</Label>
              <select
                id="localAuthority"
                value={localAuthority}
                onChange={(e) => setLocalAuthority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="average">Average Council</option>
                <option value="london">London Borough</option>
                <option value="metropolitan">Metropolitan District</option>
                <option value="county">County Council</option>
                <option value="unitary">Unitary Authority</option>
              </select>
            </div>

            {propertyType === "residential" && (
              <div className="space-y-2">
                <Label htmlFor="councilTaxBand">Council Tax Band</Label>
                <select
                  id="councilTaxBand"
                  value={councilTaxBand}
                  onChange={(e) => setCouncilTaxBand(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {Object.entries(councilTaxBands).map(([band, range]) => (
                    <option key={band} value={band}>
                      Band {band} ({formatCurrency(range.min)} - {range.max === Infinity ? "£320,000+" : formatCurrency(range.max)})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {propertyType === "commercial" && (
              <div className="space-y-2">
                <Label htmlFor="businessRates">Rateable Value (£)</Label>
                <Input
                  id="businessRates"
                  type="number"
                  placeholder="25000"
                  value={businessRates}
                  onChange={(e) => setBusinessRates(e.target.value)}
                />
              </div>
            )}

            <Button onClick={calculateMunicipalTax} className="w-full">
              Calculate Municipal Tax
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Municipal Tax Results</CardTitle>
            <CardDescription>
              Your annual local authority charges
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Annual Total:</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(results.totalMunicipalTax)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Monthly Payment:</p>
                    <p className="text-lg">{formatCurrency(results.monthlyAmount)}</p>
                  </div>
                </div>

                <Separator />

                {results.propertyType === "residential" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Council Tax Details:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Band:</span>
                        <span>Band {results.councilTaxBand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Council Tax:</span>
                        <span>{formatCurrency(results.councilTax)}</span>
                      </div>
                      
                      {!results.bandCorrect && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                          <p className="text-orange-800 font-medium">⚠️ Band Mismatch</p>
                          <p className="text-sm text-orange-700">
                            Based on property value, suggested band: {results.suggestedBand}
                          </p>
                        </div>
                      )}
                      
                      {results.bandCorrect && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                          <p className="text-green-800 font-medium">✅ Correct Band</p>
                          <p className="text-sm text-green-700">Your band matches the property value</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {results.propertyType === "commercial" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Business Rates Details:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Rateable Value:</span>
                        <span>{formatCurrency(results.businessRV)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Business Rates:</span>
                        <span>{formatCurrency(results.businessRatesAmount)}</span>
                      </div>
                      
                      {results.businessRV <= 15000 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                          <p className="text-green-800 font-medium">✅ Small Business Relief</p>
                          <p className="text-sm text-green-700">50% reduction applied</p>
                        </div>
                      )}
                      
                      {results.businessRV > 15000 && results.businessRV <= 51000 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                          <p className="text-blue-800 font-medium">ℹ️ Tapered Relief</p>
                          <p className="text-sm text-blue-700">Partial small business relief applied</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Payment Options:</h4>
                  <div className="text-sm text-gray-600">
                    <p>• Council Tax: Usually paid over 10 months (April-January)</p>
                    <p>• Business Rates: Can be paid monthly or in advance</p>
                    <p>• Direct Debit discounts may be available</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter property details and click calculate to see municipal tax</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>UK Municipal Tax Information:</strong> Council Tax bands based on 1991 property values in England | 
          Business rates calculated on rateable value | Small business relief available for properties under £15,000 RV | 
          This calculator provides estimates based on average rates. 
          Check your local authority website for exact rates and available discounts.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKMunicipalTaxCalculator;
