
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does NFC work?",
    answer: "NFC (Near Field Communication) lets devices communicate when they're close together. Just hold your card near any smartphone, and it instantly shares your digital profile. No apps required!"
  },
  {
    question: "Will this work with my iPhone?",
    answer: "Absolutely! Our tapZe cards work with all iPhones from iPhone 7 onwards, and virtually all Android phones. The recipient doesn't need any special app - it just works."
  },
  {
    question: "How do I program my card?",
    answer: "Download our free Tapze app, create your digital profile, and tap your card to your phone. You can update your info anytime - your card will always share the latest version."
  },
  {
    question: "Can I customize what information gets shared?",
    answer: "Yes! You control exactly what gets shared - name, phone, email, social media, website, or anything else. You can even create different profiles for different situations."
  },
  {
    question: "What if I lose my card?",
    answer: "No worries! Your information is stored safely in our app. Order a replacement card and program it with the same profile. You can also remotely disable a lost card for security."
  },
  {
    question: "How durable are these cards?",
    answer: "Our cards are built to last! They're waterproof, scratch-resistant, and can handle daily use. The Classic Black has a premium matte finish, while the Metal and Glass variants offer extra durability."
  },
  {
    question: "Is this a one-time purchase or subscription?",
    answer: "All our plans are one-time purchases. You get lifetime access to your digital profile, unlimited updates, and ongoing software improvements at no additional cost."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes! You can upgrade to a higher tier at any time. We'll apply the difference in pricing and send you your new premium card."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Absolutely! We offer special pricing for teams and enterprises. Contact our sales team for custom quotes on orders of 10 or more cards."
  },
  {
    question: "What card types do you offer?",
    answer: "We offer three premium card types: Classic Black (matte finish), Premium Metal (sleek and durable), and Transparent Glass (unique and eye-catching). Each card type offers the same NFC functionality."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days within India. We also offer express shipping (2-3 business days) for urgent orders. International shipping is available with 10-15 business days delivery."
  },
  {
    question: "Can I track my order?",
    answer: "Yes! Once your order is processed, you'll receive a tracking number via email. You can track your order status in real-time through our website or the shipping partner's portal."
  },
  {
    question: "What if my card stops working?",
    answer: "Our cards come with a 1-year warranty against manufacturing defects. If your card stops working due to a defect, we'll replace it free of charge. Normal wear and tear is not covered."
  },
  {
    question: "Can I use multiple cards with one profile?",
    answer: "Yes! You can program multiple cards with the same profile. This is perfect if you want backup cards or different card types for different occasions."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use industry-standard encryption to protect your data. You control what information is shared, and you can update or delete your profile anytime. We never sell your personal information."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide email support for all customers, with priority support for premium plans. Our support team typically responds within 24 hours on business days."
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Got questions? We've got answers. Here's everything you need to know about tapZe cards.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass rounded-xl border-none"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-purple-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">Still have questions?</p>
              <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Contact our support team →
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
