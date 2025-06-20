import useSales from '@/hooks/common/useSales';
import SaleFilters from '@/components/sales/SaleFilters';
import SaleCard from '@/components/sales/SaleCard';
import SalesSummary from '@/components/sales/SalesSummary';
import EmptyState from '@/components/sales/EmptyState';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { toast } from 'sonner';

const SalesPage = () => {
  const { sales, searchTerm, setSearchTerm, sortBy, setSortBy, salesStats, loading } = useSales();
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
          <p className="text-lg text-muted-foreground">Loading Sales...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Sales</h1>
        <p className="text-muted-foreground">Track and manage your purchases</p>
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

      <SalesSummary saleStats={salesStats} />
    </div>
  );
};

export default SalesPage;
