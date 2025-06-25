import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ToolPage from "./pages/ToolPage";
import NotFound from "./pages/NotFound";
import ToolRedirect from "./pages/ToolRedirect";
import CountryPage from "./pages/CountryPage";

// Continent Pages
import EuropePage from "./pages/continents/EuropePage";
import AsiaPage from "./pages/continents/AsiaPage";
import NorthAmericaPage from "./pages/continents/NorthAmericaPage";
import SouthAmericaPage from "./pages/continents/SouthAmericaPage";
import AfricaPage from "./pages/continents/AfricaPage";
import OceaniaPage from "./pages/continents/OceaniaPage";

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

// France Tool Pages
import FranceIncomeTaxPage from "./pages/tools/FranceIncomeTaxPage";
import FranceVATPage from "./pages/tools/FranceVATPage";
import FranceCorporateTaxPage from "./pages/tools/FranceCorporateTaxPage";
import FranceCapitalGainsTaxPage from "./pages/tools/FranceCapitalGainsTaxPage";
import FrancePropertyTaxPage from "./pages/tools/FrancePropertyTaxPage";
import FranceInheritanceTaxPage from "./pages/tools/FranceInheritanceTaxPage";
import FrancePayrollTaxPage from "./pages/tools/FrancePayrollTaxPage";
import FranceSalesTaxPage from "./pages/tools/FranceSalesTaxPage";
import FranceImportTaxPage from "./pages/tools/FranceImportTaxPage";
import FranceMunicipalTaxPage from "./pages/tools/FranceMunicipalTaxPage";
import FranceBudgetAnalyzerPage from "./pages/tools/FranceBudgetAnalyzerPage";
import FranceGDPCalculatorPage from "./pages/tools/FranceGDPCalculatorPage";
import FrancePublicDebtCalculatorPage from "./pages/tools/FrancePublicDebtCalculatorPage";
import FranceRevenueProjectorPage from "./pages/tools/FranceRevenueProjectorPage";
import FranceSpendingTrackerPage from "./pages/tools/FranceSpendingTrackerPage";
import FranceBudgetComparisonPage from "./pages/tools/FranceBudgetComparisonPage";
import FranceFiscalImpactToolPage from "./pages/tools/FranceFiscalImpactToolPage";
import FranceEconomicGrowthCalculatorPage from "./pages/tools/FranceEconomicGrowthCalculatorPage";
import FranceBudgetAllocationToolPage from "./pages/tools/FranceBudgetAllocationToolPage";
import FranceDeficitCalculatorPage from "./pages/tools/FranceDeficitCalculatorPage";

// Italy Tool Pages  
import ItalyIncomeTaxPage from "./pages/tools/ItalyIncomeTaxPage";
import ItalyVATPage from "./pages/tools/ItalyVATPage";
import ItalyBudgetAnalyzerPage from "./pages/tools/ItalyBudgetAnalyzerPage";
import ItalyCorporateTaxPage from "./pages/tools/ItalyCorporateTaxPage";
import ItalyCapitalGainsTaxPage from "./pages/tools/ItalyCapitalGainsTaxPage";
import ItalyPropertyTaxPage from "./pages/tools/ItalyPropertyTaxPage";
import ItalyInheritanceTaxPage from "./pages/tools/ItalyInheritanceTaxPage";
import ItalyPayrollTaxPage from "./pages/tools/ItalyPayrollTaxPage";
import ItalySalesTaxPage from "./pages/tools/ItalySalesTaxPage";
import ItalyImportTaxPage from "./pages/tools/ItalyImportTaxPage";
import ItalyMunicipalTaxPage from "./pages/tools/ItalyMunicipalTaxPage";
import ItalyGDPCalculatorPage from "./pages/tools/ItalyGDPCalculatorPage";
import ItalyPublicDebtCalculatorPage from "./pages/tools/ItalyPublicDebtCalculatorPage";
import ItalyRevenueProjectorPage from "./pages/tools/ItalyRevenueProjectorPage";
import ItalySpendingTrackerPage from "./pages/tools/ItalySpendingTrackerPage";
import ItalyBudgetComparisonPage from "./pages/tools/ItalyBudgetComparisonPage";
import ItalyFiscalImpactToolPage from "./pages/tools/ItalyFiscalImpactToolPage";
import ItalyEconomicGrowthCalculatorPage from "./pages/tools/ItalyEconomicGrowthCalculatorPage";
import ItalyBudgetAllocationToolPage from "./pages/tools/ItalyBudgetAllocationToolPage";
import ItalyDeficitCalculatorPage from "./pages/tools/ItalyDeficitCalculatorPage";

