
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyPayrollTaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [employeeType, setEmployeeType] = useState<string>("employee");
  const [contractType, setContractType] = useState<string>("permanent");
  const [region, setRegion] = useState<string>("standard");
  const [results, setResults] = useState<any>(null);

  const calculatePayrollTax = () => {
    const gross = parseFloat(grossSalary) || 0;
    
    // INPS (Social Security) contributions
    let employeeINPS = 0;
    let employerINPS = 0;
    
    switch (employeeType) {
      case "employee":
        employeeINPS = gross * 0.0919; // 9.19%
        employerINPS = gross * 0.3268; // 32.68%
        break;
      case "manager":
        employeeINPS = gross * 0.0919; // 9.19%
        employerINPS = gross * 0.3268; // 32.68%
        break;
      case "apprentice":
        employeeINPS = gross * 0.055; // 5.5% reduced rate
        employerINPS = gross * 0.115; // 11.5% reduced rate
        break;
    }
    
    // INAIL (Work Insurance) - paid by employer
    const employerINAIL = gross * 0.0035; // ~0.35% average
    
    // Unemployment Insurance (NASPI) - shared
    const employeeNASPI = gross * 0.0068; // 0.68%
    const employerNASPI = gross * 0.014; // 1.4%
    
    // TFR (Severance Fund) - employer contribution
    const employerTFR = gross * 0.0691; // 6.91%
    
    // Regional tax surcharge (varies by region)
    const regionalSurcharge = region === "high_tax" ? gross * 0.003 : 0;
    
    // Total employee deductions
    const totalEmployeeContributions = employeeINPS + employeeNASPI;
    
    // Total employer contributions
    const totalEmployerContributions = employerINPS + employerINAIL + employerNASPI + employerTFR + regionalSurcharge;
    
    // Net salary calculation (before income tax)
    const netBeforeTax = gross - totalEmployeeContributions;
    
    // Total cost to employer
    const totalEmploymentCost = gross + totalEmployerContributions;
    
    // Effective rates
    const employeeContributionRate = gross > 0 ? (totalEmployeeContributions / gross) * 100 : 0;
    const employerContributionRate = gross > 0 ? (totalEmployerContributions / gross) * 100 : 0;

    setResults({
      grossSalary: gross,
      employeeINPS,
      employeeNASPI,
      totalEmployeeContributions,
      employerINPS,
      employerINAIL,
      employerNASPI,
      employerTFR,
      regionalSurcharge,
      totalEmployerContributions,
      netBeforeTax,
      totalEmploymentCost,
      employeeContributionRate,
      employerContributionRate
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Tax Calculator (INPS/INAIL)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gross-salary">Monthly Gross Salary (€)</Label>
            <Input
              id="gross-salary"
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              placeholder="Enter monthly gross salary"
            />
          </div>

          <div>
            <Label htmlFor="employee-type">Employee Type</Label>
            <Select value={employeeType} onValueChange={setEmployeeType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Standard Employee</SelectItem>
                <SelectItem value="manager">Manager/Executive</SelectItem>
                <SelectItem value="apprentice">Apprentice (Reduced rates)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contract-type">Contract Type</Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent Contract</SelectItem>
                <SelectItem value="fixed_term">Fixed-term Contract</SelectItem>
                <SelectItem value="part_time">Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="region">Regional Surcharge</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Rate</SelectItem>
                <SelectItem value="high_tax">High Tax Region (+0.3%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculatePayrollTax} className="w-full">
            Calculate Payroll Taxes
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Payroll Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-3">Employee Contributions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">INPS (Social Security)</span>
                    <span className="font-medium">€{results.employeeINPS.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">NASPI (Unemployment)</span>
                    <span className="font-medium">€{results.employeeNASPI.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Employee</span>
                    <span>€{results.totalEmployeeContributions.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-red-600">
                    ({results.employeeContributionRate.toFixed(1)}% of gross)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Employer Contributions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">INPS (Social Security)</span>
                    <span className="font-medium">€{results.employerINPS.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">INAIL (Work Insurance)</span>
                    <span className="font-medium">€{results.employerINAIL.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">NASPI (Unemployment)</span>
                    <span className="font-medium">€{results.employerNASPI.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">TFR (Severance Fund)</span>
                    <span className="font-medium">€{results.employerTFR.toFixed(2)}</span>
                  </div>
                  {results.regionalSurcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">Regional Surcharge</span>
                      <span className="font-medium">€{results.regionalSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Employer</span>
                    <span>€{results.totalEmployerContributions.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-blue-600">
                    ({results.employerContributionRate.toFixed(1)}% of gross)
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Gross Salary</p>
                <p className="text-xl font-bold">€{results.grossSalary.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Net Before Tax</p>
                <p className="text-xl font-bold text-green-600">€{results.netBeforeTax.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Employment Cost</p>
                <p className="text-xl font-bold text-orange-600">€{results.totalEmploymentCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Payroll Tax Overview:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>INPS:</strong> Social security (pension, disability) - Employee 9.19%, Employer 32.68%</li>
                <li>• <strong>INAIL:</strong> Work accident insurance - Employer ~0.35%</li>
                <li>• <strong>NASPI:</strong> Unemployment insurance - Employee 0.68%, Employer 1.4%</li>
                <li>• <strong>TFR:</strong> Severance fund - Employer 6.91%</li>
                <li>• <strong>Note:</strong> This calculation excludes income tax (IRPEF)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyPayrollTaxCalculator;
