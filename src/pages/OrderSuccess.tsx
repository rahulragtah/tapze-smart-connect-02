
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Mail, User, Package, MapPin, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get order details from URL parameters or localStorage
    const orderData = localStorage.getItem('orderDetails');
    if (orderData) {
      setOrderDetails(JSON.parse(orderData));
      // Clear the order details from localStorage after displaying
      localStorage.removeItem('orderDetails');
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 mt-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Success Header Skeleton */}
            <div className="text-center space-y-4">
              <Skeleton className="w-20 h-20 rounded-full mx-auto" />
              <Skeleton className="h-8 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            {/* Order Summary Skeleton */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>

                <Separator />

                {/* Items Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Skeleton className="w-16 h-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Address Skeleton */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Confirmation Skeleton */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-80" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps Skeleton */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-3 w-64" />
              </CardContent>
            </Card>

            {/* Continue Shopping Skeleton */}
            <div className="text-center">
              <Skeleton className="h-10 w-36 mx-auto" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 mt-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-semibold text-lg">#{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-semibold text-lg">₹{orderDetails.finalTotal.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              {/* Ordered Items */}
              <div>
                <h3 className="font-semibold mb-4">Items Ordered ({orderDetails.totalItems})</h3>
                <div className="space-y-4">
                  {orderDetails.orderItems.map((item: any) => (
                    <div key={item.uniqueId} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.color && (
                          <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {item.price !== item.offerPrice && (
                            <span className="text-sm text-muted-foreground line-through">₹{item.price}</span>
                          )}
                          <span className="text-sm font-medium">₹{item.offerPrice}</span>
                          <span className="text-sm text-muted-foreground">× {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.offerPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Delivery Address */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium">{orderDetails.personalInfo.firstName} {orderDetails.personalInfo.lastName}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.personalInfo.phone}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.personalInfo.email}</p>
                  <div className="mt-2">
                    <p>{orderDetails.address.line1}</p>
                    {orderDetails.address.line2 && <p>{orderDetails.address.line2}</p>}
                    <p>{orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pinCode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Confirmation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email with your order details will be sent to {orderDetails.personalInfo.email} shortly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To complete your NFC card setup, you'll need to provide details for your digital profile creation.
              </p>
              <Link to="/digital-profile">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your Digital Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">
                Don't worry, you can also do this later from your account dashboard.
              </p>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="text-center">
            <Link to="/">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
