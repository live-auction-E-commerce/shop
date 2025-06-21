import { requestSellerVerification } from '@/services/authService';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2, Mail, Store } from 'lucide-react';

// TODO: Avoid from sending multiple verification requests
const BecomeSellerButton = () => {
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const { user } = useAuth();

  const alreadyClickedRef = useRef(false);

  const handleClick = async () => {
    if (alreadyClickedRef.current || loading) return;

    alreadyClickedRef.current = true;
    setLoading(true);
    try {
      await requestSellerVerification();
      toast.success(`Verification link sent to your email! , check it at ${user?.email}`);
      setVerificationSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send verification');
      alreadyClickedRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (verificationSent || alreadyClickedRef.current) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
      >
        <CheckCircle className="mr-1.5 h-4 w-4" />
        Verification Sent
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      size="sm"
      className="bg-orange-500 hover:bg-orange-600 text-white"
    >
      {loading ? (
        <>
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Store className="mr-1.5 h-4 w-4" />
          Become Seller
        </>
      )}
    </Button>
  );
};

export default BecomeSellerButton;
