import express from 'express';
import dotenv from 'dotenv';
import ProductRoutes from './src/routes/ProductRoutes.js';
import ListingRoutes from './src/routes/ListingRoutes.js';
import AddressRoutes from './src/routes/AddressRoutes.js';
import PaymentMethodRoutes from './src/routes/PaymentMethodRoutes.js';
import BidRoutes from './src/routes/BidRoutes.js';
import OrderRoutes from './src/routes/OrderRoutes.js';
import connectDB from './src/lib/db.js';
import { multerErrorHandler } from './middlewares/ErrorHandlers.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
// Routes
app.use('/api', ProductRoutes);
app.use('/api', ListingRoutes);
app.use('/api', AddressRoutes);
app.use('/api', PaymentMethodRoutes);
app.use('/api', BidRoutes);
app.use('/api', OrderRoutes);

// Middlewares
app.use(multerErrorHandler);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
