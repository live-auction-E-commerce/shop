import express from 'express';
import * as ListingController from '../controllers/ListingController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.get('/listings', ListingController.getAllListings);
router.get('/listings/:id', ListingController.getListingById);
router.post('/listings', verifyLoggedIn, ListingController.createListing);
router.put('/listings/:id', ListingController.editListing);
router.delete('/listings/:id', ListingController.deleteListing);

export default router;
