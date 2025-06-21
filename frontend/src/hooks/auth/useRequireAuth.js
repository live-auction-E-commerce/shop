import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';

const useRequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to access this page.');
      navigate(ROUTES.LOGIN);
    } else {
      setIsAllowed(true);
    }
  }, [user, navigate]);

  return isAllowed;
};

export default useRequireAuth;
