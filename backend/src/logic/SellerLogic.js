import User from '../models/User.js';
import crypto from 'crypto';
import sendEmail from '../lib/emailSender.js';
import { getNewToken } from '../lib/vault.js';
import config from '../../config.js';

// TODO : Create a user for nodemailer to work!

export const requestSellerVerification = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.isEmailVerified) {
    throw new Error('User is already verified as a seller');
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = token;
  user.emailVerificationTokenExpires = Date.now() + 3600000;
  await user.save();

  const link = `${config.FRONTEND_URL}/verify-seller-email?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Verify your email to become a seller',
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  });
};

export const verifySellerEmailToken = async (token) => {
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error('Invalid or expired verification link.');

  user.isEmailVerified = true;
  user.role = 'Seller';
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save();

  const newToken = getNewToken({
    id: user._id,
    email: user.email,
    role: user.role,
    isEmailVerified: true,
  });

  return { token: newToken };
};
