
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKBudgetComparison = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Budget Comparison
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>UK Budget Comparison</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Compare UK budget proposals, historical spending, and cross-departmental analysis.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKBudgetComparison;
