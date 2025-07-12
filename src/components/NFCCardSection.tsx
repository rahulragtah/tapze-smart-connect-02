import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
const cardVarieties = [{
  id: "classic-black",
  name: "Standard NFC Card",
  description: "Timeless elegance with matte finish",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
  features: ["Matte black finish", "Laser engraving", "Standard thickness"],
  price: 499
}, {
  id: "premium-metal",
  name: "Premium Metal NFC Card",
  description: "Luxury steel with custom etching",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
  features: ["Brushed steel", "Precision etching", "Extra durability"],
  price: 999,
  popular: true
}, {
  id: "transparent-glass",
  name: "Custom NFC Card",
  description: "Modern frosted glass design",
  image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
  features: ["Frosted glass", "LED backlight", "Ultra-thin profile"],
  price: 1299
}];
const NFCCardSection = () => {
  const {
    addItem
  } = useCart();
  const handleAddToCart = (card: typeof cardVarieties[0]) => {
    addItem({
      id: card.id,
      name: card.name,
      price: card.price,
      image: card.image
    });
  };
  const handleBuyNow = (card: typeof cardVarieties[0]) => {
    addItem({
      id: card.id,
      name: card.name,
      price: card.price,
      image: card.image
    });
    console.log("Redirecting to checkout with:", card.name);
  };
  return <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">NFC Cards</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">Your brand, in your pocket</p>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Premium materials meet cutting-edge technology. Choose from our carefully crafted card varieties, 
            each designed to make a lasting impression.
          </p>
        </div>

        {/* Card Varieties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cardVarieties.map((card, index) => <Card key={index} className={`glass rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 ${card.popular ? 'border-2 border-purple-500' : ''}`}>
              {card.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>}
              
              {/* Clickable Card Image */}
              <Link to={`/products/${card.id}`} className="block">
                <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden cursor-pointer">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
                  
                  {/* Card Mockup */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg shadow-2xl border border-gray-700 flex items-center justify-center relative">
                      <div className="text-white font-semibold text-xs">TAPZE</div>
                      <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Link to={`/products/${card.id}`} className="hover:text-purple-400 transition-colors">
                    <h3 className="text-xl font-semibold text-white">{card.name}</h3>
                  </Link>
                  <span className="text-2xl font-bold text-gradient">₹{card.price}</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{card.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {card.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
                      {feature}
                    </li>)}
                </ul>
                
                <div className="space-y-3">
                  <Button onClick={() => handleAddToCart(card)} className="w-full rounded-full font-semibold border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button onClick={() => handleBuyNow(card)} className="w-full rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>)}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Engineered for <span className="text-gradient">Digital Profile</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every Tapze card is crafted with precision using premium materials and cutting-edge NFC technology. 
                Our cards are designed to withstand daily use while maintaining their elegant appearance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Fully Customizable</h4>
                    <p className="text-gray-400 text-sm">Design your card with your logo, colors, and personal branding</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Universal Compatibility</h4>
                    <p className="text-gray-400 text-sm">Works with any NFC-enabled device, no app required</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Waterproof & Durable</h4>
                    <p className="text-gray-400 text-sm">Built to last with scratch-resistant coating</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Instant Setup</h4>
                    <p className="text-gray-400 text-sm">Ready to use in minutes with our simple app</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold">
                Customize Your Card
              </Button>
              <Button variant="outline" className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full font-semibold">
                View All Options
              </Button>
            </div>
          </div>
          
          {/* Right side - Large Card Visual */}
          <div className="relative">
            <Card className="glass p-8 rounded-3xl">
              <div className="relative mx-auto max-w-sm">
                {/* Main featured card */}
                <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-20 h-20 border border-purple-500 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-pink-500 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-300 rounded-full opacity-50" />
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="text-2xl font-bold text-white mb-2">TAPZE</div>
                    <div className="text-sm text-gray-400">Premium NFC Card</div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-sm text-gray-300 mb-1">John Doe</div>
                    <div className="text-xs text-gray-500">Creative Director</div>
                    <div className="text-xs text-gray-600 mt-1">john@company.com</div>
                  </div>
                  
                  {/* NFC indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-sm" />
                  </div>
                  
                  {/* Tap indicator */}
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    TAP TO CONNECT
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/30 rounded-full blur-sm animate-float" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-500/30 rounded-full blur-sm animate-float" style={{
                animationDelay: '1s'
              }} />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-500/30 rounded-full blur-sm animate-float" style={{
                animationDelay: '2s'
              }} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default NFCCardSection;