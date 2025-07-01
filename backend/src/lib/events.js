import { broadcastAuctionEnd } from '../sockets/sockets.js';
import { captureStripePaymentIntent } from './payments.js';
import {
  generateBuyerAuctionWinEmail,
  generateSellerAuctionEndEmail,
} from './email.js';
import sendEmail from './email.js';

export const handleAuctionEnd = async (listingId, winnerData) => {
  const sellerEmailContent = generateSellerAuctionEndEmail({
    productName: winnerData.productName,
    price: winnerData.price,
    buyerEmail: winnerData.buyerEmail,
  });

  const buyerEmailContent = generateBuyerAuctionWinEmail({
    productName: winnerData.productName,
    price: winnerData.price,
  });
  try {
    await captureStripePaymentIntent(winnerData.paymentIntentId);
    await sendEmail({ to: winnerData.sellerEmail, ...sellerEmailContent });
    await sendEmail({ to: winnerData.buyerEmail, ...buyerEmailContent });
    broadcastAuctionEnd(listingId, winnerData);
  } catch (err) {
    console.error('Error in handleAuctionEnd:', err);
    throw err;
  }
};
