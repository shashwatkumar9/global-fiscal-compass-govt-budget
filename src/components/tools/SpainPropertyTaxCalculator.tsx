
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainPropertyTaxCalculator = () => {
  const [cadastralValue, setCadastralValue] = useState("");
  const [municipality, setMunicipality] = useState("madrid");
  const [propertyType, setPropertyType] = useState("residential");
  const [isOwnerOccupied, setIsOwnerOccupied] = useState("yes");
  const [results, setResults] = useState<any>(null);

  const calculatePropertyTax = () => {
    const catastralValue = parseFloat(cadastralValue) || 0;
    
    // IBI (Impuesto sobre Bienes Inmuebles) rates by municipality
    const ibiRates = {
      madrid: { residential: 0.004, commercial: 0.011 },
      barcelona: { residential: 0.005, commercial: 0.013 },
      valencia: { residential: 0.006, commercial: 0.015 },
      seville: { residential: 0.007, commercial: 0.016 },
      bilbao: { residential: 0.005, commercial: 0.012 }
    };

    const rate = ibiRates[municipality as keyof typeof ibiRates]?.[propertyType as keyof typeof ibiRates.madrid] || 0.005;
    
    // Base IBI calculation
    let ibiTax = catastralValue * rate;
    
    // Owner-occupied residential discount (varies by municipality)
    if (propertyType === "residential" && isOwnerOccupied === "yes") {
      ibiTax *= 0.9; // 10% discount (simplified)
    }

    // Garbage collection tax (simplified)
    const garbageTax = propertyType === "residential" ? 150 : 300;
    
    // Total annual property tax
    const totalTax = ibiTax + garbageTax;
    const effectiveRate = catastralValue > 0 ? (totalTax / catastralValue) * 100 : 0;

    setResults({
      cadastralValue: catastralValue,
      ibiTax,
      garbageTax,
      totalTax,
      effectiveRate,
      municipality,
      propertyType
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Property Tax Calculator (IBI)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cadastral-value">Cadastral Value (€)</Label>
              <Input
                id="cadastral-value"
                type="number"
                value={cadastralValue}
                onChange={(e) => setCadastralValue(e.target.value)}
                placeholder="200000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Official cadastral value (not market value)
              </p>
            </div>

            <div>
              <Label htmlFor="municipality">Municipality</Label>
              <Select value={municipality} onValueChange={setMunicipality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="seville">Seville</SelectItem>
                  <SelectItem value="bilbao">Bilbao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="property-type">Property Type</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="owner-occupied">Owner Occupied</Label>
              <Select value={isOwnerOccupied} onValueChange={setIsOwnerOccupied}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (Primary Residence)</SelectItem>
                  <SelectItem value="no">No (Investment/Vacation)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculatePropertyTax} className="w-full">
            Calculate Property Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Property Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cadastral Value:</span>
                    <span className="font-semibold">€{results.cadastralValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IBI Tax:</span>
                    <span className="font-semibold">€{results.ibiTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Garbage Collection:</span>
                    <span className="font-semibold">€{results.garbageTax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Annual Tax:</span>
                    <span className="font-semibold text-red-600">€{results.totalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Rate:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(3)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold">€{(results.totalTax / 12).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Tax Breakdown</h4>
                <p className="text-sm">
                  Municipality: {results.municipality.charAt(0).toUpperCase() + results.municipality.slice(1)} | 
                  Type: {results.propertyType.charAt(0).toUpperCase() + results.propertyType.slice(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainPropertyTaxCalculator;
