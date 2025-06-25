
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyPropertyTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [municipality, setMunicipality] = useState<string>("");
  const [isMainResidence, setIsMainResidence] = useState<string>("yes");
  const [propertySize, setPropertySize] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculatePropertyTax = () => {
    const value = parseFloat(propertyValue) || 0;
    const size = parseFloat(propertySize) || 0;
    
    // Base rates vary by municipality
    const getMunicipalRates = (municipality: string) => {
      const rates: { [key: string]: { imu: number; tasi: number } } = {
        "rome": { imu: 0.86, tasi: 0.1 },
        "milan": { imu: 0.9, tasi: 0.1 },
        "naples": { imu: 0.86, tasi: 0.1 },
        "turin": { imu: 0.85, tasi: 0.1 },
        "florence": { imu: 0.9, tasi: 0.1 },
        "bologna": { imu: 0.9, tasi: 0.1 },
        "genoa": { imu: 0.85, tasi: 0.1 },
        "venice": { imu: 0.9, tasi: 0.1 }
      };
      return rates[municipality] || { imu: 0.86, tasi: 0.1 };
    };

    const rates = getMunicipalRates(municipality);
    
    // Calculate IMU (Imposta Municipale Unica)
    let imuRate = rates.imu / 100;
    
    // Main residence exemption for IMU
    if (isMainResidence === "yes" && propertyType === "residential") {
      imuRate = 0; // Main residence is exempt from IMU
    }
    
    // Luxury property surcharge
    if (propertyType === "luxury" || value > 500000) {
      imuRate *= 1.3;
    }
    
    const imuTax = (value * imuRate) / 100;
    
    // Calculate TASI (Tributo per i Servizi Indivisibili)
    // TASI is generally abolished but some municipalities still apply it
    const tasiRate = rates.tasi / 100;
    const tasiTax = (value * tasiRate) / 100;
    
    // TARI (waste tax) based on property size
    const tariRate = propertyType === "commercial" ? 15 : 8; // per sqm
    const tariTax = size * tariRate;
    
    const totalTax = imuTax + tasiTax + tariTax;
    const effectiveRate = value > 0 ? (totalTax / value) * 100 : 0;

    setResults({
      propertyValue: value,
      propertySize: size,
      imuTax,
      tasiTax,
      tariTax,
      totalTax,
      effectiveRate,
      imuRate: imuRate * 100,
      tasiRate: tasiRate * 100,
      isMainResidenceExempt: isMainResidence === "yes" && propertyType === "residential"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Tax Calculator (IMU/TASI/TARI)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="property-value">Property Value (€)</Label>
              <Input
                id="property-value"
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="Enter property value"
              />
            </div>
            <div>
              <Label htmlFor="property-size">Property Size (sqm)</Label>
              <Input
                id="property-size"
                type="number"
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                placeholder="Square meters"
              />
            </div>
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
                <SelectItem value="luxury">Luxury Property</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="agricultural">Agricultural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="municipality">Municipality</Label>
            <Select value={municipality} onValueChange={setMunicipality}>
              <SelectTrigger>
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rome">Rome (0.86%)</SelectItem>
                <SelectItem value="milan">Milan (0.9%)</SelectItem>
                <SelectItem value="naples">Naples (0.86%)</SelectItem>
                <SelectItem value="turin">Turin (0.85%)</SelectItem>
                <SelectItem value="florence">Florence (0.9%)</SelectItem>
                <SelectItem value="bologna">Bologna (0.9%)</SelectItem>
                <SelectItem value="genoa">Genoa (0.85%)</SelectItem>
                <SelectItem value="venice">Venice (0.9%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="main-residence">Is this your main residence?</Label>
            <Select value={isMainResidence} onValueChange={setIsMainResidence}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes (IMU Exempt)</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculatePropertyTax} className="w-full">
            Calculate Property Tax
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Property Tax Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Property Value</p>
                <p className="text-lg font-semibold">€{results.propertyValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IMU Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.imuTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">TASI Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.tasiTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">TARI (Waste Tax)</p>
                <p className="text-lg font-semibold text-red-600">€{results.tariTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Annual Tax</p>
                <p className="text-lg font-semibold text-red-600">€{results.totalTax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Rate</p>
                <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>

            {results.isMainResidenceExempt && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">Main Residence Exemption Applied!</p>
                <p className="text-sm text-green-700">Your main residence is exempt from IMU tax.</p>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Property Tax Overview:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>IMU:</strong> Municipal property tax (0.4%-1.06% of cadastral value)</li>
                <li>• <strong>TASI:</strong> Service tax (mostly abolished, some municipalities apply 0.1%)</li>
                <li>• <strong>TARI:</strong> Waste collection tax (based on property size)</li>
                <li>• <strong>Main Residence:</strong> Generally exempt from IMU (except luxury properties)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyPropertyTaxCalculator;
