import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { useAuth } from '@/context/AuthContext';
import { ProfileDropdown } from '@/components/layout/Header';

const AuthSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center space-x-2 mx-2">
      {isAuthenticated ? (
        <ProfileDropdown />
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
