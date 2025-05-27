import jwt from 'jsonwebtoken';
import config from '../../config.js';

const verifyLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.header('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
    const token = authHeader.replace('Bearer ', '');

    // Move this to vault.js
    const payload = jwt.verify(token, config.SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyLoggedIn;
