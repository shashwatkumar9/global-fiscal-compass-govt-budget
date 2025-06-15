
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKFiscalImpactTool = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Fiscal Impact Tool
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>UK Fiscal Impact Tool</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Assess fiscal impact of UK policy changes on government finances and economy.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKFiscalImpactTool;
