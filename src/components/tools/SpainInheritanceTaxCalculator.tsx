
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainInheritanceTaxCalculator = () => {
  const [inheritanceValue, setInheritanceValue] = useState("");
  const [relationship, setRelationship] = useState("child");
  const [region, setRegion] = useState("madrid");
  const [beneficiaryAge, setBeneficiaryAge] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateInheritanceTax = () => {
    const estateValue = parseFloat(inheritanceValue) || 0;
    const age = parseInt(beneficiaryAge) || 30;
    
    // Exemptions by relationship (state level)
    const exemptions = {
      child: age < 21 ? 47858 + (3990 * (21 - age)) : 15956,
      spouse: 15956,
      grandchild: 7993,
      sibling: 7993,
      other: 0
    };

    const exemption = exemptions[relationship as keyof typeof exemptions] || 0;
    const taxableAmount = Math.max(0, estateValue - exemption);

    // State inheritance tax brackets (simplified)
    let stateTax = 0;
    let remainingAmount = taxableAmount;

    const brackets = [
      { min: 0, max: 7993, rate: 0.075 },
      { min: 7993, max: 31927, rate: 0.09 },
      { min: 31927, max: 79881, rate: 0.11 },
      { min: 79881, max: 239763, rate: 0.15 },
      { min: 239763, max: 399610, rate: 0.21 },
      { min: 399610, max: Infinity, rate: 0.25 }
    ];

    for (const bracket of brackets) {
      if (remainingAmount <= 0) break;
      
      const taxableAtBracket = Math.min(remainingAmount, bracket.max - bracket.min);
      stateTax += taxableAtBracket * bracket.rate;
      remainingAmount -= taxableAtBracket;
    }

    // Regional multipliers/reductions (simplified)
    const regionalMultipliers = {
      madrid: 0.01, // 99% reduction
      catalonia: 1.0, // No reduction
      andalusia: 1.0,
      valencia: 0.75,
      basque: 0.05 // 95% reduction
    };

    const regionalMultiplier = regionalMultipliers[region as keyof typeof regionalMultipliers] || 1.0;
    const finalTax = stateTax * regionalMultiplier;
    const effectiveRate = estateValue > 0 ? (finalTax / estateValue) * 100 : 0;
    const netInheritance = estateValue - finalTax;

    setResults({
      estateValue,
      exemption,
      taxableAmount,
      stateTax,
      regionalMultiplier,
      finalTax,
      netInheritance,
      effectiveRate
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Inheritance Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inheritance-value">Inheritance Value (€)</Label>
              <Input
                id="inheritance-value"
                type="number"
                value={inheritanceValue}
                onChange={(e) => setInheritanceValue(e.target.value)}
                placeholder="500000"
              />
            </div>

            <div>
              <Label htmlFor="relationship">Relationship to Deceased</Label>
              <Select value={relationship} onValueChange={setRelationship}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="grandchild">Grandchild</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other Relative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region">Autonomous Community</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="catalonia">Catalonia</SelectItem>
                  <SelectItem value="andalusia">Andalusia</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="basque">Basque Country</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="beneficiary-age">Beneficiary Age</Label>
              <Input
                id="beneficiary-age"
                type="number"
                value={beneficiaryAge}
                onChange={(e) => setBeneficiaryAge(e.target.value)}
                placeholder="30"
              />
            </div>
          </div>

          <Button onClick={calculateInheritanceTax} className="w-full">
            Calculate Inheritance Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Inheritance Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estate Value:</span>
                  <span className="font-semibold">€{results.estateValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exemption:</span>
                  <span className="font-semibold text-green-600">€{results.exemption.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Amount:</span>
                  <span className="font-semibold">€{results.taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">State Tax (Before Region):</span>
                  <span className="font-semibold">€{results.stateTax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Regional Multiplier:</span>
                  <span className="font-semibold">{(results.regionalMultiplier * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Final Tax Owed:</span>
                  <span className="font-semibold text-red-600">€{results.finalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Inheritance:</span>
                  <span className="font-semibold text-green-600">€{results.netInheritance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Rate:</span>
                  <span className="font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainInheritanceTaxCalculator;
