
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [{
  name: "Starter",
  price: "Free",
  description: "Perfect for individual professionals",
  features: ["Premium NFC card", "Basic profile customization", "Unlimited taps", "Email support", "Standard shipping"],
  buttonText: "Get Started",
  popular: false
}, {
  name: "Business",
  price: "₹ 1499",
  description: "For professionals who want it all",
  features: ["Premium NFC card", "Full mobile app access", "Advanced analytics", "Lead capture & CRM sync", "Real-time updates", "Priority support", "Express shipping"],
  buttonText: "Get Pro Access",
  popular: true
}];

const PricingSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Choose Your <span className="text-gradient">Smart Card</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Select the perfect plan for your networking needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-8 ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'} bg-card`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-white">
                  {plan.price}
                  <span className="text-sm text-gray-400 font-normal">/card</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80'}`}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Need more than 10 cards? <a href="/contact" className="text-primary hover:underline">Contact us for bulk pricing</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
