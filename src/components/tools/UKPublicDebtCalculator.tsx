
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

const UKPublicDebtCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <TrendingDown className="w-10 h-10 text-blue-600" />
          UK Public Debt Calculator
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>UK Public Debt Calculator</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Track UK national debt, debt-to-GDP ratio, and government borrowing requirements.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKPublicDebtCalculator;
