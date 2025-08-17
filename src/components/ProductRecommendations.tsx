import  { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from '@/components/models/productInterface';

interface Offer {
  productId: string;
  offerId: number;
  offerType: string;
  value: number;
  isActive: boolean;
}

// const allProducts = [
//   {
//     id: "classic-black",
//     name: "Classic Black",
//     description: "Timeless elegance with matte finish",
//     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
//     price: 49,
//     offerPrice: 100
//   },
//   {
//     id: "premium-metal",
//     name: "Premium Metal",
//     description: "Luxury steel with custom etching",
//     image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
//     price: 89,
//     offerPrice: 100
//   },
//   {
//     id: "transparent-glass",
//     name: "Transparent Glass",
//     description: "Modern frosted glass design",
//     image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
//     price: 129,
//     offerPrice: 100
//   }
// ];

interface ProductRecommendationsProps {
  currentProductId: string;
}

const ProductRecommendations = ({ currentProductId }: ProductRecommendationsProps) => {
  const [recommendedProduct, setRecommendedProduct] = useState<any[]>([]);
  const [offers, setOffers] = useState<{[key: string]: Offer}>({});

  useEffect(() => {
    const url = 'https://tapze.in/tapzeservice/productapi.php?id=' + currentProductId +'&section=recommendations';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRecommendedProduct(data);
        
        // Fetch offers for each product
        data.forEach((product: any) => {
          fetch(`https://tapze.in/tapzeservice/productoffer.php?product_id=${product.id}`)
            .then(response => response.json())
            .then(offerData => {
              if (offerData && offerData.length > 0) {
                setOffers(prev => ({
                  ...prev,
                  [product.id]: offerData[0]
                }));
              }
            })
            .catch(error => {
              console.error('Error fetching offer for product:', product.id, error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, [currentProductId]);
    
  const recommendedProducts = recommendedProduct.filter(product => product.id !== currentProductId);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedProducts.map((product) => (
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
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {product.features && product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
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
  );
};

export default ProductRecommendations;
