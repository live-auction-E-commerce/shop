import { broadcastAuctionEnd } from '../sockets/sockets.js';
import { captureStripePaymentIntent } from './payments.js';
import sendEmail from './email.js';

export const handleAuctionEnd = async (listingId, winnerData) => {
  try {
    const capturedIntent = await captureStripePaymentIntent(
      winnerData.paymentIntentId,
    );
    console.log('Payment captured successfully:', capturedIntent);

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

    broadcastAuctionEnd(listingId, winnerData);
  } catch (err) {
    console.error('Error in handleAuctionEnd:', err);
    throw err;
  }
};
