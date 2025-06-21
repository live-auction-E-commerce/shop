import { Separator } from '@/components/ui/separator';
import { MapPin, User } from 'lucide-react';

const SaleInfo = ({ buyer, address }) => (
  <>
    <Separator />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="flex items-start gap-2">
        <User className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div>
          <span className="text-muted-foreground">Sold to:</span>
          <p className="font-medium">{buyer.email}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div>
          <span className="text-muted-foreground">Delivery to:</span>
          <p className="font-medium">
            {address.number} {address.street}, {address.city}, {address.country}
          </p>
        </div>
      </div>
    </div>
  </>
);

export default SaleInfo;
