import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Gift, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  
  const offerText = "🇮🇳 Independence Day Special: Flat 20% OFF on all NFC Cards! Celebrate freedom with digital innovation.";
  const whatsappMessage = "Hi! I'm interested in the Independence Day Special - Flat 20% OFF on all NFC Cards. Can you please provide more details?";
  
  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    }
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919990909789?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <Card className={`relative max-w-lg w-full mx-4 overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-orange-950/20 dark:via-background dark:to-green-950/20 transform transition-all duration-700 ${animate ? 'animate-scale-in' : ''}`}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-400/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-400/10 rounded-full animate-ping"></div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-lg"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header with Flag Colors */}
        <div className="relative h-20 bg-gradient-to-r from-orange-500 via-white to-green-500 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 via-blue-600/20 to-green-600/80"></div>
          <div className="relative z-10 flex items-center space-x-3">
            <div className="text-2xl animate-bounce">🇮🇳</div>
            <div className="text-white font-bold text-lg drop-shadow-lg">INDEPENDENCE DAY</div>
            <div className="text-2xl animate-bounce delay-300">🎉</div>
          </div>
        </div>

        {/* Main Offer Section */}
        <div className="relative p-6 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4 animate-pulse shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              SPECIAL OFFER
            </h2>
            
            <div className="relative">
              <div className="text-6xl font-black text-orange-600 mb-2 animate-pulse">
                20%
              </div>
              <div className="absolute -top-2 -right-8 transform rotate-12">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  FLAT
                </div>
              </div>
            </div>
            
            <div className="text-lg font-semibold text-green-700 mb-1">DISCOUNT</div>
            <div className="text-sm text-muted-foreground">On All NFC Cards</div>
          </div>

          {/* Features with Icons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Star className="w-6 h-6 text-orange-500 mx-auto mb-2 animate-spin" style={{animationDuration: '3s'}} />
              <div className="text-xs font-semibold text-black">Premium Quality</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2 animate-pulse" />
              <div className="text-xs font-semibold text-black">Instant Setup</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Gift className="w-6 h-6 text-green-500 mx-auto mb-2 animate-bounce" />
              <div className="text-xs font-semibold text-black">Free Delivery</div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg group"
          >
            <span className="mr-2 text-xl">💬</span>
            Claim Independence Day Offer
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Countdown/Urgency */}
          <div className="mt-4 p-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">⏰ Limited Time: Ends 31st August!</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Patriotic Message */}
          <div className="mt-4 text-xs text-center text-muted-foreground">
            <span className="font-semibold">🇮🇳 Celebrate Digital India with NFC Technology</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PromotionalModal;