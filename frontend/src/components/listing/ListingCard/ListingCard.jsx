import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Card } from '@/components/ui/card';
import { getBidProgress, getListingStatus, getTimeRemaining } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
  StatusBadges,
  ActionSection,
  CategoryBadges,
  ImageCarrousel,
  ListingCardSkeleton,
} from '.';

const ListingCard = ({ listing, onBidClick, onBuyNowClick, isLoading = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isSold, setIsSold] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(
    () => navigate(`/listings/${listing._id}`),
    [navigate, listing._id]
  );
  const images = listing.product?.images || [];
  const isAuction = useMemo(() => listing?.saleType === 'auction', [listing]);

  useEffect(() => {
    if (!listing) return;

    const expired =
      isAuction && listing.expiredAt ? new Date() > new Date(listing.expiredAt) : false;

    setIsExpired(expired);
    setIsSold(listing.isSold || false);
  }, [listing, isAuction]);

  const status = getListingStatus(listing);
  const timeRemaining = isAuction ? getTimeRemaining(listing.expiredAt, isExpired) : null;
  const progressPercentage = getBidProgress(listing);
  const product = listing?.product;

  const handleBidClick = useCallback(() => {
    onBidClick?.(listing), [onBidClick, listing];
  });
  const handleBuyNowClick = useCallback(() => onBuyNowClick?.(listing), [onBuyNowClick, listing]);

  if (!listing || !product) return null;

  if (isLoading) return <ListingCardSkeleton />;

  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-200 cursor-pointer ${
        isHovered ? 'shadow-md' : ''
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`relative ${isHovered ? 'scale-105 transition-transform duration-300' : ''}`}>
        <ImageCarrousel
          imageUrls={images}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
          productName={product.name}
        />

        <StatusBadges status={status} isAuction={isAuction} />
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <div className="mb-1">
          <h3 className="font-extrabold text-md line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <CategoryBadges category={product.category} brand={product.brand} />
          </div>
        </div>

        <ActionSection
          isAuction={isAuction}
          isExpired={isExpired}
          isSold={isSold}
          listing={listing}
          onBidClick={handleBidClick}
          onBuyNowClick={handleBuyNowClick}
          status={status}
          timeRemaining={timeRemaining}
          progressPercentage={progressPercentage}
        />
      </div>
    </Card>
  );
};

export default memo(ListingCard);
