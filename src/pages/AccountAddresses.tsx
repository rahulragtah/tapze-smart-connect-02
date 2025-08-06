import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Addresses</h1>
                <p className="text-muted-foreground mt-2">Manage your saved addresses</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockAddresses.map((address) => (
              <Card key={address.id}>
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
                    <Button variant="outline" size="sm" className="flex-1">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountAddresses;