const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { StreetviewSharp } = require("@mui/icons-material");
const stripe = require("stripe")(process.env.SECKEY);

// - App config
const app = express();

// - Middleware
// const corsOptions = { origin: true };
// app.use(cors(corsOptions));
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received: Total Amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
