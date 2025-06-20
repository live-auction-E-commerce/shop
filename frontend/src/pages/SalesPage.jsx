import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SaleFilters from '@/components/sales/SaleFilters';
import SaleCard from '@/components/sales/SaleCard';
import SaleSummary from '@/components/sales/SaleSummary';
import EmptyState from '@/components/sales/EmptyState';
import { useAuth } from '@/context/AuthContext';

// Mock hook - replace with your actual useSales hook
const useSales = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with your actual API call
  useEffect(() => {
    const mockSales = [
      {
        _id: '507f1f77bcf86cd799439011',
        listingId: {
          productId: {
            name: 'Nike Air Max 90',
            description: 'Classic sneakers in excellent condition',
            brand: 'Nike',
            size: '10',
            condition: 'Like New',
            images: ['/placeholder.svg?height=200&width=200'],
          },
          saleType: 'fixed',
        },
        buyerId: {
          email: 'buyer@example.com',
        },
        addressId: {
          number: '123',
          street: 'Main St',
          city: 'New York',
          country: 'USA',
        },
        price: 120.0,
        createdAt: '2024-01-15T10:30:00Z',
      },
    ];

    setTimeout(() => {
      setSales(mockSales);
      setLoading(false);
    }, 1000);
  }, []);

  const saleStats = {
    totalSales: sales.length,
    totalEarned: sales.reduce((sum, sale) => sum + sale.price, 0),
    averageSale:
      sales.length > 0 ? sales.reduce((sum, sale) => sum + sale.price, 0) / sales.length : 0,
  };

  // Filter and sort sales
  const filteredSales = sales
    .filter(
      (sale) =>
        sale.listingId.productId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.listingId.productId.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  return {
    sales: filteredSales,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    saleStats,
    loading,
  };
};

const SalesPage = () => {
  const { sales, searchTerm, setSearchTerm, sortBy, setSortBy, saleStats, loading } = useSales();
  const navigate = useNavigate();

  const { user } = useAuth;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      toast.error('You must be logged in to view your sales.');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-muted-foreground">Loading sales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Sales</h1>
        <p className="text-muted-foreground">Track and manage your sold items</p>
      </div>

      <SaleFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="space-y-6">
        {sales.length === 0 ? (
          <EmptyState hasSearchTerm={!!searchTerm} />
        ) : (
          sales.map((sale) => <SaleCard key={sale._id} sale={sale} />)
        )}
      </div>

      <SaleSummary saleStats={saleStats} />
    </div>
  );
};

export default SalesPage;
