import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/ProductRoutes.js';
import connectDB from './lib/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', productRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
