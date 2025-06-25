import { useState, useEffect, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, AlertCircle } from 'lucide-react';
import { getAllAddressesById } from '@/services/addressService';
import { useAuth } from '@/context/AuthContext';

const AddressSelectionModal = ({ isOpen, onConfirm, onClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  console.log('Addresses rerendered!');

  useEffect(() => {
    const loadAddresses = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError('');

      try {
        const userAddresses = await getAllAddressesById(user._id);
        setAddresses(userAddresses);

        // Auto-select default address if available
        const defaultAddress = userAddresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        }
      } catch (err) {
        setError('Failed to load addresses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [isOpen, user._id]);

  const handleConfirm = () => {
    if (!selectedAddressId) {
      setError('Please select an address to continue.');
      return;
    }
    setError('');
    onConfirm(selectedAddressId);
  };

  const formatAddress = (address) => {
    return `${address.street} ${address.number}, ${address.city}, ${address.country}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Delivery Address
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-muted-foreground">Loading addresses...</span>
            </div>
          ) : addresses.length === 0 ? (
            <Alert>
              <Home className="h-4 w-4" />
              <AlertDescription>
                No addresses found. Please add an address to continue.
              </AlertDescription>
            </Alert>
          ) : (
            <RadioGroup
              value={selectedAddressId}
              onValueChange={setSelectedAddressId}
              className="space-y-3"
            >
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <RadioGroupItem value={address._id} id={address._id} className="mt-1" />
                  <Label htmlFor={address._id} className="flex-1 cursor-pointer space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {address.description || 'Address'}
                      </span>
                      {address.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatAddress(address)}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading || addresses.length === 0}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddressSelectionModal);
