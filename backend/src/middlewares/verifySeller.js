const verifySeller = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (user.role !== 'Seller') {
    return res
      .status(403)
      .json({ message: 'Access denied. Seller role is required.' });
  }

  next();
};

export default verifySeller;
