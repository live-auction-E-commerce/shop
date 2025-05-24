import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Loader2 } from 'lucide-react';
import { createPaymentIntent } from '@/services/paymentService';
import { useAuth } from '@/context/AuthContext';

function PaymentForm({ amount, currency = 'usd', onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await createPaymentIntent(amount * 100, null, user?._id);
      console.log(response);

      const { newIntent, client_secret } = response;
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email: user?.email },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred during payment');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        if (onSuccess) {
          onSuccess(newIntent._id);
        }
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user?.email || ''}
          readOnly
          className="disabled opacity-70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Card Information</Label>
        <div className="border rounded-md p-3 bg-background">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
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
          Total: ${amount.toFixed(2)} {currency.toUpperCase()}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!stripe || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
}

export default PaymentForm;
