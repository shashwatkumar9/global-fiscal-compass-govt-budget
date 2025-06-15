
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKSalesTaxCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Sales Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK sales tax implications including VAT registration thresholds and compliance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UK Sales Tax Calculator</CardTitle>
          <CardDescription>
            Coming soon - Sales tax and VAT compliance calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This tool will provide comprehensive sales tax calculations including VAT registration requirements and compliance guidance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKSalesTaxCalculator;
