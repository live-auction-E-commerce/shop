import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

export const hashPassword = async (password) => {
  if (!password) return null;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const getNewToken = (user) => {
  const payload = { user };
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return token;
};
