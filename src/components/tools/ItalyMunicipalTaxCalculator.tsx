
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ItalyMunicipalTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [propertySize, setPropertySize] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("rome");
  const [occupants, setOccupants] = useState<string>("2");
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [results, setResults] = useState<any>(null);

  const calculateMunicipalTax = () => {
    const value = parseFloat(propertyValue) || 0;
    const size = parseFloat(propertySize) || 0;
    const residents = parseInt(occupants) || 1;
    
    // Municipal tax rates by city
    const getMunicipalRates = (city: string) => {
      const rates: { [key: string]: { 
        imu: number; 
        tari_residential: number; 
        tari_commercial: number;
        addizionale: number;
        tosap: number;
      } } = {
        "rome": { 
          imu: 0.86, 
          tari_residential: 8.5, 
          tari_commercial: 15.2,
          addizionale: 0.8,
          tosap: 12
        },
        "milan": { 
          imu: 0.9, 
          tari_residential: 9.2, 
          tari_commercial: 16.8,
          addizionale: 0.8,
          tosap: 15
        },
        "naples": { 
          imu: 0.86, 
          tari_residential: 7.8, 
          tari_commercial: 14.5,
          addizionale: 0.8,
          tosap: 10
        },
        "turin": { 
          imu: 0.85, 
          tari_residential: 8.1, 
          tari_commercial: 15.0,
          addizionale: 0.8,
          tosap: 11
        },
        "florence": { 
          imu: 0.9, 
          tari_residential: 8.8, 
          tari_commercial: 16.2,
          addizionale: 0.8,
          tosap: 13
        }
      };
      return rates[city] || rates["rome"];
    };

    const rates = getMunicipalRates(municipality);
    
    // IMU (Municipal Property Tax) - only for non-main residence
    const imuTax = propertyType === "main_residence" ? 0 : (value * rates.imu) / 100;
    
    // TARI (Waste Collection Tax)
    const tariRate = propertyType === "commercial" ? rates.tari_commercial : rates.tari_residential;
    const tariBaseTax = size * tariRate;
    
    // Occupancy multiplier for TARI
    const occupancyMultiplier = Math.max(1, residents * 0.8);
    const tariTax = tariBaseTax * occupancyMultiplier;
    
    // Addizionale Comunale (Municipal surcharge on income tax)
    // This is a percentage of IRPEF, estimated based on property value as proxy for income
    const estimatedIncome = value * 0.05; // 5% of property value as income estimate
    const addizionaleTax = estimatedIncome * (rates.addizionale / 100);
    
    // TOSAP (Tax for occupation of public spaces) - if applicable
    const tosapTax = propertyType === "commercial" ? rates.tosap * 12 : 0; // Monthly rate
    
    // COSAP (similar to TOSAP, for commercial activities)
    const cosapTax = propertyType === "commercial" ? 150 : 0; // Annual fee
    
    // Local service fees
    const sewageFee = size * 2.5; // €2.5 per sqm
    const lightingFee = propertyType === "commercial" ? 180 : 90; // Annual fee
    
    const totalMunicipalTax = imuTax + tariTax + addizionaleTax + tosapTax + cosapTax + sewageFee + lightingFee;
    const effectiveRate = value > 0 ? (totalMunicipalTax / value) * 100 : 0;

    setResults({
      propertyValue: value,
      propertySize: size,
      imuTax,
      tariTax,
      addizionaleTax,
      tosapTax,
      cosapTax,
      sewageFee,
      lightingFee,
      totalMunicipalTax,
      effectiveRate,
      municipality,
      isMainResidence: propertyType === "main_residence"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Municipal Tax Calculator (TARI/IMU/Local Fees)</CardTitle>
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
                placeholder="Cadastral or market value"
              />
            </div>
            <div>
              <Label htmlFor="property-size">Property Size (sqm)</Label>
              <Input
                id="property-size"
                type="number"
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                placeholder="Total floor area"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="municipality">Municipality</Label>
            <Select value={municipality} onValueChange={setMunicipality}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rome">Rome</SelectItem>
                <SelectItem value="milan">Milan</SelectItem>
                <SelectItem value="naples">Naples</SelectItem>
                <SelectItem value="turin">Turin</SelectItem>
                <SelectItem value="florence">Florence</SelectItem>
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
                <SelectItem value="main_residence">Main Residence (IMU Exempt)</SelectItem>
                <SelectItem value="residential">Residential Property</SelectItem>
                <SelectItem value="commercial">Commercial Property</SelectItem>
                <SelectItem value="industrial">Industrial Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="occupants">Number of Occupants</Label>
            <Select value={occupants} onValueChange={setOccupants}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2">2 People</SelectItem>
                <SelectItem value="3">3 People</SelectItem>
                <SelectItem value="4">4 People</SelectItem>
                <SelectItem value="5">5+ People</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateMunicipalTax} className="w-full">
            Calculate Municipal Taxes
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Municipal Tax Calculation Results - {results.municipality.charAt(0).toUpperCase() + results.municipality.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Property Value</p>
                <p className="text-lg font-semibold">€{results.propertyValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Property Size</p>
                <p className="text-lg font-semibold">{results.propertySize} sqm</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Rate</p>
                <p className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">Municipal Tax Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">IMU (Property Tax)</span>
                  <span className="font-medium">€{results.imuTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">TARI (Waste Collection)</span>
                  <span className="font-medium">€{results.tariTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Addizionale Comunale</span>
                  <span className="font-medium">€{results.addizionaleTax.toFixed(2)}</span>
                </div>
                {results.tosapTax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">TOSAP (Public Space)</span>
                    <span className="font-medium">€{results.tosapTax.toFixed(2)}</span>
                  </div>
                )}
                {results.cosapTax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">COSAP (Commercial)</span>
                    <span className="font-medium">€{results.cosapTax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Sewage Fee</span>
                  <span className="font-medium">€{results.sewageFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Public Lighting Fee</span>
                  <span className="font-medium">€{results.lightingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-red-600">
                  <span>Total Annual Municipal Tax</span>
                  <span>€{results.totalMunicipalTax.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {results.isMainResidence && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">Main Residence Benefit Applied!</p>
                <p className="text-sm text-green-700">Your main residence is exempt from IMU tax.</p>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Italian Municipal Taxes Overview:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>IMU:</strong> Municipal property tax (varies 0.4%-1.06% by municipality)</li>
                <li>• <strong>TARI:</strong> Waste collection tax (based on property size and occupancy)</li>
                <li>• <strong>Addizionale:</strong> Municipal surcharge on income tax (≤0.8%)</li>
                <li>• <strong>TOSAP/COSAP:</strong> Taxes for public space occupation</li>
                <li>• <strong>Service Fees:</strong> Sewage, lighting, and other municipal services</li>
                <li>• <strong>Payment:</strong> Usually in 2-3 installments throughout the year</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItalyMunicipalTaxCalculator;
