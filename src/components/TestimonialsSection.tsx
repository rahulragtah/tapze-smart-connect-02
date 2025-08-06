
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const testimonials = [
  {
    name: "Tanuja G",
    role: "Owner",
    company: "Little Smiles Toy store",
    quote: "Absolutely love this tapZe card! It's sleek, modern, and makes networking incredibly easy. Just a simple tap and all my contact details, social links, and portfolio are instantly shared.",
    avatar: "TG"
  },
  {
    name: "Nitish Pandey", 
    role: "Head of Strategy",
    company: "Workflow Catlyst",
    quote: "The card quality is exceptional and the app is so intuitive. My clients are always impressed when I share my details.",
    avatar: "NP"
  },
  {
    name: "Siddharth Chaturvedi",
    role: "Direct Of Product", 
    company: "Auriolus Finvest Private Limited",
    quote: "Real-time updates are a game changer. I can modify my profile for different events without reprinting cards.",
    avatar: "ET"
  },
  {
    name: "Rakesh Singh",
    role: "Delivery Manager",
    company: "FIS", 
    quote: "Beautiful design meets practical functionality. Tapze card perfectly represents my personal brand in every interaction.",
    avatar: "DP"
  },
  {
    name: "Manish Mishra",
    role: "Director Engineering",
    company: "Bird Eye",
    quote: "The lead capture feature has increased my follow-up rate by 300%. It's an essential tool for any sales professional.",
    avatar: "LW"
  },
  {
    name: "R Narayan",
    role: "CEO", 
    company: "Power2SME",
    quote: "Tapze card gives me a professional edge. The seamless experience impresses investors and potential partners.",
    avatar: "JM"
  }
];

const TestimonialsSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  // Group testimonials into sets of 3 for desktop, 1 for mobile
  const groupedTestimonialsDesktop = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonialsDesktop.push(testimonials.slice(i, i + 3));
  }

  return (
    <section className="py-12 lg:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their networking experience
          </p>
        </div>
        
        {/* Mobile Carousel - One card at a time */}
        <div className="md:hidden">
          <Carousel
            plugins={[plugin.current as any]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="px-4">
                    <Card className="glass p-6 rounded-2xl">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-gray-400 text-sm">{testimonial.role}</div>
                          <div className="text-gray-500 text-xs">{testimonial.company}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex text-yellow-400 mt-4">
                        {"★".repeat(5)}
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Carousel - Three cards at a time */}
        <div className="hidden md:block">
          <Carousel
            plugins={[plugin.current as any]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {groupedTestimonialsDesktop.map((group, groupIndex) => (
                <CarouselItem key={groupIndex}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.map((testimonial, index) => (
                      <Card key={index} className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="text-white font-semibold">{testimonial.name}</div>
                            <div className="text-gray-400 text-sm">{testimonial.role}</div>
                            <div className="text-gray-500 text-xs">{testimonial.company}</div>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex text-yellow-400 mt-4">
                          {"★".repeat(5)}
                        </div>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
