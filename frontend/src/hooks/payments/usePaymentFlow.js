import { useState, useCallback } from 'react';
import { useBidValidations } from './UseBidValidations';

export const PAYMENT_STEPS = {
  AMOUNT_ENTRY: 'AMOUNT_ENTRY',
  ADDRESS_SELECTION: 'ADDRESS_SELECTION',
  PAYMENT: 'PAYMENT',
};

export const usePaymentFlow = (listing) => {
  const { validateBidder, validateBidAmount } = useBidValidations(listing);
  const [currentStep, setCurrentStep] = useState(PAYMENT_STEPS.AMOUNT_ENTRY);
  const [paymentDetails, setPaymentDetails] = useState({
    listingId: null,
    amount: null,
    addressId: null,
    mode: 'bid',
  });

  const startPaymentFlow = useCallback(
    (initialDetails) => {
      if (initialDetails.mode === 'bid') {
        if (!validateBidder()) return;
        if (!validateBidAmount(initialDetails.amount)) return;
      } else if (initialDetails.mode === 'buyNow') {
        if (!validateBidder()) return;
      }

      setPaymentDetails(initialDetails);
      setCurrentStep(PAYMENT_STEPS.ADDRESS_SELECTION);
    },
    [validateBidder, validateBidAmount]
  );

  const handleAddressSelection = useCallback((addressId) => {
    setPaymentDetails((prev) => ({ ...prev, addressId }));
    setCurrentStep(PAYMENT_STEPS.PAYMENT);
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep(PAYMENT_STEPS.AMOUNT_ENTRY);
    setPaymentDetails({
      listingId: null,
      amount: null,
      addressId: null,
      mode: 'bid',
    });
  }, []);

  return {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleAddressSelection,
    resetFlow,
  };
};
