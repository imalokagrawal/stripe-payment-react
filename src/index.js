import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

toast.configure();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_HXzKW5OANti03hqEnb3jG1Lj00kNg4r0Am");

function App() {
  const [product] = React.useState({
    name: "Corona Protection Kit",
    price: 100,
    description: "4 Masks + Sanitizer"
  });
  
  return (
    <div>
      <div className="container">
        <h1>Buy {product.name}</h1>
        <div className="product"/> 
        <h4>4 Masks + 1 Sanitizer</h4>
        <h3>Total Price: ₹{product.price}</h3>
      </div>
      
      <div className="paymentContainer">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div> 
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));