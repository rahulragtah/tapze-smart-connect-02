
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>By accessing and using Tapze's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
              <div className="text-gray-300 space-y-4">
                <p>Tapze provides NFC-enabled business cards and digital profile management services. Our service allows users to create, customize, and share digital business profiles through NFC technology and web-based platforms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. User Account and Registration</h2>
              <div className="text-gray-300 space-y-4">
                <p>To use certain features of our service, you must register for an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Acceptable Use</h2>
              <div className="text-gray-300 space-y-4">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload, post, or transmit any content that is unlawful, harmful, or objectionable</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Attempt to gain unauthorized access to other accounts or systems</li>
                  <li>Use the service for any commercial purpose without our written consent</li>
                  <li>Violate any applicable local, state, national, or international law</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Content and Intellectual Property</h2>
              <div className="text-gray-300 space-y-4">
                <p>You retain ownership of the content you create and upload to your digital profile. However, by using our service, you grant us a limited, non-exclusive license to use, store, and display your content as necessary to provide our services.</p>
                <p>All Tapze trademarks, logos, and service marks are the property of Tapze. You may not use our intellectual property without our prior written consent.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Payment and Refunds</h2>
              <div className="text-gray-300 space-y-4">
                <p>Payment for tapZe cards and services is required at the time of purchase. We accept major credit cards and other payment methods as indicated on our website.</p>
                <p>Refunds are available within 30 days of purchase for unopened, unused products. Digital services and customized products may not be eligible for refunds. See our Refund Policy for complete details.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
              <div className="text-gray-300 space-y-4">
                <p>To the maximum extent permitted by law, Tapze shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">8. Service Availability</h2>
              <div className="text-gray-300 space-y-4">
                <p>We strive to maintain high service availability but cannot guarantee uninterrupted access. We may suspend or terminate service for maintenance, updates, or other operational reasons with reasonable notice when possible.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">9. Termination</h2>
              <div className="text-gray-300 space-y-4">
                <p>You may terminate your account at any time by contacting us. We may terminate or suspend your account immediately, without prior notice, for violations of these Terms or for any other reason we deem necessary.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">10. Changes to Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">11. Governing Law</h2>
              <div className="text-gray-300 space-y-4">
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">12. Contact Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>For questions about these Terms of Service, please contact us at:</p>
                <p>Email: contact@tapze.in<br />
                Phone: +91 9990909789<br />
                Registered Address: 3/1, Subhash Nagar, New Delhi, 110027</p>
              </div>
            </section>

            <div className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-800">
              <p>Last Updated: {monthName} {currentYear}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
