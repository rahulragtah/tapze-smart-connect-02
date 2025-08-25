
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>Privacy Policy | Tapze NFC Business Cards | Data Protection & Security</title>
        <meta name="description" content="Read Tapze's Privacy Policy to understand how we collect, use, and protect your personal information when using our NFC business cards and services." />
        <meta name="keywords" content="tapze privacy policy, data protection, privacy rights, information security, NFC card privacy" />
        <link rel="canonical" href="https://tapze.in/privacy-policy" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="Privacy Policy | Tapze NFC Business Cards" />
        <meta property="og:description" content="Read Tapze's Privacy Policy to understand how we collect, use, and protect your personal information." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta property="og:url" content="https://tapze.in/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Tapze NFC Business Cards" />
        <meta name="twitter:description" content="Read Tapze's Privacy Policy to understand how we protect your personal information." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta name="twitter:site" content="@tapze" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <div className="text-gray-300 space-y-4">
                <p>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support.</p>
                <p><strong>Personal Information:</strong> Name, email address, phone number, job title, company information, and other professional details you choose to include in your digital profile.</p>
                <p><strong>Usage Data:</strong> Information about how you use our services, including profile views, link clicks, and engagement metrics.</p>
                <p><strong>Device Information:</strong> Information about the device and browser you use to access our services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Create and manage your digital profile</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Provide analytics and insights about your profile performance</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Information Sharing</h2>
              <div className="text-gray-300 space-y-4">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Your Consent:</strong> When you choose to share your digital profile with others</li>
                  <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our services</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
              <div className="text-gray-300 space-y-4">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Your Rights and Choices</h2>
              <div className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, update, or delete your personal information</li>
                  <li>Control what information is shared in your digital profile</li>
                  <li>Opt out of certain notifications and communications</li>
                  <li>Request a copy of your data</li>
                  <li>Deactivate your account at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Cookies and Tracking</h2>
              <div className="text-gray-300 space-y-4">
                <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Changes to This Policy</h2>
              <div className="text-gray-300 space-y-4">
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">8. Contact Us</h2>
              <div className="text-gray-300 space-y-4">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                <p>Email: contact@tapze.in<br />
                Phone: +91 9990909789<br />
                Registered Address: 3/1, Subhash Nagar, New Delhi, 110027</p>
              </div>
            </section>

            <div className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-800">
              <p>Last Updated:  {monthName} {currentYear}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default PrivacyPolicy;
