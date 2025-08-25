import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Suspense } from "react";
import CartSheet from "@/components/CartSheet";
import SSRLoader from "@/components/SSRLoader";
import PageLoader from "@/components/PageLoader";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import PrerenderDetector from "@/components/PrerenderDetector";
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
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import AccountOrders from "./pages/AccountOrders";
import AccountAddresses from "./pages/AccountAddresses";
import AccountInfo from "./pages/AccountInfo";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <PrerenderDetector>
          <SSRLoader />
          <PerformanceOptimizer />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
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
              <Route path="/order-success" element={<OrderSuccess />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Account Routes */}
              <Route path="/account" element={<Account />} />
              <Route path="/account/orders" element={<AccountOrders />} />
              <Route path="/account/addresses" element={<AccountAddresses />} />
              <Route path="/account/info" element={<AccountInfo />} />
              
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/support" element={<Support />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CartSheet />
          </BrowserRouter>
        </PrerenderDetector>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
