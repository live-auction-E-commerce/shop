import useOrders from '@/hooks/common/useOrders';
import OrderFilters from '@/components/orders/OrderFilters';
import OrderCard from '@/components/orders/OrderCard';
import OrderSummary from '@/components/orders/OrderSummary';
import EmptyState from '@/components/orders/EmptyState';
import useRequireAuth from '@/hooks/auth/useRequireAuth';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const { orders, searchTerm, setSearchTerm, sortBy, setSortBy, orderStats, loading } = useOrders();
  const isAllowed = useRequireAuth();

  if (!isAllowed) return null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
        <p className="text-muted-foreground">Track and manage your purchases</p>
      </div>

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="space-y-6">
        {orders.length === 0 ? (
          <EmptyState hasSearchTerm={!!searchTerm} />
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="mb-10"
            >
              <OrderCard order={order} />
            </motion.div>
          ))
        )}
      </div>

      <OrderSummary orderStats={orderStats} />
    </div>
  );
};

export default OrdersPage;
