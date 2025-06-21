import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ProductDetails from '../orders/ProductDetails';
import SaleInfo from './SaleInfo';

const SaleCard = ({ sale }) => {
  const { listingId, buyerId, addressId, price, createdAt, _id } = sale;
  const { productId } = listingId;
  console.log(buyerId);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Sale #{_id.slice(-8)}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4" />
              <span>Saled on {formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={productId.images[0] || '/placeholder.svg'}
              alt={productId.name}
              className="w-full lg:w-32 h-32 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-3">
            <ProductDetails product={productId} saleType={listingId.saleType} />

            <SaleInfo buyer={buyerId} address={addressId} />

            <Separator />

            {/* Price and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-2xl font-bold">${price.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SaleCard;
