import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import usePaymentForm from '@/hooks/payments/usePaymentForm';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

const PaymentForm = ({ amount, currency = 'usd', onSuccess, onError, paymentIntentId }) => {
  const { user } = useAuth();
  const { email } = user;
  const { handleSubmit, isLoading, error, stripe } = usePaymentForm({
    amount,
    currency,
    email,
    onSuccess,
    onError,
    paymentIntentId,
  });

  if (!user) {
    toast.error('You must be logged in to make a payment!');
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={user?.email || ''} readOnly className="opacity-70" />
      </div>

      <div className="space-y-2">
        <Label>Payment Information</Label>
        <div className="border rounded-md p-4 bg-background">
          <PaymentElement />
        </div>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

      <Separator />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Secured by Stripe
        </div>
        <div className="font-medium">
          Total: {formatCurrency(amount, undefined, currency.toUpperCase())}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!stripe || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay {formatCurrency(amount, undefined, currency.toUpperCase())}</>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
