import express from 'express';
import * as AuthController from '../controllers/AuthController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', verifyLoggedIn, AuthController.verifyToken);
router.patch('/password', verifyLoggedIn, AuthController.changePassword);

export default router;
