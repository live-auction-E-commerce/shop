import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ProductRoutes from './src/routes/ProductRoutes.js';
import ListingRoutes from './src/routes/ListingRoutes.js';
import AddressRoutes from './src/routes/AddressRoutes.js';
import PaymentMethodRoutes from './src/routes/PaymentMethodRoutes.js';
import BidRoutes from './src/routes/BidRoutes.js';
import OrderRoutes from './src/routes/OrderRoutes.js';
import connectDB from './src/lib/db.js';
import { multerErrorHandler } from './src/middlewares/ErrorHandlers.js';

dotenv.config();

const app = express();

connectDB();
app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true,
  }),
);
app.use(express.json());
// Exposing Images folder
app.use('/Images', express.static('public/Images'));
// Routes
app.use('/api', ProductRoutes);
app.use('/api', ListingRoutes);
app.use('/api', AddressRoutes);
app.use('/api', PaymentMethodRoutes);
app.use('/api', BidRoutes);
app.use('/api', OrderRoutes);

// Middlewares
app.use(multerErrorHandler);

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
