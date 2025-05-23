import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const AuthSection = ({ isLogged }) => (
  <div className="flex items-center space-x-2 mx-2">
    {isLogged ? (
      <Link to="/account">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/50 h-10 w-10">
          <User className="h-7 w-7 text-rose-600" />
          <span className="sr-only">Account</span>
        </Button>
      </Link>
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

export default AuthSection;
