'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ProductForm from '@/components/forms/ProductForm';
import AuctionForm from '@/components/forms/AuctionForm';
import BuyNowForm from '@/components/forms/BuyNowForm';
import { ImageUpload } from '@/components/ui/image-upload';
import { toast } from 'sonner';
import { formSchema } from '@/lib/validations';
import { createListing } from '@/services/listingService';
import { createProduct, updateProduct } from '@/services/productService';

const UploadProduct = () => {
  const [activeTab, setActiveTab] = useState('now');
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      saleType: 'now',
      name: '',
      description: '',
      category: '',
      brand: '',
      condition: '',
      size: '',
      listing: {
        startingBid: 0,
      },
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
      const fakeUserId = '682c6aa24d11b67f3842ee33'; // TODO: get from auth context
      const productFormData = new FormData();
      productFormData.append('ownerId', fakeUserId); // TODO: get from auth context
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
        sellerId: fakeUserId, // TODO: get from auth context
        saleType: activeTab,
        price: activeTab === 'now' ? Number(data.listing.price) : undefined,
        startingBid: activeTab === 'auction' ? data.listing.startingBid : undefined,
        expiredAt: activeTab === 'auction' ? data.listing.expiredAt : undefined,
      };

      const savedListing = await createListing(listingData);

      await updateProduct(savedProduct._id, { listing: savedListing._id });
      toast.success(`Your listing has been created!`);

      form.reset();
      setImages([]);
    } catch (error) {
      console.error(error.message);
      toast('There was an error creating your listing. Please try again.', {
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Product</CardTitle>
          <CardDescription>Create a new product listing for auction or buy now.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ImageUpload images={images} setImages={setImages} />

              <ProductForm form={form} />

              <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="now">Buy Now</TabsTrigger>
                  <TabsTrigger value="auction">Auction</TabsTrigger>
                </TabsList>
                <TabsContent value="now">
                  <BuyNowForm form={form} />
                </TabsContent>
                <TabsContent value="auction">
                  <AuctionForm form={form} />
                </TabsContent>
              </Tabs>

              <CardFooter className="flex justify-end px-0">
                <Button type="submit">List Product</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadProduct;
