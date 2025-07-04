import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
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
import { ImageUpload } from '@/components/ui/image-upload';
import ProductForm from '@/components/forms/ProductForm';
import BuyNowForm from '@/components/forms/BuyNowForm';
import { ROUTES } from '@/routes/routes_consts';
import { useEditProductForm } from '@/hooks/listings/useEditProductForm';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const EditListingPage = () => {
  const { id: listingId } = useParams();
  const navigate = useNavigate();

  const { form, images, setImages, onSubmit, loading } = useEditProductForm(listingId);

  const [submitting, setSubmitting] = useState(false);

  const saleType = form.watch('saleType');

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      const updatedId = await onSubmit(data);
      navigate(ROUTES.LISTING_PAGE.replace(':id', updatedId));
    } catch (err) {
      toast.error(`Failed to update product: ${err}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading listing data...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="container mx-auto py-10"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Listing</CardTitle>
          <CardDescription>Update your product information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <ImageUpload images={images} setImages={setImages} />
              <ProductForm form={form} />

              {saleType === 'now' && <BuyNowForm form={form} />}

              <CardFooter className="flex justify-end px-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.MANAGE_LISTINGS)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Listing
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default EditListingPage;
