export const sampleProduct = {
  _id: 'product-1',
  ownerId: 'user-123',
  name: 'Nike Air Jordan 1',
  description: 'Original Air Jordan 1 in Chicago colorway. Excellent condition with original box.',
  images: [
    '/placeholder.svg?height=300&width=300&text=Image+1',
    '/placeholder.svg?height=300&width=300&text=Image+2',
    '/placeholder.svg?height=300&width=300&text=Image+3',
  ],
  category: 'Sneakers',
  brand: 'Nike',
  condition: 'Used',
  size: 'US 10',
  createdAt: new Date('2023-05-10T08:00:00'),
};

export const auctionListing = {
  _id: 'listing-1',
  productId: 'product-1',
  sellerId: 'user-123',
  saleType: 'auction',
  startingBid: 150,
  expiredAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  isSold: false,
  createdAt: new Date('2023-05-10T08:00:00'),
};

export const buyNowListing = {
  _id: 'listing-2',
  productId: 'product-1',
  sellerId: 'user-123',
  saleType: 'now',
  price: 250,
  isSold: false,
  createdAt: new Date('2023-05-10T08:00:00'),
};

export const soldListing = {
  _id: 'listing-3',
  productId: 'product-1',
  sellerId: 'user-123',
  saleType: 'auction',
  startingBid: 100,
  expiredAt: new Date('2023-04-25T23:59:59'),
  isSold: true,
  createdAt: new Date('2023-04-15T09:30:00'),
};

export const currentBid = {
  _id: 'bid-1',
  listingId: 'listing-1',
  bidderId: 'user-456',
  amount: 175.5,
  createdAt: new Date('2023-05-15T10:30:00'),
};
