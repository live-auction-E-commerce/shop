import express from 'express';
import * as AddressController from '../controllers/AddressController.js';

const router = express.Router();

router.post('/addresses', AddressController.createAddress);
router.get('/addresses/:id', AddressController.getAllAddressByUser);
router.put('/addresses/:id', AddressController.updateAddress);

export default router;
