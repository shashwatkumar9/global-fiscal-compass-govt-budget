
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalySalesTaxCalculator = () => {
  const [monthlySales, setMonthlySales] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("standard");
  const [vatScheme, setVatScheme] = useState<string>("normal");
  const [exportSales, setExportSales] = useState<string>("");
  const [purchaseVAT, setPurchaseVAT] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateSalesTax = () => {
    const sales = parseFloat(monthlySales) || 0;
    const exports = parseFloat(exportSales) || 0;
    const purchases = parseFloat(purchaseVAT) || 0;
    
    // Determine VAT rate based on business type
    let vatRate = 0.22; // Standard 22%
    switch (businessType) {
      case "food_retail":
        vatRate = 0.10; // Reduced rate 10%
        break;
      case "essential_goods":
        vatRate = 0.04; // Super reduced rate 4%
        break;
      case "books_newspapers":
        vatRate = 0.04; // 4% for books/newspapers
        break;
      case "medical":
        vatRate = 0.10; // 10% for medical services
        break;
      case "tourism":
        vatRate = 0.10; // 10% for tourism
        break;
    }
    
    // Calculate VAT obligations
    const domesticSales = sales - exports;
    const outputVAT = domesticSales * vatRate;
    const inputVAT = purchases;
    
    // VAT to pay/refund
    let vatPayable = outputVAT - inputVAT;
    let vatRefund = 0;
    
    if (vatPayable < 0) {
      vatRefund = Math.abs(vatPayable);
      vatPayable = 0;
    }
    
    // Special schemes
    let specialSchemeReduction = 0;
    if (vatScheme === "flat_rate" && sales <= 65000) {
      // Flat rate scheme (regime forfettario)
      specialSchemeReduction = vatPayable * 0.5; // 50% reduction example
      vatPayable = vatPayable - specialSchemeReduction;
    }
    
    // Annual projections
    const annualVATPayable = vatPayable * 12;
    const annualSales = sales * 12;
    const effectiveVATRate = domesticSales > 0 ? (outputVAT / domesticSales) * 100 : 0;

    setResults({
      monthlySales: sales,
      exportSales: exports,
      domesticSales,
      outputVAT,
      inputVAT,
      vatPayable,
      vatRefund,
      specialSchemeReduction,
      annualVATPayable,
      annualSales,
      effectiveVATRate,
      vatRate: vatRate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Tax & VAT Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthly-sales">Monthly Sales (€)</Label>
              <Input
                id="monthly-sales"
                type="number"
                value={monthlySales}
                onChange={(e) => setMonthlySales(e.target.value)}
                placeholder="Enter monthly sales"
              />
            </div>
            <div>
              <Label htmlFor="export-sales">Export Sales (€)</Label>
              <Input
                id="export-sales"
                type="number"
                value={exportSales}
                onChange={(e) => setExportSales(e.target.value)}
                placeholder="VAT-exempt exports"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="business-type">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Business (22%)</SelectItem>
                <SelectItem value="food_retail">Food Retail (10%)</SelectItem>
                <SelectItem value="essential_goods">Essential Goods (4%)</SelectItem>
                <SelectItem value="books_newspapers">Books/Newspapers (4%)</SelectItem>
                <SelectItem value="medical">Medical Services (10%)</SelectItem>
                <SelectItem value="tourism">Tourism Services (10%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vat-scheme">VAT Scheme</Label>
            <Select value={vatScheme} onValueChange={setVatScheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal VAT Scheme</SelectItem>
                <SelectItem value="flat_rate">Flat Rate Scheme (≤€65K)</SelectItem>
                <SelectItem value="cash_accounting">Cash Accounting Scheme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purchase-vat">Monthly Purchase VAT (€)</Label>
            <Input
              id="purchase-vat"
              type="number"
              value={purchaseVAT}
              onChange={(e) => setPurchaseVAT(e.target.value)}
              placeholder="VAT on business purchases"
            />
          </div>

          <Button onClick={calculateSalesTax} className="w-full">
            Calculate Sales Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Monthly Sales</p>
                <p className="text-lg font-semibold">€{results.monthlySales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Domestic Sales</p>
                <p className="text-lg font-semibold">€{results.domesticSales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Export Sales</p>
                <p className="text-lg font-semibold text-green-600">€{results.exportSales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">VAT Rate Applied</p>
                <p className="text-lg font-semibold">{results.vatRate}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-3">VAT Calculation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Output VAT (Sales)</span>
                    <span className="font-medium">€{results.outputVAT.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Input VAT (Purchases)</span>
                    <span className="font-medium">-€{results.inputVAT.toFixed(2)}</span>
                  </div>
                  {results.specialSchemeReduction > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">Flat Rate Reduction</span>
                      <span className="font-medium text-green-600">-€{results.specialSchemeReduction.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>VAT Payable</span>
                    <span className="text-red-600">€{results.vatPayable.toFixed(2)}</span>
                  </div>
                  {results.vatRefund > 0 && (
                    <div className="flex justify-between font-semibold">
                      <span>VAT Refund Due</span>
                      <span className="text-green-600">€{results.vatRefund.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Annual Projections</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Annual Sales</span>
                    <span className="font-medium">€{results.annualSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Annual VAT Payable</span>
                    <span className="font-medium">€{results.annualVATPayable.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Effective VAT Rate</span>
                    <span className="font-medium">{results.effectiveVATRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian VAT Filing Requirements:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Monthly VAT Returns:</strong> Due by 16th of following month</li>
                <li>• <strong>Annual VAT Return:</strong> Due by September 30th</li>
                <li>• <strong>Quarterly Payments:</strong> March 16, June 16, September 16, December 16</li>
                <li>• <strong>EU Sales Listing:</strong> Monthly if EU sales exceed €50,000</li>
                <li>• <strong>Flat Rate Scheme:</strong> Available for businesses with turnover ≤€65,000</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalySalesTaxCalculator;
