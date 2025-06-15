
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
              
              {/* Specific routes for German calculators */}
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
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
