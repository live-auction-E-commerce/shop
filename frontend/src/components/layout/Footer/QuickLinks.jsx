import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const QuickLinks = () => (
  <div>
    <h3 className="font-semibold mb-4">Quick Links</h3>
    <ul className="space-y-2">
      <li>
        <Link to={ROUTES.LIVE} className="text-gray-600 hover:text-rose-500">
          Live Auctions
        </Link>
      </li>
      <li>
        <Link to={ROUTES.BUY_NOW} className="text-gray-600 hover:text-rose-500">
          Buy Now
        </Link>
      </li>
    </ul>
  </div>
);

export default QuickLinks;


