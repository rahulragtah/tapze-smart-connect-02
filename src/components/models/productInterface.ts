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