import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({ isOpen, onClose }) => {
  const offerText = "🎉 Special Offer: Get 20% OFF on your first NFC Card order! Limited time only.";
  const whatsappMessage = "Hi! I'm interested in the special 20% OFF offer on NFC Cards. Can you please provide more details?";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/918447202716?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="relative max-w-md w-full mx-4 overflow-hidden shadow-2xl border-2 border-primary/20 animate-scale-in">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Offer Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/main-banner.png')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-2 animate-pulse">🎉</div>
            <div className="text-2xl font-bold text-primary mb-1">SPECIAL OFFER</div>
            <div className="text-lg font-semibold text-accent">20% OFF</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Limited Time Offer!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get 20% discount on your first NFC Card order. Premium quality, instant digital sharing, and eco-friendly design.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Instant Sharing</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            <span className="mr-2">💬</span>
            Grab This Offer on WhatsApp
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            ⏰ Offer valid for 24 hours only!
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PromotionalModal;