
import  { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Star, Shield, Truck, Award, Users } from "lucide-react";
import ProductGallery from "./ProductGallery";
import ProductColorSwitcher from "./ProductColorSwitcher";
import { Card } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: string[];
  price: number;
  hotSelling?: boolean;
}

interface Offer {
  productId: string;
  offerId: number;
  offerType: string;
  value: number;
  isActive: boolean;
}
interface ProductHeroProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductHero = ({ product, onAddToCart, onBuyNow }: ProductHeroProps) => {
  const [offer, setOffer] =useState<Offer>();
  useEffect(() => {
         console.log('ffdsfdsf ndsfds      hjdfdshkfjdshkfjdshkjfdshkjfhdsf')
          fetch('https://tapze.in//tapzeservice/productoffer.php?product_id=' + product.id)
          .then(response => response.json())
          .then(data => {
            setOffer(data[0]);
           
            console.log ('offers for current product  ', data);
          })
          .catch(error => {
            console.error('Error fetching cards:', error);
            
          });
      }, []
    ); // 👈 empty array means run once on page load

  return (
    <section className="px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Gallery */}
          <div>
            <ProductGallery heroImage={product.heroImage} name={product.name} hotSelling={product.hotSelling} />
            <Card className="glass p-4 rounded-lg mt-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Limited Time Offers
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Get 10% festive Discount code <strong className="text-white">FESTIVE10</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Buy 3 cards, get 1 free.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Free shipping on all.</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-400">
              <span>Home</span> &gt; <span>Our Products</span> &gt; <span className="text-white">{product.name}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gradient font-medium">
                {product.tagline}
              </p>
              <p className="text-gray-400 text-sm mt-3">{product.description}</p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white font-medium ml-1">4.8</span>
              </div>
              <span className="text-gray-400">(247 reviews)</span>
              <span className="text-purple-400 text-sm hover:underline cursor-pointer"><a href="#reviewsection">See all reviews</a></span>
            </div>
                 {/* Price */}
            { offer && offer.isActive ? (
                  <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">₹{(product.price- offer.value).toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">₹{((product.price ) ).toLocaleString()}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  Save ₹{(offer.value).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400">Inclusive of all taxes</p>
            </div>
            ) : (
                  <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">₹{(product.price).toLocaleString()}</span>
                
              </div>
              <p className="text-sm text-gray-400">Inclusive of all taxes</p>
            </div>
              )
              }

           
            


            {/* Offers */}
            {/* <Card className="glass p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Available Offers
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Get 15% off your first order with code <strong className="text-white">FIRST15</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Buy 3 cards, get 1 free + free shipping</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-gray-300">Free shipping on orders above ₹2,000</span>
                </div>
              </div>
            </Card> */}

            {/* Color Switcher */}
            <ProductColorSwitcher />

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Key Features:</h4>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {/* <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" /> */}
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main CTAs */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={onAddToCart}
                  className="flex-1 h-12 rounded-lg font-semibold border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent text-base"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  onClick={onBuyNow}
                  className="flex-1 h-12 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* Bulk Order CTA */}
              <Card className="glass p-4 rounded-lg border-purple-500/30">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Need 10 or more cards? Get special pricing!</h4>
                    <p className="text-sm text-gray-400 mb-3">Bulk orders get priority processing and exclusive discounts</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                        Contact Now For Bulk Order
                      </Button>
                      {/* <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Get a Quote
                      </Button> */}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
              <div className="text-center">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">30-day guarantee</p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Free shipping</p>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Premium quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
