import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, Package } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock data - replace with real data from your backend
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    products: [
      {
        name: "Premium NFC Card - Black",
        image: "/lovable-uploads/vcard27.png",
        quantity: 2,
        price: "$24.99",
      },
      {
        name: "Standard NFC Card - White",
        image: "/lovable-uploads/vcard28.png",
        quantity: 1,
        price: "$19.99",
      }
    ],
    total: "$69.97",
    trackingNumber: "1Z999AA1234567890",
    courierPartner: "UPS",
    courierWebsite: "https://www.ups.com",
    invoiceUrl: "/invoices/ORD-2024-001.pdf",
    shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "In Transit",
    products: [
      {
        name: "Premium NFC Card - Rose Gold",
        image: "/lovable-uploads/vcard29.png",
        quantity: 3,
        price: "$24.99",
      }
    ],
    total: "$74.97",
    trackingNumber: "1Z999BB9876543210",
    courierPartner: "FedEx",
    courierWebsite: "https://www.fedex.com",
    invoiceUrl: "/invoices/ORD-2024-002.pdf",
    shippingAddress: "456 Business Ave, Suite 200, New York, NY 10002",
  },
];

const AccountOrders = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Track and manage your order history
            </p>
          </div>

          <div className="space-y-6 animate-fade-in">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Product Info */}
                    <div>
                      <h4 className="font-medium mb-3">Product Details ({order.products.length} item{order.products.length > 1 ? 's' : ''})</h4>
                      <div className="space-y-3">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg border"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {product.quantity} × {product.price}</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-primary">Order Total: {order.total}</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            View Digital Profiles
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium mb-3">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                    </div>

                    {/* Shipping Details */}
                    <div>
                      <h4 className="font-medium mb-3">Shipping Details</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Courier: {order.courierPartner}</span>
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
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="ghost" size="sm">
                      Track Package
                    </Button>
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

export default AccountOrders;