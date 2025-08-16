import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, Package, ShoppingBag, Sparkles, CreditCard } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import  { useEffect, useState } from 'react';

import {getOrders} from '../services/orderService';

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

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Safely read current user from localStorage
  const rawUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let currentUserEmail = '';
  try {
    if (rawUser && rawUser !== 'null' && rawUser !== 'undefined') {
      const parsed = JSON.parse(rawUser);
      if (parsed && typeof parsed === 'object') {
        currentUserEmail = parsed.email ?? '';
      }
    }
  } catch (e) {
    console.warn('Invalid user in localStorage');
  }


 


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId= user.email;
        if (!userId) return;
        getOrders(userId).then((data) => {
          if (data) {
            console.log("current user data", data.orders);
            setOrders(data.orders || []);
          }
          setLoading(false);
        });
      }, []);




  






  // Helpers and derived data
  const parsePrice = (s: any): number => {
    if (typeof s === 'number') return s;
    if (!s) return 0;
    const n = parseFloat(String(s).replace(/[^0-9.-]+/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const formatPrice = (n: number): string => `₹${n.toFixed(2)}`;

  const getOrderBreakup = (order: any) => {
    const totalMRP = parsePrice(order?.total_price);
    const discountedPrice = parsePrice(order?.discounted_price);
    const totalMRPDiscount = Math.max(0, totalMRP - discountedPrice);
    const couponDiscount = parsePrice(order?.coupon_discount);
    const orderTotal = parsePrice(order?.final_total || discountedPrice);
    return { totalMRP, totalMRPDiscount, couponDiscount, orderTotal };
  };

  const displayOrders: any[] = Array.isArray(orders) ? (orders as any[]) : [];

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
            <h1 className="text-3xl font-bold text-gradient">
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
            {loading ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="py-10 text-center text-muted-foreground text-sm">
                  Loading your orders...
                </CardContent>
              </Card>
            ) : displayOrders.length === 0 ?  (
              <Card className="border-0 shadow-xl">
                <CardContent className="py-12 text-center">
                  <div className="flex flex-col items-center gap-4 animate-enter">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center hover-scale">
                        <ShoppingBag className="w-10 h-10 text-primary pulse" />
                      </div>
                      <Sparkles className="w-5 h-5 text-primary absolute -top-2 -right-2 animate-fade-in" />
                    </div>
                    <h3 className="text-base font-semibold">No orders yet</h3>
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
              displayOrders.map((order: any) => (
                <Card key={order.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                 
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">Order {order.id}</CardTitle>
                        <CardDescription>Placed on {order.created_at}</CardDescription>
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
                          Products ({(order.items?.length || 0)} item{(order.items?.length || 0) > 1 ? 's' : ''})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {(order.items || []).map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-lg border-2"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{item.name}{item.color ? ` - ${item.color}` : ''}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                <div className="text-xs">
                                  {(() => {
                                    const qty = Number(item.quantity) || 1;
                                    const unitPrice = parsePrice(item.price);
                                    const orderMRP = parsePrice(order.total_price);
                                    const coupon = parsePrice(order.coupon_discount);
                                    const itemSubtotal = unitPrice * qty;
                                    const discountShare = orderMRP > 0 ? (coupon * (itemSubtotal / orderMRP)) : 0;
                                    const unitDiscounted = qty > 0 ? (itemSubtotal - discountShare) / qty : unitPrice;
                                    const hasDiscount = unitDiscounted < unitPrice;
                                    return hasDiscount ? (
                                      <span>
                                        <span className="line-through text-muted-foreground mr-1">{formatPrice(unitPrice)}</span>
                                        <span className="font-semibold text-primary">{formatPrice(unitDiscounted)}</span>
                                      </span>
                                    ) : (
                                      <span className="font-semibold text-primary">{formatPrice(unitPrice)}</span>
                                    );
                                  })()}
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
                          <span>Order Total</span>
                          <span>{formatPrice(getOrderBreakup(order).orderTotal)}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Shipping Address */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Shipping Address</h4>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                          <p className="font-medium text-foreground">{order.first_name} {order.last_name}</p>
                          <p>Phone: {order.phone}</p>
                          <p>
                            {order.address?.line1} {order.address?.line2},{order.address?.city},{order.address?.state} {order.address?.pin_code}, {order.address?.country}
                          </p>
                        </div>
                      </div>

                      {/* Shipping Details */}
                        {(order.trackingNumber || order.courierPartner || order.courierWebsite) ? (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Shipping Details</h4>
                            <div className="space-y-1">
                              {order.trackingNumber && (
                                <div>
                                  <p className="text-xs text-muted-foreground">Tracking Number</p>
                                  <p className="text-sm font-mono">{order.trackingNumber}</p>
                                </div>
                              )}
                              {(order.courierPartner || order.courierWebsite) && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">Courier: {order.courierPartner}</span>
                                  {order.courierWebsite && (
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
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null}
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
                        {/* <Button variant="ghost" size="sm">
                          Track Package
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountOrders;