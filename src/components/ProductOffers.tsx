
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Gift, Percent, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductOffers = () => {
  const offers = [{
    title: "First Order Discount",
    description: "Get 15% off your first NFC card order",
    code: "FIRST15"
  }, {
    title: "Bundle Deal",
    description: "Buy 3 cards, get 1 free + free shipping",
    code: "BUNDLE3"
  }, {
    title: "Student Special",
    description: "Show your student ID for 20% off",
    code: "STUDENT20"
  }];

  return (
    <section className="px-4 py-20 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">Special Offers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Exclusive <span className="text-gradient">Deals</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Save more on your NFC card purchase with these limited-time offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card key={index} className="glass p-6 rounded-xl hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-gray-300 mb-4">{offer.description}</p>
                
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <code className="text-purple-400 font-mono font-bold">{offer.code}</code>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Apply Code
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductOffers;
