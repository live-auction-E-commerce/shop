import { requestSellerVerification } from '@/services/authService';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const BecomeSellerButton = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleClick = async () => {
    setLoading(true);
    try {
      await requestSellerVerification();
      toast.success(`Verification link sent to your email! , check it at ${user?.email}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send verification');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
    >
      {loading ? 'Sending...' : 'Become a Seller'}
    </button>
  );
};

export default BecomeSellerButton;
