import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';
import { verifySellerEmail } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

const VerifySellerEmail = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifySellerEmail(token);
        await login({ token: response.token });
        toast.success('Your email has been verified!');
        setStatus('Verified successfully!');
        setTimeout(() => navigate(ROUTES.HOME), 1500);
      } catch (err) {
        console.error(err);
        toast.error('Invalid or expired verification token.');
        setStatus('Verification failed.');
      }
    };

    if (token) {
      verify();
    } else {
      setStatus('Missing verification token.');
    }
  }, [token, navigate]);

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
};

export default VerifySellerEmail;
