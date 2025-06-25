
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainPayrollTaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState("");
  const [payPeriod, setPayPeriod] = useState("monthly");
  const [contractType, setContractType] = useState("indefinite");
  const [age, setAge] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculatePayrollTax = () => {
    let monthlySalary = parseFloat(grossSalary) || 0;
    
    // Convert to monthly if needed
    if (payPeriod === "annual") {
      monthlySalary = monthlySalary / 12;
    }

    const annualSalary = monthlySalary * 12;
    const employeeAge = parseInt(age) || 30;

    // Social Security contributions (2024 rates)
    const socialSecurityRates = {
      commonContingencies: 0.047, // 4.7%
      unemployment: contractType === "indefinite" ? 0.0155 : 0.016, // 1.55% or 1.6%
      professionalTraining: 0.001, // 0.1%
      overtime: 0.0235 // 2.35% (on overtime hours)
    };

    // Maximum contribution bases (2024)
    const maxContributionBase = 4495.50; // monthly
    const contributionBase = Math.min(monthlySalary, maxContributionBase);

    // Employee social security contributions
    const commonContingencies = contributionBase * socialSecurityRates.commonContingencies;
    const unemployment = contributionBase * socialSecurityRates.unemployment;
    const professionalTraining = contributionBase * socialSecurityRates.professionalTraining;
    const totalSocialSecurity = commonContingencies + unemployment + professionalTraining;

    // Income tax (IRPF) - simplified calculation
    let irpfRate = 0;
    if (annualSalary <= 12450) {
      irpfRate = 0.19;
    } else if (annualSalary <= 20200) {
      irpfRate = 0.24;
    } else if (annualSalary <= 35200) {
      irpfRate = 0.30;
    } else if (annualSalary <= 60000) {
      irpfRate = 0.37;
    } else {
      irpfRate = 0.45;
    }

    const monthlyIRPF = (monthlySalary - totalSocialSecurity) * (irpfRate * 0.15); // Simplified withholding
    
    // Net salary calculation
    const totalDeductions = totalSocialSecurity + monthlyIRPF;
    const netSalary = monthlySalary - totalDeductions;

    // Employer contributions (for reference)
    const employerSocialSecurity = contributionBase * 0.296; // 29.6% approximately

    setResults({
      grossSalary: monthlySalary,
      annualSalary,
      commonContingencies,
      unemployment,
      professionalTraining,
      totalSocialSecurity,
      monthlyIRPF,
      totalDeductions,
      netSalary,
      employerSocialSecurity,
      takeHomePercentage: (netSalary / monthlySalary) * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Payroll Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gross-salary">Gross Salary (€)</Label>
              <Input
                id="gross-salary"
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="3000"
              />
            </div>

            <div>
              <Label htmlFor="pay-period">Pay Period</Label>
              <Select value={payPeriod} onValueChange={setPayPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
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
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Employee Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="30"
              />
            </div>
          </div>

          <Button onClick={calculatePayrollTax} className="w-full">
            Calculate Payroll Taxes
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Payroll Tax Results (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Employee Deductions</h4>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Salary:</span>
                  <span className="font-semibold">€{results.grossSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Common Contingencies:</span>
                  <span className="font-semibold text-red-600">€{results.commonContingencies.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unemployment:</span>
                  <span className="font-semibold text-red-600">€{results.unemployment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Professional Training:</span>
                  <span className="font-semibold text-red-600">€{results.professionalTraining.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Social Security:</span>
                  <span className="font-semibold text-red-600">€{results.totalSocialSecurity.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Tax Withholding</h4>
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Tax (IRPF):</span>
                  <span className="font-semibold text-red-600">€{results.monthlyIRPF.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Deductions:</span>
                  <span className="font-semibold text-red-600">€{results.totalDeductions.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Salary:</span>
                  <span className="font-semibold text-green-600">€{results.netSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Take-Home %:</span>
                  <span className="font-semibold">{results.takeHomePercentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Additional Information</h4>
              <p className="text-sm">
                Annual Gross: €{results.annualSalary.toFixed(2)} | 
                Employer SS Contributions: €{results.employerSocialSecurity.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainPayrollTaxCalculator;
