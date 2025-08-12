import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import authBackground from "@/assets/auth-background.jpg";
import {signUp, isUserExist, initiateResetPassword} from '../services/login';
import {signUpDTO} from '../components/models/loginInterface';
import {sendAccountVerificationEmail} from '../services/appEmailService';
import {resendEmailDTO} from '../components/models/loginInterface';

const Signup = () => {
  const [formData, setFormData] = useState<signUpDTO>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isVerified : 0
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => 
      req.regex.test(formData.password)
    );

    if (!allRequirementsMet) {
      toast({
        title: "Password Requirements Not Met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual signup API call
        const response = await isUserExist(formData.email);
        if (response?.success) {
           toast({
            title: "Signup Failed",
            description: "Looks like you already have an account with that email address. If you don't remember your password, use the Forgot password",
            variant: "destructive",
          });

        } else {
        const result = await signUp(formData);
        if (result.success) {
           const response = await initiateResetPassword(formData.email);
              if (response.success) {
                 const payload :resendEmailDTO= {email:response.email,FirstName:response.firstName,  lastName:response.lastName,transactionId:response.transactionId} 
                   sendAccountVerificationEmail(payload);
                  toast({
                  title: "Account Created Successfully",
                  description: "You’re all set! Just click the link we sent to your email to verify your account.",
                });
               navigate("/login");
              }
        } else {
            toast({
              title: "Signup Failed",
              description: "Please try again or contact support.",
              variant: "destructive",
        });

      }

     }
      
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="absolute top-24 left-24 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-48 right-28 w-10 h-10 bg-white/10 rounded-lg animate-bounce delay-100"></div>
            <div className="absolute bottom-40 left-20 w-8 h-8 border-2 border-white/30 rotate-45 animate-spin delay-400"></div>
            <div className="absolute bottom-24 right-24 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-600"></div>
            <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-white/5 rounded-full animate-ping delay-1000"></div>
          </div>
          
          <div className="max-w-md text-center relative z-10 animate-fade-in">
            <img 
              src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png" 
              alt="Tapze Logo" 
              className="h-16 w-auto mx-auto mb-8 animate-scale-in"
            />
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in delay-200">Join Tapze Today!</h2>
            <p className="text-purple-100 text-lg animate-fade-in delay-300">
              Create your account and start building your digital presence with our premium NFC cards.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Sign up to get started with Tapze
              </CardDescription>
            </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="e.g. Rahul"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="e.g. Ragtah"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. rahulragtah@tapze.in"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="e.g. +91 9990909789"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Password Requirements */}
              <div className="space-y-1 text-xs">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.regex.test(formData.password);
                  return (
                    <div key={index} className={`flex items-center gap-2 ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {isValid ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {req.text}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;