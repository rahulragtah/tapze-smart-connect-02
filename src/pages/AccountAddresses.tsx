import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Plus, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AddressForm from "@/components/AddressForm";

// Mock data - replace with real data from your backend
const mockAddresses = [
  {
    id: 1,
    type: "Home",
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Office",
    name: "John Doe",
    address: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    isDefault: false,
  },
];

const AccountAddresses = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Addresses
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your saved delivery addresses
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Total Addresses: {mockAddresses.length}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {/* Add New Address Card */}
            <Card 
              className="group border-2 border-dashed border-primary/40 hover:border-primary/60 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-primary/5 via-transparent to-purple-50/30 hover:from-primary/10 hover:to-purple-100/50 overflow-hidden relative"
              onClick={handleAddAddress}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative flex flex-col items-center justify-center h-full min-h-[200px] text-center p-6">
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-20 animate-pulse group-hover:opacity-30" />
                  <div className="relative p-4 bg-gradient-to-br from-primary/10 to-purple-100/50 rounded-full mb-4 border border-primary/20">
                    <Plus className="h-8 w-8 text-primary group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Add New Address</h3>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">Click to add a new delivery address</p>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-dashed border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-dashed border-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
            {addresses.map((address) => (
              <Card key={address.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{address.type}</CardTitle>
                    {address.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">{address.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{address.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
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
                  </div>
                </CardContent>
              </Card>
            ))}
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