// services.ts
import { CheckoutDTO, orderDTO } from '../components/models/productInterface';

export const createRazorpayOrder = async (amount: number) => {
  const response = await fetch('https://tapze.in/tapzeservice/create_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amount * 100 })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Failed to create Razorpay order: " + errorText);
  }

  return response.json();
};

export const createTapzeOrder = async (orderData: CheckoutDTO) => {
  const response = await fetch("https://tapze.in/tapzeservice/order.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error("Tapze order creation failed.");
  }

  return response.json();
};

export const verifyPayment = async (body: any) => {
  const response = await fetch("https://tapze.in/tapzeservice/verifypayment.php", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  return response.json();
};

export const sendConfirmationEmail = async (finalEmailDto: orderDTO) => {
  // @ts-ignore - EmailJS is loaded externally
  return await window.emailjs.send(
    'tapzeEmailService',
    'template_zk2gl62',
    finalEmailDto,
    'iwIaefaueRobx3b5j'
  );
};



export interface Address {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
}

const API_BASE = "https://tapze.in/tapzeservice/user";

export const getUserAddress = async (): Promise<Address | null> => {
  try {
    const response = await fetch(`${API_BASE}/userAddress.php`, {
      method: "GET",
      credentials: "include", // send PHP session cookies
    });

    const data = await response.json();

    if (data.success) {
      return data.address as Address;
    } else {
      console.error("Error:", data.message);
      return null;
    }
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};
