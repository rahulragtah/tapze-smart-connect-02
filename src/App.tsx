
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import BuyNFCCard from "./pages/BuyNFCCard";
import DigitalProfile from "./pages/DigitalProfile";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import Support from "./pages/Support";
import BrandCarousel from "./pages/BrandCarousel";
import AboutCompany from "./pages/AboutCompany";
import CancellationPolicy from "./pages/CancellationPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/buy-nfc-card" element={<BuyNFCCard />} />
            <Route path="/digital-profile" element={<DigitalProfile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/brands" element={<BrandCarousel />} />
            <Route path="/about-company" element={<AboutCompany />} />
            
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <CartSheet />
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
