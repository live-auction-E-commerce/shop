import express from 'express';
import * as BidController from '../controllers/BidController.js';

const router = express.Router();

router.post('/bids', BidController.createBid);
router.get('/bids/:id', BidController.getAllBidsByListing);
router.get('/bids/:id', BidController.getAllBidsByUser);
router.get('/bids/:listingId/:userId', BidController.getAllBidsByUserAndListing);

export default router;