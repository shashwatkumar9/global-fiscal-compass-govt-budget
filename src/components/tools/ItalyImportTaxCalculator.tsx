
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyImportTaxCalculator = () => {
  const [goodsValue, setGoodsValue] = useState<string>("");
  const [originCountry, setOriginCountry] = useState<string>("non_eu");
  const [productCategory, setProductCategory] = useState<string>("general");
  const [shippingCosts, setShippingCosts] = useState<string>("");
  const [insuranceCosts, setInsuranceCosts] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateImportTax = () => {
    const value = parseFloat(goodsValue) || 0;
    const shipping = parseFloat(shippingCosts) || 0;
    const insurance = parseFloat(insuranceCosts) || 0;
    
    // CIF Value (Cost, Insurance, Freight)
    const cifValue = value + shipping + insurance;
    
    // Customs duty rates (EU Common Customs Tariff)
    let dutyRate = 0;
    switch (productCategory) {
      case "textiles":
        dutyRate = 0.12; // 12%
        break;
      case "electronics":
        dutyRate = 0.05; // 5%
        break;
      case "machinery":
        dutyRate = 0.035; // 3.5%
        break;
      case "chemicals":
        dutyRate = 0.065; // 6.5%
        break;
      case "food":
        dutyRate = 0.18; // 18% average
        break;
      case "vehicles":
        dutyRate = 0.10; // 10%
        break;
      case "general":
        dutyRate = 0.07; // 7% average
        break;
    }
    
    // EU origin goods are duty-free
    if (originCountry === "eu") {
      dutyRate = 0;
    }
    
    // Calculate customs duty
    const customsDuty = cifValue * dutyRate;
    
    // Dutiable value for VAT calculation
    const dutiableValue = cifValue + customsDuty;
    
    // VAT calculation (22% standard rate)
    let vatRate = 0.22;
    if (productCategory === "food") {
      vatRate = 0.10; // Reduced rate for food
    } else if (productCategory === "medical") {
      vatRate = 0.10; // Medical products
    }
    
    const importVAT = dutiableValue * vatRate;
    
    // Administrative fees
    const customsClearanceFee = 25; // Fixed fee
    const handlingFee = Math.min(50, dutiableValue * 0.002); // 0.2% max €50
    
    // Total import costs
    const totalTaxesAndFees = customsDuty + importVAT + customsClearanceFee + handlingFee;
    const totalCostIncludingTaxes = cifValue + totalTaxesAndFees;
    
    // Effective rate
    const effectiveRate = cifValue > 0 ? (totalTaxesAndFees / cifValue) * 100 : 0;

    setResults({
      goodsValue: value,
      shippingCosts: shipping,
      insuranceCosts: insurance,
      cifValue,
      customsDuty,
      importVAT,
      customsClearanceFee,
      handlingFee,
      totalTaxesAndFees,
      totalCostIncludingTaxes,
      effectiveRate,
      dutyRate: dutyRate * 100,
      vatRate: vatRate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Tax & Customs Duty Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goods-value">Goods Value (€)</Label>
              <Input
                id="goods-value"
                type="number"
                value={goodsValue}
                onChange={(e) => setGoodsValue(e.target.value)}
                placeholder="Value of imported goods"
              />
            </div>
            <div>
              <Label htmlFor="shipping-costs">Shipping Costs (€)</Label>
              <Input
                id="shipping-costs"
                type="number"
                value={shippingCosts}
                onChange={(e) => setShippingCosts(e.target.value)}
                placeholder="International shipping"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="insurance-costs">Insurance Costs (€)</Label>
            <Input
              id="insurance-costs"
              type="number"
              value={insuranceCosts}
              onChange={(e) => setInsuranceCosts(e.target.value)}
              placeholder="Insurance costs"
            />
          </div>

          <div>
            <Label htmlFor="origin-country">Origin Country</Label>
            <Select value={originCountry} onValueChange={setOriginCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eu">EU Country (Duty Free)</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="non_eu">Other Non-EU Country</SelectItem>
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
                <SelectItem value="general">General Goods (7%)</SelectItem>
                <SelectItem value="textiles">Textiles & Clothing (12%)</SelectItem>
                <SelectItem value="electronics">Electronics (5%)</SelectItem>
                <SelectItem value="machinery">Machinery (3.5%)</SelectItem>
                <SelectItem value="chemicals">Chemicals (6.5%)</SelectItem>
                <SelectItem value="food">Food Products (18%)</SelectItem>
                <SelectItem value="vehicles">Motor Vehicles (10%)</SelectItem>
                <SelectItem value="medical">Medical Equipment (0-5%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateImportTax} className="w-full">
            Calculate Import Taxes
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Import Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Goods Value</p>
                <p className="text-lg font-semibold">€{results.goodsValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CIF Value</p>
                <p className="text-lg font-semibold">€{results.cifValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duty Rate</p>
                <p className="text-lg font-semibold">{results.dutyRate}%</p>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">Import Costs Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Customs Duty ({results.dutyRate}%)</span>
                  <span className="font-medium">€{results.customsDuty.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Import VAT ({results.vatRate}%)</span>
                  <span className="font-medium">€{results.importVAT.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Customs Clearance Fee</span>
                  <span className="font-medium">€{results.customsClearanceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Handling Fee</span>
                  <span className="font-medium">€{results.handlingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-red-600">
                  <span>Total Taxes & Fees</span>
                  <span>€{results.totalTaxesAndFees.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Import Cost</p>
                <p className="text-2xl font-bold text-blue-600">€{results.totalCostIncludingTaxes.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Effective Tax Rate</p>
                <p className="text-2xl font-bold text-orange-600">{results.effectiveRate.toFixed(1)}%</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Import Tax Information:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>De Minimis:</strong> Packages under €22 are duty and VAT free</li>
                <li>• <strong>VAT Threshold:</strong> VAT applies on packages over €22</li>
                <li>• <strong>Duty Threshold:</strong> Customs duty applies on packages over €150</li>
                <li>• <strong>EU Goods:</strong> No customs duty between EU countries</li>
                <li>• <strong>Processing Time:</strong> Usually 1-3 business days for clearance</li>
                <li>• <strong>Additional Charges:</strong> Courier companies may add handling fees</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyImportTaxCalculator;
