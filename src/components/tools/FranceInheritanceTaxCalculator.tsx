
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, TrendingUp } from "lucide-react";

interface InheritanceData {
  inheritanceValue: number;
  relationship: string;
  previousGifts: number;
  isResident: boolean;
}

interface TaxResult {
  taxableAmount: number;
  allowance: number;
  taxDue: number;
  effectiveRate: number;
  breakdown: Array<{
    bracket: string;
    rate: number;
    amount: number;
    tax: number;
  }>;
}

const FranceInheritanceTaxCalculator = () => {
  const [data, setData] = useState<InheritanceData>({
    inheritanceValue: 0,
    relationship: "",
    previousGifts: 0,
    isResident: true
  });

  const [result, setResult] = useState<TaxResult | null>(null);

  const relationships = [
    { value: "child", label: "Child", allowance: 100000 },
    { value: "spouse", label: "Spouse/Civil Partner", allowance: 80724 },
    { value: "grandchild", label: "Grandchild", allowance: 31865 },
    { value: "parent", label: "Parent", allowance: 100000 },
    { value: "sibling", label: "Sibling", allowance: 15932 },
    { value: "nephew_niece", label: "Nephew/Niece", allowance: 7967 },
    { value: "other", label: "Other", allowance: 1594 }
  ];

  const getTaxBrackets = (relationship: string) => {
    if (relationship === "spouse") {
      return []; // Spouse is exempt
    }
    
    if (["child", "parent"].includes(relationship)) {
      return [
        { min: 0, max: 8072, rate: 5 },
        { min: 8072, max: 12109, rate: 10 },
        { min: 12109, max: 15932, rate: 15 },
        { min: 15932, max: 552324, rate: 20 },
        { min: 552324, max: 902838, rate: 30 },
        { min: 902838, max: 1805677, rate: 40 },
        { min: 1805677, max: Infinity, rate: 45 }
      ];
    }
    
    if (relationship === "grandchild") {
      return [
        { min: 0, max: 8072, rate: 5 },
        { min: 8072, max: 15932, rate: 10 },
        { min: 15932, max: 31865, rate: 15 },
        { min: 31865, max: 552324, rate: 20 },
        { min: 552324, max: 902838, rate: 30 },
        { min: 902838, max: 1805677, rate: 40 },
        { min: 1805677, max: Infinity, rate: 45 }
      ];
    }
    
    if (relationship === "sibling") {
      return [
        { min: 0, max: 24430, rate: 35 },
        { min: 24430, max: Infinity, rate: 45 }
      ];
    }
    
    // Nephew/niece and others
    return [
      { min: 0, max: Infinity, rate: 55 }
    ];
  };

  const calculateTax = () => {
    if (!data.relationship || data.inheritanceValue <= 0) return;

    const relationshipData = relationships.find(r => r.value === data.relationship);
    if (!relationshipData) return;

    const allowance = relationshipData.allowance;
    const totalValue = data.inheritanceValue + data.previousGifts;
    const taxableAmount = Math.max(0, totalValue - allowance);

    if (data.relationship === "spouse" || taxableAmount === 0) {
      setResult({
        taxableAmount: 0,
        allowance,
        taxDue: 0,
        effectiveRate: 0,
        breakdown: []
      });
      return;
    }

    const brackets = getTaxBrackets(data.relationship);
    const breakdown: Array<{bracket: string; rate: number; amount: number; tax: number}> = [];
    let totalTax = 0;
    let remainingAmount = taxableAmount;

    for (const bracket of brackets) {
      if (remainingAmount <= 0) break;
      
      const bracketAmount = Math.min(remainingAmount, bracket.max - bracket.min);
      const bracketTax = (bracketAmount * bracket.rate) / 100;
      
      breakdown.push({
        bracket: bracket.max === Infinity ? `Over €${bracket.min.toLocaleString()}` : `€${bracket.min.toLocaleString()} - €${bracket.max.toLocaleString()}`,
        rate: bracket.rate,
        amount: bracketAmount,
        tax: bracketTax
      });
      
      totalTax += bracketTax;
      remainingAmount -= bracketAmount;
    }

    const effectiveRate = totalTax > 0 ? (totalTax / data.inheritanceValue) * 100 : 0;

    setResult({
      taxableAmount,
      allowance,
      taxDue: totalTax,
      effectiveRate,
      breakdown
    });
  };

  const resetForm = () => {
    setData({
      inheritanceValue: 0,
      relationship: "",
      previousGifts: 0,
      isResident: true
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            France Inheritance Tax Calculator
          </CardTitle>
          <CardDescription>
            Calculate French inheritance tax (droits de succession) with 2025 rates and allowances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inheritanceValue">Inheritance Value (€)</Label>
              <Input
                id="inheritanceValue"
                type="number"
                value={data.inheritanceValue || ""}
                onChange={(e) => setData({...data, inheritanceValue: Number(e.target.value)})}
                placeholder="Enter inheritance value"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship to Deceased</Label>
              <Select onValueChange={(value) => setData({...data, relationship: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map((rel) => (
                    <SelectItem key={rel.value} value={rel.value}>
                      {rel.label} (€{rel.allowance.toLocaleString()} allowance)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousGifts">Previous Gifts from Deceased (€)</Label>
              <Input
                id="previousGifts"
                type="number"
                value={data.previousGifts || ""}
                onChange={(e) => setData({...data, previousGifts: Number(e.target.value)})}
                placeholder="Enter previous gifts"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="residency">Tax Residency</Label>
              <Select onValueChange={(value) => setData({...data, isResident: value === "resident"})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select residency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">French Resident</SelectItem>
                  <SelectItem value="non-resident">Non-Resident</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateTax} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Tax
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Inheritance Tax Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-600">Total Inheritance</div>
                <div className="text-2xl font-bold text-blue-900">€{data.inheritanceValue.toLocaleString()}</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-600">Tax Allowance</div>
                <div className="text-2xl font-bold text-green-900">€{result.allowance.toLocaleString()}</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-orange-600">Taxable Amount</div>
                <div className="text-2xl font-bold text-orange-900">€{result.taxableAmount.toLocaleString()}</div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-red-600">Tax Due</div>
                <div className="text-2xl font-bold text-red-900">€{result.taxDue.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Tax Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Tax Rate:</span>
                    <Badge variant="secondary">{result.effectiveRate.toFixed(2)}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Inheritance:</span>
                    <span className="font-semibold">€{(data.inheritanceValue - result.taxDue).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {result.breakdown.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tax Calculation Breakdown</h3>
                  <div className="space-y-2">
                    {result.breakdown.map((bracket, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="text-sm">
                          <div className="font-medium">{bracket.bracket}</div>
                          <div className="text-gray-600">{bracket.rate}% on €{bracket.amount.toLocaleString()}</div>
                        </div>
                        <div className="text-sm font-semibold">€{bracket.tax.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Note:</strong> This calculator provides estimates based on 2025 French inheritance tax rates.</p>
              <p>Actual tax may vary based on specific circumstances. Consult a tax professional for official advice.</p>
              <p>Gift tax allowances reset every 15 years for most relationships.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FranceInheritanceTaxCalculator;
