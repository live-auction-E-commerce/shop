import express from 'express';
import cors from 'cors';
import ProductRoutes from './src/routes/ProductRoutes.js';
import ListingRoutes from './src/routes/ListingRoutes.js';
import AddressRoutes from './src/routes/AddressRoutes.js';
import PaymentMethodRoutes from './src/routes/PaymentMethodRoutes.js';
import BidRoutes from './src/routes/BidRoutes.js';
import OrderRoutes from './src/routes/OrderRoutes.js';
import connectDB from './src/lib/db.js';
import { multerErrorHandler } from './src/middlewares/ErrorHandlers.js';
import config from './config.js';

const app = express();

connectDB();
app.use(
  cors({
    origin: config.FRONTEND_URL, // your frontend URL
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

export default app;
