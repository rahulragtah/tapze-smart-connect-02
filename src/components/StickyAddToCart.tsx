
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";

interface StickyAddToCartProps {
  productName: string;
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const StickyAddToCart = ({ productName, price, onAddToCart, onBuyNow }: StickyAddToCartProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past the hero section
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800 p-4 md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{productName}</p>
          <p className="text-purple-400 font-bold">₹{price}</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={onAddToCart}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={onBuyNow}
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
