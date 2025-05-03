import multer from 'multer';

export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err.message?.includes('image')) {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};
