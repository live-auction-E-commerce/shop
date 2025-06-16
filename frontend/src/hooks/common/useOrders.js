import { useEffect, useMemo, useState } from 'react';
import { filterOrders, sortOrders } from '@/lib/utils';
import { getAllOrdersById } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';

const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.id) {
          const fetchedOrders = await getAllOrdersById(user.id);
          console.log(fetchedOrders);
          setOrders(fetchedOrders);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Could not fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = filterOrders(orders, searchTerm);
    return sortOrders(filtered, sortBy);
  }, [orders, searchTerm, sortBy]);

  const orderStats = useMemo(() => {
    const totalOrders = filteredAndSortedOrders.length;
    const totalSpent = filteredAndSortedOrders.reduce((sum, order) => sum + order.price, 0);
    const averageOrder = totalOrders > 0 ? totalSpent / totalOrders : 0;

    return {
      totalOrders,
      totalSpent,
      averageOrder,
    };
  }, [filteredAndSortedOrders]);

  return {
    orders: filteredAndSortedOrders,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    orderStats,
    loading,
    error,
  };
};

export default useOrders;
