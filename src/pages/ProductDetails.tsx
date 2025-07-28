import  { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import ProductHero from "@/components/ProductHero";
import ProductOrderTimelineContainer from "@/components/ProductOrderTimelineContainer";
import ProductOffers from "@/components/ProductOffers";
import ProductBulkOrder from "@/components/ProductBulkOrder";
import ProductFAQ from "@/components/ProductFAQ";
import ProductRecommendations from "@/components/ProductRecommendations";
import StickyAddToCart from "@/components/StickyAddToCart";
import ProductReviews from "@/components/ProductReviews";
import Footer from "@/components/Footer";



const ProductDetails = () => {
  const { productId } = useParams();
  const { addItem } = useCart();

  
  const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      const url = 'https://tapze.in/tapzeservice/productapi.php?id=' + productId + '&section=product';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setProduct(data[0] || null);
          setLoading(false);
          console.log ('current product ', data);
        })
        .catch(error => {
          console.error('Error fetching cards:', error);
          setLoading(false);
        });
    }, [productId]); // 👈 now depends on productId so it refetches when product changes
  
    if (loading) {
      return <p>Loading cards...</p>;
    }
  
       // const product = cardData[productId as keyof typeof cardData];


  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/buy-nfc-card" className="text-purple-400 hover:text-purple-300">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      offerPrice:product.offerPrice
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      offerPrice:product.offerPrice
    });
    console.log("Redirecting to checkout with:", product.name);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <Link 
          to="/buy-nfc-card" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>
      </div>

      {/* Above the Fold */}
      <ProductHero product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
      
      {/* Dedicated Order & Customization Timeline Container */}
      <ProductOrderTimelineContainer />
      
      {/* Below the Fold Sections */}
      <div className="space-y-0">
        {/* <ProductOffers /> */}
        <ProductBulkOrder />
        <ProductReviews />
        <ProductFAQ />
        <ProductRecommendations currentProductId={product.id} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Sticky Add to Cart Bar (Mobile) */}
      <StickyAddToCart
        productName={product.name}
        price={product.price}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductDetails;
