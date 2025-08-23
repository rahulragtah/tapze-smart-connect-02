
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

  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@type": "Organization",
  //   "name": "Tapze",
  //   "url": "https://tapze.in",
  //   "logo": "https://tapze.in/lovable-uploads/meta-image.png",
  //   "description": "Premium NFC business cards and smart digital solutions for modern professionals",
  //   "address": {
  //     "@type": "PostalAddress",
  //     "addressCountry": "IN"
  //   },
   
  //   "offers": {
  //     "@type": "Offer",
  //     "description": "Premium NFC Business Cards with 20% Independence Day discount",
  //     "priceValidUntil": "2024-08-31"
  //   }
  // };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Tapze"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Tapze"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Tapze - Make Every Tap Count | Premium Smart Business Cards</title>
        <meta name="description" content="Tapze combines premium NFC business cards with smart mobile software. Share your contact details, social links, and personal brand with a single tap." />
        <meta name="keywords" content="NFC business cards, smart business cards, digital business cards, contactless networking, NFC technology, India" />
        <link rel="canonical" href="https://tapze.in" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet> */}
        <Helmet>
        {/* SEO Meta */}
        <title>{product.name} | Tapze</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content={`${product.name} | Tapze`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Tapze`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image} />
        <meta name="twitter:site" content="@tapze" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground" style={{ backgroundColor: 'hsl(0, 0%, 5%)', color: 'hsl(0, 0%, 98%)' }}>
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
