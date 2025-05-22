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
import { ProductForm } from '@/components/forms/product-form';
import { AuctionForm } from '@/components/forms/auction-form';
import { BuyNowForm } from '@/components/forms/buy-now-form';
import { ImageUpload } from '@/components/ui/image-upload';
import { toast } from 'sonner';
import { formSchema } from '@/schemas/schemas';

export default function UploadProductPage() {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('now');

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
        price: 0,
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
      const submitData = { ...data, images };

      console.log('Form submitted:', submitData);

      // Example: await fetch("/api/products", { ... })

      toast({
        title: 'Product listed successfully',
        description: `Your ${data.saleType === 'auction' ? 'auction' : 'buy now'} listing has been created.`,
      });

      form.reset();
      setImages([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating your listing. Please try again.',
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
}
