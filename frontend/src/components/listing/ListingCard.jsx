import { useState, useEffect } from 'react';
import { Clock, ArrowUp, Tag, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ListingCardSkeleton from '@/components/listing/ListingCardSkeleton';
import { getBidProgress, getListingStatus, getTimeRemaining } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing, onBidClick, onBuyNowClick, isLoading = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isSold, setIsSold] = useState(false);

  const navigate = useNavigate();

  const isAuction = listing?.saleType === 'auction';

  useEffect(() => {
    if (!listing) return;

    const expired =
      isAuction && listing.expiredAt ? new Date() > new Date(listing.expiredAt) : false;

    setIsExpired(expired);
    setIsSold(listing.isSold || false);
  }, [listing, isAuction]);

  // Return skeleton if loading or if listing/product is undefined
  if (isLoading) return <ListingCardSkeleton />;

  const status = getListingStatus(listing);
  const timeRemaining = isAuction ? getTimeRemaining(listing.expiredAt, isExpired) : null;
  const progressPercentage = getBidProgress(listing);
  const product = listing.product;

  if (!listing || !product) return null;

  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-200 cursor-pointer ${
        isHovered ? 'shadow-md' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/listings/${listing._id}`)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={
              listing.imageUrls && listing.imageUrls.length > 0
                ? listing.imageUrls[currentImageIndex]
                : '/placeholder.svg?height=300&width=300'
            }
            alt={product.name}
            width={300}
            height={300}
            className={`object-cover w-full h-full transition-transform duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          {listing.imageUrls && listing.imageUrls.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {listing.imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <Badge
            variant={
              status === 'expired' ? 'destructive' : status === 'sold' ? 'secondary' : 'default'
            }
            className="text-xs px-1.5 py-0"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        <div className="absolute top-2 left-2">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm text-xs px-1.5 py-0"
          >
            {isAuction ? 'Auction' : 'Buy Now'}
          </Badge>
        </div>
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <div className="mb-1">
          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <Badge variant="outline" className="flex items-center gap-0.5 text-xs px-1.5 py-0">
              <Tag className="h-2.5 w-2.5" />
              {product.category}
            </Badge>
            {product.brand && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {product.brand}
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-auto">
          {isAuction ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {listing.currentBid ? 'Current bid' : 'Starting bid'}
                </span>
                <span className="font-medium">
                  ${(listing.currentBid?.amount || listing.startingBid || 0).toFixed(2)}
                </span>
              </div>

              {progressPercentage > 0 && <Progress value={progressPercentage} className="h-1" />}

              {timeRemaining && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-2.5 w-2.5" />
                  <span>{timeRemaining}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">${(listing.price || 0).toFixed(2)}</span>
            </div>
          )}

          {status === 'active' && (
            <div className="mt-2">
              {isAuction ? (
                <Button
                  size="sm"
                  className="w-full h-7 text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBidClick?.(listing._id);
                  }}
                  disabled={isExpired || isSold}
                >
                  <ArrowUp className="h-3 w-3 mr-1" />
                  Bid
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="w-full h-7 text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuyNowClick?.(listing._id);
                  }}
                  disabled={isSold}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Buy
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
