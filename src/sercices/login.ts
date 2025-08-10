// services.ts
import {signUpDTO} from '../components/models/loginInterface';

export const loginUser = async (email: string, password : string ) => {
  const response = await fetch('https://tapze.in/tapzeservice/user/login.php', {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email , password:  password})
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Failed to create Razorpay order: " + errorText);
  }

  return response.json();
};

export const signUp = async (signupData: signUpDTO) => {

  console.log('form data ', signupData); 
  const response = await fetch("https://tapze.in/tapzeservice/user/user-api.php", {
    method: "POST",
    
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData)
  });


  if (!response.ok) {
    throw new Error("Tapze order creation failed.");
  }
  return response.json();
};


export const resetPassword = async (email: string) => {

  const response = await fetch("https://tapze.in/tapzeservice/user/userTransaction.php", {
    method: "POST",
    
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email})
  });


  if (!response.ok) {
    throw new Error("Tapze order creation failed.");
  }
  return response.json();
};


export const resetPassword111 = async (email: string) => {

  const response = await fetch("https://tapze.in/tapzeservice/user/resetpassword.php", {
    method: "POST",
    
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactionId: email,password: email, confirmPassword:email})
  });


  if (!response.ok) {
    throw new Error("Tapze order creation failed.");
  }
  return response.json();
};


export const logOut = async () => {

  
  const response = await fetch("https://tapze.in/tapzeservice/user/logout.php", {
    method: 'GET',
    credentials: 'include', // Important to send session cookies
  });


  const result = await response.json();
  if (result.status === 'success') {
    console.log('User logged out');
    // Clear any local state or redirect
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    
  } else {
    console.error('Logout failed');
  }
};


export const isUserExist = async (email: string) => {
  const response = await fetch("https://tapze.in/tapzeservice/user/user-api.php?email=" +encodeURIComponent(email), {
    method: 'GET'
    
  });
  return response.json();  
};


