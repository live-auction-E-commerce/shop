import { useState, useEffect } from 'react';
import { Clock, ArrowUp, Tag, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ListingCardSkeleton } from '@/components/listing/ListingCardSkeleton';
import { getBidProgress, getListingStatus, getTimeRemaining } from '@/lib/utils';

export function ListingCard({
  listing,
  onBidClick,
  onBuyNowClick,
  isLoading = false,
  variant = 'default',
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    if (!listing) return;

    const expired =
      listing.saleType === 'auction' && listing.expiredAt
        ? new Date() > new Date(listing.expiredAt)
        : false;

    setIsExpired(expired);
    setIsSold(listing.isSold || false);
  }, [listing]);

  const status = getListingStatus(listing);

  const timeRemaining =
    listing.saleType === 'auction' ? getTimeRemaining(listing.expiredAt, isExpired) : null;

  // Calculate bid progress percentage for auctions
  const progressPercentage = getBidProgress(listing);
  // Return skeleton if loading or if listing/product is undefined
  if (isLoading) return <ListingCardSkeleton variant={variant} />;

  const product = listing.product;

  if (!listing || !product) return null;

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card
        className={`flex flex-col h-full overflow-hidden transition-all duration-200 ${
          isHovered ? 'shadow-md' : ''
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

            {/* Image navigation dots for multiple images */}
            {listing.imageUrls && listing.imageUrls.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {listing.imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Status badge */}
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
          {/* Sale type badge */}
          <div className="absolute top-2 left-2">
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm text-xs px-1.5 py-0"
            >
              {listing.saleType === 'auction' ? 'Auction' : 'Buy Now'}
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
            {listing.saleType === 'auction' ? (
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
                {listing.saleType === 'auction' ? (
                  <Button
                    size="sm"
                    className="w-full h-7 text-xs cursor-pointer"
                    onClick={() => onBidClick?.(listing._id)}
                    disabled={isExpired || isSold}
                  >
                    <ArrowUp className="h-3 w-3 mr-1" />
                    Bid
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full h-7 text-xs cursor-pointer"
                    onClick={() => onBuyNowClick?.(listing._id)}
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
  }

  // Default variant
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-200 ${isHovered ? 'shadow-md' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[currentImageIndex]
                : '/placeholder.svg?height=300&width=300'
            }
            alt={product.name}
            width={300}
            height={300}
            className={`object-cover w-full h-full transition-transform duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Image navigation dots for multiple images */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={
              status === 'expired' ? 'destructive' : status === 'sold' ? 'secondary' : 'default'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        {/* Sale type badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {listing.saleType === 'auction' ? 'Auction' : 'Buy Now'}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {product.category}
          </Badge>
        </div>
        {variant === 'default' && (
          <div className="mt-1 space-y-1">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description || 'No description available'}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
              {product.condition && <Badge variant="secondary">{product.condition}</Badge>}
              {product.size && <Badge variant="secondary">{product.size}</Badge>}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <div className="space-y-3">
          {listing.saleType === 'auction' ? (
            <>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {listing.currentBid ? 'Current bid' : 'Starting bid'}
                </div>
                <div className="font-medium">
                  ${(listing.currentBid?.amount || listing.startingBid || 0).toFixed(2)}
                </div>
              </div>

              {progressPercentage > 0 && <Progress value={progressPercentage} className="h-1" />}

              {timeRemaining && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{timeRemaining}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="font-medium text-lg">${(listing.price || 0).toFixed(2)}</div>
            </div>
          )}
        </div>
      </CardContent>

      {status === 'active' && variant === 'default' && (
        <CardFooter className="p-4 pt-0 mt-auto">
          {listing.saleType === 'auction' ? (
            <Button
              className="w-full cursor-pointer"
              onClick={() => onBidClick?.(listing._id)}
              disabled={isExpired || isSold}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Place Bid
            </Button>
          ) : (
            <Button
              className="w-full cursor-pointer"
              onClick={() => onBuyNowClick?.(listing._id)}
              disabled={isSold}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
