const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// Nodemailer transporter setup (replace with your email and app password)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abinayajegadeeshwaran@gmail.com',  // Replace with your email
        pass: 'tkve tklx gkgn dqmq'       // Replace with your app password
    }
});

// Route for the ticket booking form (HTML form should post here)
app.post('/send-ticket', (req, res) => {
    const { name, vehicle, start, end, slot, email } = req.body;

    // Log the form data to ensure it's received correctly
    console.log('Received Ticket Details:', req.body);

    // Validate the form inputs
    if (!name || !vehicle || !start || !end || !slot || !email) {
        return res.status(400).send('All fields are required');
    }

    // Email content
    const mailOptions = {
        from: 'abinayajegadeeshwaran@gmail.com',
        to: email,
        subject: 'Your Parking Ticket Details',
        html: `
            <h2>Parking Ticket</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            <p><strong>Start Time:</strong> ${start}</p>
            <p><strong>End Time:</strong> ${end}</p>
            <p><strong>Slot Number:</strong> ${slot}</p>
            <p>Thank you for using our service!</p>
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.send('Ticket sent successfully!');
    });
});

// Default route to check server health
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
