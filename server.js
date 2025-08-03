const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files (like images, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(express.json());

// Endpoint to serve the payment page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to process Razorpay payment verification
app.post('/process_payment', (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Here you would need to verify the payment signature with Razorpay's API
    // This involves sending a request to Razorpay's server to validate the payment
    // For now, we'll mock the success
    console.log('Payment data received:', req.body);

    // Mocking successful payment response
    res.json({ success: true, message: 'Payment successfully verified!' });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
