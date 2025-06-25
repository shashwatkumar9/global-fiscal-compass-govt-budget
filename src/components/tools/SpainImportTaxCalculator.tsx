
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainImportTaxCalculator = () => {
  const [goodsValue, setGoodsValue] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("non_eu");
  const [productType, setProductType] = useState("general");
  const [results, setResults] = useState<any>(null);

  const calculateImportTax = () => {
    const value = parseFloat(goodsValue) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const customsValue = value + shipping;

    // Customs duty rates (simplified)
    let dutyRate = 0;
    if (countryOfOrigin === "non_eu") {
      switch (productType) {
        case "electronics":
          dutyRate = 0.035; // 3.5%
          break;
        case "textiles":
          dutyRate = 0.08; // 8%
          break;
        case "automotive":
          dutyRate = 0.10; // 10%
          break;
        case "food":
          dutyRate = 0.05; // 5%
          break;
        case "general":
        default:
          dutyRate = 0.045; // 4.5%
          break;
      }
    } else {
      dutyRate = 0; // No duty for EU goods
    }

    const customsDuty = customsValue * dutyRate;
    
    // VAT calculation (21% on customs value + duty)
    const vatBase = customsValue + customsDuty;
    const vat = vatBase * 0.21;
    
    // Total import taxes
    const totalTaxes = customsDuty + vat;
    const totalCost = customsValue + totalTaxes;
    const effectiveTaxRate = customsValue > 0 ? (totalTaxes / customsValue) * 100 : 0;

    setResults({
      goodsValue: value,
      shippingCost: shipping,
      customsValue,
      customsDuty,
      vat,
      totalTaxes,
      totalCost,
      effectiveTaxRate,
      dutyRate: dutyRate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Import Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goods-value">Goods Value (€)</Label>
              <Input
                id="goods-value"
                type="number"
                step="0.01"
                value={goodsValue}
                onChange={(e) => setGoodsValue(e.target.value)}
                placeholder="1000.00"
              />
            </div>

            <div>
              <Label htmlFor="shipping-cost">Shipping & Insurance (€)</Label>
              <Input
                id="shipping-cost"
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                placeholder="50.00"
              />
            </div>

            <div>
              <Label htmlFor="country-origin">Country of Origin</Label>
              <Select value={countryOfOrigin} onValueChange={setCountryOfOrigin}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu">EU Country</SelectItem>
                  <SelectItem value="non_eu">Non-EU Country</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="product-type">Product Type</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Goods</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="textiles">Textiles & Clothing</SelectItem>
                  <SelectItem value="automotive">Automotive Parts</SelectItem>
                  <SelectItem value="food">Food Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateImportTax} className="w-full">
            Calculate Import Taxes
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Import Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Goods Value:</span>
                  <span className="font-semibold">€{results.goodsValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & Insurance:</span>
                  <span className="font-semibold">€{results.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customs Value:</span>
                  <span className="font-semibold">€{results.customsValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customs Duty ({results.dutyRate}%):</span>
                  <span className="font-semibold text-red-600">€{results.customsDuty.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (21%):</span>
                  <span className="font-semibold text-red-600">€{results.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Import Taxes:</span>
                  <span className="font-semibold text-red-600">€{results.totalTaxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="font-semibold text-blue-600">€{results.totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Tax Rate:</span>
                  <span className="font-semibold">{results.effectiveTaxRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold mb-2">Important Note</h4>
              <p className="text-sm">
                This calculator provides estimates based on general rates. Actual duties may vary based on specific product classifications (HS codes), trade agreements, and current regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainImportTaxCalculator;
