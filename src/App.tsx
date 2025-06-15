import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ToolPage from "./pages/ToolPage";
import NotFound from "./pages/NotFound";
import ToolRedirect from "./pages/ToolRedirect";

// German Tool Pages
import GermanIncomeTaxPage from "./pages/tools/GermanIncomeTaxPage";
import GermanVATPage from "./pages/tools/GermanVATPage";
import GermanCorporateTaxPage from "./pages/tools/GermanCorporateTaxPage";
import GermanCapitalGainsTaxPage from "./pages/tools/GermanCapitalGainsTaxPage";
import GermanPropertyTaxPage from "./pages/tools/GermanPropertyTaxPage";
import GermanInheritanceTaxPage from "./pages/tools/GermanInheritanceTaxPage";
import GermanPayrollTaxPage from "./pages/tools/GermanPayrollTaxPage";
import GermanSalesTaxPage from "./pages/tools/GermanSalesTaxPage";
import GermanImportTaxPage from "./pages/tools/GermanImportTaxPage";
import GermanMunicipalTaxPage from "./pages/tools/GermanMunicipalTaxPage";
import GermanBudgetAnalyzerPage from "./pages/tools/GermanBudgetAnalyzerPage";
import GermanGDPCalculatorPage from "./pages/tools/GermanGDPCalculatorPage";
import GermanPublicDebtCalculatorPage from "./pages/tools/GermanPublicDebtCalculatorPage";
import GermanRevenueProjectorPage from "./pages/tools/GermanRevenueProjectorPage";
import GermanSpendingTrackerPage from "./pages/tools/GermanSpendingTrackerPage";
import GermanBudgetComparisonPage from "./pages/tools/GermanBudgetComparisonPage";
import GermanFiscalImpactToolPage from "./pages/tools/GermanFiscalImpactToolPage";
import GermanEconomicGrowthCalculatorPage from "./pages/tools/GermanEconomicGrowthCalculatorPage";
import GermanBudgetAllocationToolPage from "./pages/tools/GermanBudgetAllocationToolPage";
import GermanDeficitCalculatorPage from "./pages/tools/GermanDeficitCalculatorPage";

