const express = require("express");
const app = express();
const { resolve } = require("path");
const stripe = require("stripe")("sk_test_Smt9ZgWVzuf3A8lyqn4KcrOB000liN7au9");

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
     res.send("Backend running");
   });

app.post("/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10000,
    currency: 'inr',
    metadata: {integration_check: 'accept_a_payment'}
  });

  // Send PaymentIntent details to client
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(8080);
