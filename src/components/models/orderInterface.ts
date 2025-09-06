export interface ApplyCouponResponse {
  success: boolean;
  message: string;
  discount?: number;
  final_amount?: number;
  code?: string;
  type?: string;    
  discount_value?: number;
}