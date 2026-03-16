const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // your email
            pass: 'your_email_password' // your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your_email@gmail.com', // destination email
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error: ' + error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

// Newsletter signup
app.post('/signup', (req, res) => {
    const { email } = req.body;

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // your email
            pass: 'your_email_password' // your email password
        }
    });

    const mailOptions = {
        from: 'no-reply@yourdomain.com',
        to: email,
        subject: 'Newsletter Signup Successful',
        text: 'Thank you for signing up for our newsletter!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error: ' + error.toString());
        }
        res.status(200).send('Signup successful!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
