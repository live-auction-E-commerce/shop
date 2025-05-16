import React from 'react';
import { User } from 'lucide-react';
import { categories } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/layout/NavigationMenu';
import { cn, handleListingSearch } from '@/lib/utils';
import { SearchInput } from '../ui/search-input';

const Header = () => {
  const isLogged = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-rose-50 to-teal-50 shadow-sm flex h-16 items-center">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="mx-2">
          <a href="/" className="flex items-center justify-start">
            <span className="text-xl font-extrabold tracking-tight md:text-2xl bg-gradient-to-r from-rose-500 to-teal-500 bg-clip-text text-transparent">
              auction-site
            </span>
          </a>
        </div>

        {/* Categories Navigation */}
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
                      <a
                        className="flex flex-col h-full w-full select-none justify-end rounded-md bg-gradient-to-br from-rose-100 to-teal-100 p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-rose-800">
                          Featured Fashion
                        </div>
                        <p className="text-sm leading-tight text-teal-800">
                          Discover our trending styles and collections
                        </p>
                      </a>
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
              <a href="/live-auctions">
                <NavigationMenuLink className="cursor-pointer items-center inline-flex h-10 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                  </span>
                  <span>Live Auctions</span>
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="/buy-now">
                <NavigationMenuLink className="cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Buy Now
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search bar (desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-center px-6">
          <div className="relative w-full max-w-sm">
            <SearchInput placeholder="Search your item..." searchFunction={handleListingSearch} />
          </div>
        </div>

        {/* User authentication */}
        <div className="flex items-center space-x-2 mx-2">
          {isLogged ? (
            <a href="/account">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/50 h-10 w-10">
                <User className="h-7 w-7 text-rose-600" />
                <span className="sr-only">Account</span>
              </Button>
            </a>
          ) : (
            <>
              <a href="/login">
                <Button
                  variant="ghost"
                  className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Register</Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Header;
