
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const products = [
  {
    id: "classic-black",
    name: "Standard NFC Card",
    tagline: "Make your first impression unforgettable",
    description: "Timeless elegance with matte finish",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    price: 49,
    features: ["Matte black finish", "Laser engraving", "Standard thickness"],
    popular: false,
    hotSelling: false
  },
  {
    id: "premium-metal",
    name: "Premium Metal NFC Card",
    tagline: "Tap it like it's hot",
    description: "Luxury steel with custom etching",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    price: 89,
    features: ["Brushed steel", "Precision etching", "Extra durability"],
    popular: true,
    hotSelling: true
  },
  {
    id: "transparent-glass",
    name: "Custom NFC Card",
    tagline: "Bye, boring paper cards",
    description: "Modern frosted glass design",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    price: 129,
    features: ["Frosted glass", "LED backlight", "Ultra-thin profile"],
    popular: false,
    hotSelling: false
  },
  {
    id: "wooden-eco",
    name: "Eco-Friendly Wood NFC Card",
    tagline: "Nature meets technology",
    description: "Sustainable bamboo with laser precision",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    price: 69,
    features: ["Bamboo construction", "Eco-friendly", "Natural texture"],
    popular: false,
    hotSelling: false
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber NFC Card",
    tagline: "Engineered for professionals",
    description: "Lightweight carbon fiber construction",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    price: 109,
    features: ["Carbon fiber weave", "Ultra-lightweight", "Premium finish"],
    popular: false,
    hotSelling: false
  },
  {
    id: "rose-gold",
    name: "Rose Gold NFC Card",
    tagline: "Elegance redefined",
    description: "Sophisticated rose gold plating",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    price: 149,
    features: ["Rose gold plating", "Scratch resistant", "Premium packaging"],
    popular: false,
    hotSelling: false
  }
];

const BuyNFCCard = () => {
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
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="group block"
                >
                  <Card className="glass p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {product.popular && (
                      <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    
                    {product.hotSelling && (
                      <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500">
                        <Flame className="w-3 h-3 mr-1" />
                        Hot Selling
                      </Badge>
                    )}
                    
                    <div className="space-y-6">
                      {/* Card Image */}
                      <div className="relative overflow-hidden rounded-2xl">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white font-bold text-lg">{product.tagline}</div>
                        </div>
                      </div>
                      
                      {/* Card Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                          <p className="text-gray-400 text-sm">{product.description}</p>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <div className="text-2xl font-bold text-white">
                            ₹{(product.price * 80).toLocaleString()}
                          </div>
                          <div className="text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                            View Details →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
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
