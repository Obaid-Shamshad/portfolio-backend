
const nodemailer = require('nodemailer');

const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    try {

        // 1. Create the transporter object using SMTP
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'obaidshamshad5656@gmail.com',
                pass: 'ljtp sxuj tpsi qfkw' // Use App Password for Gmail
            }
        });

        // 2. Define the mail options
        const mailOptions = {
            from: 'obaidshamshad5656@gmail.com',
            to: 'obaidshamshad5656@gmail.com',
            subject: 'portfolio contact form',
            text: 'That was easy! Nodemailer is fully working.',
            html: '<h1>Contact from</h1><p><strong>Name:</strong> ' + name + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Message:</strong> ' + message + '</p>'
        };

        // 3. Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { sendMessage };
