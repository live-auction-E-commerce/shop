import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/layout/Navigation';
import { categories } from '@/constants/categories';
import ListItem from './ListItem';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const CategoriesMenu = () => (
  <NavigationMenu className="hidden md:flex">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent hover:bg-white/50">
          Categories
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  to={ROUTES.HOME}
                  className="flex flex-col h-full w-full select-none justify-end rounded-md bg-gradient-to-br from-rose-100 to-teal-100 p-6 no-underline outline-none focus:shadow-md"
                >
                  <div className="mb-2 mt-4 text-lg font-medium text-rose-800">
                    Featured Fashion
                  </div>
                  <p className="text-sm leading-tight text-teal-800">
                    Discover our trending styles and collections
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            {categories.map(({ href, title, description, hoverClass }) => (
              <ListItem key={href} href={href} title={title} className={hoverClass}>
                {description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to={ROUTES.LIVE}
            className="cursor-pointer inline-flex items-center h-10 px-4 py-2 text-sm font-medium rounded-md bg-transparent hover:bg-white/50"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span>Live Auctions</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to={ROUTES.BUY_NOW}
            className="cursor-pointer inline-flex h-10 items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent hover:bg-white/50"
          >
            Buy Now
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default CategoriesMenu;
