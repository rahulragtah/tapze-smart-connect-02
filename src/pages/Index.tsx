
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import NFCCardSection from "@/components/NFCCardSection";
import MobileAppSection from "@/components/MobileAppSection";
import EngineeredForPerfectionSection from "@/components/EngineeredForPerfectionSection";
import EcoFriendlySection from "@/components/EcoFriendlySection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ClientLogosCarousel from "@/components/ClientLogosCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import BulkOrderSection from "@/components/BulkOrderSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16"> {/* Add padding to account for fixed navigation */}
        <HeroSection />
        <HowItWorksSection />
        <NFCCardSection />
        <MobileAppSection />
        <EngineeredForPerfectionSection />
        <EcoFriendlySection />
        <WhyChooseSection />
        <ClientLogosCarousel />
        <TestimonialsSection />
        {/* <PricingSection /> */}
        <BulkOrderSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
