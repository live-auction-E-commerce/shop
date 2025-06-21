import express from 'express';
import * as SellerController from '../controllers/SellerController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.post('/become-seller', verifyLoggedIn, SellerController.becomeSeller);
router.post('/verify-seller-email', SellerController.verifySellerEmail);

export default router;
