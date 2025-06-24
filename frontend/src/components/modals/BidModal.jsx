import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { maxPossibleBidAmount } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const BidModal = ({ isOpen, onClose, onConfirm, currentBidAmount }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = useCallback(() => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= currentBidAmount) {
      toast.error(`Bid must be greater than $${currentBidAmount}`);
      return;
    }
    if (amount >= maxPossibleBidAmount) {
      toast.error(`Maximum bid is: $${maxPossibleBidAmount.toLocaleString()}`);
      return;
    }

    onConfirm(amount);
    setBidAmount('');
  }, [bidAmount, currentBidAmount, onConfirm]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Place Your Bid</DialogHeader>
        <Input
          type="number"
          placeholder="Enter your bid amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Continue to Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BidModal;
