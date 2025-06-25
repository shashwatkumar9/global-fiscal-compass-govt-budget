
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyInheritanceTaxCalculator = () => {
  const [estateValue, setEstateValue] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("spouse");
  const [numberOfHeirs, setNumberOfHeirs] = useState<string>("1");
  const [isDisabled, setIsDisabled] = useState<string>("no");
  const [results, setResults] = useState<any>(null);

  const calculateInheritanceTax = () => {
    const estate = parseFloat(estateValue) || 0;
    const heirs = parseInt(numberOfHeirs) || 1;
    const sharePerHeir = estate / heirs;
    
    // Italian inheritance tax rates and exemptions
    const getTaxDetails = (relationship: string, isDisabled: boolean) => {
      switch (relationship) {
        case "spouse":
        case "children":
          return {
            exemption: isDisabled ? 1500000 : 1000000,
            rate: 0.04 // 4%
          };
        case "siblings":
          return {
            exemption: 100000,
            rate: 0.06 // 6%
          };
        case "relatives_4th":
          return {
            exemption: 0,
            rate: 0.06 // 6%
          };
        case "other":
          return {
            exemption: 0,
            rate: 0.08 // 8%
          };
        default:
          return {
            exemption: 1000000,
            rate: 0.04
          };
      }
    };

    const taxDetails = getTaxDetails(relationship, isDisabled === "yes");
    const taxableAmount = Math.max(0, sharePerHeir - taxDetails.exemption);
    const taxPerHeir = taxableAmount * taxDetails.rate;
    const totalTax = taxPerHeir * heirs;
    const netInheritance = estate - totalTax;
    const effectiveRate = estate > 0 ? (totalTax / estate) * 100 : 0;

    setResults({
      estateValue: estate,
      numberOfHeirs: heirs,
      sharePerHeir,
      exemptionPerHeir: taxDetails.exemption,
      taxablePerHeir: taxableAmount,
      taxPerHeir,
      totalTax,
      netInheritance,
      effectiveRate,
      taxRate: taxDetails.rate * 100
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inheritance Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="estate-value">Total Estate Value (€)</Label>
            <Input
              id="estate-value"
              type="number"
              value={estateValue}
              onChange={(e) => setEstateValue(e.target.value)}
              placeholder="Enter total estate value"
            />
          </div>

          <div>
            <Label htmlFor="relationship">Relationship to Deceased</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse (4%, €1M exemption)</SelectItem>
                <SelectItem value="children">Children (4%, €1M exemption)</SelectItem>
                <SelectItem value="siblings">Siblings (6%, €100K exemption)</SelectItem>
                <SelectItem value="relatives_4th">Relatives to 4th degree (6%)</SelectItem>
                <SelectItem value="other">Others (8%, no exemption)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number-heirs">Number of Heirs</Label>
              <Input
                id="number-heirs"
                type="number"
                value={numberOfHeirs}
                onChange={(e) => setNumberOfHeirs(e.target.value)}
                placeholder="Number of heirs"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="disabled">Heir with Disability?</Label>
              <Select value={isDisabled} onValueChange={setIsDisabled}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes (+€500K exemption)</SelectItem>
                </SelectContent>
              </Select>
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
            <CardTitle>Inheritance Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Estate Value</p>
                <p className="text-lg font-semibold">€{results.estateValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Share per Heir</p>
                <p className="text-lg font-semibold">€{results.sharePerHeir.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Exemption per Heir</p>
                <p className="text-lg font-semibold text-green-600">€{results.exemptionPerHeir.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxable per Heir</p>
                <p className="text-lg font-semibold">€{results.taxablePerHeir.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tax per Heir</p>
                <p className="text-lg font-semibold text-red-600">€{results.taxPerHeir.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.totalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Inheritance</p>
                <p className="text-lg font-semibold text-green-600">€{results.netInheritance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Rate</p>
                <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Inheritance Tax Rates & Exemptions:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Spouse & Children:</strong> 4% above €1,000,000 exemption</li>
                <li>• <strong>Siblings:</strong> 6% above €100,000 exemption</li>
                <li>• <strong>Relatives (4th degree):</strong> 6% with no exemption</li>
                <li>• <strong>Others:</strong> 8% with no exemption</li>
                <li>• <strong>Disability Bonus:</strong> Additional €500,000 exemption</li>
                <li>• <strong>Note:</strong> Main residence may qualify for additional reductions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyInheritanceTaxCalculator;
