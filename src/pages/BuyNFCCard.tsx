
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const products = [
  {
    id: "classic-black",
    name: "Standard NFC Card",
    description: "Timeless elegance with matte finish",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    price: 499,
    features: ["Matte black finish", "Laser engraving", "Standard thickness"],
    popular: false
  },
  {
    id: "premium-metal",
    name: "Premium Metal NFC Card",
    description: "Luxury steel with custom etching",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    price: 999,
    features: ["Brushed steel", "Precision etching", "Extra durability"],
    popular: true
  },
  {
    id: "transparent-glass",
    name: "Custom NFC Card",
    description: "Modern frosted glass design",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    price: 1299,
    features: ["Frosted glass", "LED backlight", "Ultra-thin profile"],
    popular: false
  }
];

const BuyNFCCard = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Card, <span className="text-gradient">Your Style</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Premium NFC business cards designed to make lasting impressions. 
              Each card comes with our smart software to power your networking.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="glass relative overflow-hidden">
                  {product.popular && (
                    <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="p-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-gray-300 mb-4">{product.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-3xl font-bold text-white">
                    ₹{product.price}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0 space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BuyNFCCard;
