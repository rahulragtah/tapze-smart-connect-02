import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Plus, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AddressForm from "@/components/AddressForm";
import { getUserAddress } from '@/services/orderService';
import { createUserAddress } from '@/services/userService';

// Mock data - replace with real data from your backend


const AccountAddresses = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

   useEffect(() => {
  getUserAddress().then((data) => {
          if (data) {
            setAddresses(data.address || []);
          }
        });
        }, []);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsSheetOpen(true);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setIsSheetOpen(true);
  };

  const handleSaveAddress = (addressData: any) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr
      ));
    } else {
      // Add new address
      const newAddress = { ...addressData, id: Date.now() };
      setAddresses(prev => [...prev, newAddress]);
      //createUserAddress
      

    }
    setIsSheetOpen(false);
    setEditingAddress(null);
  };

  const handleCancelEdit = () => {
    setIsSheetOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gradient">
              My Addresses
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your saved delivery addresses
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Total Addresses: {addresses.length}
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            {addresses.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="py-12 text-center">
                  <div className="flex flex-col items-center gap-4 animate-enter">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center hover-scale">
                        <MapPin className="w-10 h-10 text-primary pulse" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold">No addresses saved</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                    Start your journey with a Smart Business Card — network faster and smarter.
                    </p>
                    <Button asChild>
                      <a href="/buy-nfc-card">Get your Smart Business Card</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {addresses.map((address) => (
              <Card key={address.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{address.type}</CardTitle>
                    {/* {address.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )} */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">{address.address_Name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{address.line1}  {address.line2}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.pincode} {address.country}
                    </p>
                  </div>
                  
                  {/* <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button variant="ghost" size="sm" className="flex-1">
                        Set as Default
                      </Button>
                    )}
                  </div> */}
                </CardContent>
              </Card>
                ))}
              </div>
            )}
          </div>

          {/* Address Form Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </SheetTitle>
                <SheetDescription>
                  {editingAddress 
                    ? "Update your address information below." 
                    : "Add a new address to your account."
                  }
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <AddressForm
                  address={editingAddress}
                  onSave={handleSaveAddress}
                  onCancel={handleCancelEdit}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountAddresses;