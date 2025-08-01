import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Real-time Updates",
    description: "Change your profile info instantly",
    icon: "🔄"
  },
  {
    title: "Link Analytics", 
    description: "Track clicks and engagement",
    icon: "📊"
  },
  {
    title: "Lead Capture",
    description: "Collect contact information",
    icon: "📝"
  },
  {
    title: "CRM Sync",
    description: "Integrate with your tools",
    icon: "🔗"
  }
];

const MobileAppSection = () => {
  return (
    <section className="py-12 lg:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <img src="/lovable-uploads/manage-profile.svg"></img>
          
          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Manage Your <span className="text-gradient">Digital Profile</span>
              </h2>
              <p className="text-xl text-gray-300 mb-4">Complete control at your fingertips</p>
              <p className="text-gray-400 leading-relaxed">
                Manage your digital presence with our intuitive control panel. Update links, 
                track performance, and capture leads - all in real-time from your mobile device.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="glass p-4 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
            
            <div className="pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/digital-profile">
                  Know More about Digital Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
