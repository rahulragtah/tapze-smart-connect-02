import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock data - replace with real data from your backend
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    product: "Premium NFC Card - Black",
    productImage: "/lovable-uploads/vcard27.png",
    quantity: 2,
    total: "$49.98",
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
    product: "Standard NFC Card - White",
    productImage: "/lovable-uploads/vcard28.png",
    quantity: 1,
    total: "$24.99",
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-2">Track and manage your orders</p>
          </div>

          <div className="space-y-6">
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Product Info */}
                    <div>
                      <h4 className="font-medium mb-3">Product Details</h4>
                      <div className="flex items-start gap-3">
                        <img 
                          src={order.productImage} 
                          alt={order.product}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{order.product}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                          <p className="text-sm font-medium text-primary">Total: {order.total}</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Digital Profile
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