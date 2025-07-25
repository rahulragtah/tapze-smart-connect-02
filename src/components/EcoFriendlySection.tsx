
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EcoFriendlySection = () => {
  const benefits = [
    {
      icon: "🌱",
      title: "Carbon Neutral",
      description: "Our tapZe cards reduce paper waste by 95% compared to traditional business cards"
    },
    {
      icon: "♻️",
      title: "Sustainable Materials",
      description: "Made from recycled and biodegradable materials for eco-conscious professionals"
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description: "Join thousands of professionals making networking more sustainable"
    },
    {
      icon: "📱",
      title: "Digital First",
      description: "Eliminate paper waste while maintaining professional connections"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-green-900/20 to-background relative overflow-hidden">
      {/* Nature background image */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 to-background/90" />
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-emerald-500 rounded-full blur-2xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🌿</span>
            <span className="text-green-400 font-semibold">Eco-Friendly Networking</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Networking for a <span className="text-gradient bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Greener Future</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Make a positive impact on the environment while building professional connections. 
            Tapze's sustainable approach to networking helps reduce waste and carbon footprint.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">95%</div>
            <p className="text-gray-300">Less Paper Waste</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">5K+</div>
            <p className="text-gray-300">Trees Saved</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">100%</div>
            <p className="text-gray-300">Recyclable Materials</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          {/* <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg">
            Join the Green Revolution
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default EcoFriendlySection;
