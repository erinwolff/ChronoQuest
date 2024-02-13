const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
require('dotenv').config();
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const router = require("express").Router();
module.exports = router;

// Helper function to fetch user by ID
const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// Configure the transport mechanism (SMTP settings)
async function sendResetEmail(emailAddress, resetToken, userName) {   
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP host from Mailjet
    port: process.env.SMTP_PORT, // SMTP port from Mailjet
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME, // your Mailjet SMTP authorized email
      pass: process.env.SMTP_PASSWORD, // your Mailjet SMTP password
    },
    tls: {
      rejectUnauthorized: true 
    }
  });

  // Set up the email options
  const mailOptions = {
    from: process.env.MAILJET_SENDER_EMAIL, // Your Mailjet sender email
    to: emailAddress,
    subject: 'Password Reset Request',
    text: `Hello ${userName},\n\nPlease see your requested password reset token below.\n\nIf you did not request a password reset, please disregard this message.\n\nYour reset token is:\n\n${resetToken}\n\nBest regards,\nThe ChronoQuest Team`
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully.');
  } catch (error) {
    console.error('Error sending reset email:', error);
  }
}

// Generates and stores a password reset token for a user
const createPasswordResetToken = async (userId, tokenExpiryMinutes) => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + tokenExpiryMinutes * 60000).toISOString();
  return await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      userId: userId,
      expires: expires,
    },
  });
};

// Route handler for password reset request
router.post('/request-password-reset', async (req, res, next) => {
  try {
    // Extract the username from the request body
    const { username } = req.body;

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    // If the user is not found, respond accordingly
    if (!user) {
      return res.status(404).json({ message: 'Username not found :(' });
    }

    const resetTokenRecord = await createPasswordResetToken(user.id, 5); //  5 minute token reset timer
    await sendResetEmail(user.email, resetTokenRecord.token, username);
    res.status(200).json({message:'Password reset email has been sent!'});
  } catch (err) {
    next(err);
  }
});

// Route handler for password reset
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const resetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetTokenRecord || resetTokenRecord.expires < new Date().toISOString()) {
      throw new ServerError(400, 'Invalid or expired password reset token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await getUserById(resetTokenRecord.userId);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetTokenRecord.id },
    });

    res.status(200).json({message: 'Password has been successfully reset'});   
  } catch (err) {
    next(err);
  }
});