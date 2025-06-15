
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKImportTaxCalculator = () => {
  const [goodsValue, setGoodsValue] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [insuranceCost, setInsuranceCost] = useState<string>("");
  const [countryOfOrigin, setCountryOfOrigin] = useState<string>("eu");
  const [commodityCode, setCommodityCode] = useState<string>("standard");
  const [isCommercial, setIsCommercial] = useState<boolean>(true);
  const [results, setResults] = useState<any>(null);

  // UK import duty rates (simplified examples)
  const getDutyRate = (commodityCode: string, countryOfOrigin: string) => {
    if (countryOfOrigin === "eu") return 0; // UK-EU Trade Agreement
    
    const dutyRates: { [key: string]: number } = {
      "standard": 0.05, // 5%
      "textiles": 0.12, // 12%
      "electronics": 0.0, // 0%
      "food": 0.08, // 8%
      "automotive": 0.10, // 10%
      "chemicals": 0.065 // 6.5%
    };
    
    return dutyRates[commodityCode] || 0.05;
  };

  const calculateImportTax = () => {
    const value = parseFloat(goodsValue) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const insurance = parseFloat(insuranceCost) || 0;
    
    // Calculate customs value (CIF - Cost, Insurance, Freight)
    const customsValue = value + shipping + insurance;
    
    // Import duty calculation
    const dutyRate = getDutyRate(commodityCode, countryOfOrigin);
    const importDuty = customsValue * dutyRate;
    
    // VAT calculation (20% on goods value + duty + shipping)
    const vatableValue = customsValue + importDuty;
    let importVAT = 0;
    
    // VAT exemption thresholds
    const vatThreshold = isCommercial ? 135 : 15; // £135 for commercial, £15 for gifts
    
    if (value > vatThreshold) {
      importVAT = vatableValue * 0.2; // 20% VAT
    }
    
    // Duty exemption threshold
    const dutyThreshold = 135; // £135
    const finalImportDuty = value > dutyThreshold ? importDuty : 0;
    
    // Handling fees (estimated)
    let handlingFee = 0;
    if (value > 15) {
      handlingFee = 12; // Royal Mail handling fee
    }
    
    const totalTax = finalImportDuty + importVAT + handlingFee;
    const totalCost = value + shipping + insurance + totalTax;
    
    setResults({
      goodsValue: value,
      shippingCost: shipping,
      insuranceCost: insurance,
      customsValue,
      dutyRate: dutyRate * 100,
      importDuty: finalImportDuty,
      importVAT,
      handlingFee,
      totalTax,
      totalCost,
      vatThreshold,
      dutyThreshold,
      countryOfOrigin,
      commodityCode,
      isCommercial
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Import Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK import duties, VAT on imports, and customs charges post-Brexit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Import Details</CardTitle>
            <CardDescription>
              Enter information about your imported goods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goodsValue">Goods Value (£)</Label>
              <Input
                id="goodsValue"
                type="number"
                placeholder="500"
                value={goodsValue}
                onChange={(e) => setGoodsValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingCost">Shipping Cost (£)</Label>
              <Input
                id="shippingCost"
                type="number"
                placeholder="50"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceCost">Insurance Cost (£)</Label>
              <Input
                id="insuranceCost"
                type="number"
                placeholder="25"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryOfOrigin">Country of Origin</Label>
              <select
                id="countryOfOrigin"
                value={countryOfOrigin}
                onChange={(e) => setCountryOfOrigin(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="eu">European Union</option>
                <option value="usa">United States</option>
                <option value="china">China</option>
                <option value="other">Other Countries</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commodityCode">Commodity Type</Label>
              <select
                id="commodityCode"
                value={commodityCode}
                onChange={(e) => setCommodityCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="standard">Standard Goods</option>
                <option value="electronics">Electronics</option>
                <option value="textiles">Textiles & Clothing</option>
                <option value="food">Food Products</option>
                <option value="automotive">Automotive Parts</option>
                <option value="chemicals">Chemicals</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isCommercial"
                checked={isCommercial}
                onChange={(e) => setIsCommercial(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isCommercial">Commercial Import (not a gift)</Label>
            </div>

            <Button onClick={calculateImportTax} className="w-full">
              Calculate Import Costs
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Import Cost Calculation</CardTitle>
            <CardDescription>
              UK import duties and taxes breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Goods Value:</p>
                    <p className="text-lg">{formatCurrency(results.goodsValue)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Total Cost:</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(results.totalCost)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Cost Breakdown:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Goods Value:</span>
                      <span>{formatCurrency(results.goodsValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatCurrency(results.shippingCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span>{formatCurrency(results.insuranceCost)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Customs Value:</span>
                      <span>{formatCurrency(results.customsValue)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Taxes & Duties:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Import Duty ({results.dutyRate.toFixed(1)}%):</span>
                      <span>{formatCurrency(results.importDuty)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Import VAT (20%):</span>
                      <span>{formatCurrency(results.importVAT)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Handling Fee:</span>
                      <span>{formatCurrency(results.handlingFee)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Taxes:</span>
                      <span className="text-red-600">{formatCurrency(results.totalTax)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Exemption Info:</h4>
                  <div className="text-sm text-gray-600">
                    <p>• VAT threshold: {formatCurrency(results.vatThreshold)}</p>
                    <p>• Duty threshold: {formatCurrency(results.dutyThreshold)}</p>
                    <p>• Import type: {results.isCommercial ? "Commercial" : "Gift"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter import details and click calculate to see costs</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>UK Import Information:</strong> Duty rates vary by commodity and origin country | 
          VAT: 20% on most goods | Gift allowance: £15 | Commercial threshold: £135 | 
          This calculator provides estimates. Check GOV.UK for current rates and specific commodity codes.
          Actual costs may vary based on specific circumstances and trade agreements.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKImportTaxCalculator;
