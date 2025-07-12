
import { Card } from "@/components/ui/card";
import { Palette, Clock, CheckCircle } from "lucide-react";

const ProductCustomization = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            How do I <span className="text-gradient">customize</span> my card?
          </h2>
        </div>
        
        <Card className="glass p-8 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Palette className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">
                Personal Design Service Included
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Once you place your order, our designer will contact you within 24 hours to collect your details (logo, name, designation, etc.) and share a custom card design for your approval.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300 text-sm">24hr contact</span>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300 text-sm">Custom design</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300 text-sm">Your approval</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductCustomization;
