
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
  },
  "wooden-eco": {
    id: "wooden-eco",
    name: "Eco-Friendly Wood NFC Card",
    tagline: "Nature meets technology",
    description: "Sustainable bamboo with laser precision",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    features: ["Bamboo construction", "Eco-friendly", "Natural texture"],
    price: 69
  },
  "carbon-fiber": {
    id: "carbon-fiber",
    name: "Carbon Fiber NFC Card",
    tagline: "Engineered for professionals",
    description: "Lightweight carbon fiber construction",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop",
    features: ["Carbon fiber weave", "Ultra-lightweight", "Premium finish"],
    price: 109
  },
  "rose-gold": {
    id: "rose-gold",
    name: "Rose Gold NFC Card",
    tagline: "Elegance redefined",
    description: "Sophisticated rose gold plating",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    features: ["Rose gold plating", "Scratch resistant", "Premium packaging"],
    price: 149
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
          <Link to="/buy-nfc-card" className="text-purple-400 hover:text-purple-300">
            ← Back to products
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
          to="/buy-nfc-card" 
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
