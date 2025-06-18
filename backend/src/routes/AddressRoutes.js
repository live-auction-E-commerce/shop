import express from 'express';
import * as AddressController from '../controllers/AddressController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.post('/addresses', verifyLoggedIn, AddressController.createAddress);
router.get(
  '/addresses/user/:id',
  verifyLoggedIn,
  AddressController.getAllAddressByUser,
);
router.get('/addresses/:id', AddressController.getAddressById);
router.put('/addresses/:id', verifyLoggedIn, AddressController.updateAddress);
router.get(
  '/addresses/:userId/default',
  verifyLoggedIn,
  AddressController.getDefaultAddress,
);
router.put(
  '/addresses/:addressId/:userId',
  verifyLoggedIn,
  AddressController.setDefaultAddress,
);
router.delete(
  '/addresses/:id',
  verifyLoggedIn,
  AddressController.deleteAddress,
);

export default router;
