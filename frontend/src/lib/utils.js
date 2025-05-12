import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
import { fetchAPI } from './fetch';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const getBidProgress = (listing) => {
  if (listing.saleType !== 'auction' || !listing.startingBid) return 0;
  const current = listing.currentBid?.amount || listing.startingBid;
  return Math.min(((current - listing.startingBid) / listing.startingBid) * 100, 100);
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
export function getTimeRemaining(expiredAt, isExpired) {
  if (!expiredAt) return null;

  return isExpired ? 'Expired' : formatDistanceToNow(new Date(expiredAt), { addSuffix: true });
}

export const handleListingSearch = async (query) => {
  e.preventDefault();

  if (!query.trim()) return;

  try {
    const response = await fetchAPI(`/api/listings?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Search failed:', err);
    return [];
  }
};
