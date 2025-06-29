import express from 'express';
import * as ListingController from '../controllers/ListingController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';
import verifySeller from '../middlewares/verifySeller.js';

const router = express.Router();

router.get('/listings', ListingController.getAllListings);
router.get('/listings/:id', ListingController.getListingById);
router.get(
  '/listings/seller/:id',
  verifyLoggedIn,
  verifySeller,
  ListingController.getAllLiveListingsBySeller,
);

router.post(
  '/listings',
  verifyLoggedIn,
  verifySeller,
  ListingController.createListing,
);
router.post(
  '/listings/mark-sold',
  verifyLoggedIn,
  ListingController.markListingAsSold,
);
router.put('/listings/:id', verifyLoggedIn, ListingController.editListing);
router.delete('/listings/:id', verifyLoggedIn, ListingController.deleteListing);

export default router;
