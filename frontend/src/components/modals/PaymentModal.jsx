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

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  currency = 'usd',
  description = 'Payment',
  onSuccess,
}) => {
  const { stripePromise } = useStripeContext();
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

        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={amount}
            currency={currency}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
