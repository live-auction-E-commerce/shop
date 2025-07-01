import nodemailer from 'nodemailer';
import config from '../../config.js';

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: Number(config.EMAIL_PORT),
  secure: config.EMAIL_PORT === 465,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html);
    await transporter.sendMail({
      from: 'AuctionShop <roeyk70@gmail.com>',
      to,
      subject,
      html,
    });

    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

export const generateSellerAuctionEndEmail = ({
  productName,
  price,
  buyerEmail,
}) => ({
  subject: 'Your Auction Has Ended!',
  html: `
    <h2>Your product has been sold 🎉</h2>
    <p><strong>${productName}</strong> was just won in an auction.</p>
    <p><strong>Winning Bid:</strong> $${price}</p>
    <p><strong>Buyer:</strong> ${buyerEmail}</p>
    <p>Please prepare to ship the product to the buyer.</p>
  `,
});

export const generateBuyerAuctionWinEmail = ({ productName, price }) => ({
  subject: 'You Won an Auction!',
  html: `
    <h2>Congratulations! 🎉</h2>
    <p>You won the auction for <strong>${productName}</strong>.</p>
    <p><strong>Winning Bid:</strong> $${price}</p>
    <p>The seller will ship your item shortly.</p>
    <p>Thank you for bidding with AuctionShop!</p>
  `,
});

export const generateSellerVerificationEmail = (link) => {
  return {
    subject: 'Verify your email to become a seller',
    html: `
    <h2>Welcome to AuctionShop 👋</h2>
    <p>You're one step away from becoming a verified seller.</p>
    <p>Click the button below to verify your email:</p>
    <p>
      <a href="${link}" 
         style="display: inline-block; padding: 10px 20px; background-color: #ff7f3e; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
    </p>
    <p>If the button doesn't work, copy and paste the link into your browser:</p>
    <p>${link}</p>
  `,
  };
};

export default sendEmail;
