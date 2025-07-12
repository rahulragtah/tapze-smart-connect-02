
import { Card } from "@/components/ui/card";
import { ShoppingCart, Palette, Truck } from "lucide-react";

const ProductOrderTimeline = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Order Today",
      date: "9 Jul",
      status: "completed"
    },
    {
      icon: Palette,
      title: "Design Confirmed",
      date: "11 Jul - 12 Jul",
      status: "current"
    },
    {
      icon: Truck,
      title: "Order Shipped",
      date: "14 Jul - 15 Jul",
      status: "pending"
    }
  ];

  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <Card className="glass border-white/20 bg-white/5 backdrop-blur-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Order & <span className="text-gradient">Customization Timeline</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From order to delivery - here's what to expect
            </p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/20 z-0" />
            <div className="absolute top-8 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    step.status === 'completed' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : step.status === 'current'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20'
                  }`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.date}</p>
                  
                  {step.status === 'current' && (
                    <div className="mt-2">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                        Current Step
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductOrderTimeline;
