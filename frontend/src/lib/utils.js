import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
import { fetchAPI } from './fetch';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const getBidProgress = (listing) => {
  if (!listing || listing.saleType !== 'auction') return 0;

  // If there's no current bid, return 0
  if (!listing.currentBid) return 0;

  const startingBid = listing.startingBid || 0;
  const currentBidAmount =
    typeof listing.currentBid === 'object'
      ? listing.currentBid.amount || 0
      : listing.currentBid || 0;

  // If starting bid is 0, avoid division by zero
  if (startingBid === 0) return currentBidAmount > 0 ? 50 : 0;

  // Calculate how much the bid has increased from starting bid
  // A 100% increase (doubling the starting bid) will show as 100% progress
  const progress = ((currentBidAmount - startingBid) / startingBid) * 100;

  // Cap at 100% and ensure it's at least 5% if there's any bid
  return Math.min(100, Math.max(currentBidAmount > 0 ? 5 : 0, progress));
};

export const getListingStatus = (listing) => {
  if (listing.isSold) return 'sold';
  if (
    listing.saleType === 'auction' &&
    listing.expiredAt &&
    new Date() > new Date(listing.expiredAt)
  ) {
    return 'expired';
  }
  return 'active';
};
export const getTimeRemaining = (expiredAt, isExpired) => {
  if (!expiredAt) return null;

  return isExpired ? 'Expired' : formatDistanceToNow(new Date(expiredAt), { addSuffix: true });
};

export const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

export const handleListingSearch = async (query) => {
  if (!query.trim()) return;

  try {
    const data = await fetchAPI(`/api/listings?q=${encodeURIComponent(query)}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error('Search failed:', err);
    return [];
  }
};

export function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export const getGridClass = (itemsPerRow) => {
  let gridClass = 'grid grid-cols-1 gap-4';

  if (itemsPerRow.sm === 2) gridClass += ' sm:grid-cols-2';
  if (itemsPerRow.md === 2) gridClass += ' md:grid-cols-2';
  if (itemsPerRow.md === 3) gridClass += ' md:grid-cols-3';
  if (itemsPerRow.lg === 2) gridClass += ' lg:grid-cols-2';
  if (itemsPerRow.lg === 3) gridClass += ' lg:grid-cols-3';
  if (itemsPerRow.lg === 4) gridClass += ' lg:grid-cols-4';
  if (itemsPerRow.xl === 2) gridClass += ' xl:grid-cols-2';
  if (itemsPerRow.xl === 3) gridClass += ' xl:grid-cols-3';
  if (itemsPerRow.xl === 4) gridClass += ' xl:grid-cols-4';
  if (itemsPerRow.xl === 5) gridClass += ' xl:grid-cols-5';
  if (itemsPerRow.xl === 6) gridClass += ' xl:grid-cols-6';

  return gridClass;
};

export const getCurrentYear = () => new Date().getFullYear();

export const sortListings = (listings, sortBy) => {
  return [...listings].sort((a, b) => {
    const aPrice = a.price || a.currentBid?.amount || a.startingBid || 0;
    const bPrice = b.price || b.currentBid?.amount || b.startingBid || 0;
    const aDate = new Date(a.createdAt || 0);
    const bDate = new Date(b.createdAt || 0);
    const aExpire = new Date(a.expiredAt || Number.POSITIVE_INFINITY);
    const bExpire = new Date(b.expiredAt || Number.POSITIVE_INFINITY);

    switch (sortBy) {
      case 'newest':
        return bDate - aDate;
      case 'oldest':
        return aDate - bDate;
      case 'price-high':
        return bPrice - aPrice;
      case 'price-low':
        return aPrice - bPrice;
      case 'ending-soon':
        return aExpire - bExpire;
      default:
        return 0;
    }
  });
};

export const filterListings = (
  listings,
  { searchTerm = '', saleType = 'all', status = 'all', condition = 'all' }
) => {
  const searchLower = searchTerm.toLowerCase();

  return listings.filter((listing) => {
    const product = listing.product;
    if (!product) return false;

    const matchesSearch =
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower) ||
      product.brand?.toLowerCase().includes(searchLower);

    const matchesSaleType = saleType === 'all' || listing.saleType === saleType;

    const matchesCondition = condition === 'all' || product.condition === condition;

    const now = new Date();
    const isExpired = new Date(listing.expiredAt) <= now;
    const isActive = !listing.isSold && !isExpired;

    const matchesStatus =
      status === 'all' || (status === 'active' && isActive) || (status === 'expired' && isExpired);

    return matchesSearch && matchesSaleType && matchesCondition && matchesStatus;
  });
};

export const filterOrders = (orders, searchTerm) => {
  return orders.filter((order) => {
    const matchesSearch =
      order.listingId.productId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.listingId.productId.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
};

export const sortOrders = (orders, sortBy) => {
  return [...orders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    return 0;
  });
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
