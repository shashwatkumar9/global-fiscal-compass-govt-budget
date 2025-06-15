
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKMunicipalTaxCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Municipal Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK local authority charges including Council Tax and business rates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UK Municipal Tax Calculator</CardTitle>
          <CardDescription>
            Coming soon - Council Tax and business rates calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This tool will calculate Council Tax across all bands and business rates for commercial properties.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKMunicipalTaxCalculator;
