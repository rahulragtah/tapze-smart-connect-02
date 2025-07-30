
import { Card } from "@/components/ui/card";

const benefits = [
  {
    title: "Secure & Private",
    description: "Your data is encrypted and protected with enterprise-grade security",
    icon: "🔒"
  },
  {
    title: "Beautiful Design",
    description: "Minimalist aesthetics that reflect your professional brand",
    icon: "✨"
  },
  {
    title: "Fast Setup",
    description: "Get up and running in minutes, not hours",
    icon: "⚡"
  },
  {
    title: "Ongoing Support",
    description: "One-time card purchase with continuous software updates",
    icon: "🚀"
  }
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">Tapze?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trustworthy, elegant, and simple - everything you need for professional networking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Card className="glass p-4 md:p-8 rounded-3xl max-w-4xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-xl md:text-3xl font-bold text-gradient mb-1 md:mb-2">5K+</div>
                <div className="text-gray-400 text-xs md:text-base">Cards Delivered</div>
              </div>
              <div>
                <div className="text-xl md:text-3xl font-bold text-gradient mb-1 md:mb-2">50+</div>
                <div className="text-gray-400 text-xs md:text-base">Businesses Trust Us</div>
              </div>
              <div>
                <div className="text-xl md:text-3xl font-bold text-gradient mb-1 md:mb-2">99%</div>
                <div className="text-gray-400 text-xs md:text-base">Customer Satisfaction</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
