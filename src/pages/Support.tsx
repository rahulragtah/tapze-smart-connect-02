
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MessageCircle, Mail, Phone, Clock, Search, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface SupportForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const Support = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SupportForm>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
    },
  });

  const onSubmit = async (data: SupportForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Support form submitted:", data);
    
    toast({
      title: "Support Request Submitted! 🎯",
      description: "We've received your request and will respond within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Instant Support",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM PST",
      action: "Start Chat",
      actionurl:"https://wa.me/+919990909789/"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      actionurl:"mailto:contact@tapze.in"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9 AM - 5 PM PST",
      action: "Call Now",
      actionurl:"tel:+919990909789"
    }
  ];

  const faqItems = [
    {
      question: "How do I set up my tapZe card?",
      answer: "Simply tap your card on any NFC-enabled smartphone and follow the setup instructions. You can customize your profile through our web dashboard."
    },
    {
      question: "What if my tapZe card stops working?",
      answer: "tapZe cards are covered by our 1-year warranty. Contact support for a free replacement if your card malfunctions within the warranty period."
    },
    {
      question: "Can I update my information after setup?",
      answer: "Yes! You can update your profile information at any time through our dashboard. Changes are reflected immediately on your NFC card."
    },
    {
      question: "Do recipients need an app to view my profile?",
      answer: "No app required! When someone taps your card, it opens directly in their web browser with all your information."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How Can We <span className="text-gradient">Help?</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of your Tapze experience. 
              Find answers, get support, or contact us directly.
            </p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Choose Your Support Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {supportOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card key={option.title} className="glass p-6 text-center">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-purple-400" />
                    </div>
                    <CardTitle className="text-xl mb-3 text-white">{option.title}</CardTitle>
                    <p className="text-gray-300 mb-4">{option.description}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                      <Clock className="w-4 h-4" />
                      {option.availability}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <a href={option.actionurl}>{option.action}</a>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <Card className="glass p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-white">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  {...field}
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          rules={{ 
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/,
                              message: "Please enter a valid email"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="your.email@example.com" 
                                  {...field}
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        rules={{ required: "Subject is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What's this about?" 
                                {...field}
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        rules={{ required: "Message is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your issue or question..."
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <Card key={index} className="glass p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {item.question}
                      </h3>
                      <p className="text-gray-300">
                        {item.answer}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* <Card className="glass p-6 mt-8 text-center">
                  <Search className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Need More Help?</h3>
                  <p className="text-gray-300 mb-4">
                    Check out our comprehensive help center with detailed guides and tutorials.
                  </p>
                  <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    Visit Help Center
                  </Button>
                </Card> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
