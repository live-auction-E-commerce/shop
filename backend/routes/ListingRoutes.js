import express from 'express';
import * as ListingController from '../controllers/ListingController.js';

const router = express.Router();

router.post('/listings', ListingController.createListing);

export default router;
