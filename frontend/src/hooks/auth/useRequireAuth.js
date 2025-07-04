import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';

const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast.error('You must be logged in to access this page.');
      navigate(ROUTES.LOGIN);
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [user, loading, navigate]);

  return loading ? null : isAllowed; // This avoids flickering
};

export default useRequireAuth;
