
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for individuals getting started with digital networking",
    features: [
      "1 NFC Business Card",
      "Digital Profile Creation",
      "Unlimited Profile Updates",
      "Basic Analytics",
      "QR Code Generation",
      "Email Support"
    ],
    popular: false,
    cardType: "Classic Black"
  },
  {
    name: "Professional",
    price: 89,
    description: "Ideal for professionals who want to make a lasting impression", 
    features: [
      "1 Premium Metal NFC Card",
      "Advanced Digital Profile",
      "Unlimited Profile Updates", 
      "Detailed Analytics & Insights",
      "Custom QR Codes",
      "Lead Management Tools",
      "Priority Support",
      "Custom Branding"
    ],
    popular: true,
    cardType: "Premium Metal"
  },
  {
    name: "Enterprise",
    price: 129,
    description: "For executives and enterprises requiring premium solutions",
    features: [
      "1 Transparent Glass NFC Card",
      "Premium Digital Profile",
      "Unlimited Profile Updates",
      "Advanced Analytics Dashboard",
      "Custom QR & NFC Programming",
      "CRM Integration",
      "White-label Solutions",
      "Dedicated Account Manager",
      "Custom Card Design"
    ],
    popular: false,
    cardType: "Transparent Glass"
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your networking needs. All plans include 
              lifetime software updates and unlimited profile changes.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.name} className={`glass relative ${plan.popular ? 'border-2 border-purple-500' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-300 mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold text-white mb-2">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-gray-400">
                      One-time purchase • {plan.cardType}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                  
                  <CardFooter className="pt-8">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : 'bg-gray-800 hover:bg-gray-700'
                      } text-white py-3 text-lg font-semibold`}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Is this a one-time purchase or subscription?
                </h3>
                <p className="text-gray-300">
                  All our plans are one-time purchases. You get lifetime access to your digital profile, 
                  unlimited updates, and ongoing software improvements at no additional cost.
                </p>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Can I upgrade my plan later?
                </h3>
                <p className="text-gray-300">
                  Yes! You can upgrade to a higher tier at any time. We'll apply the difference 
                  in pricing and send you your new premium card.
                </p>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Do you offer bulk discounts?
                </h3>
                <p className="text-gray-300">
                  Absolutely! We offer special pricing for teams and enterprises. Contact our sales 
                  team for custom quotes on orders of 10 or more cards.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
