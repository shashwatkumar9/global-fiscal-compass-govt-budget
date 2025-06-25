
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainSalesTaxCalculator = () => {
  const [saleAmount, setSaleAmount] = useState("");
  const [productCategory, setProductCategory] = useState("general");
  const [calculationType, setCalculationType] = useState("add");
  const [canaryIslands, setCanaryIslands] = useState("no");
  const [results, setResults] = useState<any>(null);

  const calculateSalesTax = () => {
    const amount = parseFloat(saleAmount) || 0;
    
    // VAT rates in Spain (and IGIC for Canary Islands)
    let taxRate = 0;
    let taxName = "VAT";
    
    if (canaryIslands === "yes") {
      // IGIC rates for Canary Islands
      taxName = "IGIC";
      switch (productCategory) {
        case "general":
          taxRate = 0.07; // 7%
          break;
        case "reduced":
          taxRate = 0.03; // 3%
          break;
        case "super_reduced":
          taxRate = 0; // 0%
          break;
        case "luxury":
          taxRate = 0.095; // 9.5%
          break;
        default:
          taxRate = 0.07;
      }
    } else {
      // Standard VAT rates for mainland Spain
      switch (productCategory) {
        case "general":
          taxRate = 0.21; // 21%
          break;
        case "reduced":
          taxRate = 0.10; // 10%
          break;
        case "super_reduced":
          taxRate = 0.04; // 4%
          break;
        case "zero":
          taxRate = 0; // 0%
          break;
        default:
          taxRate = 0.21;
      }
    }

    let netAmount, taxAmount, grossAmount;

    if (calculationType === "add") {
      // Add tax to amount
      netAmount = amount;
      taxAmount = netAmount * taxRate;
      grossAmount = netAmount + taxAmount;
    } else {
      // Remove tax from amount
      grossAmount = amount;
      netAmount = grossAmount / (1 + taxRate);
      taxAmount = grossAmount - netAmount;
    }

    setResults({
      netAmount,
      taxAmount,
      grossAmount,
      taxRate: taxRate * 100,
      taxName,
      productCategory,
      canaryIslands: canaryIslands === "yes"
    });
  };

  const getCategoryDescription = (category: string, isCanary: boolean) => {
    if (isCanary) {
      switch (category) {
        case "general":
          return "7% IGIC - Most goods and services";
        case "reduced":
          return "3% IGIC - Food, transport, culture";
        case "super_reduced":
          return "0% IGIC - Basic necessities";
        case "luxury":
          return "9.5% IGIC - Luxury goods";
        default:
          return "";
      }
    } else {
      switch (category) {
        case "general":
          return "21% VAT - Standard rate";
        case "reduced":
          return "10% VAT - Food, transport, hotels";
        case "super_reduced":
          return "4% VAT - Basic necessities";
        case "zero":
          return "0% VAT - Exports, certain services";
        default:
          return "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Sales Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sale-amount">Sale Amount (€)</Label>
              <Input
                id="sale-amount"
                type="number"
                step="0.01"
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
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
                  <SelectItem value="add">Add Tax to Amount</SelectItem>
                  <SelectItem value="remove">Remove Tax from Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="canary-islands">Location</Label>
              <Select value={canaryIslands} onValueChange={setCanaryIslands}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Mainland Spain (VAT)</SelectItem>
                  <SelectItem value="yes">Canary Islands (IGIC)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="product-category">Product Category</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Rate</SelectItem>
                  <SelectItem value="reduced">Reduced Rate</SelectItem>
                  <SelectItem value="super_reduced">Super Reduced Rate</SelectItem>
                  {canaryIslands === "yes" ? (
                    <SelectItem value="luxury">Luxury Rate</SelectItem>
                  ) : (
                    <SelectItem value="zero">Zero Rate</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {getCategoryDescription(productCategory, canaryIslands === "yes")}
              </p>
            </div>
          </div>

          <Button onClick={calculateSalesTax} className="w-full">
            Calculate Sales Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Net Amount</p>
                  <p className="text-2xl font-bold text-blue-600">€{results.netAmount.toFixed(2)}</p>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">{results.taxName} Amount</p>
                  <p className="text-2xl font-bold text-red-600">€{results.taxAmount.toFixed(2)}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Gross Amount</p>
                  <p className="text-2xl font-bold text-green-600">€{results.grossAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Tax Details</h4>
                <p className="text-sm">
                  Tax Type: {results.taxName} ({results.taxRate}%) | 
                  Location: {results.canaryIslands ? "Canary Islands" : "Mainland Spain"} |
                  Category: {results.productCategory}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainSalesTaxCalculator;
