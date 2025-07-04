import { useState, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const usePaymentForm = ({ email, onSuccess, onError, paymentIntentId, clientSecret }) => {
  const VALID_STATUSES = ['succeeded', 'requires_capture'];

  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;

      setIsLoading(true);
      setError(null);

      try {
        // REQUIRED: Submit elements before confirmPayment (for deferred flow)
        const submitResult = await elements.submit();
        if (submitResult.error) {
          setError(submitResult.error.message);
          onError && onError(submitResult.error.message);
          setIsLoading(false);
          return;
        }

        const result = await stripe.confirmPayment({
          clientSecret,
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
        } else if (VALID_STATUSES.includes(result.paymentIntent.status)) {
          onSuccess && onSuccess(paymentIntentId);
        }
      } catch (err) {
        const message = err.message || 'Something went wrong';
        setError(message);
        onError && onError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [stripe, elements, clientSecret, email, onSuccess, onError, paymentIntentId]
  );

  return {
    handleSubmit,
    isLoading,
    error,
    stripe,
  };
};

export default usePaymentForm;
