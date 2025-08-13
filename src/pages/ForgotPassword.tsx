import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import authBackground from "@/assets/auth-background.jpg";
import {initiateResetPassword} from '../services/login';
import {sendRestPasswordEmail} from '../services/appEmailService';
import {resendEmailDTO} from '../components/models/loginInterface';
import ResendEmailButton from "./ResendEmailButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailPayload, setEmailPayload] = useState<resendEmailDTO>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();
  const location = useLocation() as any;
  useEffect(() => {
    const prefill = location?.state?.prefillEmail;
    if (prefill) setEmail(prefill);
  }, [location?.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual forgot password API call
      const response = await initiateResetPassword(email);
      if (response.success) {

        setIsEmailSent(true);
        setEmailPayload({ email:response.email, FirstName:response.firstName, 
           lastName:response.lastName,transactionId:response.transactionId });
        sendRestPasswordEmail(emailPayload);
      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
      } else {
        toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-screen flex pt-16">
          {/* Left side - Image */}
          <div 
            className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(219, 39, 119, 0.9)), url(${authBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Floating animation elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-40 right-32 w-8 h-8 bg-white/10 rounded-lg animate-bounce delay-200"></div>
              <div className="absolute bottom-32 left-16 w-6 h-6 border-2 border-white/30 rotate-45 animate-spin delay-500"></div>
              <div className="absolute bottom-20 right-20 w-10 h-10 border-2 border-white/20 rounded-full animate-pulse delay-300"></div>
            </div>
            
            <div className="max-w-md text-center relative z-10 animate-fade-in">
              <img 
                src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png" 
                alt="Tapze Logo" 
                className="h-16 w-auto mx-auto mb-8 animate-scale-in"
              />
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in delay-200">Check Your Email!</h2>
              <p className="text-purple-100 text-lg animate-fade-in delay-300">
                We've sent you a secure link to reset your password.
              </p>
            </div>
          </div>

          {/* Right side - Success Form */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                <CardDescription>
                  We've sent a password reset link to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEmailSent(false)}
                >
                   <ResendEmailButton payload={emailPayload}  />
                  {/* Resend Email */}
                </Button>
                <Link to="/login" className="w-full">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen flex pt-16">
        {/* Left side - Image */}
        <div 
          className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(219, 39, 119, 0.9)), url(${authBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Floating animation elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-8 h-8 bg-white/10 rounded-lg animate-bounce delay-200"></div>
            <div className="absolute bottom-32 left-16 w-6 h-6 border-2 border-white/30 rotate-45 animate-spin delay-500"></div>
            <div className="absolute bottom-20 right-20 w-10 h-10 border-2 border-white/20 rounded-full animate-pulse delay-300"></div>
          </div>
          
          <div className="max-w-md text-center relative z-10 animate-fade-in">
            <img 
              src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png" 
              alt="Tapze Logo" 
              className="h-16 w-auto mx-auto mb-8 animate-scale-in"
            />
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in delay-200">Reset Your Password</h2>
            <p className="text-purple-100 text-lg animate-fade-in delay-300">
              Enter your email and we'll send you a secure reset link.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Link to="/login" className="w-full">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;