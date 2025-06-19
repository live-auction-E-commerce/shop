import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';
const useRequireVerifiedUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      toast.error('You must be logged in.');
    } else if (!user.isEmailVerified) {
      navigate(ROUTES.HOME);
      toast.error('Verify your email first.');
    }
  }, [user, navigate]);

  return user?.isEmailVerified;
};

export default useRequireVerifiedUser;
