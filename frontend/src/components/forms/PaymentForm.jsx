import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const PaymentForm = ({ amount, currency = 'usd', onClose, onSuccess, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            billing_details: {
              email: user?.email,
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setError(result.error.message);
      } else if (
        result.paymentIntent?.status === 'succeeded' ||
        result.paymentIntent?.status === 'requires_capture'
      ) {
        onSuccess?.(paymentIntentId);
        onClose?.();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

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
          <>Pay ${amount.toFixed(2)}</>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
