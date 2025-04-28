import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ProductRoutes from './routes/ProductRoutes.js';
import ListingRoutes from './routes/ListingRoutes.js';
import BidRoutes from './routes/BidRoutes.js';
import connectDB from './lib/db.js';

dotenv.config();

const app = express();

connectDB();
app.use(cors());  // <-- enable CORS for all routes

app.use(express.json());

app.use('/api', ProductRoutes);
app.use('/api', ListingRoutes);
app.use('/api', BidRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
