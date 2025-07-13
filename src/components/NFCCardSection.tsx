
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const cards = [
  {
    id: "classic-black",
    name: "Classic Black NFC Card",
    tagline: "Make your first impression unforgettable",
    description: "Timeless elegance with matte finish",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    features: ["Matte black finish", "Laser engraving", "Standard thickness"],
    price: 49,
    hotSelling: false
  },
  {
    id: "premium-metal",
    name: "Premium Metal NFC Card",
    tagline: "Tap it like it's hot",
    description: "Luxury steel with custom etching",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    features: ["Brushed steel", "Precision etching", "Extra durability"],
    price: 89,
    hotSelling: true
  },
  {
    id: "transparent-glass",
    name: "Transparent Glass NFC Card",
    tagline: "Bye, boring paper cards",
    description: "Modern frosted glass design",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    features: ["Frosted glass", "LED backlight", "Ultra-thin profile"],
    price: 129,
    hotSelling: false
  }
];

const NFCCardSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">⭐</span>
            <span className="text-purple-400 font-semibold">Our Bestsellers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Perfect Card</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium NFC business cards designed for professionals who want to make lasting impressions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link 
              key={card.id} 
              to={`/products/${card.id}`}
              className="group block"
            >
              <Card className="glass p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                {card.hotSelling && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-orange-500">
                    <Flame className="w-3 h-3 mr-1" />
                    Hot Selling
                  </Badge>
                )}
                
                <div className="space-y-6">
                  {/* Card Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-bold text-lg">{card.tagline}</div>
                    </div>
                  </div>
                  
                  {/* Card Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="text-2xl font-bold text-white">
                        ₹{(card.price * 80).toLocaleString()}
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
        
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Can't decide? We offer a 30-day money-back guarantee on all products.
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Free worldwide shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              1-year warranty
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFCCardSection;
