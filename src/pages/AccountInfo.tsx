import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Upload, Camera, User, Mail, Phone, Lock, Edit2, Save } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    profilePicture: "/lovable-uploads/brijesh.png",
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
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleProfilePictureUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserInfo(prev => ({ ...prev, profilePicture: reader.result as string }));
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
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
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Header Background */}
                <div className="relative h-32 bg-gradient-to-r from-primary via-primary/90 to-purple-600 overflow-hidden">
                  <div className="absolute inset-0 bg-dots-white/20 opacity-30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>

                {/* Profile Content */}
                <div className="relative px-6 pb-6 -mt-16">
                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">
                    {/* Profile Picture */}
                    <div className="relative group animate-scale-in z-10">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                      <div className="relative bg-background rounded-full p-1">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-2xl transition-all duration-500 group-hover:scale-105">
                          <AvatarImage src={userInfo.profilePicture} alt="Profile" className="object-cover" />
                          <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-purple-600 text-white font-bold">
                            {userInfo.firstName[0]}{userInfo.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          <Button
                            onClick={handleProfilePictureUpload}
                            className="rounded-full h-10 w-10 p-0 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-110"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="space-y-4">
                        {/* Name and Status */}
                        <div>
                          <h2 className="text-3xl font-bold text-foreground mb-2">
                            {userInfo.firstName} {userInfo.lastName}
                          </h2>
                          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-muted-foreground">Online</span>
                          </div>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid gap-3 sm:grid-cols-2 max-w-md mx-auto lg:mx-0">
                          <div className="group relative overflow-hidden rounded-xl bg-muted/30 p-4 border hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                <Mail className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</p>
                                <p className="text-sm font-semibold text-foreground truncate">{userInfo.email}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="group relative overflow-hidden rounded-xl bg-muted/30 p-4 border hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                <Phone className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Phone</p>
                                <p className="text-sm font-semibold text-foreground truncate">{userInfo.phoneNumber}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-6 lg:gap-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/10 to-purple-100/50 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">5</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/10 to-purple-100/50 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">2</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">Addresses</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Profile Information */}
            <div className="animate-fade-in">
              <Card className="border-0 shadow-xl h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleUserInfoUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
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
                          value={userInfo.lastName}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
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
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
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
                        value={userInfo.phoneNumber}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        disabled={!isEditing}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                    {isEditing && (
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Updating...
                          </div>
                        ) : (
                          "Update Information"
                        )}
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <div className="animate-fade-in">
              <Card className="border-0 shadow-xl h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Lock className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Security Settings</CardTitle>
                      <CardDescription>
                        Manage your password and security preferences
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
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
                    
                    {/* Password Requirements */}
                    <div className="p-4 bg-muted/50 rounded-lg border border-muted">
                      <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                        <li>• Contains both uppercase and lowercase letters</li>
                      </ul>
                    </div>
                    
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
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfo;