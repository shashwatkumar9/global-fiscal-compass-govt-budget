
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpainMunicipalTaxCalculator = () => {
  const [taxType, setTaxType] = useState("ibi");
  const [municipality, setMunicipality] = useState("madrid");
  const [cadastralValue, setCadastralValue] = useState("");
  const [businessRevenue, setBusinessRevenue] = useState("");
  const [vehicleValue, setVehicleValue] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateMunicipalTax = () => {
    const catastral = parseFloat(cadastralValue) || 0;
    const revenue = parseFloat(businessRevenue) || 0;
    const vehicle = parseFloat(vehicleValue) || 0;

    let taxAmount = 0;
    let taxDescription = "";
    let taxRate = 0;

    // Municipal tax rates by municipality (simplified)
    const municipalRates = {
      madrid: {
        ibi_residential: 0.004,
        ibi_commercial: 0.011,
        iae: 0.015,
        ivtm: 0.025
      },
      barcelona: {
        ibi_residential: 0.005,
        ibi_commercial: 0.013,
        iae: 0.018,
        ivtm: 0.028
      },
      valencia: {
        ibi_residential: 0.006,
        ibi_commercial: 0.015,
        iae: 0.020,
        ivtm: 0.030
      },
      seville: {
        ibi_residential: 0.007,
        ibi_commercial: 0.016,
        iae: 0.022,
        ivtm: 0.032
      }
    };

    const rates = municipalRates[municipality as keyof typeof municipalRates] || municipalRates.madrid;

    switch (taxType) {
      case "ibi":
        taxRate = rates.ibi_residential;
        taxAmount = catastral * taxRate;
        taxDescription = "IBI (Property Tax) - Residential";
        break;
      case "ibi_commercial":
        taxRate = rates.ibi_commercial;
        taxAmount = catastral * taxRate;
        taxDescription = "IBI (Property Tax) - Commercial";
        break;
      case "iae":
        taxRate = rates.iae;
        taxAmount = revenue * taxRate;
        taxDescription = "IAE (Business Activity Tax)";
        break;
      case "ivtm":
        taxRate = rates.ivtm;
        taxAmount = vehicle * taxRate;
        taxDescription = "IVTM (Vehicle Tax)";
        break;
      default:
        break;
    }

    // Garbage collection fee (simplified)
    const garbageFee = taxType.includes("ibi") ? 150 : 0;
    const totalTax = taxAmount + garbageFee;

    setResults({
      taxType,
      taxDescription,
      municipality,
      taxAmount,
      taxRate: taxRate * 100,
      garbageFee,
      totalTax,
      monthlyPayment: totalTax / 12
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spain Municipal Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tax-type">Tax Type</Label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ibi">IBI - Residential Property</SelectItem>
                  <SelectItem value="ibi_commercial">IBI - Commercial Property</SelectItem>
                  <SelectItem value="iae">IAE - Business Activity</SelectItem>
                  <SelectItem value="ivtm">IVTM - Vehicle Tax</SelectItem>
                </SelectContent>
              </Select>
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
                </SelectContent>
              </Select>
            </div>

            {(taxType === "ibi" || taxType === "ibi_commercial") && (
              <div>
                <Label htmlFor="cadastral-value">Cadastral Value (€)</Label>
                <Input
                  id="cadastral-value"
                  type="number"
                  value={cadastralValue}
                  onChange={(e) => setCadastralValue(e.target.value)}
                  placeholder="200000"
                />
              </div>
            )}

            {taxType === "iae" && (
              <div>
                <Label htmlFor="business-revenue">Annual Business Revenue (€)</Label>
                <Input
                  id="business-revenue"
                  type="number"
                  value={businessRevenue}
                  onChange={(e) => setBusinessRevenue(e.target.value)}
                  placeholder="500000"
                />
              </div>
            )}

            {taxType === "ivtm" && (
              <div>
                <Label htmlFor="vehicle-value">Vehicle Fiscal Value (€)</Label>
                <Input
                  id="vehicle-value"
                  type="number"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(e.target.value)}
                  placeholder="25000"
                />
              </div>
            )}
          </div>

          <Button onClick={calculateMunicipalTax} className="w-full">
            Calculate Municipal Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Municipal Tax Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Type:</span>
                    <span className="font-semibold">{results.taxDescription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Municipality:</span>
                    <span className="font-semibold">{results.municipality.charAt(0).toUpperCase() + results.municipality.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Rate:</span>
                    <span className="font-semibold">{results.taxRate.toFixed(3)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Tax:</span>
                    <span className="font-semibold">€{results.taxAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {results.garbageFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Garbage Collection:</span>
                      <span className="font-semibold">€{results.garbageFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Annual Tax:</span>
                    <span className="font-semibold text-red-600">€{results.totalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold">€{results.monthlyPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Tax Information</h4>
                <p className="text-sm">
                  {results.taxType === "ibi" || results.taxType === "ibi_commercial" 
                    ? "IBI is paid annually or in quarterly installments. Payment deadline is typically November 30th."
                    : results.taxType === "iae"
                    ? "IAE is paid annually by businesses with revenue over €1 million. Deadline is typically September 15th."
                    : "IVTM is paid annually for vehicle ownership. Deadline varies by municipality."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpainMunicipalTaxCalculator;
