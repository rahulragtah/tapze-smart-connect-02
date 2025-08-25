
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MapPin, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PhoneInput } from "@/components/ui/phone-input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  queryType: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      queryType: "",
      message: "",
    },
  });

  // SEO structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Tapze",
    "description": "Get in touch with Tapze for support, bulk inquiries, or general questions about our NFC business cards",
    "url": "https://tapze.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Tapze",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3/1, Subhash Nagar",
        "addressLocality": "New Delhi",
        "postalCode": "110027",
        "addressCountry": "IN"
      },
      "email": "contacto@tapze.in",
      "telephone": "+91 9990909789"
    }
  };

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", data);
    
    toast({
      title: "Message Received! 🎉",
      description: "Thanks for reaching out! We've received your query and will be in touch soon.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>Contact Tapze | Get Support & Bulk Inquiries | NFC Business Cards</title>
        <meta name="description" content="Contact Tapze for support, bulk orders, or questions about our premium NFC business cards. Email us at contacto@tapze.in or call +91 9990909789." />
        <meta name="keywords" content="contact tapze, nfc card support, bulk inquiry, customer service, tapze help, business card support" />
        <link rel="canonical" href="https://tapze.in/contact" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="Contact Tapze | Get Support & Bulk Inquiries" />
        <meta property="og:description" content="Contact Tapze for support, bulk orders, or questions about our premium NFC business cards." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta property="og:url" content="https://tapze.in/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Tapze | Get Support & Bulk Inquiries" />
        <meta name="twitter:description" content="Contact Tapze for support, bulk orders, or questions about our premium NFC business cards." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
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
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions? Want to chat? We'd love to hear from you! 
              Drop us a line and let's start a conversation.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-8 lg:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-300 text-lg">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you!
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="glass p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Registered Office</h3>
                        <p className="text-gray-300">Tapze </p>
                        <p className="text-gray-300">(A product by Webfarms Infotech LLP)</p>
                        <p className="text-gray-300">3/1, Subhash Nagar, New Delhi, 110027</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Email Us</h3>
                        <p className="text-gray-300">contacto@tapze.in</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Call Us</h3>
                        <p className="text-gray-300">+91 9990909789</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="glass p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-white">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
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

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Phone Number</FormLabel>
                            <FormControl>
                              <PhoneInput 
                                placeholder="10-digit mobile number" 
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
                        name="queryType"
                        rules={{ required: "Please select a query type" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Type of Query</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                  <SelectValue placeholder="Select a query type" />
                                </SelectTrigger>
                                <SelectContent className="z-50">
                                  <SelectItem value="bulk">Bulk inquiry</SelectItem>
                                  <SelectItem value="support">Support</SelectItem>
                                  <SelectItem value="general">General</SelectItem>
                                </SelectContent>
                              </Select>
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
                                placeholder="Tell us how we can help you..."
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
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Contact;
