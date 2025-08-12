import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import authBackground from "@/assets/auth-background.jpg";
import { Eye, EyeOff, CheckCircle2, Check, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { resetPassword } from "@/services/login";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  ];



  // Optional: token from email link (if available later)
  const token = searchParams.get("token");
  const verification = searchParams.get("verification");
  console.log("token   ", token);

  useEffect(() => {
    document.title = "Reset Password | Tapze";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Reset your Tapze account password securely and continue to login.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      m.setAttribute("content", content);
      document.head.appendChild(m);
    }
  }, []);

    
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both fields are identical.",
        variant: "destructive",
      });
      return;
    }
    const allRequirementsMet = passwordRequirements.every(req => 
      req.regex.test(password)
    );
    if (!allRequirementsMet) {
      toast({
        title: "Password Requirements Not Met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // TODO: Integrate with backend using token when available
      // await confirmResetPassword({ token, password });
      const response = await resetPassword(String(token || ''),password, confirmPassword, 'resetpassword');
       if (response.status=="success") {
            setIsSuccess(true);
        } else {
            toast({
            title: "Reset failed",
            description: response.message ,
            variant: "destructive",
          });
        }
      
    } catch (err) {
      toast({
        title: "Reset failed",
        description: "Please retry or request a new reset link.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Floating animation elements */}
          <div className="absolute inset-0">
            <div className="absolute top-24 left-24 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse" />
            <div className="absolute top-48 right-28 w-10 h-10 bg-white/10 rounded-lg animate-bounce delay-150" />
            <div className="absolute bottom-40 left-20 w-8 h-8 border-2 border-white/30 rotate-45 animate-spin delay-500" />
            <div className="absolute bottom-24 right-24 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-300" />
          </div>

          <div className="max-w-md text-center relative z-10 animate-fade-in">
            <img
              src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png"
              alt="Tapze logo"
              className="h-16 w-auto mx-auto mb-8 animate-scale-in"
              loading="lazy"
            />
            <h2 className="text-3xl font-bold text-white mb-4">Secure Password Reset</h2>
            <p className="text-purple-100 text-lg">Choose a new password to regain access.</p>
          </div>
        </div>

        {/* Right side - Form / Success */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <Card className="w-full max-w-md">
            {!isSuccess ? (
              <form onSubmit={onSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                  <CardDescription className="text-center">
                    Enter and confirm your new password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Live password checklist matching Signup behavior */}
                  <div className="space-y-1 text-xs">
                    {passwordRequirements.map((req, index) => {
                      const isValid = req.regex.test(password);
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Continue"}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-primary hover:underline">Back to login</Link>
                  </p>
                </CardFooter>
              </form>
            ) : (
              <>
                <CardHeader className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Password reset successful</CardTitle>
                  <CardDescription>Your password has been updated.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  You can now use your new password to log in to your account.
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => navigate("/login")}>Go to Login</Button>
                </CardFooter>
              </>
            )}
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
