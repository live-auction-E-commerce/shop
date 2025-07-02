import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { Loader2 } from 'lucide-react';
import { useUploadProductForm } from '@/hooks/listings/useUploadProductForm';
import useRequireVerifiedUser from '@/hooks/auth/useVerifiedUser';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const UploadProduct = () => {
  const isAllowed = useRequireVerifiedUser();

  const navigate = useNavigate();
  const { form, activeTab, images, setImages, onTabChange, onSubmit } = useUploadProductForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const listingId = await onSubmit(data);
      const listingRoute = ROUTES.LISTING_PAGE.replace(':id', listingId);
      navigate(listingRoute);
    } catch (err) {
      toast.error(`Failed to upload product: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAllowed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container mx-auto py-10"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Product</CardTitle>
          <CardDescription>Create a new product listing for auction or buy now.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  List Product
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UploadProduct;
