import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const CancellationPolicy = () => {
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>Cancellation Policy | Tapze NFC Business Cards | Order Cancellation</title>
        <meta name="description" content="Learn about Tapze's order cancellation policy for NFC business cards. Understand cancellation terms, refund processing, and how to cancel your order." />
        <meta name="keywords" content="tapze cancellation policy, cancel order, NFC card cancellation, order refund, cancellation terms" />
        <link rel="canonical" href="https://tapze.in/cancellation-policy" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="Cancellation Policy | Tapze NFC Business Cards" />
        <meta property="og:description" content="Learn about Tapze's order cancellation policy for NFC business cards and how to cancel your order." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta property="og:url" content="https://tapze.in/cancellation-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cancellation Policy | Tapze NFC Business Cards" />
        <meta name="twitter:description" content="Learn about Tapze's order cancellation policy for NFC business cards." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta name="twitter:site" content="@tapze" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
        <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Cancellation Policy</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Clear and transparent cancellation terms for Tapze NFC card orders
            </p>
          </div>

          {/* Policy Content */}
          <div className="glass p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Order Cancellation</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  You may cancel your order for Tapze cards under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancellation must be requested within 24 hours of placing the order</li>
                  <li>Orders that have entered production cannot be cancelled</li>
                  <li>Custom designed cards cannot be cancelled once design approval is given</li>
                  <li>Bulk orders (50+ cards) have a 48-hour cancellation window</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">How to Cancel</h2>
              <div className="space-y-4 text-gray-300">
                <p>To cancel your order, please:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our customer support team at contact@tapze.in</li>
                  <li>Provide your order number and cancellation reason</li>
                  <li>Our team will process your request within 2-4 business hours</li>
                  <li>You will receive email confirmation of the cancellation</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Refund Processing</h2>
              <div className="space-y-4 text-gray-300">
                <p>For successfully cancelled orders:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full refund will be processed to the original payment method</li>
                  <li>Refunds typically take 5-7 business days to appear in your account</li>
                  <li>Processing fees (if any) are non-refundable</li>
                  <li>International orders may have additional processing time</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Non-Cancellable Items</h2>
              <div className="space-y-4 text-gray-300">
                <p>The following items cannot be cancelled once ordered:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom engraved tapZe cards</li>
                  <li>Personalized card designs</li>
                  <li>Orders that have shipped</li>
                  <li>Digital profile setups (can be modified instead)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Modifications vs Cancellation</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Before cancelling, consider if you can modify your order instead:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Change card quantity (within 24 hours)</li>
                  <li>Update shipping address</li>
                  <li>Modify card design (before production starts)</li>
                  <li>Add additional services</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>For cancellation requests or questions:</p>
                <div className="bg-purple-900/20 p-4 rounded-xl">
                  <p><strong>Email:</strong> contact@tapze.in</p>
                  <p><strong>Phone:</strong> +91-9990909789</p>
                  <p><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                This cancellation policy is effective as of {monthName} {currentYear} and may be updated periodically. 
          
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default CancellationPolicy;