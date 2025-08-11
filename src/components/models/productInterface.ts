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

export interface  UserAddress {
    line1: string;
    line2?: string;
    state: string;
    city: string;
    pinCode: string;
    country:string;
  }

export interface CheckoutDTO  extends Record<string, unknown> {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  address: UserAddress;
  orderItems: CartItem[];
  totalItems: number;
  totalPrice:number;
  offerPrice:number;
  couponDiscount:number;
  couponCode:string;
  gstAmount:number;
  finalTotal:number;
  shippingCharge:number;
  paymentOrderId: string;

}
export interface orderDTO  extends Record<string, unknown> {
  orderId: string;
  orderDate: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  state: string;
  city: string;
  pinCode: string;
  //orderItems: CartItem[];
  orderSummary : string;
  totalItems: number;
  totalPrice:number;
  discountOnMRP:number;
  couponDiscount:number;
  couponCode:string;
  //gstAmount:number;
  finalTotal:number;
  //paymentMethod:string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  offerPrice:number;
  quantity: number;
  image?: string;
}

export interface gImage {
 image:string
  color?: string;
  uniqueId: string;
}