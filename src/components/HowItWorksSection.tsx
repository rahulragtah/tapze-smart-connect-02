
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Tap the Card",
    description: "Simply tap your Tapze card to any NFC-enabled device",
    icon: "📱"
  },
  {
    number: "02", 
    title: "Share Instantly",
    description: "Your professional profile opens instantly with all your details",
    icon: "⚡"
  },
  {
    number: "03",
    title: "Update Anytime", 
    description: "Change links, info, and content in real-time through the app",
    icon: "🔄"
  },
  {
    number: "04",
    title: "Track Performance",
    description: "Monitor engagement and connections through detailed analytics",
    icon: "📊"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-gradient">Tapze</span> Works ?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to revolutionize your networking experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-purple-400 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              
              {/* Connection line for desktop */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
