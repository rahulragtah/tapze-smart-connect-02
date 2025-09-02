import React, { useState, useRef, useEffect, useCallback } from 'react';
import {  useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart} from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import OrderProcessingLoader from './OrderProcessingLoader';
import OrderErrorModal from './OrderErrorModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { getUserAddress } from '@/services/orderService';
import CheckoutForm from '../components/CheckoutForm';



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

 
const CartSheet = () => {

  const { items, totalItems,  totalOfferPrice, totalPrice, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponCode, setCouponCodeState] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'creating' | 'payment' | 'confirming' | 'complete'>('creating');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showExistingAccountDialog, setShowExistingAccountDialog] = useState(false);
  const openedFromNavRef = useRef(false);
    const [emailValue, setEmailValue] = useState<string>("")
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
    }
  }, [isOpen]);




  // Open cart on navigation if previous route asked for it (e.g., after login)
  
const {  setValue} = useForm<CheckoutFormData>();


const onProcessingChange = (value: boolean) => {
  setIsProcessing(value);
  };


  
  const handleRetryOrder = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };


  
  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
    getUserAddress().then((data) => {
          if (data) {
           // setAddresses(data.address || []);
          }
        });
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
        onClick={() => {
          setIsOpen(false);
          // Only redirect if not on product listing or product detail page
          const isOnProductPage = location.pathname.startsWith('/products/') || location.pathname === '/buy-nfc-card';
          if (!isOnProductPage) {
            navigate('/buy-nfc-card');
          }
        }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        Continue Shopping
      </Button>
    </div>
  );

  const CustomerCart = () => (
    <div className="flex flex-col h-full">
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 bg-card rounded-lg border">
                    {/* Mobile: Image and basic info in top row */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm sm:text-base truncate">{item.name}</h4>
                        {item.color && (
                          <p className="text-xs text-muted-foreground mt-1">Color: {item.color}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {item.price !== item.offerPrice && (
                            <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{item.price}</span>
                          )}
                          <span className="text-sm sm:text-base text-foreground font-medium">₹{item.offerPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Quantity controls and delete in bottom row */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.uniqueId)}
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
             

                 {/* Clear Cart Button - Inside scrollable area */}
                {totalItems > 1 && (
                  <div className="flex justify-center py-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </Button>
                  </div>
                )}
                
                </div>

                {/* Cart Summary - Fixed at bottom */}
                  <div className="border-t bg-background p-4 mt-auto mb-4">
                  <div className="flex justify-between items-center text-lg font-semibold mb-4">
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
  );


  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (open) setStep('cart'); }}>
        <SheetContent className="w-full sm:max-w-2xl flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                {step === 'cart' ? `Cart (${totalItems})` : 'Checkout'}
              </div>
            </SheetTitle>
          </SheetHeader>
          {items.length === 0 ? (
            <EmptyCartIllustration />
          ) : step === 'cart' ? (
            <CustomerCart/>
          ) : (
            <CheckoutForm  onBack={handleBackToCart}   onProcessingChange={onProcessingChange} onStageChange={setProcessingStage}/>
          )}
        </SheetContent>
      </Sheet>

      {/* Order Processing Loader */}
      {isProcessing && (
        <OrderProcessingLoader stage={processingStage} />
      )}

      {/* Order Error Modal */}
      <OrderErrorModal
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        onRetry={handleRetryOrder}
        errorMessage={errorMessage}
      />

      
    </>
  );
};
export default CartSheet;
