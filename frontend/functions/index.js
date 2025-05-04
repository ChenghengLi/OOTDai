/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

require("dotenv").config({path: "./.env"});
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SK);
admin.initializeApp();

const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Stripe Payment Function
exports.createStripePayment = onRequest(async (req, res) => {
  const {totalAmount} = req.body;

  if (!totalAmount) {
    return res.status(400).send({
      success: false,
      message: "Missing required parameter: totalAmount.",
    });
  }

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert to cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret for the PaymentIntent
    return res.status(200).send({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Firestore Trigger for Sending Email
exports.sendEmail = onDocumentCreated("orders/{ordersId}", async (event) => {
  const orderData = event.data.data();
  console.log("order data:", orderData);
  const orderId = event.params.ordersId;

  // Email content
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: orderData.emailAddress,
    subject: `Order Confirmation: ${orderId}`,
    text: `Thank you for your order!\n\n
          Order Details:\n${JSON.stringify(orderData)}`,
    html: `<p>Thank you for your order!</p>
            <p>Order Details:</p>
            <pre>Brand: ${JSON.stringify(orderData.orders[0].brand)}</pre>
            <pre>Comments: ${JSON.stringify(orderData.orders[0].comments)}</pre>
            <pre>Control: ${JSON.stringify(orderData.orders[0].controlType)}</pre>
            <pre>Pet Name: ${JSON.stringify(orderData.orders[0].petName)}</pre>
            <pre>Species: ${JSON.stringify(orderData.orders[0].petSpecies)}</pre>
            <pre>Product: ${JSON.stringify(orderData.orders[0].product)}</pre>
            <pre>Profile: ${JSON.stringify(orderData.orders[0].profile)}</pre>
            <pre>Quantity: ${JSON.stringify(orderData.orders[0].quantity)}</pre>
            <pre>Time: ${JSON.stringify(orderData.timeOrdered)}</pre>
            <pre>Total: ${JSON.stringify(orderData.total)}</pre>`,
  };

  console.log("mail options", mailOptions);

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for order: ${orderId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
