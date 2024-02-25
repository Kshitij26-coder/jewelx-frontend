// emailService.js

const nodemailer = require("nodemailer");

// Create a nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'gmail', // Your SMTP server hostname
    // port: 587, // Port for SMTP
    // secure: false, // Whether to use SSL/TLS
    auth: {
        user: 'rita23998@gmail.com', // Your email address
        pass: 'wcayrqgfqvjyansj' // Your email password
    }
});

// Function to send an email
export default  sendEmail = async (emailContent) => {
    try {
        await transporter.sendMail(emailContent);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Throw the error for handling in calling function
    }
};
//module.exports = { sendEmail };
