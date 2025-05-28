import { getPayload } from '../lib/vault.js';

const verifyLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.header('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
    const token = authHeader.replace('Bearer ', '');
    req.user = getPayload(token).user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyLoggedIn;
