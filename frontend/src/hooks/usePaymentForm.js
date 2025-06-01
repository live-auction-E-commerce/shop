import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const usePaymentForm = ({ email, onSuccess, onError, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
              email: email,
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setError(result.error.message);
        onError && onError(result.error.message);
      } else if (
        result.paymentIntent?.status === 'succeeded' ||
        result.paymentIntent?.status === 'requires_capture'
      ) {
        onSuccess && onSuccess(paymentIntentId);
      }
    } catch (err) {
      const message = err.message || 'Something went wrong';
      setError(message);
      onError && onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    error,
    stripe,
  };
};

export default usePaymentForm;
