import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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

const cardData = {
  "classic-black": {
    id: "classic-black",
    name: "Classic Black NFC Card",
    tagline: "Make your first impression unforgettable",
    description: "Timeless elegance with matte finish",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop",
    features: ["Matte black finish", "Laser engraving", "Standard thickness"],
    price: 49
  },
  "premium-metal": {
    id: "premium-metal",
    name: "Premium Metal NFC Card",
    tagline: "Tap it like it's hot",
    description: "Luxury steel with custom etching",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop",
    features: ["Brushed steel", "Precision etching", "Extra durability"],
    price: 89
  },
  "transparent-glass": {
    id: "transparent-glass",
    name: "Transparent Glass NFC Card",
    tagline: "Bye, boring paper cards",
    description: "Modern frosted glass design",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800&fit=crop",
    features: ["Frosted glass", "LED backlight", "Ultra-thin profile"],
    price: 129
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  
  const product = cardData[productId as keyof typeof cardData];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    console.log("Redirecting to checkout with:", product.name);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>
      </div>

      {/* Above the Fold */}
      <ProductHero product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
      
      {/* Dedicated Order & Customization Timeline Container */}
      <ProductOrderTimelineContainer />
      
      {/* Below the Fold Sections */}
      <div className="space-y-0">
        <ProductOffers />
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
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductDetails;
