
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKDeficitCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Deficit Calculator
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>UK Deficit Calculator</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Calculate UK government deficit, surplus, and fiscal balance projections.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKDeficitCalculator;
