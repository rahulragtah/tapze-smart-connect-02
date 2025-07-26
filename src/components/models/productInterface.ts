export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: string[];
  price: number;
}

export interface Offer {
  productId: string;
  offerId: number;
  offerType: string;
  value: number;
  isActive: boolean;
}

export interface CheckoutDTO  extends Record<string, unknown> {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  address: {
    line1: string;
    line2?: string;
    state: string;
    city: string;
    pinCode: string;
  };
  orderItems: CartItem[];
  totalItems: number;
  totalPrice:number;
  couponDiscount:number;
  couponCode:string;
  gstAmount:number;
  finalTotal:number;

}