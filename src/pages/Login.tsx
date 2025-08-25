import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import authBackground from "@/assets/auth-background.jpg";
import { loginUser } from '@/services/login';
import { Helmet } from "react-helmet";



const Login = () => {
  const [searchParams] = useSearchParams();
  // Optional: token from email link (if available later)
  const redirecturl = searchParams.get("redirecturl");
  const verified = searchParams.get("verified");


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation() as any;
  useEffect(() => {
    const prefill = location?.state?.prefillEmail;
    if (prefill) setEmail(prefill);
    
    // Show verification success toast
    if (verified === 'true') {
      const timer = setTimeout(() => {
        toast({
          title: "Email Verified Successfully",
          description: "Your email has been verified. You can now login.",
          duration: 10000, // 10 seconds
        });
      }, 100); // Small delay to ensure component is mounted
      
      return () => clearTimeout(timer);
    }
  }, [location?.state, verified, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual login API call
      const response = await loginUser(email, password); 
      if(response.success){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('email', response.email);
        toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      if (redirecturl && redirecturl.trim() !== "") {
        navigate(redirecturl, { state: { openCart: true } });
      } else {
        navigate("/");
      }
      }else {
        toast({
        title: "Login Failed",
        description: response.message,
        variant: "destructive",
      });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });  
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta */}
        <title>Login to Tapze | Access Your NFC Business Card Dashboard</title>
        <meta name="description" content="Login to your Tapze account to manage your NFC business cards, update your digital profile, and track engagement analytics." />
        <meta name="keywords" content="tapze login, NFC card dashboard, digital business card login, account access" />
        <link rel="canonical" href="https://tapze.in/login" />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
        <meta property="og:title" content="Login to Tapze | Access Your Dashboard" />
        <meta property="og:description" content="Login to your Tapze account to manage your NFC business cards and digital profile." />
        <meta property="og:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta property="og:url" content="https://tapze.in/login" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tapze" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login to Tapze | Access Your Dashboard" />
        <meta name="twitter:description" content="Login to your Tapze account to manage your NFC business cards." />
        <meta name="twitter:image" content="https://tapze.in/lovable-uploads/meta-image.png" />
        <meta name="twitter:site" content="@tapze" />
      </Helmet>
      
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
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in delay-200">Welcome Back!</h2>
            <p className="text-purple-100 text-lg animate-fade-in delay-300">
              Access your digital profile and manage your NFC cards with ease.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>
                <div className="text-right">
                  <Link 
                    to="/forgot-password"
                    state={{ prefillEmail: email }}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Login;