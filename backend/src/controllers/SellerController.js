import * as SellerLogic from '../logic/SellerLogic.js';
import { StatusCodes } from 'http-status-codes';

export const becomeSeller = async (req, res) => {
  try {
    await SellerLogic.requestSellerVerification(req.user.id);
    res.status(StatusCodes.OK).json({ message: 'Verification email sent.' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const verifySellerEmail = async (req, res) => {
  try {
    await SellerLogic.verifySellerEmailToken(req.body.token);
    res.status(StatusCodes.OK).json({ message: 'Verification Completed' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
