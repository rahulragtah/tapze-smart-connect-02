
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute custombg  animate-float" />
      
      {/* Main content - Left-Right Layout */}
      <div className="relative z-10 max-w-7xl mx-auto  flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-purple-400 font-semibold">Next-Gen Networking</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Your <span className="text-gradient">Digital Identity</span> in One Tap
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
              Premium Smart business cards paired with intelligent software that transforms how you network and grow your professional presence.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-black">✓</span>
                </div>
                <span className="text-gray-300">Instant contact sharing with a single tap</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-black">✓</span>
                </div>
                <span className="text-gray-300">Real-time profile updates and analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-black">✓</span>
                </div>
                <span className="text-gray-300">Premium materials, unlimited possibilities</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                <Link to="/buy-nfc-card">Get Your tapZe Card</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-white">7K+</div>
                <div className="text-gray-400">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-gray-400">Connections Made</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right side - Hero Visual */}
          <img className="main-banner" src="/lovable-uploads/main-banner.png" alt="Main Banner" />
          
          {/* Right side - Hero Visual */}
          {/* <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="glass p-8 rounded-3xl">
              <div className="flex flex-col items-center gap-8">
                
                <div className="relative">
                  <div className="w-64 h-40 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                    <img 
                      src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png" 
                      alt="Tapze Logo" 
                      className="h-8 w-auto z-10"
                    />
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-white text-xs">NFC</span>
                  </div>
                </div>
                
                
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full animate-pulse" />
                  <div className="flex flex-col gap-1">
                    <div className="w-12 h-1 bg-purple-500 rounded-full animate-pulse" />
                    <div className="w-8 h-1 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="w-10 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
                
                
                <div className="w-40 h-72 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 bg-gradient-to-b from-purple-600/20 to-pink-600/20 rounded-2xl flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-4 bg-gray-600 rounded-full" />
                    <div className="w-20 h-3 bg-gray-700 rounded" />
                    <div className="w-18 h-3 bg-gray-700 rounded" />
                    <div className="w-22 h-3 bg-purple-500 rounded animate-pulse" />
                    <div className="w-18 h-3 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div> */}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
