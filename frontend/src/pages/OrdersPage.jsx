import useOrders from '@/hooks/common/useOrders';
import OrderFilters from '@/components/orders/OrderFilters';
import OrderCard from '@/components/orders/OrderCard';
import OrderSummary from '@/components/orders/OrderSummary';
import EmptyState from '@/components/orders/EmptyState';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { toast } from 'sonner';

const OrdersPage = () => {
  const { orders, searchTerm, setSearchTerm, sortBy, setSortBy, orderStats, loading } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      toast.error('You must be logged in to upload a product.');
    }
  }, [user, navigate]);

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
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>

      <OrderSummary orderStats={orderStats} />
    </div>
  );
};

export default OrdersPage;
