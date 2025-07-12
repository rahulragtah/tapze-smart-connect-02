
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, MessageCircle, FileText } from "lucide-react";

const ProductBulkOrder = () => {
  const features = [{
    icon: Package,
    title: "Volume Discounts",
    description: "Significant savings on orders of 50+ cards"
  }, {
    icon: Users,
    title: "Team Solutions",
    description: "Perfect for corporate networking and events"
  }, {
    icon: MessageCircle,
    title: "Dedicated Support",
    description: "Personal account manager for your bulk order"
  }, {
    icon: FileText,
    title: "Custom Branding",
    description: "Fully customized designs for your organization"
  }];

  return (
    <section className="px-4 py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Package className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Enterprise Solutions</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Bulk Orders</span> Made Simple
              </h2>
              
              <p className="text-xl text-gray-300 mb-4">
                Perfect for teams, events, and corporate networking
              </p>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you're equipping your sales team, preparing for a conference, or launching 
                a company-wide networking initiative, our bulk order solutions provide the scale 
                and customization you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold">
                Contact Us for Pricing
              </Button>
              <Button variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-3 rounded-full font-semibold">
                Download Bulk Guide
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="glass p-8 rounded-3xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Get Custom Pricing</h3>
                  <p className="text-gray-400 mb-6">Tell us about your needs and get a personalized quote</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/20">
                    <div>
                      <div className="text-white font-semibold">50-99 Cards</div>
                      <div className="text-gray-400 text-sm">Starter Package</div>
                    </div>
                    <div className="text-blue-400 font-bold text-lg">15% OFF</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
                    <div>
                      <div className="text-white font-semibold">100-499 Cards</div>
                      <div className="text-gray-400 text-sm">Business Package</div>
                    </div>
                    <div className="text-purple-400 font-bold text-lg">25% OFF</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-900/30 to-orange-900/30 rounded-xl border border-pink-500/20">
                    <div>
                      <div className="text-white font-semibold">500+ Cards</div>
                      <div className="text-gray-400 text-sm">Enterprise Package</div>
                    </div>
                    <div className="text-pink-400 font-bold text-lg">35% OFF</div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-500 text-sm">
                    * Pricing varies based on customization, materials, and quantity
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBulkOrder;
