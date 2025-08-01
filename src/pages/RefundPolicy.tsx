
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-white">Refund Policy</h1>
          <div className="prose prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">30-Day Money-Back Guarantee</h2>
              <div className="text-gray-300 space-y-4">
                <p>We stand behind the quality of our products and services. If you're not completely satisfied with your purchase, we offer a 30-day money-back guarantee on eligible items.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Eligible Items for Refund</h2>
              <div className="text-gray-300 space-y-4">
                <p>The following items are eligible for a full refund within 30 days of purchase:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unopened NFC business cards in original packaging</li>
                  <li>Unused digital profile subscriptions (within first 7 days)</li>
                  <li>Defective or damaged products upon arrival</li>
                  <li>Products that fail to function as advertised</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Non-Refundable Items</h2>
              <div className="text-gray-300 space-y-4">
                <p>The following items are not eligible for refunds:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Customized or personalized tapZe cards that have been engraved or printed</li>
                  <li>Digital profile services used for more than 7 days</li>
                  <li>Products damaged due to misuse or normal wear and tear</li>
                  <li>Bulk orders of 10 or more items (subject to special terms)</li>
                  <li>Third-party services or integrations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">How to Request a Refund</h2>
              <div className="text-gray-300 space-y-4">
                <p>To request a refund, please follow these steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our support team within 30 days of purchase</li>
                  <li>Provide your order number and reason for the refund request</li>
                  <li>Include photos if the item is damaged or defective</li>
                  <li>Return the item in original packaging (if applicable)</li>
                  <li>Allow 5-10 business days for processing after we receive your return</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Refund Processing</h2>
              <div className="text-gray-300 space-y-4">
                <p>Once your refund request is approved:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds will be processed to your original payment method</li>
                  <li>Processing time: 5-10 business days for credit cards, 3-5 days for digital payments</li>
                  <li>You will receive an email confirmation when the refund is processed</li>
                  <li>Shipping costs are non-refundable unless the item was defective or incorrectly sent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Exchange Policy</h2>
              <div className="text-gray-300 space-y-4">
                <p>We offer exchanges for defective items or if you received the wrong product. To request an exchange:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact us within 30 days of purchase</li>
                  <li>We'll provide a prepaid return label for defective items</li>
                  <li>New item will be shipped once we receive the returned product</li>
                  <li>Exchanges are subject to product availability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Bulk Order Refunds</h2>
              <div className="text-gray-300 space-y-4">
                <p>Bulk orders (10+ items) are subject to special refund terms:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>25% restocking fee may apply for bulk returns</li>
                  <li>Custom branding or personalization makes bulk orders non-refundable</li>
                  <li>Contact our sales team for specific bulk order refund policies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Warranty Coverage</h2>
              <div className="text-gray-300 space-y-4">
                <p>All tapZe cards come with a 1-year warranty covering:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Manufacturing defects</li>
                  <li>NFC chip functionality</li>
                  <li>Normal wear and tear under proper use</li>
                  <li>Software updates and profile management access</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact for Refunds</h2>
              <div className="text-gray-300 space-y-4">
                <p>To process a refund or exchange, contact our customer support team:</p>
                <p>Email: contact@tapze.in<br />
                Phone: +91 9990909789<br />
                Live Chat: Available on our website<br />
                Support Hours: Monday-Friday, 9 AM - 6 PM</p>
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

export default RefundPolicy;
