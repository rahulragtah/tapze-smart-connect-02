
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useIsMobile } from "@/hooks/use-mobile";

const FinalCTASection = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const handleAffilation = () => {
    window.open('https://dashboard.tapze.in/sadmin/affiliate-users', '_blank');
    
  };

  const handleLogin = (phone: string) => {
    console.log("Affiliate login with phone:", phone);
    setIsLoginModalOpen(false);
  };

  // Hide on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <Card className="glass p-12 rounded-3xl text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Earn with <span className="text-gradient">Every Tap</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our affiliate program and earn commissions by promoting smarter, 
                sustainable networking. Help others ditch paper cards while building your income!
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">High Commissions</h3>
                  <p className="text-gray-400 text-sm">Earn up to 25% on every sale you generate</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Growing Network</h3>
                  <p className="text-gray-400 text-sm">Join thousands of successful affiliates</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Passive Income</h3>
                  <p className="text-gray-400 text-sm">Build recurring revenue with our products</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={handleAffilation}
                >
                  Join Now
                </Button>
                {/* <Button variant="outline" size="lg" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                  Learn More
                </Button> */}
              </div>
              
              <div className="flex justify-center items-center gap-8 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  No Setup Fees
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Quick Payouts
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  24/7 Support
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default FinalCTASection;
