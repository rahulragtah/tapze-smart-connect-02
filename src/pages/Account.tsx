import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Package, User, Eye, EyeOff, Download, ExternalLink, Plus, Edit } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";

// Mock data - replace with real data from your backend
const mockAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Rahul Ragtah",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Office",
    name: "Swadha Ragtah",
    address: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    isDefault: false,
  },
];

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    product: "Premium NFC Card - Black",
    quantity: 2,
    total: "$49.98",
    trackingNumber: "1Z999AA1234567890",
    courierPartner: "UPS",
    courierWebsite: "https://www.ups.com",
    invoiceUrl: "/invoices/ORD-2024-001.pdf",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "In Transit",
    product: "Standard NFC Card - White",
    quantity: 1,
    total: "$24.99",
    trackingNumber: "1Z999BB9876543210",
    courierPartner: "FedEx",
    courierWebsite: "https://www.fedex.com",
    invoiceUrl: "/invoices/ORD-2024-002.pdf",
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState("addresses");
  const [userInfo, setUserInfo] = useState({
    firstName: "Rahul",
    lastName: "Ragtah",
    email: "rahulragtah@tapze.in",
    phoneNumber: "+919990909789",
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Account</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and view your orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {mockAddresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{address.type}</CardTitle>
                      {address.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-muted-foreground">{address.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      {!address.isDefault && (
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-semibold">Order History</h2>
            
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">Order {order.id}</CardTitle>
                        <CardDescription>Placed on {order.date}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Product Details</h4>
                        <p className="text-sm">{order.product}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                        <p className="text-sm font-medium">Total: {order.total}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Shipping Details</h4>
                        <p className="text-sm">Tracking: {order.trackingNumber}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span>Courier: {order.courierPartner}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-primary"
                            asChild
                          >
                            <a 
                              href={order.courierWebsite} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download Invoice
                      </Button>
                      {/* <Button variant="ghost" size="sm">
                        Track Package
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleUserInfoUpdate}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
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
                      <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <PhoneInput
                        id="phoneNumber"
                        placeholder="10-digit mobile number"
                        value={userInfo.phoneNumber}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Information"}
                    </Button>
                  </CardContent>
                </form>
              </Card>

              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          placeholder="Enter your current password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
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
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
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
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="Re-enter your new password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
                  </CardContent>
                  <CardContent className="pt-0">
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </CardContent>
                </form>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;