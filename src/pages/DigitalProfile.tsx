
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, QrCode, Share2, BarChart3, Shield, Zap, Palette, Store, Calendar, MessageSquare, Image, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DigitalProfile = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with center image active
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSignupOpen = () => {
    window.open('https://dashboard.tapze.in/register', '_blank');
   
  };

  const profileScreenshots = [
    {
      id: 1,
      name: "Pet Care Professional",
      image: "/lovable-uploads/vcard27.png",
      description: "Veterinarian profile with services showcase"
    },
    {
      id: 2,
      name: "Creative Professional",
      image: "/lovable-uploads/vcard28.png",
      description: "Designer profile with portfolio gallery"
    },
    {
      id: 3,
      name: "Business Consultant",
      image: "/lovable-uploads/vcard29.png",
      description: "Professional services and contact information"
    },
    {
      id: 4,
      name: "Interior Designer",
      image: "/lovable-uploads/vcard30.png",
      description: "Portfolio showcase with project gallery"
    },
    {
      id: 5,
      name: "Architecture Firm",
      image: "/lovable-uploads/vcard31.png",
      description: "Corporate profile with service offerings"
    }
  ];

  // Auto-animation effect
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profileScreenshots.length);
      }, 3000);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [profileScreenshots.length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profileScreenshots.length);
    }, 3000);
  };

  // Get visible images (5 at a time)
  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex - 2 + i + profileScreenshots.length) % profileScreenshots.length;
      visible.push({ ...profileScreenshots[index], position: i });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your <span className="text-gradient">Digital Profile</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create a stunning digital business card that showcases your professional identity. 
              Share your contact info, social links, and portfolio instantly.
            </p>
            
        {/* Custom Carousel */}
            <div className="mb-8 flex justify-center">
              <div className="max-w-6xl mx-auto overflow-hidden">
                <div 
                  className="flex items-start justify-center gap-2 md:gap-4 h-80 md:h-96 overflow-x-auto md:overflow-visible px-4 md:px-0"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {getVisibleImages().map((profile, index) => {
                    const isCenterImage = index === 2;
                    return (
                      <div
                        key={`${profile.id}-${currentIndex}`}
                        className={`transition-all duration-500 ease-in-out flex-shrink-0 ${
                          isCenterImage 
                            ? 'w-48 md:w-72 h-64 md:h-96 scale-105 md:scale-110 z-10' 
                            : 'w-40 md:w-56 h-56 md:h-80 scale-95 opacity-70'
                        }`}
                      >
                        <Card className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 h-full">
                          <div className="relative h-full">
                            <img 
                              src={profile.image}
                              alt={profile.name}
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                              <h3 className="font-semibold text-sm md:text-lg mb-1">{profile.name}</h3>
                              <p className="text-xs md:text-sm text-gray-200 opacity-90">{profile.description}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
                
                <p className="text-gray-400 text-sm mt-6">
                  Auto-rotating profile templates and designs
                </p>

                {/* Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {profileScreenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-purple-400 w-8' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need In One Profile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-purple-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">Mobile Optimized</CardTitle>
                <p className="text-gray-300">
                  Your profile looks perfect on any device. Responsive design ensures 
                  a great experience for everyone who views your card.
                </p>
              </Card>

              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-blue-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">QR Code Integration</CardTitle>
                <p className="text-gray-300">
                  Generate custom QR codes that link directly to your profile. 
                  Perfect for business cards, email signatures, and marketing materials.
                </p>
              </Card>

              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-green-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">Easy Sharing</CardTitle>
                <p className="text-gray-300">
                  Share your profile via link, QR code, or NFC tap. 
                  Make networking effortless and leave a lasting impression.
                </p>
              </Card>

              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">Analytics & Insights</CardTitle>
                <p className="text-gray-300">
                  Track profile views, link clicks, and engagement. 
                  Understand how your networking efforts are performing.
                </p>
              </Card>

              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">Privacy Controls</CardTitle>
                <p className="text-gray-300">
                  Control who sees what information. Set privacy levels 
                  and customize what data is shared with different audiences.
                </p>
              </Card>

              <Card className="glass p-6 text-center">
                <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-xl mb-3 text-white">Real-time Updates</CardTitle>
                <p className="text-gray-300">
                  Update your information instantly. Changes reflect immediately 
                  across all your shared profiles and tapZe cards.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Advanced Features for <span className="text-gradient">Professional Growth</span>
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Take your digital presence to the next level with these powerful features designed for modern professionals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="glass p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-pink-400" />
                </div>
                <CardTitle className="text-lg mb-3 text-white">Custom Themes</CardTitle>
                <p className="text-gray-300 text-sm">
                  Choose from 15+ professional themes or create your own brand colors and layouts.
                </p>
              </Card>

              <Card className="glass p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-lg mb-3 text-white">Mini Store</CardTitle>
                <p className="text-gray-300 text-sm">
                  Showcase and sell your products directly from your profile with integrated payment processing.
                </p>
              </Card>

              <Card className="glass p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-indigo-400" />
                </div>
                <CardTitle className="text-lg mb-3 text-white">Appointment Booking</CardTitle>
                <p className="text-gray-300 text-sm">
                  Let clients book appointments directly through your profile with calendar integration.
                </p>
              </Card>

              <Card className="glass p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-teal-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-teal-400" />
                </div>
                <CardTitle className="text-lg mb-3 text-white">Enquiry Forms</CardTitle>
                <p className="text-gray-300 text-sm">
                  Capture leads with customizable contact forms and automated follow-up responses.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Showcase Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Theme Options */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <Palette className="inline-block mr-3 text-pink-400" />
                  Personalize with Stunning Themes
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span className="text-gray-300">Modern Purple - Perfect for creatives</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span className="text-gray-300">Ocean Blue - Professional & trustworthy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span className="text-gray-300">Nature Green - Fresh & organic</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                    <span className="text-gray-300">Sunset Orange - Bold & energetic</span>
                  </div>
                </div>
                <p className="text-gray-400">
                  Match your brand identity with custom colors, fonts, and layouts according to your profession. 
                  Create a unique digital presence that stands out.
                </p>
              </div>

              {/* Mini Store */}
              <div>
                <Card className="glass p-6">
                  <div className="flex items-center mb-4">
                    <Store className="w-8 h-8 text-emerald-400 mr-3" />
                    <h4 className="text-xl font-semibold text-white">Your Mini Store</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Product Images</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Customer Reviews</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Transform your profile into a mini e-commerce store. Perfect for consultants, 
                    artists, and service providers.
                  </p>
                </Card>
              </div>

              {/* Appointment Booking */}
              <div>
                <Card className="glass p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-8 h-8 text-indigo-400 mr-3" />
                    <h4 className="text-xl font-semibold text-white">Smart Scheduling</h4>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                      <span className="text-sm text-gray-300">Available Slots</span>
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">24/7</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                      <span className="text-sm text-gray-300">Auto Reminders</span>
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Email & SMS</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                      <span className="text-sm text-gray-300">Calendar Sync</span>
                      <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">Google</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Streamline your booking process with automated scheduling and client management.
                  </p>
                </Card>
              </div>

              {/* Enquiry Forms */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <MessageSquare className="inline-block mr-3 text-teal-400" />
                  Capture Every Lead
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Custom Contact Forms</h5>
                    <p className="text-gray-400 text-sm">Design forms that match your business needs with drag-and-drop builder.</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Auto Responses</h5>
                    <p className="text-gray-400 text-sm">Set up automated email responses to never miss a potential client.</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Lead Management</h5>
                    <p className="text-gray-400 text-sm">Track and organize all your enquiries in one centralized dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass p-6 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
                Ready to Go Digital?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                Join thousands of professionals who've transformed their networking with digital profiles.
              </p>
              <div className="flex flex-col gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-12 py-3 md:py-4 text-base md:text-xl font-semibold rounded-full w-full md:w-auto"
                  onClick={handleSignupOpen}>
                  Create Your Digital Profile Now
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DigitalProfile;
