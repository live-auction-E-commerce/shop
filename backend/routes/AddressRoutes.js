import express from 'express';
import * as AddressController from '../controllers/AddressController.js';

const router = express.Router();

router.post('/addresses', AddressController.createAddress);
router.get('/addresses/:id', AddressController.getAllAddressByUser);
router.put('/addresses/:id', AddressController.updateAddress);
router.get('/addresses/:userId/default', AddressController.getDefaultAddress);
router.put(
  '/addresses/:addressId/:userId',
  AddressController.setDefaultAddress
);

export default router;
