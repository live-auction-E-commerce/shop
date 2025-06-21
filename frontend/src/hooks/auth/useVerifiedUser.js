import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';
const useRequireSeller = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast.error('You must be logged in.');
      navigate(ROUTES.LOGIN);
    } else if (user.role !== 'Seller') {
      toast.error('You must be a verified seller to access this page.');
      navigate(ROUTES.HOME);
    } else if (!user.isEmailVerified) {
      toast.error('Verify your email first.');
      navigate(ROUTES.HOME);
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return user && user.isEmailVerified && user.role === 'Seller';
};

export default useRequireSeller;
