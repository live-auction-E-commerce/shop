import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const Categories = () => (
  <div>
    <h3 className="font-semibold mb-4">Categories</h3>
    <ul className="space-y-2">
      <li>
        <Link to={ROUTES.CATEGORY_SHIRTS} className="text-gray-600 hover:text-rose-500">
          Shirts
        </Link>
      </li>
      <li>
        <Link to={ROUTES.CATEGORY_JEANS} className="text-gray-600 hover:text-rose-500">
          Jeans
        </Link>
      </li>
      <li>
        <Link to={ROUTES.CATEGORY_SHOES} className="text-gray-600 hover:text-rose-500">
          Shoes
        </Link>
      </li>
      <li>
        <Link to={ROUTES.CATEGORY_BAGS} className="text-gray-600 hover:text-rose-500">
          Bags
        </Link>
      </li>
    </ul>
  </div>
);

export default Categories;
