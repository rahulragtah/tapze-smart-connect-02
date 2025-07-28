
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, Tag, X, ArrowLeft } from 'lucide-react';
import { useCart, CartItem} from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import PaymentButton from '../components/PaymentButton';
import{CheckoutDTO, OrderDTO} from '../components/models/productInterface' ;


interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  couponCode?: string;
}
const formattedDate = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
 
const CartSheet = () => {
  const { items, totalItems,  totalOfferPrice, totalPrice, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckoutFormData>();
  
  // Mock coupon codes for demo
  const validCoupons = {
    'SAVE10': { discount: 10, type: 'percentage' },
    'SAVE50': { discount: 50, type: 'fixed' },
    'WELCOME15': { discount: 15, type: 'percentage' },
  };
  
  const shippingCharge = totalPrice > 1000 ? 0 : 50;
  const subtotal = totalPrice;
  const discountAmount = appliedCoupon ? 
    (validCoupons[appliedCoupon as keyof typeof validCoupons]?.type === 'percentage' 
      ? (subtotal * couponDiscount) / 100 
      : couponDiscount) : 0;
  const afterDiscount = subtotal - discountAmount;
  // const gstAmount = (afterDiscount * 18) / 100; // 18% GST
  // const finalTotal = afterDiscount + gstAmount + shippingCharge;
  const finalTotal = afterDiscount;

  const applyCoupon = () => {
    const coupon = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    if (coupon) {
      setCouponDiscount(coupon.discount);
      setAppliedCoupon(couponCode.toUpperCase());
      toast({
        title: "Coupon Applied!",
        description: `${coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`} applied successfully.`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon('');
    setCouponCode('');
    toast({
      title: "Coupon Removed",
      description: "Coupon code has been removed from your order.",
    });
  };

  const onSubmit = async (values: CheckoutFormData) => {
    setIsProcessing(true);
    const finalOrderDto: CheckoutDTO = {
      personalInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      },
      address: {
        line1: values.address,
        line2: values.apartment,
        state: values.state,
        city: values.city,
        pinCode: values.zipCode,
      },
      orderItems: items,
      totalItems: totalItems,
      totalPrice: totalPrice,
      offerPrice: totalOfferPrice,
      couponDiscount:couponDiscount,
      couponCode:couponCode ,
      gstAmount:100,
      finalTotal:finalTotal,
    }
    const finalEmailDto: OrderDTO = {
      orderId : "#testid",
      orderDate : formattedDate,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      line1: values.address,
      line2: values.apartment,
      state: values.state,
      city: values.city,
      pinCode: values.zipCode,
      orderItems: items,
      totalItems: totalItems,
      totalPrice: totalPrice,
      offerPrice: totalOfferPrice,
      couponDiscount:couponDiscount,
      couponCode:couponCode ,
      gstAmount:100,
      finalTotal:finalTotal,
      paymentMethod: "Credit card"
    }

    console.log('current form data ', finalOrderDto);
    console.log ('car item ', items);
    console.log("total item ", totalItems);

    try {

      const createOrderRazorpayResponse = await fetch(
        'https://tapze.in/tapzeservice/create_order.php',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            amount: finalOrderDto.offerPrice*100
            })
        }
        );

        // ✅ Important: fetch does NOT auto-parse JSON like axios
        const data = await createOrderRazorpayResponse.json();
        console.log( "create order razorpay response", data);
        const { id: order_id, amount, currency } = data;

        // 2️⃣ Configure Razorpay options
      const options = {
        key: "rzp_test_OmyeGhZlBHqJUK", // Replace with your public key
        amount: amount,
        currency: currency,
        name: "TapZe",
        description: "TapZe Transaction",
        order_id: order_id,
        handler: async function (response) {
            console.log(response);

            // Prepare payload
            const body = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
            };

            // POST to verify.php
            const verifyResponse = await fetch(
                'https://tapze.in/tapzeservice/verify.php',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
                }
            );

            const verifyResult = await verifyResponse.json();
            console.log(verifyResult);

            if (verifyResult.success) {
                alert('Payment verified! ✅');
                // Do your order fulfillment here!
            } else {
                alert('Payment verification failed! ❌');
            }
            },
        prefill: {
          name:  finalOrderDto.personalInfo.firstName +" "+finalOrderDto.personalInfo.lastName,
          email: finalOrderDto.personalInfo.email,
          contact: finalOrderDto.personalInfo.phone,
        },
        notes: {
          address: finalOrderDto.address.line1 +" "+ finalOrderDto.address.line2+finalOrderDto.address.city ,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 3️⃣ Open Razorpay Checkout
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();



      const response = await fetch("https://tapze.in/tapzeservice/order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalOrderDto)
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);
      if (!response.ok) {
        throw new Error("Order failed");
      }

      emailjs.send('tapzeEmailService','template_t4zx6o9',finalEmailDto,'Yc8keWHr9MEOI9SGg').then(
      (result) => {
        console.log(result.text);
        alert("Email sent successfully!");
      },
      (error) => {
        console.log(error.text);
        alert("Error sending email.");
      }
    );

      alert(`Order placed! ID: ${responseData.order_id}`);
       toast({
          title: "Order Placed Successfully!",
          description: `Your order for ₹${finalTotal.toFixed(2)} has been placed. You will receive a confirmation email shortly.`,
        });
    } catch (error) {
      console.error(error);
      alert("Order failed. Try again.");
    }


    
    // Simulate order processing
     //await new Promise(resolve => setTimeout(resolve, 2000));
    
    
    
    // Clear cart and reset form
    clearCart();
    reset();
    setStep('cart');
    setCouponDiscount(0);
    setAppliedCoupon('');
    setCouponCode('');
    setIsProcessing(false);
    setIsOpen(false);
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const EmptyCartIllustration = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-32 h-32 mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      <Button 
        onClick={() => setIsOpen(false)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        Continue Shopping
      </Button>
    </div>
  );

  const CheckoutForm = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={handleBackToCart}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: 'First name is required' })}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: 'Last name is required' })}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email'
                  }
                })}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                {...register('address', { required: 'Address is required' })}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
              <Input id="apartment" {...register('apartment')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register('city', { required: 'City is required' })}
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...register('state', { required: 'State is required' })}
                  className={errors.state ? 'border-destructive' : ''}
                />
                {errors.state && (
                  <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP / Postal Code *</Label>
                <Input
                  id="zipCode"
                  {...register('zipCode', { required: 'ZIP code is required' })}
                  className={errors.zipCode ? 'border-destructive' : ''}
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  defaultValue="India"
                  {...register('country', { required: 'Country is required' })}
                  className={errors.country ? 'border-destructive' : ''}
                />
                {errors.country && (
                  <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5" />
              Coupon Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {appliedCoupon}
                  </Badge>
                  <span className="text-sm text-green-700">
                    {validCoupons[appliedCoupon as keyof typeof validCoupons]?.type === 'percentage' 
                      ? `${couponDiscount}% off` 
                      : `₹${couponDiscount} off`}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeCoupon}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyCoupon} variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Try: SAVE10, SAVE50, or WELCOME15
            </p>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">₹{item.price} × {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              
                <div className="flex justify-between text-green-600">
                  <span>Discount on MPR </span>
                  <span>-₹{(totalPrice-totalOfferPrice).toFixed(2)} </span>
                </div>
             
              <div className="flex justify-between">
                <span>Price includes 18% GST</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                {/* <span>{shippingCharge === 0 ? 'Free' : `₹${shippingCharge}`}</span> */}
                <span>Free</span>
              </div>
              {/* {shippingCharge === 0 && (
                <p className="text-xs text-green-600">Free shipping on orders above ₹1000!</p>
              )} */}
               
                {/* <p className="text-xs text-green-600">Free shipping on all orders above!</p> */}
             
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalOfferPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Place Order Button - Fixed at bottom */}
      <div className="border-t bg-background p-4 mt-auto">
        
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
          size="lg"
          onClick={handleSubmit(onSubmit)}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Place Order - ₹${totalOfferPrice.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {step === 'cart' ? `Cart (${totalItems})` : 'Checkout'}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCartIllustration />
        ) : step === 'cart' ? (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{item.offerPrice}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                {/* <span>₹{(totalPrice-totalOfferPrice).toFixed(2)} </span>  */}
                 <span>₹{totalOfferPrice.toFixed(2)} </span>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
                onClick={handleProceedToCheckout}
              >
                Buy Now
              </Button>
            </div>
          </div>
        ) : (
          <CheckoutForm />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
