import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
import { fetchAPI } from './fetch';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export function getBidProgress(listing) {
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
}

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
export function getTimeRemaining(expiredAt, isExpired) {
  if (!expiredAt) return null;

  return isExpired ? 'Expired' : formatDistanceToNow(new Date(expiredAt), { addSuffix: true });
}

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
