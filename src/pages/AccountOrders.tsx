import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, Package } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import  { useEffect, useState } from 'react';

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
        originalPrice: "$29.99",
        discountedPrice: "$24.99",
      },
      {
        name: "Standard NFC Card - White",
        image: "/lovable-uploads/vcard28.png",
        quantity: 1,
        originalPrice: "$22.99",
        discountedPrice: "$19.99",
      }
    ],
    total: "$69.97",
    trackingNumber: "1Z999AA1234567890",
    courierPartner: "UPS",
    courierWebsite: "https://www.ups.com",
    invoiceUrl: "/invoices/ORD-2024-001.pdf",
    shippingAddress: {
      name: "John Doe",
      phone: "+1 555-123-4567",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
    },
    couponDiscount: "$5.00",
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
        originalPrice: "$29.99",
        discountedPrice: "$24.99",
      }
    ],
    total: "$74.97",
    trackingNumber: "1Z999BB9876543210",
    courierPartner: "FedEx",
    courierWebsite: "https://www.fedex.com",
    invoiceUrl: "/invoices/ORD-2024-002.pdf",
    shippingAddress: {
      name: "Jane Smith",
      phone: "+1 555-987-6543",
      address: "456 Business Ave, Suite 200, New York, NY 10002",
    },
    couponDiscount: "$0.00",
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

  const [orders, setOrders] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  // Safely read current user from localStorage
  const rawUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let currentUserEmail = '';
  try {
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      currentUserEmail = parsed?.email ?? '';
    }
  } catch (e) {
    console.warn('Invalid user in localStorage');
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://tapze.in/tapzeservice/customerOrder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: currentUserEmail }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders || []);
        console.log('current user order is ', orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserEmail) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [currentUserEmail]);





  // Helpers and derived data
  const parsePrice = (s: any): number => {
    if (typeof s === 'number') return s;
    if (!s) return 0;
    const n = parseFloat(String(s).replace(/[^0-9.-]+/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const formatPrice = (n: number): string => `$${n.toFixed(2)}`;

  const getOrderBreakup = (order: any) => {
    const products = order?.products || [];
    let totalMRP = 0;
    let totalMRPDiscount = 0;

    products.forEach((p: any) => {
      const qty = p?.quantity ?? 1;
      const orig = parsePrice(p?.originalPrice ?? p?.price);
      const disc = parsePrice(p?.discountedPrice ?? p?.price);
      totalMRP += orig * qty;
      totalMRPDiscount += Math.max(0, (orig - disc)) * qty;
    });

    const couponDiscount = parsePrice(order?.couponDiscount);
    const orderTotal = Math.max(0, totalMRP - totalMRPDiscount - couponDiscount);
    return { totalMRP, totalMRPDiscount, couponDiscount, orderTotal };
  };

  const displayOrders: any[] = (orders as any[])?.length ? (orders as any[]) : mockOrders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your order history
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Total Orders: {displayOrders.length}
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            {displayOrders.map((order: any) => (
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
                  {/* Products Section - Flexible Grid */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-base">
                      Products ({order.products.length} item{order.products.length > 1 ? 's' : ''})
                    </h4>
                    <div className={`grid gap-3 ${order.products.length === 1 ? 'grid-cols-1' : order.products.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg border-2"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {product.quantity}</p>
                            <div className="text-xs">
                              {product.discountedPrice || product.originalPrice ? (
                                <div className="space-x-1">
                                  <span className="line-through text-muted-foreground/70">{product.originalPrice || product.price}</span>
                                  <span className="font-semibold text-primary">{product.discountedPrice || product.price}</span>
                                </div>
                              ) : (
                                <span className="font-semibold text-primary">{product.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total MRP</span>
                        <span className="font-medium">{formatPrice(getOrderBreakup(order).totalMRP)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total MRP Discount</span>
                        <span className="text-green-600">- {formatPrice(getOrderBreakup(order).totalMRPDiscount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coupon Discount</span>
                        <span className="text-green-600">- {formatPrice(getOrderBreakup(order).couponDiscount)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-primary">Order Total</span>
                        <span className="text-primary">{formatPrice(getOrderBreakup(order).orderTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Shipping Address</h4>
                      {typeof order.shippingAddress === 'string' ? (
                        <p className="text-sm text-muted-foreground leading-relaxed">{order.shippingAddress}</p>
                      ) : (
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                          <p className="font-medium text-foreground">{order.shippingAddress?.name}</p>
                          <p>Phone: {order.shippingAddress?.phone}</p>
                          <p>{order.shippingAddress?.address}</p>
                        </div>
                      )}
                    </div>

                    {/* Shipping Details */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Shipping Details</h4>
                      <div className="space-y-1">
                        <div>
                          <p className="text-xs text-muted-foreground">Tracking Number</p>
                          <p className="text-sm font-mono">{order.trackingNumber}</p>
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
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      View Digital Profiles
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-2" />
                        Download Invoice
                      </Button>
                      <Button variant="ghost" size="sm">
                        Track Package
                      </Button>
                    </div>
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