
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKImportTaxCalculator = () => {
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

      <Card>
        <CardHeader>
          <CardTitle>UK Import Tax Calculator</CardTitle>
          <CardDescription>
            Coming soon - Import duties and customs calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This calculator will include post-Brexit import duties, VAT on imports, and customs charge calculations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKImportTaxCalculator;
