import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/routes/routes_consts';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Gavel,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Eye,
  AlertCircle,
} from 'lucide-react';
import useSellerLiveListings from '@/hooks/listings/useSellerLiveListings';
import { getListingStatus, formatDate, formatCurrency, getTimeRemaining } from '@/lib/utils';
import { toast } from 'sonner';
import { deleteListing } from '@/services/listingService';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useRequireSeller from '@/hooks/auth/useVerifiedUser';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

export default function ManageLiveListings() {
  const {
    listings,
    setListings,
    searchTerm,
    setSearchTerm,
    saleType,
    setSaleType,
    sortBy,
    setSortBy,
    listingStats,
    loading,
    error,
  } = useSellerLiveListings();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  const navigate = useNavigate();

  const auctionListings = listings.filter((l) => l.saleType === 'auction').length;
  const buyNowListings = listings.filter((l) => l.saleType === 'now').length;
  const isSeller = useRequireSeller();

  const canEditListing = (listing) => {
    if (!listing) return false;
    if (listing.saleType === 'now') return true;
    if (listing.saleType === 'auction' && listing.currentBid != null) return false;
    return true;
  };

  const getListingActivity = (listing) => {
    if (listing.saleType === 'now') return null;
    if (listing.currentBid != null) {
      return {
        type: 'active',
        message: 'Active bidding',
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    }
    return {
      type: 'waiting',
      message: 'Awaiting bids',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    };
  };

  const handleEditClick = (listing) => {
    if (!canEditListing(listing)) {
      toast.error('Cannot edit auction listings with active bids', {
        description: 'Editing is disabled once bidding has started to maintain auction integrity.',
      });
      return;
    }

    const editRoute = ROUTES.EDIT_LISTING.replace(':id', listing._id);
    navigate(editRoute);
  };

  const handleDeleteClick = (listing) => {
    if (!canEditListing(listing)) {
      toast.error('Cannot delete auction listings with active bids', {
        description: 'Deletion is disabled once bidding has started to protect bidders.',
      });
      return;
    }

    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;

    try {
      await deleteListing(listingToDelete._id);
      toast.success('Listing deleted successfully');
      setListings((prev) => prev.filter((l) => l._id !== listingToDelete._id));
    } catch (err) {
      toast.error(`Failed to delete listing: ${err.message}`);
    } finally {
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };

  if (!isSeller) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your listings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Live Listings</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your active product listings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="h-4 w-4 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">{listingStats.totalListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Gavel className="h-4 w-4 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Live Auction</p>
                  <p className="text-2xl font-bold">{auctionListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Buy Now</p>
                  <p className="text-2xl font-bold">{buyNowListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by product name, brand, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={saleType} onValueChange={setSaleType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="auction">Auction</SelectItem>
              <SelectItem value="now">Buy Now</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground">
              {searchTerm || saleType !== 'all'
                ? 'Try adjusting your search or filters'
                : "You haven't created any listings yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {listings.map((listing, index) => {
                const isEditable = canEditListing(listing);
                const activity = getListingActivity(listing);

                return (
                  <motion.div
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} // animate out by fading and moving up
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    layout // optional, for smooth layout changes
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={listing.productId.images[0] || '/placeholder.svg'}
                          alt={listing.productId?.name}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 right-3">
                          {listing.saleType === 'auction' ? 'Auction' : 'Buy Now'}
                        </Badge>

                        {listing.saleType === 'auction' && (
                          <Badge className="absolute top-3 left-3 bg-red-100 text-red-800">
                            {getTimeRemaining(
                              listing.expiredAt,
                              getListingStatus(listing) === 'expired'
                            )}
                          </Badge>
                        )}

                        {/* Activity indicator instead of "Locked" */}
                        {activity && (
                          <div
                            className={`absolute bottom-3 left-3 flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.bgColor} ${activity.color}`}
                          >
                            <activity.icon className="h-3 w-3 mr-1" />
                            {activity.message}
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-1">
                          {listing.productId.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {listing.productId.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pb-3">
                        <div className="space-y-2 h-32">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="capitalize">
                              {listing.productId.brand} • {listing.productId.category}
                            </span>
                            <span className="capitalize">{listing.productId.condition}</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            Listed on {formatDate(listing.createdAt)}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">
                                {listing.saleType === 'auction'
                                  ? listing.currentBid?.amount != null
                                    ? 'Current Bid'
                                    : 'Starting Bid'
                                  : 'Price'}
                              </span>
                              <div className="flex items-center text-lg font-bold text-primary">
                                {formatCurrency(
                                  listing.saleType === 'auction'
                                    ? (listing.currentBid?.amount ?? listing.startingBid)
                                    : listing.price
                                )}
                              </div>
                            </div>

                            {listing.productId.size && (
                              <div className="text-sm text-muted-foreground">
                                Size: {listing.productId.size}
                              </div>
                            )}
                          </div>

                          <div className="h-5 flex items-center text-sm text-muted-foreground">
                            {listing.saleType === 'auction' && listing.expiredAt && (
                              <>Ends: {formatDate(listing.expiredAt)}</>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-3 border-t">
                        <div className="flex gap-2 w-full">
                          {isEditable ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                                onClick={() => handleEditClick(listing)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                                onClick={() => handleDeleteClick(listing)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </>
                          ) : (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 opacity-60 cursor-not-allowed bg-transparent"
                                    disabled
                                  >
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Cannot Edit
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Editing is disabled once bidding has started</p>
                                </TooltipContent>
                              </Tooltip>
                            </>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Listing
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left space-y-2">
              <p>
                Are you sure you want to delete the listing for{' '}
                <span className="font-semibold text-foreground">
                  "{listingToDelete?.productId?.name}"
                </span>
                ?
              </p>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. The listing will be permanently removed from your
                account.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="font-medium">Delete Listing</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
