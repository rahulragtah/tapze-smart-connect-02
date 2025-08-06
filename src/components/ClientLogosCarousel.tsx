
import { useEffect, useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const ClientLogosCarousel = () => {
  const logos = [
    { name: "Workflow catalyst", url: "/lovable-uploads/workflowcatelyst.png" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Bizfunds", url: "/lovable-uploads/bizfunds.png" },
    { name: "ca", url: "/lovable-uploads/ca.png" },
    { name: "LIC", url: "/lovable-uploads/lic.png" },
    { name: "lnl", url: "/lovable-uploads/lnl.png" },
    { name: "Uber", url: "/lovable-uploads/uber.png" },
    { name: "little smile", url: "/lovable-uploads/littlesmiles.svg" },
    { name: "Adobe", url: "/lovable-uploads/adobe-logo.svg" },
    { name: "Intel", url: "/lovable-uploads/looks.jpeg" },
    { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  ];

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-scroll functionality
    const autoScroll = setInterval(() => {
      api.scrollNext();
    }, 3000); // Scroll every 3 seconds

    return () => {
      clearInterval(autoScroll);
    };
  }, [api]);

  return (
    <section className="py-12 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Trusted by <span className="text-gradient">100+ brands</span> across India
          </h2>
          <p className="text-gray-400 text-lg">
            Join the leading companies that have revolutionized their networking
          </p>
        </div>
        
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {logos.map((logo, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="glass rounded-xl p-6 h-24 flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                  <img 
                    src={logo.url} 
                    alt={logo.name}
                    className="max-h-10 max-w-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            And many more companies trust Tapze for their networking needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;
