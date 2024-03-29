/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {onCall} = require("firebase-functions/v2/https");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(`${{secrets.STRIPE_SECRET_KEY}}`);

exports.handler = onCall(async (req) => {
  console.log(req.data, "req.body");
  try {
    const {amount} = req.data;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        integration_check: "accept_a_payment",
      },
    });
    return {
      statusCode: 200,
      body: paymentIntent,

    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error,
    };
  }
});
