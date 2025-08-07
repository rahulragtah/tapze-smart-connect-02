// services.ts
import {signUpDTO} from '../components/models/loginInterface';

export const loginUser = async (email: string, password : string ) => {
  const response = await fetch('https://tapze.in/tapzeservice/user/login.php', {
    method: 'POST',
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
