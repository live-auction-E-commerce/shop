import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const SiteInfo = () => (
  <div className="px-2 md:col-span-1">
    <Link to={ROUTES.HOME} className="flex items-center mb-4">
      <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-teal-500 bg-clip-text text-transparent">
        auction-site
      </span>
    </Link>
    <p className="text-sm text-gray-600">
      Your premier destination for fashion auctions. Bid on exclusive designer items in real-time.
    </p>
  </div>
);

export default SiteInfo;
