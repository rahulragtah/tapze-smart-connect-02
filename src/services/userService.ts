
import {UserAddress} from '../components/models/productInterface';

export const createUserAddress = async ( address: UserAddress ) => {
  const response = await fetch('https://tapze.in/tapzeservice/user/address.php', {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( address)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Failed to create Razorpay order: " + errorText);
  }

  return response.json();
};