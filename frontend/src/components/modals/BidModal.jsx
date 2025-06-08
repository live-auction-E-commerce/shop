import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const BidModal = ({ isOpen, onClose, onConfirm, currentBidAmount }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= currentBidAmount) {
      toast.error(`Bid must be greater than $${currentBidAmount}`);
      return;
    }

    onConfirm(amount);
    setBidAmount('');
  };

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
