
import { broadcastAuctionEnd } from '../sockets/sockets.js';
import { captureStripePaymentIntent } from './payments.js';

export const handleAuctionEnd = async (listingId, winnerData) => {
  // Capture the payment for the winning bid
  captureStripePaymentIntent(winnerData.paymentIntentId)
    .then((capturedIntent) => {
      console.log('Payment captured successfully:', capturedIntent);
    })
    .catch((err) => {
      console.error('Error capturing payment:', err);
      throw err;
    });
  broadcastAuctionEnd(listingId, winnerData);
};
