
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 5,
    date: "2 weeks ago",
    title: "Amazing quality and super convenient!",
    content: "I've been using this NFC card for my business networking and it's a game changer. The build quality is excellent and the matte finish looks very professional. Highly recommended!",
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    name: "Priya Singh",
    rating: 5,
    date: "1 month ago",
    title: "Perfect for modern networking",
    content: "Love how easy it is to share my contact info. Just tap and everything is shared instantly. The card feels premium and sturdy. Great investment for professionals.",
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    name: "Amit Patel",
    rating: 4,
    date: "3 weeks ago",
    title: "Good product, fast delivery",
    content: "The customization process was smooth and the final product looks great. Only minor issue was the delivery took a day longer than expected, but overall very satisfied.",
    helpful: 6,
    verified: true
  }
];

const ProductReviews = () => {
  const averageRating = 4.8;
  const totalReviews = 247;

  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Customer <span className="text-gradient">Reviews</span>
          </h2>
          
          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-white">{averageRating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-400">{totalReviews} reviews</p>
              </div>
            </div>
            
            {/* Rating Breakdown */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%' }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">
                    {rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="glass p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    {review.verified && (
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <h5 className="font-medium text-white mb-2">{review.title}</h5>
              <p className="text-gray-300 leading-relaxed mb-4">{review.content}</p>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
