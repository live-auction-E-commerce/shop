import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import { ListingCard } from '@/components/ui/listing-card';

export default function ListingCarrousel({
  title,
  listings = [],
  onBidClick,
  onBuyNowClick,
  className = '',
  viewAllHref = '#',
  emptyMessage = 'No listings available',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  // Number of cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const cardGap = 16; // Gap between cards in pixels

  // Handle navigation
  const nextSlide = () => {
    if (currentIndex + cardsToShow >= listings.length) {
      setCurrentIndex(0); // Loop back to start
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(Math.max(0, listings.length - cardsToShow)); // Loop to end
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Auto-scroll when not hovering
  useEffect(() => {
    if (isHovering || listings.length <= cardsToShow) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, listings.length, cardsToShow, currentIndex]);

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
            transform: `translateX(calc(-${currentIndex * (100 / cardsToShow)}% - ${(currentIndex * cardGap) / cardsToShow}px))`,
            gap: `${cardGap}px`,
          }}
        >
          {listings.map((listing, index) => (
            <div
              key={listing._id || index}
              className="min-w-[100%] sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-10.67px)]"
            >
              {/* Using your existing ListingCard component with the compact variant */}
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
