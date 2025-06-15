
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const FranceMunicipalTaxCalculator = () => {
    const [propertyValue, setPropertyValue] = useState<number>(0);
    const [result, setResult] = useState<{ tax: number } | null>(null);

    const calculateTax = () => {
        if (propertyValue <= 0) return;
        // This is a highly simplified placeholder calculation.
        // Real municipal taxes are complex and vary by locality.
        // E.g., taxe d'enlèvement des ordures ménagères (TEOM)
        const estimatedTax = propertyValue * 0.001; 
        setResult({ tax: estimatedTax });
    };

    const resetForm = () => {
        setPropertyValue(0);
        setResult(null);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        France Municipal Tax Calculator
                    </CardTitle>
                    <CardDescription>
                        Estimate local municipal taxes in France. This is a simplified tool.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="property-value">Cadastral Rental Value (€)</Label>
                        <Input
                            id="property-value"
                            type="number"
                            value={propertyValue || ""}
                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                            placeholder="Enter estimated rental value"
                        />
                         <p className="text-xs text-gray-500">A placeholder for 'valeur locative cadastrale'.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={calculateTax} className="flex-1">
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate
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
                        <CardTitle>Municipal Tax Estimation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Estimated Annual Municipal Tax:</span>
                            <span>€{result.tax.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            <strong>Disclaimer:</strong> This is a rough estimate. Actual municipal taxes depend on your specific commune and are composed of several different local taxes.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FranceMunicipalTaxCalculator;

