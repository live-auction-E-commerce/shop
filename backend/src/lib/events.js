import { broadcastAuctionEnd } from '../sockets/sockets.js';
import { captureStripePaymentIntent } from './payments.js';
import sendEmail from './email.js';

export const handleAuctionEnd = async (listingId, winnerData) => {
  try {
    await captureStripePaymentIntent(winnerData.paymentIntentId);
    await sendEmail({
      to: winnerData.sellerEmail,
      subject: 'Your Auction Has Ended!',
      html: `
          <h2>Your product has been sold 🎉</h2>
          <p><strong>${winnerData.productName}</strong> was just won in an auction.</p>
          <p><strong>Winning Bid:</strong> $${winnerData.price}</p>
          <p><strong>Buyer:</strong> ${winnerData.buyerEmail}</p>
          <p>Please prepare to ship the product to the buyer.</p>
        `,
    });

    await sendEmail({
      to: winnerData.buyerEmail,
      subject: 'You Won an Auction!',
      html: `
        <h2>Congratulations! 🎉</h2>
        <p>You won the auction for <strong>${winnerData.productName}</strong>.</p>
        <p><strong>Winning Bid:</strong> $${winnerData.price}</p>
        <p>The seller will ship your item shortly.</p>
        <p>Thank you for bidding with AuctionShop!</p>
      `,
    });

    broadcastAuctionEnd(listingId, winnerData);
  } catch (err) {
    console.error('Error in handleAuctionEnd:', err);
    throw err;
  }
};
