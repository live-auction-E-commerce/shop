import * as AuthLogic from '../logic/AuthLogic.js';
import { StatusCodes } from 'http-status-codes';
export const register = async (req, res) => {
  try {
    const { token, user } = await AuthLogic.register(req.body);

    res.status(StatusCodes.CREATED).json({
      message: 'Registration successful',
      token,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await AuthLogic.login(req.body);

    res.status(StatusCodes.OK).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { token, user } = await AuthLogic.changePassword({
      userId: req.user.id,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });

    res.status(StatusCodes.OK).json({
      message: 'Password changed successfully',
      token,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await AuthLogic.verifyTokenLogic(req.user.id);
    res.status(StatusCodes.OK).json({ message: 'User verified', user });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};
