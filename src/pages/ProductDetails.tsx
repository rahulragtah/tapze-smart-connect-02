import  { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { usePrerender } from "@/hooks/usePrerender";
import SEOPrerender from "@/components/SEOPrerender";
import Navigation from "@/components/Navigation";
import ProductHero from "@/components/ProductHero";
import ProductOrderTimelineContainer from "@/components/ProductOrderTimelineContainer";
import ProductOffers from "@/components/ProductOffers";
import ProductBulkOrder from "@/components/ProductBulkOrder";
import ProductFAQ from "@/components/ProductFAQ";
import ProductRecommendations from "@/components/ProductRecommendations";
import StickyAddToCart from "@/components/StickyAddToCart";
import ProductReviews from "@/components/ProductReviews";
import Footer from "@/components/Footer";



const ProductDetails = () => {
  const { productId } = useParams();
  const { addItem, setIsOpen } = useCart();
  const { toast } = useToast();
  const { isBot, shouldPrerender } = usePrerender();

  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  
    useEffect(() => {
      setLoading(true);
      const url = 'https://tapze.in/tapzeservice/productapi.php?id=' + productId + '&section=product';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setProduct(data[0] || null);
          setLoading(false);
          console.log ('current product ', data);
        })
        .catch(error => {
          console.error('Error fetching cards:', error);
          setLoading(false);
        });

      // Fetch offers
      fetch('https://tapze.in//tapzeservice/productoffer.php?product_id=' + productId)
        .then(response => response.json())
        .then(data => {
          setOffer(data[0] || null);
          console.log('offers for current product', data);
        })
        .catch(error => {
          console.error('Error fetching offers:', error);
        });
    }, [productId]); // 👈 now depends on productId so it refetches when product changes
  
    if (loading) {
      return (
        <div className="min-h-screen bg-black text-white">
          <Navigation />
          
          {/* Back Button Skeleton */}
          <div className="pt-20 px-4 max-w-7xl mx-auto">
            <Skeleton className="h-6 w-32 mb-8" />
          </div>

          {/* Product Hero Skeleton */}
          <div className="px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-4">
                <Skeleton className="w-full h-96 rounded-2xl" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-32" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-24" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional content skeletons */}
          <div className="space-y-16 px-4 max-w-7xl mx-auto">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>

          <Footer />
        </div>
      );
    }
  
       // const product = cardData[productId as keyof typeof cardData];


  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/buy-nfc-card" className="text-purple-400 hover:text-purple-300">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (color?: string) => {
    const colorToUse = color || selectedColor;
    const offerPrice = offer && offer.isActive ? product.price - offer.value : product.price;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      offerPrice: offerPrice,
      color: colorToUse
    });
    
    // Show toast notification
    toast({
      title: "Added to Cart",
      description: `${product.name} (${colorToUse}) - Quantity: 1`,
    });
  };

  const handleBuyNow = (color?: string) => {
    const colorToUse = color || selectedColor;
    const offerPrice = offer && offer.isActive ? product.price - offer.value : product.price;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      offerPrice: offerPrice,
      color: colorToUse
    });
    setIsOpen(true); // Open cart drawer for Buy Now
    console.log("Redirecting to checkout with:", product.name);
  };

  // Generate structured data for SEO
  const currentPrice = offer?.isActive ? product.price - offer.value : product.price;
  
  // Ensure absolute URL for product image
  const getAbsoluteImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/')) return `https://tapze.in${image}`;
    return `https://tapze.in/${image}`;
  };

  const productImageUrl = getAbsoluteImageUrl(product.image || product.heroImage);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Premium NFC business card with smart digital features`,
    "image": productImageUrl,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Tapze"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "price": currentPrice,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Tapze"
      },
      "priceValidUntil": offer?.isActive ? "2025-12-31" : undefined
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Satisfied Customer"
        },
        "reviewBody": "Excellent quality NFC business card. Professional design and works perfectly."
      }
    ]
  };

  return (
    <>
      <SEOPrerender
        title={`${product.name} | Tapze - Premium NFC Business Cards`}
        description={product.description || `${product.name} - Premium NFC business card with smart digital features. Share your contact details, social links, and personal brand with a single tap.`}
        keywords={`${product.name}, NFC business card, smart business card, digital business card, contactless networking, ${selectedColor} business card`}
        image={productImageUrl}
        url={window.location.href}
        type="product"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Breadcrumb Navigation - Hidden on mobile */}
      <div className="pt-20 px-4 max-w-7xl mx-auto hidden md:block">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link 
            to="/" 
            className="hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            to="/buy-nfc-card" 
            className="hover:text-white transition-colors"
          >
            Our Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product?.name || 'Product'}</span>
        </nav>
      </div>

      {/* Mobile spacing when breadcrumbs are hidden */}
      <div className="pt-20 md:hidden"></div>

      {/* Above the Fold */}
      <ProductHero 
        product={product} 
        onAddToCart={handleAddToCart} 
        onBuyNow={handleBuyNow}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      
      {/* Dedicated Order & Customization Timeline Container */}
      <ProductOrderTimelineContainer />
      
      {/* Below the Fold Sections */}
      <div className="space-y-0">
        {/* <ProductOffers /> */}
        <ProductBulkOrder />
        <ProductReviews />
        <ProductFAQ />
        <ProductRecommendations currentProductId={product.id} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Sticky Add to Cart Bar (Mobile) */}
      <StickyAddToCart
        productName={product.name}
        price={product.price}
        originalPrice={offer?.isActive ? product.price : undefined}
        offerPrice={offer?.isActive ? product.price - offer.value : undefined}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
    </>
  );
};

export default ProductDetails;