// UK Tool Pages
import UKIncomeTaxPage from "./pages/tools/UKIncomeTaxPage";
import UKVATPage from "./pages/tools/UKVATPage";
import UKCorporateTaxPage from "./pages/tools/UKCorporateTaxPage";
import UKCapitalGainsTaxPage from "./pages/tools/UKCapitalGainsTaxPage";
import UKPropertyTaxPage from "./pages/tools/UKPropertyTaxPage";
import UKInheritanceTaxPage from "./pages/tools/UKInheritanceTaxPage";
import UKPayrollTaxPage from "./pages/tools/UKPayrollTaxPage";
import UKSalesTaxPage from "./pages/tools/UKSalesTaxPage";
import UKImportTaxPage from "./pages/tools/UKImportTaxPage";
import UKMunicipalTaxPage from "./pages/tools/UKMunicipalTaxPage";
import UKBudgetAnalyzerPage from "./pages/tools/UKBudgetAnalyzerPage";
import UKGDPCalculatorPage from "./pages/tools/UKGDPCalculatorPage";
import UKPublicDebtCalculatorPage from "./pages/tools/UKPublicDebtCalculatorPage";
import UKRevenueProjectorPage from "./pages/tools/UKRevenueProjectorPage";
import UKSpendingTrackerPage from "./pages/tools/UKSpendingTrackerPage";
import UKBudgetComparisonPage from "./pages/tools/UKBudgetComparisonPage";
import UKFiscalImpactToolPage from "./pages/tools/UKFiscalImpactToolPage";
import UKEconomicGrowthCalculatorPage from "./pages/tools/UKEconomicGrowthCalculatorPage";
import UKBudgetAllocationToolPage from "./pages/tools/UKBudgetAllocationToolPage";
import UKDeficitCalculatorPage from "./pages/tools/UKDeficitCalculatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Redirect root to English */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              
              {/* Language-specific homepage */}
              <Route path="/:lang" element={<Index />} />
              
              <Route path="/auth" element={<Auth />} />
              
              {/* Tool redirects without language */}
              <Route path="/tool/:countrySlug/:toolSlug" element={<ToolRedirect />} />
              
              {/* Language-specific tool pages */}
              <Route path="/tool/:lang/:countrySlug/:toolSlug" element={<ToolPage />} />
              
              {/* German Tool Routes */}
              <Route path="/tool/:lang/germany/income-tax-calculator" element={<GermanIncomeTaxPage />} />
              <Route path="/tool/:lang/germany/vat-calculator" element={<GermanVATPage />} />
              <Route path="/tool/:lang/germany/corporate-tax-calculator" element={<GermanCorporateTaxPage />} />
              <Route path="/tool/:lang/germany/capital-gains-tax-calculator" element={<GermanCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/germany/property-tax-calculator" element={<GermanPropertyTaxPage />} />
              <Route path="/tool/:lang/germany/inheritance-tax-calculator" element={<GermanInheritanceTaxPage />} />
              <Route path="/tool/:lang/germany/payroll-tax-calculator" element={<GermanPayrollTaxPage />} />
              <Route path="/tool/:lang/germany/sales-tax-calculator" element={<GermanSalesTaxPage />} />
              <Route path="/tool/:lang/germany/import-tax-calculator" element={<GermanImportTaxPage />} />
              <Route path="/tool/:lang/germany/municipal-tax-calculator" element={<GermanMunicipalTaxPage />} />
              <Route path="/tool/:lang/germany/budget-analyzer" element={<GermanBudgetAnalyzerPage />} />
              <Route path="/tool/:lang/germany/gdp-calculator" element={<GermanGDPCalculatorPage />} />
              <Route path="/tool/:lang/germany/public-debt-calculator" element={<GermanPublicDebtCalculatorPage />} />
              <Route path="/tool/:lang/germany/revenue-projector" element={<GermanRevenueProjectorPage />} />
              <Route path="/tool/:lang/germany/spending-tracker" element={<GermanSpendingTrackerPage />} />
              <Route path="/tool/:lang/germany/budget-comparison" element={<GermanBudgetComparisonPage />} />
              <Route path="/tool/:lang/germany/fiscal-impact-tool" element={<GermanFiscalImpactToolPage />} />
              <Route path="/tool/:lang/germany/economic-growth-calculator" element={<GermanEconomicGrowthCalculatorPage />} />
              <Route path="/tool/:lang/germany/budget-allocation-tool" element={<GermanBudgetAllocationToolPage />} />
              <Route path="/tool/:lang/germany/deficit-calculator" element={<GermanDeficitCalculatorPage />} />

              {/* UK Tool Routes - Updated to use /uk/ instead of /united-kingdom/ */}
              <Route path="/tool/:lang/uk/income-tax-calculator" element={<UKIncomeTaxPage />} />
              <Route path="/tool/:lang/uk/vat-calculator" element={<UKVATPage />} />
              <Route path="/tool/:lang/uk/corporate-tax-calculator" element={<UKCorporateTaxPage />} />
              <Route path="/tool/:lang/uk/capital-gains-tax-calculator" element={<UKCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/uk/property-tax-calculator" element={<UKPropertyTaxPage />} />
              <Route path="/tool/:lang/uk/inheritance-tax-calculator" element={<UKInheritanceTaxPage />} />
              <Route path="/tool/:lang/uk/payroll-tax-calculator" element={<UKPayrollTaxPage />} />
              <Route path="/tool/:lang/uk/sales-tax-calculator" element={<UKSalesTaxPage />} />
              <Route path="/tool/:lang/uk/import-tax-calculator" element={<UKImportTaxPage />} />
              <Route path="/tool/:lang/uk/municipal-tax-calculator" element={<UKMunicipalTaxPage />} />
              <Route path="/tool/:lang/uk/budget-analyzer" element={<UKBudgetAnalyzerPage />} />
              <Route path="/tool/:lang/uk/gdp-calculator" element={<UKGDPCalculatorPage />} />
              <Route path="/tool/:lang/uk/public-debt-calculator" element={<UKPublicDebtCalculatorPage />} />
              <Route path="/tool/:lang/uk/revenue-projector" element={<UKRevenueProjectorPage />} />
              <Route path="/tool/:lang/uk/spending-tracker" element={<UKSpendingTrackerPage />} />
              <Route path="/tool/:lang/uk/budget-comparison" element={<UKBudgetComparisonPage />} />
              <Route path="/tool/:lang/uk/fiscal-impact-tool" element={<UKFiscalImpactToolPage />} />
              <Route path="/tool/:lang/uk/economic-growth-calculator" element={<UKEconomicGrowthCalculatorPage />} />
              <Route path="/tool/:lang/uk/budget-allocation-tool" element={<UKBudgetAllocationToolPage />} />
              <Route path="/tool/:lang/uk/deficit-calculator" element={<UKDeficitCalculatorPage />} />

              {/* Keep the old UK routes for backward compatibility */}
              <Route path="/tool/:lang/united-kingdom/income-tax-calculator" element={<UKIncomeTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/vat-calculator" element={<UKVATPage />} />
              <Route path="/tool/:lang/united-kingdom/corporate-tax-calculator" element={<UKCorporateTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/capital-gains-tax-calculator" element={<UKCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/property-tax-calculator" element={<UKPropertyTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/inheritance-tax-calculator" element={<UKInheritanceTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/payroll-tax-calculator" element={<UKPayrollTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/sales-tax-calculator" element={<UKSalesTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/import-tax-calculator" element={<UKImportTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/municipal-tax-calculator" element={<UKMunicipalTaxPage />} />
              <Route path="/tool/:lang/united-kingdom/budget-analyzer" element={<UKBudgetAnalyzerPage />} />
              <Route path="/tool/:lang/united-kingdom/gdp-calculator" element={<UKGDPCalculatorPage />} />
              <Route path="/tool/:lang/united-kingdom/public-debt-calculator" element={<UKPublicDebtCalculatorPage />} />
              <Route path="/tool/:lang/united-kingdom/revenue-projector" element={<UKRevenueProjectorPage />} />
              <Route path="/tool/:lang/united-kingdom/spending-tracker" element={<UKSpendingTrackerPage />} />
              <Route path="/tool/:lang/united-kingdom/budget-comparison" element={<UKBudgetComparisonPage />} />
              <Route path="/tool/:lang/united-kingdom/fiscal-impact-tool" element={<UKFiscalImpactToolPage />} />
              <Route path="/tool/:lang/united-kingdom/economic-growth-calculator" element={<UKEconomicGrowthCalculatorPage />} />
              <Route path="/tool/:lang/united-kingdom/budget-allocation-tool" element={<UKBudgetAllocationToolPage />} />
              <Route path="/tool/:lang/united-kingdom/deficit-calculator" element={<UKDeficitCalculatorPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
