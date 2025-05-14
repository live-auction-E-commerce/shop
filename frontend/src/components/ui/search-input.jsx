import { useState, useRef, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchInput({ placeholder = 'Search...', className, searchFunction }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Fetch search results when query changes
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await searchFunction(debouncedQuery);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching listings:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, searchFunction]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onFocus={() => {
            if (query.trim().length >= 2 && results.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : query ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        ) : null}
      </div>

      {/* Results dropdown */}
      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute z-50 top-full mt-1 w-full bg-background border rounded-md shadow-lg overflow-hidden"
        >
          <div className="max-h-[300px] overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex items-start gap-3 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => null}
                  >
                    <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          listing.product?.images?.[0] || '/placeholder.svg?height=100&width=100'
                        }
                        alt={listing.product?.name || 'Product'}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {listing.product?.name || 'Unnamed Product'}
                        </h4>
                        <span className="text-sm font-medium">
                          $
                          {(
                            listing.price ||
                            listing.currentBid?.amount ||
                            listing.startingBid ||
                            0
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {listing.saleType === 'auction' ? 'Auction' : 'Buy Now'}
                        </Badge>
                        {listing.product?.category && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            {listing.product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : query.trim().length >= 2 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No listings found for "{query}"
              </div>
            ) : null}
          </div>
          {results.length > 0 && (
            <div className="p-2 border-t text-xs text-muted-foreground">
              <span>
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
