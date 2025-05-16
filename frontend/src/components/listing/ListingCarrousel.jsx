import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMobile';
import { ListingCard } from '@/components/listing/ListingCard';

export default function ListingCarrousel({
  title,
  listings = [],
  onBidClick,
  onBuyNowClick,
  className = '',
  viewAllHref = '#',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  // Number of cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 5;

  const maxIndex = Math.max(0, listings.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isHovering || listings.length <= cardsToShow) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, listings.length, cardsToShow]);

  const showControls = listings.length > cardsToShow;

  return (
    <div
      className={cn('w-full py-4', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllHref && (
            <a href={viewAllHref} className="text-sm font-medium text-primary hover:underline">
              View all
            </a>
          )}
          {showControls && (
            <div className="flex gap-2">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Previous listings"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Next listings"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${(listings.length * 100) / cardsToShow}%`,
            transform: `translateX(-${(currentIndex * 100) / listings.length}%)`,
          }}
        >
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="flex-shrink-0"
              style={{ width: `${100 / listings.length}%`, padding: '0 8px' }}
            >
              <ListingCard
                listing={listing}
                onBidClick={onBidClick}
                onBuyNowClick={onBuyNowClick}
                variant="compact"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots for mobile */}
      {isMobile && listings.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: listings.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                currentIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
