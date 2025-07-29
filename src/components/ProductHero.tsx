
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
  onAddToCart: (color?: string) => void;
  onBuyNow: (color?: string) => void;
}

const ProductHero = ({ product, onAddToCart, onBuyNow }: ProductHeroProps) => {
  const [offer, setOffer] = useState<Offer>();
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  
  // Different sample images for each product
  const getSampleImages = (productId: string) => {
    const imagesByProduct = {
      'nextag-pvc': [
        product.heroImage,
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"
      ],
      'premium-metal': [
        product.heroImage,
        "https://images.unsplash.com/photo-1548094878-84ced0f6896d?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=800&h=800&fit=crop"
      ],
      'wooden-eco': [
        product.heroImage,
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493932484895-752d1471eab5?w=800&h=800&fit=crop"
      ],
      'predesignedpvrcard': [
        product.heroImage,
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&h=800&fit=crop"
      ],
      'wpgoogle-review-card': [
        product.heroImage,
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&h=800&fit=crop"
      ],
      'ztap2rate': [
        product.heroImage,
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1566933293069-b55c7f1b79ad?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1604719312429-3b3aec2b3296?w=800&h=800&fit=crop"
      ],
      'ztapsocial': [
        product.heroImage,
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1521302200778-33500795e128?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
      ]
    };
    
    return imagesByProduct[productId as keyof typeof imagesByProduct] || [
      product.heroImage,
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=800&fit=crop"
    ];
  };
  
  const [galleryImages, setGalleryImages] = useState<string[]>(getSampleImages(product.id));
  
  // Update gallery images when product changes
  useEffect(() => {
    setGalleryImages(getSampleImages(product.id));
  }, [product.id]);
  useEffect(() => {
    // Fetch offers
    fetch('https://tapze.in//tapzeservice/productoffer.php?product_id=' + product.id)
      .then(response => response.json())
      .then(data => {
        setOffer(data[0]);
        console.log('offers for current product', data);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });

    // Fetch gallery images
    fetch(`https://tapze.in/tapzeservice/productapi.php?id=${product.id}&section=gallery`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          const images = data.map(item => item.image || item.heroImage).filter(Boolean);
          if (images.length > 0) {
            setGalleryImages(images);
          }
          // If no images from API, keep the sample images that were set initially
        }
      })
      .catch(error => {
        console.error('Error fetching gallery images:', error);
        // Keep the sample images that were set initially
      });
  }, [product.id]);

  return (
    <section className="px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Gallery */}
          <div>
            <ProductGallery 
              heroImage={product.heroImage} 
              name={product.name} 
              hotSelling={product.hotSelling} 
              galleryImages={galleryImages}
            />
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
            <ProductColorSwitcher onColorChange={setSelectedColor} />

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
                  onClick={() => onAddToCart(selectedColor)}
                  className="flex-1 h-12 rounded-lg font-semibold border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent text-base"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  onClick={() => onBuyNow(selectedColor)}
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
