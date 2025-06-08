'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { addressSchema } from '@/lib/validations';
import AddressForm from '@/components/forms/AddressForm';
import { useAuth } from '@/context/AuthContext';
import { createAddress, updateAddress } from '@/services/addressService';
import { ROUTES } from '@/routes/routes_consts';

const NewAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isEditing = !!params.id;

  const { user } = useAuth();
  const addressToEdit = location.state?.address;

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
      ...addressToEdit,
    },
  });

  // Ensure number is a number on edit
  useEffect(() => {
    if (addressToEdit?.number && typeof addressToEdit.number === 'string') {
      form.setValue('number', Number.parseInt(addressToEdit.number, 10));
    }
  }, [addressToEdit, form]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        number: Number(data.number),
        userId: user._id,
      };

      if (isEditing) {
        await updateAddress(params.id, payload);
      } else {
        await createAddress(payload);
      }

      navigate(ROUTES.ADDRESSES);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

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
    </div>
  );
};

export default NewAddress;
