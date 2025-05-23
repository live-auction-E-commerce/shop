import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTimeRemaining, formatCurrency } from '@/lib/utils';

function ProductDetails({ listing, onBidClick, onBuyNowClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { productId } = listing;

  useEffect(() => {
    if (listing) {
      setLoading(false);
      setBidAmount(
        listing.saleType === 'auction' ? listing.currentBid?.amount || listing.startingBid : 0
      );
    } else {
      setLoading(true);
    }
  }, [listing]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-96 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    );
  }

  if (!listing) {
    return <p>No product found.</p>;
  }

  const isAuction = listing.saleType === 'auction';
  const isSold = listing.isSold;

  const nextImage = () => {
    console.log(listing.imageUrls);
    if (!listing?.imageUrls.length) return;
    setCurrentImageIndex((prev) => (prev === listing.imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!listing?.imageUrls?.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? listing.imageUrls.length - 1 : prev - 1));
  };

  const handleBid = () => {
    if (onBidClick) {
      onBidClick(bidAmount);
    }
  };
  const handleBuyNow = () => {
    if (onBuyNowClick) onBuyNowClick();
  };

  return (
    // This component is very long. Separate the component to smaller components
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        {/* Export to "ProductImages" component*/}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden border">
            <img
              src={listing.imageUrls[currentImageIndex] || '/placeholder.svg'}
              alt={listing.name}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full opacity-80 hover:opacity-100"
                onClick={prevImage}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full opacity-80 hover:opacity-100"
                onClick={nextImage}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Consider to export it to a component */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {listing.imageUrls.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`${listing.name} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        {/* Export to component */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{listing.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">{listing.brand}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{listing.category}</Badge>
              <Badge variant="outline">{listing.condition}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isAuction ? 'Current Bid' : 'Price'}</CardTitle>
              <CardDescription>
                {isAuction && !isSold && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {getTimeRemaining(
                        listing.expiredAt,
                        new Date() > new Date(listing.expiredAt)
                      )}
                    </span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {isAuction
                      ? formatCurrency(listing.currentBid?.amount || listing.startingBid)
                      : formatCurrency(listing.price)}
                  </span>
                </div>

                {isAuction && !isSold ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        min={
                          listing.currentBid
                            ? String(listing.currentBid.amount + 1)
                            : String(listing.startingBid)
                        }
                        step={1}
                      />
                      <Button onClick={handleBid}>Place Bid</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum bid:{' '}
                      {formatCurrency(
                        listing.currentBid
                          ? String(listing.currentBid.amount + 1)
                          : String(listing.startingBid)
                      )}
                    </p>
                  </div>
                ) : !isSold ? (
                  <Button className="w-full" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                ) : (
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    Sold
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Details</h2>
              <Separator className="my-2" />
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt className="font-medium text-muted-foreground">Brand</dt>
                <dd>{productId.brand}</dd>
                <dt className="font-medium text-muted-foreground">Size</dt>
                <dd>{productId.size}</dd>
                <dt className="font-medium text-muted-foreground">Condition</dt>
                <dd>{productId.condition}</dd>
                <dt className="font-medium text-muted-foreground">Listed</dt>
                <dd>{new Date(listing.createdAt).toLocaleDateString()}</dd>
              </dl>
            </div>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-sm">{listing.description}</p>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="space-y-2 text-sm">
                  <p>Free shipping on all orders over $100.</p>
                  <p>Standard shipping: 3-5 business days.</p>
                  <p>Express shipping: 1-2 business days (additional fee).</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Consider using PropTypes

export default ProductDetails;
