import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const Logo = () => (
  <div className="mx-2">
    <Link to={ROUTES.HOME} className="flex items-center justify-start">
      <span className="text-xl font-extrabold tracking-tight md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        auction-site
      </span>
    </Link>
  </div>
);

export default Logo;
