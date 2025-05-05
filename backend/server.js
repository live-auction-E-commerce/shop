import express from 'express';
import dotenv from 'dotenv';
import ProductRoutes from './routes/ProductRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import ListingRoutes from './routes/ListingRoutes.js';
import AddressRoutes from './routes/AddressRoutes.js';
import PaymentMethodRoutes from './routes/PaymentMethodRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import connectDB from './lib/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', ProductRoutes);
app.use('/api', AuthRoutes);
app.use('/api', ListingRoutes);
app.use('/api', AddressRoutes);
app.use('/api', PaymentMethodRoutes);
app.use('/api', OrderRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
