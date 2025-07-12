import { Card } from "@/components/ui/card";
import { Smartphone, Zap, Shield, Package, Users, Clock } from "lucide-react";
const features = [{
  icon: Smartphone,
  title: "No app needed — just tap",
  description: "Works instantly with any NFC-enabled smartphone. No downloads, no hassle."
}, {
  icon: Zap,
  title: "Instantly share your digital profile",
  description: "Share your contact info, social media, and portfolio in one smooth tap."
}, {
  icon: Shield,
  title: "Works with any smartphone",
  description: "Compatible with iPhone and Android devices. Universal NFC technology."
}];
const howItWorks = [{
  step: "1",
  title: "Program your card",
  description: "Use our simple app to add your info and customize your digital profile."
}, {
  step: "2",
  title: "Tap to share",
  description: "Hold your card near any smartphone to instantly share your details."
}, {
  step: "3",
  title: "Make connections",
  description: "Your contact saves directly to their phone. No typing, no mistakes."
}];
const whatsInTheBox = ["1x Premium NFC Card", "1x Protective sleeve", "1x Quick start guide", "1x Tapze sticker pack"];
const ProductFeatures = () => {
  return <div className="px-4 py-20 space-y-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Feature Highlights */}
        

        {/* What's in the box */}
        

        {/* How it works */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              How it <span className="text-gradient">works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get up and running in minutes. It's so simple, your grandma could do it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                
                {index < howItWorks.length - 1 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent transform -translate-x-8" />}
              </div>)}
          </div>
        </section>

      </div>
    </div>;
};
export default ProductFeatures;