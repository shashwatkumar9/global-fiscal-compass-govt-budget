
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Calculator, Info, AlertCircle } from "lucide-react";

const UKCapitalGainsTaxCalculator = () => {
  const [assetType, setAssetType] = useState<string>("property");
  const [purchasePrice, setPurchasePrice] = useState<number>(200000);
  const [salePrice, setSalePrice] = useState<number>(300000);
  const [improvementCosts, setImprovementCosts] = useState<number>(0);
  const [sellingCosts, setSellingCosts] = useState<number>(0);
  const [taxBand, setTaxBand] = useState<string>("basic");
  const [isMainResidence, setIsMainResidence] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const calculateCGT = () => {
    // UK CGT rates and allowances 2024/25
    const annualExemption = 3000; // Reduced from £6,000
    const basicRateProperty = 0.18;
    const higherRateProperty = 0.24; // Reduced from 28%
    const basicRateOther = 0.10;
    const higherRateOther = 0.20;

    const totalCosts = purchasePrice + improvementCosts + sellingCosts;
    const gain = Math.max(0, salePrice - totalCosts);
    
    let taxableGain = gain;
    let cgtRate = 0;
    let cgtAmount = 0;
    let exemptionUsed = 0;

    // Apply main residence relief for property
    if (assetType === "property" && isMainResidence) {
      taxableGain = 0; // Full relief for main residence
    } else {
      // Apply annual exemption
      exemptionUsed = Math.min(taxableGain, annualExemption);
      taxableGain = Math.max(0, taxableGain - annualExemption);
    }

    // Calculate CGT rate based on asset type and tax band
    if (taxableGain > 0) {
      if (assetType === "property") {
        cgtRate = taxBand === "basic" ? basicRateProperty : higherRateProperty;
      } else {
        cgtRate = taxBand === "basic" ? basicRateOther : higherRateOther;
      }
      cgtAmount = taxableGain * cgtRate;
    }

    const netProceeds = salePrice - sellingCosts - cgtAmount;

    setResults({
      purchasePrice,
      salePrice,
      totalCosts,
      gain,
      exemptionUsed,
      taxableGain,
      cgtRate: cgtRate * 100,
      cgtAmount,
      netProceeds,
      assetType,
      isMainResidence
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-blue-600" />
          UK Capital Gains Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Capital Gains Tax on property, shares, and other assets with annual allowances and reliefs for 2024/25.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Asset Details
            </CardTitle>
            <CardDescription>
              Enter details about your asset sale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="assetType">Asset Type</Label>
              <Select value={assetType} onValueChange={setAssetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Residential Property</SelectItem>
                  <SelectItem value="shares">Shares & Securities</SelectItem>
                  <SelectItem value="business">Business Assets</SelectItem>
                  <SelectItem value="other">Other Assets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price (£)</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                placeholder="200000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price (£)</Label>
              <Input
                id="salePrice"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                placeholder="300000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvementCosts">Improvement Costs (£)</Label>
              <Input
                id="improvementCosts"
                type="number"
                value={improvementCosts}
                onChange={(e) => setImprovementCosts(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingCosts">Selling Costs (£)</Label>
              <Input
                id="sellingCosts"
                type="number"
                value={sellingCosts}
                onChange={(e) => setSellingCosts(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxBand">Income Tax Band</Label>
              <Select value={taxBand} onValueChange={setTaxBand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Rate (20%)</SelectItem>
                  <SelectItem value="higher">Higher Rate (40%+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {assetType === "property" && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mainResidence" 
                  checked={isMainResidence}
                  onCheckedChange={(checked) => setIsMainResidence(checked as boolean)}
                />
                <Label htmlFor="mainResidence">Main residence (Primary Residence Relief)</Label>
              </div>
            )}

            <Button onClick={calculateCGT} className="w-full" size="lg">
              Calculate Capital Gains Tax
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                CGT Calculation Results
              </CardTitle>
              <CardDescription>
                Your UK Capital Gains Tax calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Purchase Price</p>
                  <p className="font-semibold">£{results.purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Sale Price</p>
                  <p className="font-semibold">£{results.salePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Costs</p>
                  <p className="font-semibold text-red-600">£{results.totalCosts.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Capital Gain</p>
                  <p className="font-semibold text-green-600">£{results.gain.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              {results.isMainResidence && results.assetType === "property" ? (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-800">Primary Residence Relief Applied</p>
                  <p className="text-sm text-green-600">No Capital Gains Tax due on main residence</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Annual Exemption Used:</span>
                    <span className="font-semibold text-green-600">£{results.exemptionUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Gain:</span>
                    <span className="font-semibold">£{results.taxableGain.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGT Rate:</span>
                    <span className="font-semibold">{results.cgtRate}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Capital Gains Tax:</span>
                    <span className="text-xl font-bold text-red-600">
                      £{results.cgtAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Net Proceeds:</span>
                <span className="text-xl font-bold text-blue-600">
                  £{results.netProceeds.toFixed(2)}
                </span>
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
              CGT Rates 2024/25
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="font-semibold">Residential Property:</p>
              <p>Basic rate: 18% | Higher rate: 24%</p>
            </div>
            <div>
              <p className="font-semibold">Other Assets:</p>
              <p>Basic rate: 10% | Higher rate: 20%</p>
            </div>
            <div>
              <p className="font-semibold">Annual Exemption:</p>
              <p>£3,000 (2024/25)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              Allowable Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Original purchase price</p>
            <p>• Improvement costs (not repairs)</p>
            <p>• Legal fees and estate agent costs</p>
            <p>• Stamp duty and survey costs</p>
            <p>• Advertising costs for sale</p>
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
            <p>• Report gains within 60 days for property</p>
            <p>• Main residence usually exempt from CGT</p>
            <p>• Business Asset Disposal Relief may apply</p>
            <p>• Shares may qualify for different reliefs</p>
            <p className="text-xs text-gray-500 mt-2">
              For official guidance, visit gov.uk/capital-gains-tax
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKCapitalGainsTaxCalculator;
