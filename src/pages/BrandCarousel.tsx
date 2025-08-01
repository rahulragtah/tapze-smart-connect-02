
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Monitor, 
  Building2, 
  Heart, 
  Home, 
  Users, 
  TrendingUp, 
  Shield, 
  Briefcase,
  CheckCircle,
  Star,
  Globe,
  Award,
  Utensils,
  Scissors,
  Gift,
  Factory,
  Building,
  Cross
} from "lucide-react";

const BrandCarousel = () => {
  const industries = [
    {
      title: "Technology",
      description: "Software companies, IT services, and tech startups rely on Tapze for seamless digital networking at conferences and client meetings.",
      icon: Monitor,
      color: "text-blue-400"
    },
    {
      title: "Finance & Banking",
      description: "Financial institutions use our secure tapZe cards to maintain professional standards while embracing digital transformation.",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Healthcare",
      description: "Medical professionals and healthcare organizations trust Tapze for hygienic, contactless information sharing.",
      icon: Heart,
      color: "text-red-400"
    },
    {
      title: "Real Estate",
      description: "Real estate agents and firms use our tapZe cards to instantly share property listings and contact information.",
      icon: Home,
      color: "text-orange-400"
    },
    {
      title: "Restaurants & Food",
      description: "Restaurants, cafes, and food establishments use Tapze cards for seamless customer engagement and digital menu sharing.",
      icon: Utensils,
      color: "text-yellow-400"
    },
    {
      title: "Beauty & Salons",
      description: "Beauty salons, spas, and wellness centers leverage Tapze for appointment booking and service information sharing.",
      icon: Scissors,
      color: "text-pink-400"
    },
    {
      title: "Gift Shops & Retail",
      description: "Gift shops and retail stores use our tapZe cards to enhance customer experience and share product catalogs.",
      icon: Gift,
      color: "text-purple-400"
    },
    {
      title: "Manufacturing",
      description: "Manufacturing companies rely on Tapze for B2B networking, supplier connections, and industrial partnerships.",
      icon: Factory,
      color: "text-gray-400"
    },
    {
      title: "Hotels & Hospitality",
      description: "Hotels, resorts, and hospitality businesses use Tapze for guest services and staff networking solutions.",
      icon: Building,
      color: "text-indigo-400"
    },
    {
      title: "Hospitals & Medical",
      description: "Hospitals and medical facilities trust Tapze for secure, hygienic patient information and staff coordination.",
      icon: Cross,
      color: "text-emerald-400"
    }
  ];

  const benefits = [
    "Reducing environmental impact with digital-first solutions",
    "Improving networking efficiency by 300%",
    "Enhancing brand image with cutting-edge technology",
    "Increasing lead conversion rates through instant contact sharing",
    "Streamlining follow-up processes with automated integrations"
  ];

  const features = [
    "Professional-grade NFC technology with 99.9% reliability",
    "Customizable branding options for corporate identity",
    "Bulk ordering solutions with competitive pricing",
    "Dedicated account management and support",
    "Analytics and insights for networking performance",
    "Enterprise-level security and data protection"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gradient">Our Impact</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join 100+ leading companies across India who trust Tapze for innovative NFC business card solutions
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center glass">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-gradient mb-2">7k+</div>
                <p className="text-muted-foreground">Customer trusted Us</p>
              </CardContent>
            </Card>
            <Card className="text-center glass">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-gradient mb-2">99.9%</div>
                <p className="text-muted-foreground">Reliability Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center glass">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-gradient mb-2">300%</div>
                <p className="text-muted-foreground">Efficiency Boost</p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Section */}
          <section className="mb-16">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  Why Companies Choose Tapze
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Industries Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Industries We Serve
              </h2>
              <p className="text-muted-foreground text-lg">
                Transforming networking across diverse sectors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry, index) => {
                const IconComponent = industry.icon;
                return (
                  <Card key={index} className="glass hover:scale-105 transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors`}>
                          <IconComponent className={`w-8 h-8 ${industry.color}`} />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{industry.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{industry.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Partnership Benefits */}
          {/* <section className="mb-16">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-primary" />
                  Partnership Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center mb-8 text-lg">
                  When you partner with Tapze, you join a community of forward-thinking companies that are:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section> */}

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-3">
                  <Briefcase className="w-8 h-8 text-primary" />
                  Ready to Get Started?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6 text-lg">
                  Join the companies that are transforming their networking. Contact our enterprise team to discuss bulk orders, custom branding, and partnership opportunities.
                </p>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">Email:</strong> enterprise@tapze.com</p>
                  <p><strong className="text-white">Phone:</strong> +91 9990909789</p>
                  <p>
                    <strong className="text-white">Schedule a demo:</strong>{" "}
                    <a href="/contact" className="text-primary hover:text-primary/80 transition-colors underline">
                      Contact us today
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer Stats */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Join 100+ companies that trust Tapze for their networking needs.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandCarousel;
