import React from 'react';
import axios from 'axios';

const CheckoutPage: React.FC = () => {

  const handlePayment = async () => {
    try {
      // Call your backend to create a Razorpay order
      const response = await axios.post(
        'http://localhost:8081/site/api/payment/create-order?amount=1'
      );
      const { id: order_id, amount, currency } = response.data;

      const options = {
        key: 'rzp_test_VNUzlnWH24Moj0',
        amount: amount,
        currency: currency,
        name: 'TapZe',
        description: 'Order Payment',
        order_id: order_id,
        handler: function (response: any) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          console.log('Order ID:', response.razorpay_order_id);
          console.log('Signature:', response.razorpay_signature);
          // TODO: POST to backend for signature verification
        },
        prefill: {
          name: 'Rahul Raghta',
          email: 'rahul@tapZe.com',
          contact: '9999999999',
        },
        theme: {
          color: '#0f1f27ff',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Checkout</h1>
      <p>Amount: ₹500</p>
      <button onClick={handlePayment} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;