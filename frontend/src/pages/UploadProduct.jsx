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
import { useAuth } from '@/context/AuthContext';
import { useUploadProductForm } from '@/hooks/listings/useUploadProductForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { useEffect } from 'react';

const UploadProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { form, activeTab, images, setImages, onTabChange, onSubmit } = useUploadProductForm();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      toast.error('You must be logged in to upload a product.');
    }
  }, [user, navigate]);
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
