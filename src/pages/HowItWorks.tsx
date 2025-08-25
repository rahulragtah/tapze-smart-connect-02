
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Hand, Share2, Users, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

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
    icon: Hand,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Tapze NFC Business Cards",
    "description": "Learn how to get started with Tapze NFC business cards in 4 simple steps",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description
    }))
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>How Tapze Works | 4 Simple Steps to Smart Networking | NFC Business Cards</title>
        <meta name="description" content="Learn how Tapze NFC business cards work in 4 simple steps. Choose your card, customize your profile, tap to share, and track connections effortlessly." />
        <meta name="keywords" content="how tapze works, NFC card setup, digital business card guide, smart networking, contactless sharing" />
        <link rel="canonical" href="https://tapze.in/how-it-works" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="How Tapze Works | 4 Simple Steps to Smart Networking" />
        <meta property="og:description" content="Learn how Tapze NFC business cards work in 4 simple steps. Transform your networking effortlessly." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta property="og:url" content="https://tapze.in/how-it-works" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Tapze Works | 4 Simple Steps to Smart Networking" />
        <meta name="twitter:description" content="Learn how Tapze NFC business cards work in 4 simple steps." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta name="twitter:site" content="@tapze" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 px-4 text-center">
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

        {/* Steps Section - Redesigned */}
        <section className="py-12 lg:py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 rounded-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 rounded-full text-purple-400 text-sm font-medium mb-4">
                  <CheckCircle className="w-4 h-4" />
                  Simple Process
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Get Started in Minutes
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Our streamlined process makes it easy to create and share your professional digital presence
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isEven = index % 2 === 1;
                  
                  return (
                    <div key={step.number} className="group">
                      <Card className="glass border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
                        <CardContent className="p-8">
                          {/* Step Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`relative w-16 h-16 bg-gradient-to-br from-${step.color}-500/20 to-${step.color}-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className={`w-8 h-8 text-${step.color}-400`} />
                              {/* Glow effect */}
                              <div className={`absolute inset-0 bg-${step.color}-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-bold text-gradient">{step.number}</span>
                                <div className="h-px bg-gradient-to-r from-purple-500 to-pink-500 flex-1"></div>
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors duration-300">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Step Description */}
                          <p className="text-gray-300 text-base leading-relaxed">
                            {step.description}
                          </p>
                          
                          {/* Progress Indicator */}
                          <div className="mt-6 flex items-center gap-2">
                            {Array.from({ length: 4 }, (_, i) => (
                              <div 
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  i <= index 
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 flex-1' 
                                    : 'bg-gray-700 w-8'
                                }`}
                              />
                            ))}
                          </div>
                        </CardContent>
                        
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      </Card>
                      
                      {/* Connection Arrow for Desktop */}
                      {index < steps.length - 1 && index % 2 === 0 && (
                        <div className="hidden lg:flex absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 z-20">
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                            <ArrowRight className="w-5 h-5" />
                            <div className="w-8 h-px bg-gradient-to-l from-purple-500/50 to-transparent"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Call to Action */}
              {/* <div className="text-center mt-16">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div> */}
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
              <Link to="/buy-nfc-card">Get your TapZe card Today</Link>
              
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default HowItWorks;
