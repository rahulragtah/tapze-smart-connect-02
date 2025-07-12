
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    quote: "Tapze completely changed how I network. The analytics feature helps me understand which connections are most valuable.",
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez", 
    role: "Freelance Designer",
    company: "Creative Studio",
    quote: "The card quality is exceptional and the app is so intuitive. My clients are always impressed when I share my details.",
    avatar: "MR"
  },
  {
    name: "Emma Thompson",
    role: "Business Consultant", 
    company: "Growth Partners",
    quote: "Real-time updates are a game changer. I can modify my profile for different events without reprinting cards.",
    avatar: "ET"
  },
  {
    name: "David Park",
    role: "Startup Founder",
    company: "InnovateLab", 
    quote: "Tapze gives me a professional edge. The seamless experience impresses investors and potential partners.",
    avatar: "DP"
  },
  {
    name: "Lisa Wang",
    role: "Sales Manager",
    company: "SalesForce Pro",
    quote: "The lead capture feature has increased my follow-up rate by 300%. It's an essential tool for any sales professional.",
    avatar: "LW"
  },
  {
    name: "James Miller",
    role: "Creative Director", 
    company: "Brand Studio",
    quote: "Beautiful design meets practical functionality. Tapze perfectly represents my personal brand in every interaction.",
    avatar: "JM"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their networking experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
