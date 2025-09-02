import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { Separator } from '@/components/ui/separator';
import CouponCodeSection from '../components/CouponCodeSection';
import { useToast } from '@/hooks/use-toast';
import { isUserExist } from '@/services/login';
import { CheckoutDTO, orderDTO } from '@/components/models/productInterface';
import { postOrderProcessing } from '@/services/orderService';
import emailjs from '@emailjs/browser';
import {  ArrowLeft } from 'lucide-react';
import { useCart} from '@/contexts/CartContext';
import OrderProcessingLoader from './OrderProcessingLoader';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';




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
}

interface CheckoutFormProps {
  onBack: () => void;
  onProcessingChange: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({  onBack, onProcessingChange }) => {
  const { items, totalItems,  totalOfferPrice, totalPrice, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();
const checkoutScrollRef = useRef<HTMLDivElement>(null);
const placeOrderButtonRef = useRef<HTMLButtonElement>(null);
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponCode, setCouponCodeState] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'creating' | 'payment' | 'confirming' | 'complete'>('creating');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState<string>("")
  const [showExistingAccountDialog, setShowExistingAccountDialog] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, trigger , setFocus} = useForm<CheckoutFormData>();
 // Ref to track the currently focused element
  const focusedElementRef = useRef<HTMLElement | null>(null);
   const [step, setStep] = useState<'cart' | 'checkout'>('cart');
     // India address helpers - removed unused state since fields are now read-only
     const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);


  const formattedDate = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

  const handleOrderError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
    setIsProcessing(false);
  };

   // Ensure country is India and non-editable
    useEffect(() => {
      setValue('country', 'India');
      //  getUserAddress().then((data) => {
      //           if (data) {
      //             setAddresses(data.address || []);
      //           }
      //         }
      //      );
    }, [setValue]);
   // Mock coupon codes for demo


  const validCoupons = {
    'COMEBACK10': { discount: 10, type: 'percentage' }
  };
   const shippingCharge = totalPrice > 1000 ? 0 : 50;
  const subtotal = totalPrice;
  const discountAmount = appliedCoupon ? 
    (validCoupons[appliedCoupon as keyof typeof validCoupons]?.type === 'percentage' 
      ? (totalOfferPrice * couponDiscount) / 100 
      : couponDiscount) : 0;
  const afterDiscount = totalOfferPrice - discountAmount;
  // const gstAmount = (afterDiscount * 18) / 100; // 18% GST
  // const finalTotal = afterDiscount + gstAmount + shippingCharge;
  const finalTotal = afterDiscount;

 // Handle email validation on blur
  const handleEmailBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value?.trim();
    if (email && !isLoggedIn) {
      isUserExistValidate(email);
    }
  }, [isLoggedIn]);

  const isUserExistValidate = async (email: string) => {
      setEmailValue(email);
      if (isLoggedIn) return;
      if (!email) return;
      try {
          const response = await isUserExist(email);
          console.log('User exists check response:', response);
  
          if (response?.success) {
              setShowExistingAccountDialog(true);
          }
      } catch (error) {
          console.error("Error checking user:", error);
      }
      setFocus("phone");
    };

   

     // Watch for ZIP code changes and auto-populate state/city
  const handleZipCodeChangeEffect = useCallback(async (zipCode: string) => {
    
    if (zipCode && zipCode.length === 6) {
      // Store the currently focused element
      focusedElementRef.current = document.activeElement as HTMLElement;
      
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
        const data = await response.json();
        const result = data?.[0];
        
        if (result?.Status === 'Success' && Array.isArray(result.PostOffice) && result.PostOffice.length) {
          const po = result.PostOffice[0];
          const stateName = po.State as string;
          const district = po.District as string;

           setValue('city', district);
           setValue('state', stateName);
         return;
          const matchedState = State.getStatesOfCountry('IN').find(s => s.name.toLowerCase() === stateName.toLowerCase());
          if (matchedState) {
            setSelectedStateCode(matchedState.isoCode);
            setValue('state', matchedState.name, { shouldValidate: false, shouldDirty: true });
            setValue('city', district, { shouldValidate: false, shouldDirty: true });
          } else {
            setValue('state', stateName, { shouldValidate: false, shouldDirty: true });
            setValue('city', district, { shouldValidate: false, shouldDirty: true });
          }

          // Restore focus after a brief delay to allow DOM updates
          setTimeout(() => {
            if (focusedElementRef.current && document.contains(focusedElementRef.current)) {
              focusedElementRef.current.focus();
            }
          }, 10);
        }
      } catch (err) {
        console.error('PIN lookup failed', err);
      }
      setFocus("country");
    }
  }, [setValue, setSelectedStateCode]);


   // Handle ZIP code input formatting
    const handleZipCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 6) val = val.slice(0, 6);
      setValue('zipCode', val, { shouldDirty: true });
      
      // Debounce the effect to avoid multiple API calls
      const timeoutId = setTimeout(() => {
        handleZipCodeChangeEffect(val);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }, [setValue, handleZipCodeChangeEffect]);


    const onSubmit = async (values: CheckoutFormData) => {
        setIsProcessing(true);
        onProcessingChange(true);
        setProcessingStage('creating');
    
        if(isLoggedIn){
          values.email=localStorage.getItem('email');
        }
        console.log('current email.', values.email );
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
            country: values.country,
            isDefault :0
          },
          orderItems: items,
          totalItems: totalItems,
          totalPrice: totalPrice,
          offerPrice: totalOfferPrice,
          couponDiscount: discountAmount,
          couponCode: couponCode,
          gstAmount: 0,
          finalTotal: finalTotal,
          shippingCharge: shippingCharge,
          paymentOrderId: 'notdefine'
        };
    
        try {
          // Stage 1: Create Razorpay order
          setProcessingStage('creating');
          
          //postOrderProcessing(finalOrderDto, isLoggedIn);
          
          const createOrderRazorpayResponse = await fetch(
            'https://tapze.in/tapzeservice/create_order.php',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                amount: finalOrderDto.finalTotal * 100
              })
            }
          );
    
          if (!createOrderRazorpayResponse.ok) {
            const errorText = await createOrderRazorpayResponse.text();
            console.error("Razorpay order creation failed:", errorText);
            throw new Error("Failed to create payment order. Please try again.");
          }
    
          const data = await createOrderRazorpayResponse.json();
          finalOrderDto.paymentOrderId = data.id;
          const { id: order_id, amount, currency } = data;
    
          // Stage 2: Create order in TapZe database
          const response = await fetch("https://tapze.in/tapzeservice/order.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(finalOrderDto)
          });
    
          if (!response.ok) {
            throw new Error("Failed to create order in our system. Please try again.");
          }
    
          const tapZeOrderResponse = await response.json();
    
          // Stage 3: Initialize payment
          setProcessingStage('payment');
          const razorpayPaymentOptions = {
            //key: "rzp_test_OmyeGhZlBHqJUK", //test key
            key: "rzp_live_hS5lXcbNNUiAFa", //live key
            amount: amount,
            currency: currency,
            name: "TapZe",
            description: "TapZe Transaction",
            order_id: order_id,
            handler: async function (response) {
              try {
                setProcessingStage('confirming');
                
                // Verify payment
                const body = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  tapze_order_id: tapZeOrderResponse.order_id,
                  amount: amount,
                };
    
                const verifyResponse = await fetch(
                  'https://tapze.in/tapzeservice/verifypayment.php',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                  }
                );
    
                const verifyResult = await verifyResponse.json();
    
                if (verifyResult.success) {
                  setProcessingStage('complete');
                  
                  // Send email confirmation
                  const finalEmailDto: orderDTO = {
                    orderId: tapZeOrderResponse.order_id ? `#${tapZeOrderResponse.order_id}` : "#testid",
                    orderDate: formattedDate,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    email: values.email,
                    line1: values.address,
                    line2: values.apartment,
                    state: values.state,
                    city: values.city,
                    pinCode: values.zipCode,
                    orderSummary: items.map(item =>
                      `${item.quantity} x ${item.name} (${item.color}) - ₹${item.offerPrice}`
                    ).join('\n'),
                    totalItems: totalItems,
                    totalPrice: totalPrice,
                    discountOnMRP: totalPrice - totalOfferPrice,
                    couponDiscount: discountAmount,
                    couponCode: couponCode,
                    finalTotal: finalTotal,
                  };
    
                  try {
                    await emailjs.send('tapzeEmailService', 'template_zk2gl62', finalEmailDto, 'iwIaefaueRobx3b5j');
                    console.log('Order confirmation email sent successfully');
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    //if user is logged in it means it is not a new user 
                    postOrderProcessing(finalOrderDto, isLoggedIn);
                  } catch (emailError) {
                    console.error('Failed to send email:', emailError);
                  }
    
                  // Store order details for success page
                  const orderDetailsForSuccessPage = {
                    ...finalOrderDto,
                    orderId: tapZeOrderResponse.order_id || "testid"
                  };
                  localStorage.setItem('orderDetails', JSON.stringify(orderDetailsForSuccessPage));
    
                  // Clear cart and reset form
                  clearCart();
                  reset();
                  setStep('cart');
                  setCouponDiscount(0);
                  setAppliedCoupon('');
                  setCouponCodeState('');
                  setIsOpen(false);
    
                  // Keep loader visible during navigation
                  setTimeout(() => {
                    setIsProcessing(false);
                    navigate('/order-success');
                  }, 1500);
                } else {
                  throw new Error('Payment verification failed. Please contact support if amount was debited.');
                }
              } catch (error) {
                console.error('Payment verification error:', error);
                handleOrderError(error.message || 'Payment verification failed. Please contact support.');
              }
            },
            modal: {
              ondismiss: function() {
                setIsProcessing(false);
                toast({
                  title: "Payment Cancelled",
                  description: "You cancelled the payment. Your cart is still saved.",
                  variant: "destructive",
                });
              }
            },
            prefill: {
              name: finalOrderDto.personalInfo.firstName + " " + finalOrderDto.personalInfo.lastName,
              email: finalOrderDto.personalInfo.email,
              contact: finalOrderDto.personalInfo.phone,
            },
            notes: {
              address: finalOrderDto.address.line1 + " " + finalOrderDto.address.line2 + finalOrderDto.address.city,
            },
            theme: {
              color: "#3399cc",
            },
          };
    
          // Open Razorpay Checkout
          const rzp1 = new (window as any).Razorpay(razorpayPaymentOptions);
          setIsOpen(false); // Close cart sheet when payment opens
          rzp1.open();
    
        } catch (error) {
          console.error('Order creation error:', error);
          handleOrderError(error.message || 'Something went wrong while creating your order. Please try again.');
        }
      };



  
  return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </div>
  
        <div ref={checkoutScrollRef} className="flex-1 overflow-y-auto space-y-6 pb-6">
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
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
                    {...register('lastName', { required: 'Last name is required' })}
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              { isLoggedIn ?  <div>{isLoggedIn} </div> : 
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  onBlur={handleEmailBlur}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
               }
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <PhoneInput
                  id="phone"
                  placeholder="10-digit mobile number"
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
              {/* Address first */}
              {/* <p>
            {addresses.map((address) => (  <p> {address.line1}  {address.line2} {address.state}, {address.pincode} {address.isDefault}</p> )) }</p> */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="House no., street, area"
                  {...register('address', { required: 'Address is required' })}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" placeholder="Apartment, suite, floor (optional)" {...register('apartment')} />
              </div>
  
              {/* PIN Code & State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">PIN Code *</Label>
                  <Input
                    id="zipCode"
                    inputMode="numeric"
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    {...register('zipCode', { 
                      required: 'PIN code is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a valid 6-digit PIN code'
                      }
                    })}
                    onChange={handleZipCodeChange}
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Tab' && !e.shiftKey) {
                    //     e.preventDefault();
                    //     setTimeout(() => {
                    //       placeOrderButtonRef.current?.focus();
                    //     }, 0);
                    //   }
                    // }}
                    className={errors.zipCode ? 'border-destructive' : ''}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive mt-1">{errors.zipCode.message as string}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Auto-filled from PIN code"
                    readOnly
                    
                    {...register('state', { required: 'State is required' })}
                    className={`bg-muted ${errors.state ? 'border-destructive' : ''}`}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>
  
              {/* City & Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Auto-filled from PIN code"
                    readOnly
                    
                    {...register('city', { required: 'City is required' })}
                    className={`bg-muted ${errors.city ? 'border-destructive' : ''}`}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    defaultValue="India"
                    readOnly
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
  
          {/* Coupon Code - Standalone component to prevent form interference */}
          <CouponCodeSection
              appliedCoupon={appliedCoupon}
              couponDiscount={couponDiscount}
              validCoupons={validCoupons}
              onApply={(code) => {
                const coupon = validCoupons[code.toUpperCase() as keyof typeof validCoupons];
                if (coupon) {
                  setCouponDiscount(coupon.discount);
                  setAppliedCoupon(code.toUpperCase());
                  toast({
                    title: "Coupon Applied!",
                    description: `${
                      coupon.type === "percentage"
                        ? `${coupon.discount}% off`
                        : `₹${coupon.discount} off`
                    } applied successfully.`,
                  });
                } else {
                  toast({
                    title: "Invalid Coupon",
                    description: "Please enter a valid coupon code.",
                    variant: "destructive",
                  });
                }
              }}
              onRemove={() => {
                setCouponDiscount(0);
                setAppliedCoupon("");
                toast({
                  title: "Coupon Removed",
                  description: "Coupon code has been removed from your order.",
                });
              }}
            />
  
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
                    {item.color && (
                      <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                    )}
                    <div className="flex items-center gap-2">
                      {item.price !== item.offerPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{item.price}</span>
                      )}
                      <span className="text-xs text-muted-foreground">₹{item.offerPrice} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total MRP <i>( Inclusive GST )</i></span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                
                
                  <div className="flex justify-between text-green-600">
                    <span>Discount on MRP </span>
                    <span>-₹{(totalPrice-totalOfferPrice).toFixed(2)} </span>
                  </div>
               {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {/* <div className="flex justify-between">
                  <span>Price includes 18% GST</span>
                  <span>-</span>
                </div> */}
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
                  <span>₹{(totalOfferPrice-discountAmount).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
  
        {/* Place Order Button - Fixed at bottom   <ReCAPTCHA sitekey="6LfS1ZQrAAAAAOWPmKZRXxqCAjFkURJVYBpYY7Vh" onChange={handleCaptchaChange} /> */}
        <div className="border-t bg-background p-4 mt-auto mb-4">
            
          
          <Button 
            ref={placeOrderButtonRef}
            data-place-order-button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
            size="lg"
            onClick={handleSubmit(onSubmit)}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal.toFixed(2)}`}
          </Button>
        </div>

         {/* Existing Account Prompt */}
      <AlertDialog open={showExistingAccountDialog} onOpenChange={(open) => {
        setShowExistingAccountDialog(open);
        if (!open) {
          setValue('email', '');
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account already exists</AlertDialogTitle>
            <AlertDialogDescription>
              You already have an account with us. Please log in for a seamless checkout & best offers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowExistingAccountDialog(false);
              setValue('email', '');
            }}>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              const emailVal = emailValue;
              setShowExistingAccountDialog(false);
              setIsOpen(false);
              
              navigate(`/login?redirecturl=${location.pathname}${location.search}`, {
                state: { prefillEmail: emailVal },
              });
            }}>
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> 
      </div>
      


    );
};
export default CheckoutForm;