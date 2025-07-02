import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from '@/components/layout/Header/ProfileDropDown';
import BecomeSellerButton from '@/components/ui/BecomeSellerButton';

const AuthSection = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex items-center space-x-2 mx-2">
      {isAuthenticated ? (
        <>
          {user?.role === 'User' && <BecomeSellerButton />}
          <ProfileDropdown />
        </>
      ) : (
        <>
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" className="cursor-pointer">
              Login
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="default" className="cursor-pointer">
              Register
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthSection;
