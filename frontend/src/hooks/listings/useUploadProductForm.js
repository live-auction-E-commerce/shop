import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/validations';
import { createListing } from '@/services/listingService';
import { createProduct, updateProduct } from '@/services/productService';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const DEFAULT_SALE_TYPE = 'auction';

export const useUploadProductForm = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState(DEFAULT_SALE_TYPE);
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      saleType: DEFAULT_SALE_TYPE,
      name: '',
      description: '',
      category: '',
      brand: '',
      condition: '',
      size: '',
      listing:
        DEFAULT_SALE_TYPE === 'auction'
          ? { startingBid: 0, expiredAt: new Date(Date.now() + 60 * 60 * 1000 * 24) } // DEFAULT AUCTION EXPIRY TO 24 HOURS
          : { price: 0 },
    },
  });

  const onTabChange = (value) => {
    setActiveTab(value);
    if (value === 'auction') {
      form.setValue('saleType', 'auction');
      form.setValue('listing', { startingBid: 0, expiredAt: new Date() });
    } else {
      form.setValue('saleType', 'now');
      form.setValue('listing', { price: 0 });
    }
  };

  const onSubmit = async (data) => {
    try {
      const productFormData = new FormData();
      productFormData.append('ownerId', user._id);
      productFormData.append('name', data.name);
      productFormData.append('description', data.description || '');
      productFormData.append('category', data.category);
      productFormData.append('brand', data.brand);
      productFormData.append('condition', data.condition);
      productFormData.append('size', data.size);

      images.forEach((file) => {
        productFormData.append('images', file);
      });

      const savedProduct = await createProduct(productFormData);

      const listingData = {
        productId: savedProduct._id,
        sellerId: user._id,
        saleType: activeTab,
        price: activeTab === 'now' ? Number(data.listing.price) : undefined,
        startingBid: activeTab === 'auction' ? data.listing.startingBid : undefined,
        expiredAt: activeTab === 'auction' ? data.listing.expiredAt : undefined,
      };

      const savedListing = await createListing(listingData);

      await updateProduct(savedProduct._id, { listing: savedListing._id });
      toast.success('Your listing has been created!');

      form.reset();
      setImages([]);
      return savedListing._id;
    } catch (error) {
      console.error(error);
      toast('There was an error creating your listing. Please try again.', {
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    activeTab,
    images,
    setImages,
    onTabChange,
    onSubmit,
  };
};
