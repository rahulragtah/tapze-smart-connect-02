
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Tap, Share2, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Choose Your Card",
    description: "Select from our premium collection of NFC business cards. Each design is crafted for professionals who value quality and innovation.",
    icon: Smartphone,
    color: "purple"
  },
  {
    number: "02", 
    title: "Customize Your Profile",
    description: "Create your digital business card with all your contact information, social links, portfolio, and professional details.",
    icon: Users,
    color: "blue"
  },
  {
    number: "03",
    title: "Tap to Share",
    description: "Simply tap your NFC card on any smartphone to instantly share your digital profile. No apps required for recipients.",
    icon: Tap,
    color: "green"
  },
  {
    number: "04",
    title: "Track & Connect",
    description: "Monitor profile views, track engagement, and build meaningful professional relationships with powerful analytics.",
    icon: Share2,
    color: "orange"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How <span className="text-gradient">Tapze Works</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your networking in 4 simple steps. From choosing your card 
              to building meaningful connections, we've made it effortless.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 1;
                
                return (
                  <div key={step.number} className={`flex gap-8 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <Card className="glass p-8 flex-1">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-6">
                          <div className={`w-16 h-16 bg-${step.color}-600/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-8 h-8 text-${step.color}-400`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-3xl font-bold text-gradient">{step.number}</span>
                              <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center w-16">
                        <ArrowRight className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Why Choose NFC Over Traditional Cards?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300">Contactless</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
                <div className="text-gray-300">Always Updated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
                <div className="text-gray-300">Paper Waste</div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
