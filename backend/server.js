import express from 'express';
import dotenv from 'dotenv';
import ProductRoutes from './routes/ProductRoutes.js';
import ListingRoutes from './routes/ListingRoutes.js';
import connectDB from './lib/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', ProductRoutes);
app.use('/api', ListingRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
