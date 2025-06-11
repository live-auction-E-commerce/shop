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

export const verifyToken = async (req, res) => {
  res.json({ user: req.user });
};
