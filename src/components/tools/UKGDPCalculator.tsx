
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const UKGDPCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-blue-600" />
          UK GDP Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate UK GDP components, growth rates, and economic indicators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UK GDP Calculator</CardTitle>
          <CardDescription>
            Coming soon - UK GDP calculations and economic analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This tool will provide comprehensive UK GDP calculations including components analysis and growth projections.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKGDPCalculator;
