import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Shield, Users, Smartphone, Globe, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const Profile = () => {
  const [billingToggle, setBillingToggle] = useState(true); // true for Annual, false for Monthly

  const features = [
    { icon: <Globe className="w-5 h-5" />, title: "Digital Business Card", description: "Create stunning digital profiles" },
    { icon: <Smartphone className="w-5 h-5" />, title: "NFC & QR Integration", description: "Seamless contact sharing" },
    { icon: <Users className="w-5 h-5" />, title: "Contact Management", description: "Organize your connections" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Analytics Dashboard", description: "Track profile engagement" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Discover Next Level
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Digital Networking
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Transform your networking experience with Tapze's innovative digital profile solutions. 
            Connect, share, and grow your professional network effortlessly.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pricing and Plans
            </h2>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-medium ${!billingToggle ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingToggle(!billingToggle)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingToggle ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingToggle ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${billingToggle ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {billingToggle && (
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 border-green-200">
                  SAVE 20%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="relative overflow-hidden border-2 border-border">
              <CardHeader className="pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Tapze.Profile</CardTitle>
                    <CardDescription>Best for Individuals</CardDescription>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">Free</span>
                  <span className="text-muted-foreground ml-2">for life</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Included with a one time purchase
                </p>
              </CardHeader>

              <CardContent>
                <Button className="w-full mb-6 bg-muted hover:bg-muted/80 text-foreground" size="lg">
                  Choose Device
                </Button>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Standard Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">190+ Profile Theme Styles</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Unlimited Link Content</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Two Way Contact Exchange</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Basic Contact Management</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative overflow-hidden border-2 border-primary shadow-lg">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                7 DAY FREE TRIAL
              </div>
              
              <CardHeader className="pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">Tapze.Profile</CardTitle>
                      <Badge className="bg-primary/10 text-primary border-primary/20">Plus</Badge>
                    </div>
                    <CardDescription>Best for Professionals</CardDescription>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    ₹{billingToggle ? '800' : '100'}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{billingToggle ? 'year' : 'month'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Less Than ₹{billingToggle ? '2.20' : '3.30'} per day
                </p>
              </CardHeader>

              <CardContent>
                <Button className="w-full mb-6 bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Tapze.Profile+ Advanced Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">480+ Profile Theme Styles</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">AI Paper Business Card Scanner</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Advanced Contact Management</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Export Contacts Collected</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Analytics & Insights</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Priority Customer Support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Custom Branding Options</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current text-yellow-500" />
                <span className="text-sm">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;