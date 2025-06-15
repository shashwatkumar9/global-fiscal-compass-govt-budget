
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UKPayrollTaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [payFrequency, setPayFrequency] = useState<string>("monthly");
  const [pensionContribution, setPensionContribution] = useState<string>("");
  const [studentLoan, setStudentLoan] = useState<string>("none");
  const [results, setResults] = useState<any>(null);

  // UK tax rates and thresholds for 2024/25
  const PERSONAL_ALLOWANCE = 12570;
  const BASIC_RATE_THRESHOLD = 50270;
  const HIGHER_RATE_THRESHOLD = 125140;
  
  const NI_LOWER_THRESHOLD = 12570;
  const NI_UPPER_THRESHOLD = 50270;
  const NI_EMPLOYEE_RATE_BASIC = 0.12;
  const NI_EMPLOYEE_RATE_HIGHER = 0.02;
  const NI_EMPLOYER_RATE = 0.138;

  const calculateTax = () => {
    const grossAnnual = parseFloat(grossSalary) || 0;
    const pensionAnnual = parseFloat(pensionContribution) || 0;
    
    // Calculate taxable income after pension
    const taxableIncome = Math.max(0, grossAnnual - pensionAnnual);
    
    // Calculate Income Tax
    let incomeTax = 0;
    if (taxableIncome > PERSONAL_ALLOWANCE) {
      const taxableAfterAllowance = taxableIncome - PERSONAL_ALLOWANCE;
      
      if (taxableAfterAllowance <= (BASIC_RATE_THRESHOLD - PERSONAL_ALLOWANCE)) {
        incomeTax = taxableAfterAllowance * 0.2; // 20% basic rate
      } else if (taxableAfterAllowance <= (HIGHER_RATE_THRESHOLD - PERSONAL_ALLOWANCE)) {
        incomeTax = (BASIC_RATE_THRESHOLD - PERSONAL_ALLOWANCE) * 0.2;
        incomeTax += (taxableAfterAllowance - (BASIC_RATE_THRESHOLD - PERSONAL_ALLOWANCE)) * 0.4; // 40% higher rate
      } else {
        incomeTax = (BASIC_RATE_THRESHOLD - PERSONAL_ALLOWANCE) * 0.2;
        incomeTax += (HIGHER_RATE_THRESHOLD - BASIC_RATE_THRESHOLD) * 0.4;
        incomeTax += (taxableAfterAllowance - (HIGHER_RATE_THRESHOLD - PERSONAL_ALLOWANCE)) * 0.45; // 45% additional rate
      }
    }
    
    // Calculate Employee National Insurance
    let employeeNI = 0;
    if (grossAnnual > NI_LOWER_THRESHOLD) {
      const niableIncome = grossAnnual - NI_LOWER_THRESHOLD;
      
      if (grossAnnual <= NI_UPPER_THRESHOLD) {
        employeeNI = niableIncome * NI_EMPLOYEE_RATE_BASIC;
      } else {
        employeeNI = (NI_UPPER_THRESHOLD - NI_LOWER_THRESHOLD) * NI_EMPLOYEE_RATE_BASIC;
        employeeNI += (grossAnnual - NI_UPPER_THRESHOLD) * NI_EMPLOYEE_RATE_HIGHER;
      }
    }
    
    // Calculate Employer National Insurance
    let employerNI = 0;
    if (grossAnnual > NI_LOWER_THRESHOLD) {
      employerNI = (grossAnnual - NI_LOWER_THRESHOLD) * NI_EMPLOYER_RATE;
    }
    
    // Student Loan calculations (simplified)
    let studentLoanDeduction = 0;
    if (studentLoan === "plan1" && grossAnnual > 22015) {
      studentLoanDeduction = (grossAnnual - 22015) * 0.09;
    } else if (studentLoan === "plan2" && grossAnnual > 27295) {
      studentLoanDeduction = (grossAnnual - 27295) * 0.09;
    }
    
    const totalDeductions = incomeTax + employeeNI + pensionAnnual + studentLoanDeduction;
    const netAnnual = grossAnnual - totalDeductions;
    const totalEmployerCost = grossAnnual + employerNI;
    
    // Calculate based on pay frequency
    const multiplier = payFrequency === "weekly" ? 52 : payFrequency === "monthly" ? 12 : 1;
    
    setResults({
      grossAnnual,
      grossPeriod: grossAnnual / multiplier,
      incomeTax,
      employeeNI,
      employerNI,
      pensionAnnual,
      studentLoanDeduction,
      totalDeductions,
      netAnnual,
      netPeriod: netAnnual / multiplier,
      totalEmployerCost,
      effectiveRate: (totalDeductions / grossAnnual) * 100,
      payFrequency
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Payroll Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate employer and employee National Insurance contributions and PAYE deductions for 2024/25.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Details</CardTitle>
            <CardDescription>
              Enter salary and deduction information for UK payroll calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="grossSalary">Annual Gross Salary (£)</Label>
              <Input
                id="grossSalary"
                type="number"
                placeholder="30000"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payFrequency">Pay Frequency</Label>
              <select
                id="payFrequency"
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pensionContribution">Annual Pension Contribution (£)</Label>
              <Input
                id="pensionContribution"
                type="number"
                placeholder="2000"
                value={pensionContribution}
                onChange={(e) => setPensionContribution(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentLoan">Student Loan Plan</Label>
              <select
                id="studentLoan"
                value={studentLoan}
                onChange={(e) => setStudentLoan(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="none">No Student Loan</option>
                <option value="plan1">Plan 1 (Pre-2012)</option>
                <option value="plan2">Plan 2 (Post-2012)</option>
              </select>
            </div>

            <Button onClick={calculateTax} className="w-full">
              Calculate Payroll Tax
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Calculation Results</CardTitle>
            <CardDescription>
              UK payroll tax breakdown for {payFrequency} payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Gross ({payFrequency}):</p>
                    <p className="text-lg">{formatCurrency(results.grossPeriod)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Net ({payFrequency}):</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(results.netPeriod)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Annual Deductions:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Income Tax:</span>
                      <span>{formatCurrency(results.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Employee National Insurance:</span>
                      <span>{formatCurrency(results.employeeNI)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pension Contribution:</span>
                      <span>{formatCurrency(results.pensionAnnual)}</span>
                    </div>
                    {results.studentLoanDeduction > 0 && (
                      <div className="flex justify-between">
                        <span>Student Loan:</span>
                        <span>{formatCurrency(results.studentLoanDeduction)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Employer NI Contribution:</span>
                    <span className="text-lg text-orange-600">{formatCurrency(results.employerNI)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Employer Cost:</span>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(results.totalEmployerCost)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Effective Tax Rate:</span>
                    <span className="text-xl font-bold">{results.effectiveRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter salary details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>2024/25 UK Payroll Rates:</strong> Personal Allowance: £12,570 | 
          Basic Rate: 20% | Higher Rate: 40% | Employee NI: 12%/2% | Employer NI: 13.8% | 
          This calculator provides estimates based on current rates. 
          Consult HMRC guidance for complex situations or statutory payments.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UKPayrollTaxCalculator;