// Spain Tool Pages
import SpainIncomeTaxPage from "./pages/tools/SpainIncomeTaxPage";
import SpainVATPage from "./pages/tools/SpainVATPage";
import SpainCorporateTaxPage from "./pages/tools/SpainCorporateTaxPage";
import SpainCapitalGainsTaxPage from "./pages/tools/SpainCapitalGainsTaxPage";
import SpainPropertyTaxPage from "./pages/tools/SpainPropertyTaxPage";
import SpainInheritanceTaxPage from "./pages/tools/SpainInheritanceTaxPage";
import SpainPayrollTaxPage from "./pages/tools/SpainPayrollTaxPage";
import SpainSalesTaxPage from "./pages/tools/SpainSalesTaxPage";
import SpainImportTaxPage from "./pages/tools/SpainImportTaxPage";
import SpainMunicipalTaxPage from "./pages/tools/SpainMunicipalTaxPage";

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
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Continent Pages */}
              <Route path="/continent/:lang/europe" element={<EuropePage />} />
              <Route path="/continent/:lang/asia" element={<AsiaPage />} />
              <Route path="/continent/:lang/north-america" element={<NorthAmericaPage />} />
              <Route path="/continent/:lang/south-america" element={<SouthAmericaPage />} />
              <Route path="/continent/:lang/africa" element={<AfricaPage />} />
              <Route path="/continent/:lang/oceania" element={<OceaniaPage />} />
              
              {/* Country Pages */}
              <Route path="/country/:lang/:countrySlug" element={<CountryPage />} />
              
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

              {/* France Tool Routes */}
              <Route path="/tool/:lang/france/income-tax-calculator" element={<FranceIncomeTaxPage />} />
              <Route path="/tool/:lang/france/vat-calculator" element={<FranceVATPage />} />
              <Route path="/tool/:lang/france/corporate-tax-calculator" element={<FranceCorporateTaxPage />} />
              <Route path="/tool/:lang/france/capital-gains-tax-calculator" element={<FranceCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/france/property-tax-calculator" element={<FrancePropertyTaxPage />} />
              <Route path="/tool/:lang/france/inheritance-tax-calculator" element={<FranceInheritanceTaxPage />} />
              <Route path="/tool/:lang/france/payroll-tax-calculator" element={<FrancePayrollTaxPage />} />
              <Route path="/tool/:lang/france/sales-tax-calculator" element={<FranceSalesTaxPage />} />
              <Route path="/tool/:lang/france/import-tax-calculator" element={<FranceImportTaxPage />} />
              <Route path="/tool/:lang/france/municipal-tax-calculator" element={<FranceMunicipalTaxPage />} />
              <Route path="/tool/:lang/france/budget-analyzer" element={<FranceBudgetAnalyzerPage />} />
              <Route path="/tool/:lang/france/gdp-calculator" element={<FranceGDPCalculatorPage />} />
              <Route path="/tool/:lang/france/public-debt-calculator" element={<FrancePublicDebtCalculatorPage />} />
              <Route path="/tool/:lang/france/revenue-projector" element={<FranceRevenueProjectorPage />} />
              <Route path="/tool/:lang/france/spending-tracker" element={<FranceSpendingTrackerPage />} />
              <Route path="/tool/:lang/france/budget-comparison" element={<FranceBudgetComparisonPage />} />
              <Route path="/tool/:lang/france/fiscal-impact-tool" element={<FranceFiscalImpactToolPage />} />
              <Route path="/tool/:lang/france/economic-growth-calculator" element={<FranceEconomicGrowthCalculatorPage />} />
              <Route path="/tool/:lang/france/budget-allocation-tool" element={<FranceBudgetAllocationToolPage />} />
              <Route path="/tool/:lang/france/deficit-calculator" element={<FranceDeficitCalculatorPage />} />

              {/* Italy Tool Routes */}
              <Route path="/tool/:lang/italy/income-tax-calculator" element={<ItalyIncomeTaxPage />} />
              <Route path="/tool/:lang/italy/vat-calculator" element={<ItalyVATPage />} />
              <Route path="/tool/:lang/italy/corporate-tax-calculator" element={<ItalyCorporateTaxPage />} />
              <Route path="/tool/:lang/italy/capital-gains-tax-calculator" element={<ItalyCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/italy/property-tax-calculator" element={<ItalyPropertyTaxPage />} />
              <Route path="/tool/:lang/italy/inheritance-tax-calculator" element={<ItalyInheritanceTaxPage />} />
              <Route path="/tool/:lang/italy/payroll-tax-calculator" element={<ItalyPayrollTaxPage />} />
              <Route path="/tool/:lang/italy/sales-tax-calculator" element={<ItalySalesTaxPage />} />
              <Route path="/tool/:lang/italy/import-tax-calculator" element={<ItalyImportTaxPage />} />
              <Route path="/tool/:lang/italy/municipal-tax-calculator" element={<ItalyMunicipalTaxPage />} />
              <Route path="/tool/:lang/italy/budget-analyzer" element={<ItalyBudgetAnalyzerPage />} />
              <Route path="/tool/:lang/italy/gdp-calculator" element={<ItalyGDPCalculatorPage />} />
              <Route path="/tool/:lang/italy/public-debt-calculator" element={<ItalyPublicDebtCalculatorPage />} />
              <Route path="/tool/:lang/italy/revenue-projector" element={<ItalyRevenueProjectorPage />} />
              <Route path="/tool/:lang/italy/spending-tracker" element={<ItalySpendingTrackerPage />} />
              <Route path="/tool/:lang/italy/budget-comparison" element={<ItalyBudgetComparisonPage />} />
              <Route path="/tool/:lang/italy/fiscal-impact-tool" element={<ItalyFiscalImpactToolPage />} />
              <Route path="/tool/:lang/italy/economic-growth-calculator" element={<ItalyEconomicGrowthCalculatorPage />} />
              <Route path="/tool/:lang/italy/budget-allocation-tool" element={<ItalyBudgetAllocationToolPage />} />
              <Route path="/tool/:lang/italy/deficit-calculator" element={<ItalyDeficitCalculatorPage />} />

              {/* Spain Tool Routes */}
              <Route path="/tool/:lang/spain/income-tax-calculator" element={<SpainIncomeTaxPage />} />
              <Route path="/tool/:lang/spain/vat-calculator" element={<SpainVATPage />} />
              <Route path="/tool/:lang/spain/corporate-tax-calculator" element={<SpainCorporateTaxPage />} />
              <Route path="/tool/:lang/spain/capital-gains-tax-calculator" element={<SpainCapitalGainsTaxPage />} />
              <Route path="/tool/:lang/spain/property-tax-calculator" element={<SpainPropertyTaxPage />} />
              <Route path="/tool/:lang/spain/inheritance-tax-calculator" element={<SpainInheritanceTaxPage />} />
              <Route path="/tool/:lang/spain/payroll-tax-calculator" element={<SpainPayrollTaxPage />} />
              <Route path="/tool/:lang/spain/sales-tax-calculator" element={<SpainSalesTaxPage />} />
              <Route path="/tool/:lang/spain/import-tax-calculator" element={<SpainImportTaxPage />} />
              <Route path="/tool/:lang/spain/municipal-tax-calculator" element={<SpainMunicipalTaxPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
