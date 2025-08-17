
import React from "react";
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
import PromotionalModal from "@/components/PromotionalModal";
import { useCart } from "@/contexts/CartContext";
import { Helmet } from "react-helmet";

const Index = () => {
  const [showPromotionalModal, setShowPromotionalModal] = React.useState(false);
  const { isOpen: isCartOpen } = useCart();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Only show modal if cart is not open
      if (!isCartOpen) {
        setShowPromotionalModal(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isCartOpen]);

  // Close modal if cart opens
  React.useEffect(() => {
    if (isCartOpen) {
      setShowPromotionalModal(false);
    }
  }, [isCartOpen]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tapze",
    "url": "https://tapze.in",
    "logo": "https://tapze.in/lovable-uploads/meta-image.png",
    "description": "Premium NFC business cards and smart digital solutions for modern professionals",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://twitter.com/tapze_app"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Premium NFC Business Cards with 20% Independence Day discount",
      "priceValidUntil": "2024-08-31"
    }
  };

  return (
    <>
      <Helmet>
        <title>Tapze - Make Every Tap Count | Premium Smart Business Cards</title>
        <meta name="description" content="Tapze combines premium NFC business cards with smart mobile software. Share your contact details, social links, and personal brand with a single tap." />
        <meta name="keywords" content="NFC business cards, smart business cards, digital business cards, contactless networking, NFC technology, India" />
        <link rel="canonical" href="https://tapze.in" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
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
      
      <PromotionalModal
        isOpen={showPromotionalModal}
        onClose={() => setShowPromotionalModal(false)}
      />
    </div>
    </>
  );
};

export default Index;
