import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useAddresses from '@/hooks/common/useAddresses';
import { ROUTES } from '@/routes/routes_consts';
import useRequireAuth from '@/hooks/auth/useRequireAuth';
import { deleteAddress } from '@/services/addressService';
import { toast } from 'sonner';

const AddressesPage = () => {
  const navigate = useNavigate();
  const { addresses, setAddresses, isLoading, error } = useAddresses();
  const isAllowed = useRequireAuth();

  const handleEdit = (address) => {
    const editRoute = ROUTES.EDIT_ADDRESS.replace(':id', address._id);
    navigate(editRoute);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress(addressId);
      setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      toast.success('Address deleted');
    } catch (err) {
      toast.error('Failed to delete address:', err);
    }
  };

  const handleAddNew = () => {
    navigate(ROUTES.NEW_ADDRESS);
  };

  if (!isAllowed) return null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-muted-foreground">Loading Addresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        Failed to load addresses.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <PlusCircle size={18} />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground mb-4">You don't have any saved addresses yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <Card key={address._id} className="overflow-hidden">
              <CardContent className="pt-6">
                {address.isDefault && <Badge className="mb-2">Default</Badge>}
                <h3 className="font-medium mb-1">{address.description}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {address.street}, {address.number}
                  </p>
                  <p>
                    {address.city}, {address.country}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 bg-muted/20 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1"
                >
                  <Pencil size={14} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(address._id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
