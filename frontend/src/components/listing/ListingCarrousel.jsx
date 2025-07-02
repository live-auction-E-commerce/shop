import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/common/useMobile';
import { Button } from '@/components/ui/button';
import { ListingCard, ListingCardSkeleton } from '@/components/listing/ListingCard';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ListingCarrousel = ({
  title,
  listings = [],
  onBidClick,
  onBuyNowClick,
  className = '',
  viewAllHref = '#',
  isLoading = false,
  isPaused = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 5;

  const itemsToRender = isLoading ? Array.from({ length: cardsToShow }) : listings;
  const totalItems = isLoading ? cardsToShow : listings.length;
  const maxIndex = useMemo(() => Math.max(0, totalItems - cardsToShow), [totalItems, cardsToShow]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isHovering || totalItems <= cardsToShow || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, totalItems, cardsToShow, isPaused, nextSlide]);

  const showControls = totalItems > cardsToShow;

  return (
    <div
      className={cn('w-full py-4', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold mx-2">{title}</h2>
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
            width: `${(totalItems * 100) / cardsToShow}%`,
            transform: `translateX(-${(currentIndex * 100) / totalItems}%)`,
          }}
        >
          {itemsToRender.map((item, i) => (
            <motion.div
              key={isLoading ? `skeleton-${i}` : item._id}
              className="flex-shrink-0"
              style={{
                width: `${100 / totalItems}%`,
                padding: '0 8px',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              layout
            >
              {isLoading ? (
                <ListingCardSkeleton />
              ) : (
                <ListingCard listing={item} onBidClick={onBidClick} onBuyNowClick={onBuyNowClick} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {isMobile && itemsToRender.length > 1 && !isLoading && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: itemsToRender }).map((_, index) => (
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
};

export default memo(ListingCarrousel);
