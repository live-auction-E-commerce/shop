import User from '../models/User.js';
import { hashPassword, getNewToken } from '../lib/vault.js';
import bcrypt from 'bcryptjs';
import * as SellerLogic from './SellerLogic.js';

export const register = async (data) => {
  const SELLER_ROLE = 'Seller';

  const { email, password, role } = data;

  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const emailExists = await isEmailTaken(email);
  if (emailExists) throw new Error(`The email ${email} is already taken`);

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: role,
    isEmailVerified: false,
  });

  const token = getNewToken({
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
    isEmailVerified: false,
  });

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser.toObject();

  if (role === SELLER_ROLE) {
    await SellerLogic.requestSellerVerification(newUser._id);
  }

  return { token, user: userWithoutPassword };
};

export const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error(`incorrect email or password`);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error(`incorrect email or password`);

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPassword } = user.toObject();

  const token = getNewToken({
    id: user._id,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  });

  return { token, user: userWithoutPassword };
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPassword } = user.toObject();

  const token = getNewToken({
    id: user._id,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  });

  return { token, user: userWithoutPassword };
};

export const isEmailTaken = async (email) => {
  const user = await User.findOne({ email });
  return !!user; // returns true if user exists, false otherwise
};

export const verifyTokenLogic = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};
