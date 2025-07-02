import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';
import NavigationMenuViewport from './NavigationMenuViewport';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const NavigationMenu = ({ className, children, viewport = true, ...props }) => {
  return (
    <NavigationMenuPrimitive.Root asChild {...props}>
      <motion.nav
        data-slot="navigation-menu"
        data-viewport={viewport}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 25, duration: 1 }}
        className={cn(
          'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
          className
        )}
      >
        {children}
        {viewport && <NavigationMenuViewport />}
      </motion.nav>
    </NavigationMenuPrimitive.Root>
  );
};

export default NavigationMenu;
