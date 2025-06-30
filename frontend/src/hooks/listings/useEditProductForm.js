import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/validations';
import { getListingById, updateListing } from '@/services/listingService';

export const useEditProductForm = (listingId) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      condition: '',
      size: '',
      images: [],
      saleType: 'now',
      listing: {
        price: undefined,
        startingBid: undefined,
        expiredAt: undefined,
      },
    },
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const images = [...existingImages, ...newImages];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await getListingById(listingId);
        console.log(listing);

        // Pre-fill the form with existing data

        form.reset({
          name: listing.productId.name,
          description: listing.productId.description,
          brand: listing.productId.brand,
          category: listing.productId.category.toLowerCase(),
          condition: listing.productId.condition.toLowerCase(),
          size: listing.productId.size,
          images: listing.productId.images ?? [],
          saleType: listing.saleType,
          listing: {
            price: listing.price ?? undefined,
            startingBid: listing.startingBid ?? undefined,
          },
        });
        console.log('category in form:', form.getValues('category'));
        console.log('brand in form:', form.getValues('condition'));
        setExistingImages(listing.productId.images ?? []);
        setNewImages([]);
      } catch (err) {
        console.error('Error loading listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const setImages = (updatedImages) => {
    setExistingImages(updatedImages.filter((img) => typeof img === 'string'));
    setNewImages(updatedImages.filter((img) => img instanceof File));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('category', data.category);
    formData.append('condition', data.condition);
    formData.append('size', data.size);
    formData.append('saleType', data.saleType);

    if (data.saleType === 'now') {
      formData.append('price', data.listing.price);
    } else if (data.saleType === 'auction') {
      formData.append('startingBid', data.listing.startingBid);
      formData.append('expiredAt', data.listing.expiredAt);
    }

    formData.append('existingImages', JSON.stringify(existingImages));

    newImages.forEach((file) => {
      formData.append('images', file);
    });

    const updated = await updateListing(listingId, formData);
    console.log(updated);
    return updated._id;
  };

  return { form, images, setImages, onSubmit, loading };
};
