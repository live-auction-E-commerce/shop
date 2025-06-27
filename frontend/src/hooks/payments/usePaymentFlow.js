import { useState, useCallback, useEffect } from 'react';

export const PAYMENT_STEPS = {
  AMOUNT_ENTRY: 'AMOUNT_ENTRY',
  ADDRESS_SELECTION: 'ADDRESS_SELECTION',
  PAYMENT: 'PAYMENT',
};

export const usePaymentFlow = (skipAmountEntry = false) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    listingId: null,
    amount: null,
    addressId: null,
    mode: 'bid',
  });

  const resetFlow = useCallback(() => {
    setCurrentStep(null);
    setPaymentDetails({
      listingId: null,
      amount: null,
      addressId: null,
      mode: 'bid',
    });
  }, []);

  const startPaymentFlow = useCallback(
    (initialDetails) => {
      if (initialDetails.mode === 'bid') {
        if (!skipAmountEntry) {
          setPaymentDetails(initialDetails);
          setCurrentStep(PAYMENT_STEPS.AMOUNT_ENTRY);
          return;
        }
      }

      setPaymentDetails(initialDetails);
      setCurrentStep(PAYMENT_STEPS.ADDRESS_SELECTION);
    },
    [skipAmountEntry]
  );

  const handleBidConfirm = useCallback((bidAmount) => {
    setPaymentDetails((prev) => ({ ...prev, amount: bidAmount }));
    setCurrentStep(PAYMENT_STEPS.ADDRESS_SELECTION);
  }, []);

  useEffect(() => {
    console.log('Current Step Changed:', currentStep);
  }, [currentStep]);
  const handleAddressSelection = useCallback((addressId) => {
    setPaymentDetails((prev) => ({ ...prev, addressId }));
    setCurrentStep(PAYMENT_STEPS.PAYMENT);
  }, []);

  return {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleBidConfirm,
    handleAddressSelection,
    resetFlow,
  };
};
