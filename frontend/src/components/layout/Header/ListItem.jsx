import { Link } from 'react-router-dom';
import { NavigationMenuLink } from '@/components/layout/NavigationMenu';
import { cn } from '@/lib/utils';
import React from 'react';

const ListItem = React.forwardRef(({ className, title, children, href }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        to={href}
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

export default ListItem;
