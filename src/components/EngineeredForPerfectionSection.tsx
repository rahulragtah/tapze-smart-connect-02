
import { Card } from "@/components/ui/card";

const EngineeredForPerfectionSection = () => {
  return (
    <section className="py-12 lg:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Engineered for <span className="text-gradient">Perfection</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Every detail crafted with precision. Every feature designed for impact.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          {/* Large card - NFC Technology */}
          <Card className="glass p-8 rounded-3xl lg:col-span-2 lg:row-span-2 hover:scale-[1.02] transition-all duration-300">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="text-6xl mb-6">📡</div>
                <h3 className="text-3xl font-bold text-white mb-4">Advanced NFC Technology</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Latest NFC chip technology ensures instant connectivity with any smartphone. 
                  No apps required, works seamlessly across all devices and platforms.
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Universal Compatibility</div>
                    <div className="text-gray-400 text-sm">Works with 99% of smartphones</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Premium Materials */}
          <Card className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-white mb-3">Premium Materials</h3>
            <p className="text-gray-400 text-sm">
              Aircraft-grade aluminum and tempered glass options for maximum durability.
            </p>
          </Card>

          {/* Waterproof Design */}
          <Card className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-xl font-bold text-white mb-3">Waterproof Design</h3>
            <p className="text-gray-400 text-sm">
              IP67 rating ensures your card works perfectly in any weather condition.
            </p>
          </Card>

          {/* Security Features */}
          <Card className="glass p-6 rounded-2xl lg:col-span-2 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">Bank-Level Security</h3>
                <p className="text-gray-400 mb-4">
                  Your data is protected with enterprise-grade encryption and secure cloud infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="text-green-400 font-semibold text-sm">256-bit Encryption</div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="text-blue-400 font-semibold text-sm">GDPR Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Instant Setup */}
          <Card className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">5-Minute Setup</h3>
            <p className="text-gray-400 text-sm">
              Get started instantly with our intuitive onboarding process.
            </p>
          </Card>

          {/* Analytics Dashboard */}
          <Card className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Analytics</h3>
            <p className="text-gray-400 text-sm">
              Track engagement, measure ROI, and optimize your networking strategy.
            </p>
          </Card>

          {/* Global Reach */}
          <Card className="glass p-8 rounded-2xl lg:col-span-2 hover:scale-[1.02] transition-all duration-300">
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Network</h3>
              <p className="text-gray-400 mb-6">
                Join professionals from  all over countries who trust Tapze for their networking needs.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gradient">3</div>
                  <div className="text-gray-400 text-sm">Countries served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">7K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EngineeredForPerfectionSection;
