
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";

interface StickyAddToCartProps {
  productName: string;
  price: number;
  originalPrice?: number;
  offerPrice?: number;
  onAddToCart: (colorOrProfession?: string) => void;
  onBuyNow: (colorOrProfession?: string) => void;
}

const StickyAddToCart = ({ productName, price, originalPrice, offerPrice, onAddToCart, onBuyNow }: StickyAddToCartProps) => {
  const [isVisible, setIsVisible] = useState(true); // Always visible on mobile now

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past the hero section (for tablet/desktop)
      const heroHeight = window.innerHeight * 0.8;
      const isMobile = window.innerWidth < 768;
      setIsVisible(isMobile || window.scrollY > heroHeight);
    };

    // Set initial visibility
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800 p-4 md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate text-sm">{productName}</p>
          <div className="flex items-center gap-2">
            {offerPrice && originalPrice && offerPrice < originalPrice ? (
              <>
                <span className="text-purple-400 font-bold text-lg">₹{offerPrice}</span>
                <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
              </>
            ) : (
              <span className="text-purple-400 font-bold text-lg">₹{price}</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onAddToCart()}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onBuyNow()}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
          >
            <Zap className="w-4 h-4 mr-1" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;
