
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, QrCode, Share2, BarChart3, Shield, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DigitalProfile = () => {
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
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full"
            >
              Create Your Profile
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need in One Profile
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
                  across all your shared profiles and NFC cards.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Ready to Go Digital?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of professionals who've transformed their networking with digital profiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  View Demo
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
