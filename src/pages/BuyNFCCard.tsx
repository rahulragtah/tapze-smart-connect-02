import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Offer {
  productId: string;
  offerId: number;
  offerType: string;
  value: number;
  isActive: boolean;
}


const BuyNFCCard = () => {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<{[key: string]: Offer}>({});

  useEffect(() => {
    fetch('https://tapze.in/tapzeservice/productapi.php')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
        
        // Fetch offers for each card
        data.forEach((card: any) => {
          fetch(`https://tapze.in/tapzeservice/productoffer.php?product_id=${card.id}`)
            .then(response => response.json())
            .then(offerData => {
              if (offerData && offerData.length > 0) {
                setOffers(prev => ({
                  ...prev,
                  [card.id]: offerData[0]
                }));
              }
            })
            .catch(error => {
              console.error('Error fetching offer for card:', card.id, error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
        setLoading(false);
      });
  }, []);
      
        if (loading) {
          return (
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <div className="pt-16">
                {/* Hero Section Skeleton */}
                <section className="pt-20 pb-8 px-4 text-center">
                  <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-16 w-96 mx-auto mb-6" />
                    <Skeleton className="h-6 w-80 mx-auto" />
                  </div>
                </section>

                {/* Products Grid Skeleton */}
                <section className="py-16 px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[...Array(6)].map((_, index) => (
                        <Card key={index} className="glass p-6 rounded-3xl">
                          <div className="space-y-6">
                            <Skeleton className="w-full h-48 rounded-2xl" />
                            <div className="space-y-4">
                              <Skeleton className="h-6 w-3/4" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                              </div>
                              <div className="flex items-center justify-between pt-4">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-4 w-20" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              <Footer />
            </div>
          );
        }

       


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="pt-16 lg:pt-20 pb-8 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Card, <span className="text-gradient">Your Style</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium Smart business cards designed to make lasting impressions. 
              Each card comes with our smart software to power your networking.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 lg:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="group block"
                >
                  <Card className={`glass p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    product.hotSelling ? 'scale-105 shadow-2xl shadow-orange-500/20 border-2 border-orange-500/30' : ''
                  }`}>
                    {product.hotSelling && (
                      <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-orange-500">
                        <Flame className="w-3 h-3 mr-1" />
                        Hot Selling
                      </Badge>
                    )}
                    
                    {offers[product.id] && offers[product.id].isActive && (
                      <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Save ₹{offers[product.id].value.toLocaleString()}
                      </div>
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
                          {/* <p className="text-gray-400 text-sm two-line-truncate">{product.description}</p> */}
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              {/* <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> */}
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          {offers[product.id] && offers[product.id].isActive ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-white">
                                ₹{(parseFloat(product.price) - offers[product.id].value).toLocaleString()}
                              </span>
                              <span className="text-lg text-gray-400 line-through">
                                ₹{parseFloat(product.price).toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <div className="text-2xl font-bold text-white">
                              ₹{parseFloat(product.price).toLocaleString()}
                            </div>
                          )}
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
