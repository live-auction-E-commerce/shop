import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { ROUTES } from '@/routes/routes_consts';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const AuthSection = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isSeller = user?.role === 'Seller' || false;
  const handleLogout = () => {
    logout();
    toast.success('Successfuly logged out');
  };

  return (
    <div className="flex items-center space-x-2 mx-2">
      {isAuthenticated ? (
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
      ) : (
        <>
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
              Login
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthSection;
