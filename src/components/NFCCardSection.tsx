import  { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Offer {
  productId: string;
  offerId: number;
  offerType: string;
  value: number;
  isActive: boolean;
}


const NFCCardSection = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<{[key: string]: Offer}>({});
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    fetch('https://tapze.in/tapzeservice/productapi.php?section=homePage')
      .then(response => response.json())
      .then(data => {
        setCards(data);
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
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-48 mx-auto mb-6" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          
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
    );
  }



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
            Premium Smart business cards designed for professionals who want to make lasting impressions
          </p>
        </div>
        
        {/* Desktop Layout */}
        {!isTablet && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Link 
                key={card.id} 
                to={`/products/${card.id}`}
                className="group block"
              >
                <Card className={`glass p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  card.hotSelling ? 'scale-105 shadow-2xl shadow-orange-500/20 border-2 border-orange-500/30' : ''
                }`}>
                  {card.hotSelling && (
                    <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-orange-500">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot Selling
                    </Badge>
                  )}
                  
                  {offers[card.id] && offers[card.id].isActive && (
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Save ₹{offers[card.id].value.toLocaleString()}
                    </div>
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
                        {/* <p className="text-gray-400 text-sm two-line-truncate">{card.description}</p> */}
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {card.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            {/* <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> */}
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                       {/* Price */}
                       <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                         {offers[card.id] && offers[card.id].isActive ? (
                           <div className="flex items-center gap-2">
                             <span className="text-2xl font-bold text-white">
                               ₹{(parseFloat(card.price) - offers[card.id].value).toLocaleString()}
                             </span>
                             <span className="text-lg text-gray-400 line-through">
                               ₹{parseFloat(card.price).toLocaleString()}
                             </span>
                           </div>
                         ) : (
                           <div className="text-2xl font-bold text-white">
                             ₹{parseFloat(card.price).toLocaleString()}
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
        )}

        {/* Tablet Carousel Layout */}
        {isTablet && (
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {cards.map((card, index) => (
                <CarouselItem key={card.id} className="pl-2 md:pl-4 basis-1/2">
                  <Link 
                    to={`/products/${card.id}`}
                    className="group block"
                  >
                    <Card className={`glass p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      card.hotSelling ? 'scale-105 shadow-2xl shadow-orange-500/20 border-2 border-orange-500/30' : ''
                    }`}>
                      {card.hotSelling && (
                        <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-orange-500">
                          <Flame className="w-3 h-3 mr-1" />
                          Hot Selling
                        </Badge>
                      )}
                      
                      {offers[card.id] && offers[card.id].isActive && (
                        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Save ₹{offers[card.id].value.toLocaleString()}
                        </div>
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
                          </div>
                          
                          {/* Features */}
                          <div className="space-y-2">
                            {card.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                           {/* Price */}
                           <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                             {offers[card.id] && offers[card.id].isActive ? (
                               <div className="flex items-center gap-2">
                                 <span className="text-2xl font-bold text-white">
                                   ₹{(parseFloat(card.price) - offers[card.id].value).toLocaleString()}
                                 </span>
                                 <span className="text-lg text-gray-400 line-through">
                                   ₹{parseFloat(card.price).toLocaleString()}
                                 </span>
                               </div>
                             ) : (
                               <div className="text-2xl font-bold text-white">
                                 ₹{parseFloat(card.price).toLocaleString()}
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        
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
        
        {/* Mobile-only View All Products Button */}
        {isMobile && (
          <div className="text-center mt-8">
            <Link to="/buy-nfc-card">
              <Button className="w-full max-w-sm mx-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg">
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NFCCardSection;