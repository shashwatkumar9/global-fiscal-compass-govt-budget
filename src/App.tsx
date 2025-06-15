
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
              
              {/* Specific route for German Income Tax Calculator */}
              <Route path="/tool/:lang/germany/income-tax-calculator" element={<GermanIncomeTaxPage />} />
              
              {/* Specific route for German VAT Calculator */}
              <Route path="/tool/:lang/germany/vat-calculator" element={<GermanVATPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
