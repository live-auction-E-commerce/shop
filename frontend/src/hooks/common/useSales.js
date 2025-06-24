import { useEffect, useMemo, useState } from 'react';
import { filterOrders, sortOrders } from '@/lib/utils';
import { getAllSalesById } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';

const useSales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        if (user?._id) {
          const fetchedSales = await getAllSalesById(user._id);
          setSales(fetchedSales);
        }
      } catch (err) {
        console.error('Failed to fetch sales:', err);
        setError('Could not fetch sales.');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [user]);

  const filteredAndSortedSales = useMemo(() => {
    const filtered = filterOrders(sales, searchTerm);
    return sortOrders(filtered, sortBy);
  }, [sales, searchTerm, sortBy]);

  const salesStats = useMemo(() => {
    const totalSales = filteredAndSortedSales.length;
    const totalEarned = filteredAndSortedSales.reduce((sum, sale) => sum + sale.price, 0);
    const averageSale = totalSales > 0 ? totalEarned / totalSales : 0;

    return {
      totalSales,
      totalEarned,
      averageSale,
    };
  }, [filteredAndSortedSales]);

  return {
    sales: filteredAndSortedSales,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    salesStats,
    loading,
    error,
  };
};

export default useSales;
