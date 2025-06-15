
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKInheritanceTaxCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Inheritance Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK Inheritance Tax with nil-rate bands, residence nil-rate bands, and reliefs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UK Inheritance Tax Calculator</CardTitle>
          <CardDescription>
            Coming soon - Advanced UK inheritance tax calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This calculator is under development and will include comprehensive UK inheritance tax calculations including nil-rate bands, residence nil-rate bands, and various reliefs and exemptions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKInheritanceTaxCalculator;
