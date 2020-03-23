import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './CardSectionStyles.css'
import SubmitButton from "./SubmitButton";

toast.configure();

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/create-payment-intent"
    );
    const { clientSecret } = response.data;
    console.log("Response:", response.data);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Test User',
          address: 'Test Address',
          
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      toast("Something went wrong. " +  result.error.message, { type: "error" });
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        toast("Success! We have received your order", { type: "success" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <br/>
      <SubmitButton disabled={!stripe}> Make payment and place order</SubmitButton>
    </form>
  );
}