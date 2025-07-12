
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const allProducts = [
  {
    id: "classic-black",
    name: "Classic Black",
    description: "Timeless elegance with matte finish",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
    price: 49
  },
  {
    id: "premium-metal",
    name: "Premium Metal",
    description: "Luxury steel with custom etching",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
    price: 89
  },
  {
    id: "transparent-glass",
    name: "Transparent Glass",
    description: "Modern frosted glass design",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
    price: 129
  }
];

interface ProductRecommendationsProps {
  currentProductId: string;
}

const ProductRecommendations = ({ currentProductId }: ProductRecommendationsProps) => {
  const { addItem } = useCart();
  
  const recommendedProducts = allProducts.filter(product => product.id !== currentProductId);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className="px-4 py-20 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            You might also <span className="text-gradient">like</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Complete your collection with these premium options
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {recommendedProducts.map((product) => (
            <Card key={product.id} className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
                
                {/* Card Mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg shadow-xl border border-gray-700 flex items-center justify-center relative">
                    <div className="text-white font-semibold text-xs">TAPZE</div>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  </div>
                  <span className="text-xl font-bold text-gradient">${product.price}</span>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 rounded-full font-semibold border border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    asChild
                    className="flex-1 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Link to={`/products/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;
