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

export const sampleProducts = [
  {
    _id: '101',
    name: 'Vintage Camera',
    description: '',
    category: 'Electronics',
    brand: 'Canon',
    condition: 'Used',
    images: ['/placeholder.svg?height=300&width=300'],
  },
  {
    _id: '102',
    name: 'Leather Jacket',
    description: 'Genuine leather jacket, perfect for fall weather',
    category: 'Clothing',
    brand: "Levi's",
    condition: 'New',
    size: 'Medium',
    images: ['/placeholder.svg?height=300&width=300'],
  },
  {
    _id: '103',
    name: 'Antique Watch',
    description: 'Rare antique pocket watch from the 1920s',
    category: 'Accessories',
    brand: 'Omega',
    condition: 'New',
    images: ['/placeholder.svg?height=300&width=300'],
  },
  {
    _id: '104',
    name: 'Mountain Bike',
    description: 'High-performance mountain bike with carbon frame',
    category: 'Sports',
    brand: 'Trek',
    condition: 'Used',
    images: ['/placeholder.svg?height=300&width=300'],
  },
  {
    _id: '105',
    name: 'Art Deco Lamp',
    description: 'Beautiful art deco style table lamp with stained glass shade',
    category: 'Home',
    condition: 'Vintage',
    images: ['/placeholder.svg?height=300&width=300'],
  },
];

export const sampleListings = [
  {
    _id: '1',
    productId: '101',
    saleType: 'auction',
    startingBid: 50,
    currentBid: { amount: 75 },
    reservePrice: 100,
    expiredAt: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    isSold: false,
  },
  {
    _id: '2',
    productId: '102',
    saleType: 'buy-now',
    price: 120,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    isSold: false,
  },
  {
    _id: '3',
    productId: '103',
    saleType: 'auction',
    startingBid: 200,
    currentBid: { amount: 250 },
    reservePrice: 300,
    expiredAt: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    isSold: false,
  },
  {
    _id: '4',
    productId: '104',
    saleType: 'buy-now',
    price: 85,
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    isSold: true,
  },
  {
    _id: '5',
    productId: '105',
    saleType: 'auction',
    startingBid: 150,
    currentBid: { amount: 180 },
    reservePrice: 250,
    expiredAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago (expired)
    createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    isSold: false,
  },
];

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
