// services.ts
import { CheckoutDTO, orderDTO } from '../components/models/productInterface';
import {signUpDTO} from '../components/models/loginInterface';
import {signUp, loginUser, initiateResetPassword, logOut} from './login';
import {sendRestPasswordEmail} from './appEmailService';
import {createUserAddress} from './userService';

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


export const postOrderProcessing = async (orderData: CheckoutDTO, isLoggedIn:boolean) => {
  if (isLoggedIn)
    return ;
  const userObject: signUpDTO  = {
    firstName: orderData.personalInfo.firstName,
    lastName: orderData.personalInfo.lastName,
    email: orderData.personalInfo.email,
    phoneNumber:orderData.personalInfo.phone ,
    password: 'TabZe@123',
    confirmPassword: 'TabZe@123'
  };
  // create user in user table 
  const result = await signUp(userObject);
  if (result.success) {
      // generate transaction id to send in resetpassword mail      
    const response= await initiateResetPassword(orderData.personalInfo.email);
    if (response.success) { 
      sendRestPasswordEmail(response.email,response.firstName,  response.lastName,response.transactionId);

      const result = await  loginUser(orderData.personalInfo.email,'TabZe@123' )
      if(result.success){
        createUserAddress(orderData.address);
        logOut()
      }
    }
  }
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
    const response = await fetch(`${API_BASE}/address.php`, {
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

export const getUserOrders = async (): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE}/order.php`, {
      method: "GET",
      credentials: "include", // send PHP session cookies
    });

    const data = await response.json();
    return data;
    
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};


export const getOrders = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE}/order.php?userId=${userId}`, {
      method: 'GET',
      credentials: 'include', // ✅ sends cookies/session info
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Expected: array of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};