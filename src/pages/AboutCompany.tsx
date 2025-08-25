
import { Helmet } from "react-helmet";  
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, Globe } from "lucide-react";

const AboutCompany = () => {
  // SEO structured data for about page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Tapze",
    "description": "Learn about Tapze's mission to revolutionize professional networking through innovative NFC technology and digital business solutions",
    "url": "https://tapze.in/about-company",
    "mainEntity": {
      "@type": "Organization",
      "name": "Tapze",
      "description": "Revolutionary NFC business card solutions for modern professionals",
      "foundingDate": "2023",
      "employee": [
        {
          "@type": "Person",
          "name": "Brijesh Kannaujia",
          "jobTitle": "Product Excellence"
        },
        {
          "@type": "Person", 
          "name": "Sunil Kumar",
          "jobTitle": "Chief Technology Officer"
        },
        {
          "@type": "Person",
          "name": "Rahul Ragtah", 
          "jobTitle": "Head of Design"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>About Tapze | Revolutionizing Professional Networking with NFC Technology</title>
        <meta name="description" content="Learn about Tapze's mission to revolutionize professional networking through innovative NFC technology. Meet our team and discover our values." />
        <meta name="keywords" content="about tapze, nfc technology, professional networking, digital business solutions, team, company story, mission, vision" />
        <link rel="canonical" href="https://tapze.in/about-company" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="About Tapze | Revolutionizing Professional Networking" />
        <meta property="og:description" content="Learn about Tapze's mission to revolutionize professional networking through innovative NFC technology and digital business solutions." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/tapze-about.png" />
        <meta property="og:url" content="https://tapze.in/about-company" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Tapze | Revolutionizing Professional Networking" />
        <meta name="twitter:description" content="Learn about Tapze's mission to revolutionize professional networking through innovative NFC technology and digital business solutions." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/tapze-about.png" />
        <meta name="twitter:site" content="@tapze" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">Tapze</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Revolutionizing professional networking through innovative NFC technology 
              and digital business solutions.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-8 lg:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Tapze is a product By WEBFARMS INFOTECH LLP, founded with a vision to transform how professionals connect and share information, 
                  Tapze emerged from the need to bridge the gap between traditional business cards 
                  and modern digital communication.
                </p>
                <p className="text-gray-300 mb-6">
                  Our journey began when we realized that despite living in a digital age, 
                  most professionals were still relying on outdated paper business cards that 
                  often ended up lost or forgotten.
                </p>
                <p className="text-gray-300">
                  Today, we're proud to be at the forefront of the digital networking revolution, 
                  helping thousands of professionals make meaningful connections with just a tap.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/tapze-about.png" 
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-8 glass rounded-3xl">
                <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-300">
                  To empower professionals with cutting-edge NFC technology that simplifies 
                  networking, enhances connections, and drives business growth in the digital age.
                </p>
              </div>
              <div className="text-center p-8 glass rounded-3xl">
                <Globe className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  To become the global leader in digital networking solutions, making traditional 
                  business cards obsolete and creating a more connected professional world.
                </p>
              </div>
            </div>
          </div>
        </section>

       
        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The passionate individuals behind Tapze's success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center glass p-6 rounded-3xl">
                <img 
                  src="/lovable-uploads/brijesh.png" 
                  alt="CEO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Brijesh Kannaujia</h3>
                <p className="text-purple-400 mb-3">Product Excellance</p>
                <p className="text-gray-300 text-sm">
                Strategic product visionary with 15+ years of leading innovation and excellence.
                </p>
              </div>
              
              <div className="text-center glass p-6 rounded-3xl">
                <img 
                  src="/lovable-uploads/sunil.png" 
                  alt="CTO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Sunil Kumar</h3>
                <p className="text-purple-400 mb-3">Chief Technology Officer</p>
                <p className="text-gray-300 text-sm">
                With over 15 years of experience, a technology expert focused on NFC innovation, scalable digital architectures, and strategic business development.
                </p>
              </div>
              
              <div className="text-center glass p-6 rounded-3xl">
                <img 
                  src="/lovable-uploads/rahul.png" 
                  alt="Head of Design"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Rahul Ragtah</h3>
                <p className="text-purple-400 mb-3">Head of Design</p>
                <p className="text-gray-300 text-sm">
                Experienced Creative Director with over 12 years of crafting exceptional user experiences and forward-thinking product designs.
                </p>
              </div>
            </div>
          </div>
        </section>

         {/* Values */}
         <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push boundaries to deliver cutting-edge solutions that 
                  meet evolving professional needs.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Connection</h3>
                <p className="text-gray-300">
                  We believe in the power of meaningful connections and strive to 
                  facilitate authentic professional relationships.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-300">
                  We are committed to delivering exceptional quality in every product 
                  and service we offer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Impact</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">7K+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">5K+</div>
                <div className="text-gray-300">Cards Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">3</div>
                <div className="text-gray-300">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">99%</div>
                <div className="text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>


        {/* Contact CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-gradient">Connect</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already transformed their networking with Tapze.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/buy-nfc-card"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Get Your NFC Card
              </a>
              <a 
                href="/contact"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default AboutCompany;
