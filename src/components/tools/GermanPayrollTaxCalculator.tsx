
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Users, Briefcase, FileText, AlertTriangle } from 'lucide-react';

interface PayrollTaxCalculation {
  grossSalary: number;
  incomeTax: number;
  solidaritySurcharge: number;
  churchTax: number;
  employeeInsurance: number;
  employerInsurance: number;
  totalEmployeeCosts: number;
  totalEmployerCosts: number;
  netSalary: number;
}

const GermanPayrollTaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<number>(60000);
  const [taxClass, setTaxClass] = useState<string>('1');
  const [federalState, setFederalState] = useState<string>('berlin');
  const [churchMember, setChurchMember] = useState<string>('no');
  const [age, setAge] = useState<number>(35);
  const [hasChildren, setHasChildren] = useState<string>('no');
  const [healthInsurance, setHealthInsurance] = useState<string>('public');
  const [year, setYear] = useState<string>('2025');
  const [calculation, setCalculation] = useState<PayrollTaxCalculation | null>(null);

  const calculatePayrollTax = () => {
    const monthlyGross = grossSalary / 12;
    
    // Simplified income tax calculation (progressive rates)
    let incomeTax = 0;
    if (grossSalary > 66760) {
      incomeTax = grossSalary * 0.42; // Simplified top rate
    } else if (grossSalary > 11604) {
      incomeTax = grossSalary * 0.25; // Simplified average rate
    }

    // Apply tax class adjustments (simplified)
    const taxClassMultiplier = taxClass === '3' ? 0.6 : taxClass === '5' ? 1.4 : 1.0;
    incomeTax *= taxClassMultiplier;

    // Solidarity surcharge (5.5% of income tax, with exemption threshold)
    const solidaritySurcharge = incomeTax > 17543 ? incomeTax * 0.055 : 0;

    // Church tax (8-9% of income tax)
    const churchTaxRate = federalState === 'bavaria' || federalState === 'baden_wuerttemberg' ? 0.09 : 0.08;
    const churchTax = churchMember === 'yes' ? incomeTax * churchTaxRate : 0;

    // Social insurance contributions (2025 rates)
    const pensionRate = 0.093; // 18.6% split between employee/employer
    const unemploymentRate = 0.013; // 2.6% split
    const healthRate = healthInsurance === 'public' ? 0.073 : 0; // 14.6% split
    const careRate = age >= 23 && hasChildren === 'no' ? 0.02 : 0.01775; // Long-term care

    const employeePension = grossSalary * pensionRate;
    const employeeUnemployment = grossSalary * unemploymentRate;
    const employeeHealth = grossSalary * healthRate;
    const employeeCare = grossSalary * careRate;
    
    const employeeInsurance = employeePension + employeeUnemployment + employeeHealth + employeeCare;
    const employerInsurance = employeeInsurance; // Roughly equal split

    const totalEmployeeCosts = incomeTax + solidaritySurcharge + churchTax + employeeInsurance;
    const totalEmployerCosts = grossSalary + employerInsurance;
    const netSalary = grossSalary - totalEmployeeCosts;

    setCalculation({
      grossSalary,
      incomeTax,
      solidaritySurcharge,
      churchTax,
      employeeInsurance,
      employerInsurance,
      totalEmployeeCosts,
      totalEmployerCosts,
      netSalary
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">German Payroll Tax Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional German payroll tax calculator for employers and employees with income tax, social insurance, and total employment costs
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Income Tax</Badge>
          <Badge variant="secondary">Social Insurance</Badge>
          <Badge variant="secondary">Employer Costs</Badge>
          <Badge variant="secondary">All Tax Classes</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Employee Information
              </CardTitle>
              <CardDescription>Enter employee details for payroll tax calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossSalary">Annual Gross Salary (€)</Label>
                  <Input
                    id="grossSalary"
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    placeholder="60000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Employee Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="35"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxClass">Tax Class (Steuerklasse)</Label>
                  <Select value={taxClass} onValueChange={setTaxClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Class I (Single)</SelectItem>
                      <SelectItem value="2">Class II (Single parent)</SelectItem>
                      <SelectItem value="3">Class III (Married, higher income)</SelectItem>
                      <SelectItem value="4">Class IV (Married, equal income)</SelectItem>
                      <SelectItem value="5">Class V (Married, lower income)</SelectItem>
                      <SelectItem value="6">Class VI (Second job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="federalState">Federal State</Label>
                  <Select value={federalState} onValueChange={setFederalState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="bavaria">Bavaria</SelectItem>
                      <SelectItem value="baden_wuerttemberg">Baden-Württemberg</SelectItem>
                      <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
                      <SelectItem value="hesse">Hesse</SelectItem>
                      <SelectItem value="lower_saxony">Lower Saxony</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchMember">Church Tax Member</Label>
                  <Select value={churchMember} onValueChange={setChurchMember}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hasChildren">Has Children</Label>
                  <Select value={hasChildren} onValueChange={setHasChildren}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Health Insurance</Label>
                  <Select value={healthInsurance} onValueChange={setHealthInsurance}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (GKV)</SelectItem>
                      <SelectItem value="private">Private (PKV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculatePayrollTax} className="w-full" size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Payroll Tax
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {calculation && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Employee Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gross Salary:</span>
                      <span className="font-medium">€{calculation.grossSalary.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income Tax:</span>
                      <span className="font-medium">€{calculation.incomeTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Solidarity Surcharge:</span>
                      <span className="font-medium">€{calculation.solidaritySurcharge.toLocaleString()}</span>
                    </div>
                    {calculation.churchTax > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Church Tax:</span>
                        <span className="font-medium">€{calculation.churchTax.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Social Insurance:</span>
                      <span className="font-medium">€{calculation.employeeInsurance.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Net Salary:</span>
                      <span className="text-green-600">€{calculation.netSalary.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    Employer Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gross Salary:</span>
                      <span className="font-medium">€{calculation.grossSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Employer Insurance:</span>
                      <span className="font-medium">€{calculation.employerInsurance.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Employer Cost:</span>
                      <span className="text-red-600">€{calculation.totalEmployerCosts.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                2025 Tax Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Pension:</strong> 18.6% (split equally)</li>
                <li>• <strong>Health:</strong> 14.6% + surcharge</li>
                <li>• <strong>Unemployment:</strong> 2.6% (split equally)</li>
                <li>• <strong>Long-term care:</strong> 3.05%/3.4%</li>
                <li>• <strong>Income tax:</strong> Progressive 14%-45%</li>
                <li>• <strong>Solidarity:</strong> 5.5% of income tax</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This calculator provides estimates. Actual payroll calculations may vary based on specific circumstances and insurance providers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GermanPayrollTaxCalculator;
