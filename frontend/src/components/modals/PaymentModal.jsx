import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useStripeContext } from '@/context/StripeContext';
import { CreditCard } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/forms/PaymentForm';
import { useEffect, useState } from 'react';
import { createPaymentIntent } from '@/services/paymentService';
import { useAuth } from '@/context/AuthContext';

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  currency = 'usd',
  description = 'Payment',
  onSuccess,
  listing,
}) => {
  const { stripePromise } = useStripeContext();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const [intentId, setIntentId] = useState(null);
  const [_loading, setLoading] = useState(false);

  const mode = listing?.saleType === 'now' ? 'buyNow' : 'bid';

  useEffect(() => {
    const initializePayment = async () => {
      if (isOpen && user?._id) {
        setLoading(true);
        try {
          console.log(mode);
          const response = await createPaymentIntent(amount, user._id, mode);
          setClientSecret(response.client_secret);
          setIntentId(response.newIntent._id);
        } catch (err) {
          console.error('Error creating payment intent:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    initializePayment();
  }, [isOpen, amount, user, mode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
          <DialogDescription>
            {description} - ${amount.toFixed(2)} {currency.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        {clientSecret && stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: 'stripe' },
            }}
          >
            <PaymentForm
              amount={amount}
              currency={currency}
              onClose={onClose}
              onSuccess={onSuccess}
              paymentIntentId={intentId}
              clientSecret={clientSecret}
            />
          </Elements>
        ) : (
          <div className="text-center py-6 text-muted-foreground">Loading payment form...</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
