
import { Card } from "@/components/ui/card";

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
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <div className="relative order-2 lg:order-1">
            <Card className="glass p-8 rounded-3xl">
              <div className="relative mx-auto max-w-xs">
                {/* Phone frame */}
                <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-4 border-gray-700 p-2 relative">
                  {/* Screen */}
                  <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-6 relative overflow-hidden">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-white text-sm font-semibold">9:41</div>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm" />
                        <div className="w-4 h-2 bg-white rounded-sm" />
                        <div className="w-4 h-2 bg-white rounded-sm" />
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white font-bold">JD</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">John Doe</h3>
                        <p className="text-gray-400 text-sm">Creative Director</p>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { label: "Website", active: true },
                          { label: "LinkedIn", active: false },
                          { label: "Portfolio", active: true },
                          { label: "Instagram", active: false }
                        ].map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                            <span className="text-white text-sm">{link.label}</span>
                            <div className={`w-10 h-6 rounded-full ${link.active ? 'bg-purple-500' : 'bg-gray-600'} relative`}>
                              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${link.active ? 'right-1' : 'left-1'}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-xl p-4">
                        <div className="text-white text-sm font-semibold mb-2">This Week</div>
                        <div className="text-purple-400 text-2xl font-bold">127</div>
                        <div className="text-gray-400 text-xs">Profile views</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500/20 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-pink-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
              </div>
            </Card>
          </div>
          
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
