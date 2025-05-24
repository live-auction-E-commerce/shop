import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Lock,
  ShoppingBag,
  Upload,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const isSeller = user?.role === 'Seller' || false;

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-white/50 h-10 w-10">
          <User className="h-7 w-7" />
          <span className="sr-only">Account Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Your Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/addresses" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Your Addresses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/payment-methods" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Your Payment Methods
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/change-password" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <Lock className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
        {isSeller && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/sales" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Your Sales
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/upload-product" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Upload Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/manage-listings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Manage Listings
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
