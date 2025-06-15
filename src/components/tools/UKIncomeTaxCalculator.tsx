
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText, Info, AlertCircle } from "lucide-react";

const UKIncomeTaxCalculator = () => {
  const [grossIncome, setGrossIncome] = useState<number>(50000);
  const [taxCode, setTaxCode] = useState<string>("1257L");
  const [pensionContribution, setPensionContribution] = useState<number>(0);
  const [studentLoan, setStudentLoan] = useState<string>("none");
  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    // UK Income Tax Bands 2024/25
    const personalAllowance = 12570;
    const basicRateThreshold = 50270;
    const higherRateThreshold = 125140;
    
    const basicRate = 0.20;
    const higherRate = 0.40;
    const additionalRate = 0.45;
    
    // National Insurance rates
    const niThresholdWeekly = 242;
    const niThresholdAnnual = niThresholdWeekly * 52;
    const niUpperThresholdAnnual = 50270;
    const niRate1 = 0.12;
    const niRate2 = 0.02;

    let taxableIncome = Math.max(0, grossIncome - personalAllowance - pensionContribution);
    let incomeTax = 0;
    let nationalInsurance = 0;

    // Calculate Income Tax
    if (taxableIncome <= (basicRateThreshold - personalAllowance)) {
      incomeTax = taxableIncome * basicRate;
    } else if (taxableIncome <= (higherRateThreshold - personalAllowance)) {
      incomeTax = (basicRateThreshold - personalAllowance) * basicRate + 
                  (taxableIncome - (basicRateThreshold - personalAllowance)) * higherRate;
    } else {
      incomeTax = (basicRateThreshold - personalAllowance) * basicRate + 
                  (higherRateThreshold - basicRateThreshold) * higherRate +
                  (taxableIncome - (higherRateThreshold - personalAllowance)) * additionalRate;
    }

    // Calculate National Insurance
    const niableIncome = Math.max(0, grossIncome - pensionContribution);
    if (niableIncome > niThresholdAnnual) {
      if (niableIncome <= niUpperThresholdAnnual) {
        nationalInsurance = (niableIncome - niThresholdAnnual) * niRate1;
      } else {
        nationalInsurance = (niUpperThresholdAnnual - niThresholdAnnual) * niRate1 + 
                           (niableIncome - niUpperThresholdAnnual) * niRate2;
      }
    }

    const totalDeductions = incomeTax + nationalInsurance + pensionContribution;
    const netIncome = grossIncome - totalDeductions;
    const effectiveRate = grossIncome > 0 ? (totalDeductions / grossIncome) * 100 : 0;

    setResults({
      grossIncome,
      taxableIncome,
      incomeTax,
      nationalInsurance,
      pensionContribution,
      totalDeductions,
      netIncome,
      effectiveRate,
      monthlyNet: netIncome / 12
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          UK Income Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your UK income tax, National Insurance contributions, and take-home pay based on current HMRC rates and tax bands for 2024/25.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Income Details
            </CardTitle>
            <CardDescription>
              Enter your income and deduction information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="grossIncome">Annual Gross Income (£)</Label>
              <Input
                id="grossIncome"
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                placeholder="50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxCode">Tax Code</Label>
              <Input
                id="taxCode"
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                placeholder="1257L"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pensionContribution">Annual Pension Contribution (£)</Label>
              <Input
                id="pensionContribution"
                type="number"
                value={pensionContribution}
                onChange={(e) => setPensionContribution(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentLoan">Student Loan Type</Label>
              <Select value={studentLoan} onValueChange={setStudentLoan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Student Loan</SelectItem>
                  <SelectItem value="plan1">Plan 1 (Before Sept 2012)</SelectItem>
                  <SelectItem value="plan2">Plan 2 (Sept 2012 onwards)</SelectItem>
                  <SelectItem value="postgrad">Postgraduate Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateTax} className="w-full" size="lg">
              Calculate UK Income Tax
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Tax Calculation Results
              </CardTitle>
              <CardDescription>
                Your UK tax breakdown for 2024/25
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Gross Income</p>
                  <p className="font-semibold">£{results.grossIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taxable Income</p>
                  <p className="font-semibold">£{results.taxableIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Income Tax</p>
                  <p className="font-semibold text-red-600">£{results.incomeTax.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">National Insurance</p>
                  <p className="font-semibold text-red-600">£{results.nationalInsurance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Pension Contribution</p>
                  <p className="font-semibold text-blue-600">£{results.pensionContribution.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Deductions</p>
                  <p className="font-semibold text-red-600">£{results.totalDeductions.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Net Annual Income:</span>
                  <span className="text-2xl font-bold text-green-600">
                    £{results.netIncome.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Take-Home:</span>
                  <span className="text-lg font-semibold text-green-600">
                    £{results.monthlyNet.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Effective Tax Rate:</span>
                  <span className="text-lg font-semibold text-orange-600">
                    {results.effectiveRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-blue-600" />
              Tax Bands 2024/25
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Personal Allowance:</span>
              <span>£0 - £12,570 (0%)</span>
            </div>
            <div className="flex justify-between">
              <span>Basic Rate:</span>
              <span>£12,571 - £50,270 (20%)</span>
            </div>
            <div className="flex justify-between">
              <span>Higher Rate:</span>
              <span>£50,271 - £125,140 (40%)</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Rate:</span>
              <span>Over £125,140 (45%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-green-600" />
              National Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Lower Threshold:</span>
              <span>£12,570 (0%)</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Rate:</span>
              <span>£12,571 - £50,270 (12%)</span>
            </div>
            <div className="flex justify-between">
              <span>Reduced Rate:</span>
              <span>Over £50,270 (2%)</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Rates apply to employees under state pension age
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Calculations based on 2024/25 tax year rates</p>
            <p>• Student loan repayments not included in basic calculation</p>
            <p>• Pension contributions reduce both income tax and NI</p>
            <p>• High earners may face additional restrictions</p>
            <p className="text-xs text-gray-500 mt-2">
              For official guidance, visit gov.uk
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKIncomeTaxCalculator;
