import React, { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';

const Buy = ({ amount, currency }) => {
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
    });

    // Function to load Razorpay SDK
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    // Function to create order and open Razorpay modal
    const handleCreateOrder = async (amount, currency) => {
        try {
            // Fetch order details from your backend
            const response = await fetch(`https://login-fstack-server.vercel.app/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to smallest currency unit
                    currency: currency,
                }),
            });

            const data = await response.json();

            if (data && data.order_id) {
                setOrderDetails({
                    orderId: data.order_id,
                    currency: data.currency,
                    amount: data.amount,
                });
                setDisplayRazorpay(true); // Trigger Razorpay display
                displayRazorpayModal(data.order_id, data.amount, data.currency);
            }
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
        }
    };

    // Function to display the Razorpay modal
    const displayRazorpayModal = async (orderId, amount, currency) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount, // Amount in smallest currency unit
            currency: currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async (response) => {
                console.log('Payment succeeded:', response);
                const verifyResponse = await verifyPayment(response);
                if (verifyResponse.success) {
                    alert('Payment verified and successful!');
                } else {
                    alert('Payment verification failed.');
                }
            },
            prefill: {
                name: 'Your Name',
                email: 'youremail@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#F37254',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    // Verify the payment by sending the payment details to the server
    const verifyPayment = async (paymentData) => {
        try {
            const response = await fetch('https://login-fstack-server.vercel.app/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            return await response.json();
        } catch (error) {
            console.error('Payment verification failed:', error);
            return { success: false };
        }
    };

    return (
        <div>
            <button
                onClick={() => handleCreateOrder(amount, currency)}
                className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
                <FaDollarSign className="inline-block mr-2" />
                Buy Now
            </button>
        </div>
    );
};

export default Buy;
