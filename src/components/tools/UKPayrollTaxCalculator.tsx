
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const UKPayrollTaxCalculator = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Payroll Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate employer and employee National Insurance contributions and PAYE deductions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UK Payroll Tax Calculator</CardTitle>
          <CardDescription>
            Coming soon - Comprehensive payroll tax calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-gray-600">
              This calculator will include employer and employee National Insurance contributions, PAYE calculations, and statutory deductions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKPayrollTaxCalculator;
