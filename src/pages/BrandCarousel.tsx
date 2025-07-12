
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BrandCarousel = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-white">Brand Partnerships</h1>
          <div className="prose prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Trusted by Leading Companies</h2>
              <div className="text-gray-300 space-y-4">
                <p>Tapze is proud to partner with over 100 leading brands across India, providing them with innovative NFC business card solutions that revolutionize professional networking.</p>
                <p>Our clients range from Fortune 500 companies to innovative startups, all united by their commitment to modern, efficient networking solutions.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Why Companies Choose Tapze</h2>
              <div className="text-gray-300 space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Professional-grade NFC technology with 99.9% reliability</li>
                  <li>Customizable branding options for corporate identity</li>
                  <li>Bulk ordering solutions with competitive pricing</li>
                  <li>Dedicated account management and support</li>
                  <li>Analytics and insights for networking performance</li>
                  <li>Enterprise-level security and data protection</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Industries We Serve</h2>
              <div className="text-gray-300 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Technology</h3>
                    <p>Software companies, IT services, and tech startups rely on Tapze for seamless digital networking at conferences and client meetings.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Finance & Banking</h3>
                    <p>Financial institutions use our secure NFC cards to maintain professional standards while embracing digital transformation.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Healthcare</h3>
                    <p>Medical professionals and healthcare organizations trust Tapze for hygienic, contactless information sharing.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Real Estate</h3>
                    <p>Real estate agents and firms use our NFC cards to instantly share property listings and contact information.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Partnership Benefits</h2>
              <div className="text-gray-300 space-y-4">
                <p>When you partner with Tapze, you join a community of forward-thinking companies that are:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reducing environmental impact with digital-first solutions</li>
                  <li>Improving networking efficiency by 300%</li>
                  <li>Enhancing brand image with cutting-edge technology</li>
                  <li>Increasing lead conversion rates through instant contact sharing</li>
                  <li>Streamlining follow-up processes with automated integrations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Get Started</h2>
              <div className="text-gray-300 space-y-4">
                <p>Ready to join the companies that are transforming their networking? Contact our enterprise team to discuss bulk orders, custom branding, and partnership opportunities.</p>
                <p>Email: enterprise@tapze.com<br />
                Phone: +91 98765 43210<br />
                Schedule a demo: <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact us today</a></p>
              </div>
            </section>

            <div className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-800">
              <p>Join 100+ companies that trust Tapze for their networking needs.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandCarousel;
