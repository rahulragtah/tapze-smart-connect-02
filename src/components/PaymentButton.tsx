// src/components/PaymentButton.jsx
import React from 'react';
import {CheckoutDTO} from  '../components/models/productInterface'
interface Props {
  order: CheckoutDTO;
} 

const PaymentButton : React.FC<Props> = ({ order }) => {
  const handlePayment = async () => {
    try {
      const createOrderRazorpayResponse = await fetch(
        'https://tapze.in/tapzeservice/create_order.php',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            amount: order.totalPrice
            })
        }
        );

        // ✅ Important: fetch does NOT auto-parse JSON like axios
        const data = await createOrderRazorpayResponse.json();
        console.log( "create order razorpay response", data);
        const { id: order_id, amount, currency } = data;


      // 2️⃣ Configure Razorpay options
      const options = {
        key: "rzp_test_OmyeGhZlBHqJUK", // Replace with your public key
        amount: amount,
        currency: currency,
        name: "TapZe",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            console.log(response);

            // Prepare payload
            const body = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
            };

            // POST to verify.php
            const verifyResponse = await fetch(
                'https://tapze.in/tapzeservice/verify.php',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
                }
            );

            const verifyResult = await verifyResponse.json();
            console.log(verifyResult);

            if (verifyResult.success) {
                alert('Payment verified! ✅');
                // Do your order fulfillment here!
            } else {
                alert('Payment verification failed! ❌');
            }
            },
        prefill: {
          name: "kunwar sunil singh",
          email: "sunilbhucomp@gmail.com",
          contact: "7709978438",
        },
        notes: {
          address: "Test Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 3️⃣ Open Razorpay Checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handlePayment}>
      Pay ₹{order.finalTotal}
    </button>;
 
};

export default PaymentButton;
