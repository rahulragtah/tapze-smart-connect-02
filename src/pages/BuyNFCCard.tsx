import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


const BuyNFCCard = () => {


    const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          const url = 'https://tapze.in/tapzeservice/all_cards.php';
          fetch(url)
            .then(response => response.json())
            .then(data => {
              setProducts(data);
              setLoading(false);
              console.log ('current product ', data);
            })
            .catch(error => {
              console.error('Error fetching cards:', error);
              setLoading(false);
            });
        }, []); // 👈 empty array means run once on page load
      
        if (loading) {
          return <p>Loading cards...</p>;
        }


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
                          <p className="text-gray-400 text-sm two-line-truncate">{product.description}</p>
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
                            ₹{(product.price ).toLocaleString()}
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
