import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Mail, Phone, Lock, Check, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


const AccountInfo = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));

  const [userInfo, setUserInfo] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  
  const { toast } = useToast();

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  ];

  const handleUserInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your account information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.regex.test(passwordData.newPassword));
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
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage your personal information and preferences
            </p>
          </div>

          {/* Profile Overview Card */}
          <div className="mb-8 animate-fade-in">
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Profile Avatar - initials only */}
                  <div className="relative animate-scale-in">
                    <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-muted-foreground to-foreground text-background font-bold">
                        {userInfo.firstName?.[0]}
                        {userInfo.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-3">
                          {userInfo.firstName} {userInfo.lastName}
                        </h2>
                      </div>

                      {/* Contact Information */}
                      <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto lg:mx-0">
                        <div className="group p-4 rounded-lg bg-muted/50 border hover:bg-muted/70 transition-all duration-200">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-md shadow-sm">
                              <Mail className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email</p>
                              <p className="text-sm font-medium text-foreground truncate">{userInfo.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="group p-4 rounded-lg bg-muted/50 border hover:bg-muted/70 transition-all duration-200">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-md shadow-sm">
                              <Phone className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phone</p>
                              <p className="text-sm font-medium text-foreground truncate">{userInfo.phoneNumber}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      {/* <div className="flex justify-center lg:justify-start gap-8 pt-4">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-muted border flex items-center justify-center shadow-sm">
                            <span className="text-xl font-bold text-foreground">5</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-muted border flex items-center justify-center shadow-sm">
                            <span className="text-xl font-bold text-foreground">2</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">Saved Addresses</p>
                        </div>
                      </div> */}

                      {/* Actions on profile panel */}
                      <div className="flex flex-wrap gap-3 pt-6 justify-center lg:justify-start">
                        {/* Edit Personal Details Modal */}
                        <Dialog>
                          <DialogTrigger asChild>
                            {/* <Button size="lg" className="px-6">Edit Personal Details</Button> */}
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Edit Personal Details</DialogTitle>
                              <DialogDescription>Update your personal information.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUserInfoUpdate} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    First Name
                                  </Label>
                                  <Input
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    value={userInfo.firstName}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lastName" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Last Name
                                  </Label>
                                  <Input
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={userInfo.lastName}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  Email Address
                                </Label>
                                 <Input
                                   id="email"
                                   type="email"
                                   placeholder="Enter your email address"
                                   value={userInfo.email}
                                   onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                                   required
                                 />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  Phone Number
                                </Label>
                                <Input
                                   id="phoneNumber"
                                   placeholder="Enter your phone number"
                                   value={userInfo.phoneNumber}
                                   onChange={(e) => setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                   required
                                 />
                              </div>
                              <DialogFooter>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                  {isLoading ? (
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      Saving...
                                    </div>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        {/* Change Password Modal */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="lg" className="px-6">Change Password</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Change Password</DialogTitle>
                              <DialogDescription>Update your account password.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handlePasswordChange} className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  Current Password
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="currentPassword"
                                    type={showPasswords.current ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                    required
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                  >
                                    {showPasswords.current ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="newPassword" className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  New Password
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="newPassword"
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                    required
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                  >
                                    {showPasswords.new ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  Confirm New Password
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="confirmPassword"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Re-enter your new password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                    required
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                  >
                                    {showPasswords.confirm ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              {/* Live password checklist matching Signup behavior */}
                              <div className="space-y-1 text-xs">
                                {passwordRequirements.map((req, index) => {
                                  const isValid = req.regex.test(passwordData.newPassword);
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

                              <DialogFooter>
                                <Button 
                                  type="submit" 
                                  variant="destructive"
                                  className="w-full"
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      Changing Password...
                                    </div>
                                  ) : (
                                    "Change Password"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfo;