import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';

const NavigationMenuItem = ({ className, ...props }) => {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  );
};

export default NavigationMenuItem;
