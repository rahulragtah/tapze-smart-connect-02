
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
  }
];

const ProductFAQ = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Got <span className="text-gradient">questions?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We've got answers. Here's everything you need to know.
          </p>
        </div>
        
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
  );
};

export default ProductFAQ;
