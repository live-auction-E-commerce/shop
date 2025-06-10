'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { addressSchema } from '@/lib/validations';
import AddressForm from '@/components/forms/AddressForm';
import { useAuth } from '@/context/AuthContext';
import { createAddress, updateAddress, getAddressById } from '@/services/addressService';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';

const NewAddress = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = !!params.id;

  const { user } = useAuth();
  const [loadingAddress, setLoadingAddress] = useState(isEditing);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      userId: user._id,
      description: '',
      street: '',
      number: '',
      city: '',
      country: '',
      isDefault: false,
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getAddressById(params.id);
        form.reset({
          ...data,
          number: typeof data.number === 'string' ? parseInt(data.number, 10) : data.number,
        });
      } catch (err) {
        toast.error(`Failed to fetch address: ${err}`);
        navigate(ROUTES.ADDRESSES);
      } finally {
        setLoadingAddress(false);
      }
    };

    if (isEditing) {
      setLoadingAddress(true);
      fetchAddress();
    } else {
      setLoadingAddress(false);
    }
  }, [isEditing, params.id, form, navigate]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateAddress(params.id, data);
        toast.success('Address has been updated');
      } else {
        await createAddress(data);
        toast.success('Address has been created');
      }

      navigate(ROUTES.ADDRESSES);
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Error saving address');
    }
  };

  if (loadingAddress && isEditing) {
    return <div className="text-center mt-12">Loading address...</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => navigate(ROUTES.ADDRESSES)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Addresses
      </Button>

      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Address' : 'Add New Address'}</h1>

      {!loadingAddress && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AddressForm form={form} />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(ROUTES.ADDRESSES)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? 'Update Address' : 'Save Address'}</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default NewAddress;
