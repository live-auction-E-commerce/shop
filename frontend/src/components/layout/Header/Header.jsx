/* eslint-disable no-unused-vars */
import { Logo, CategoriesMenu, SearchBar, AuthSection } from './index';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 40, damping: 18, duration: 1.6 }}
      className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm flex h-16 items-center"
    >
      <div className="flex items-center justify-between w-full px-4">
        <Logo />
        <CategoriesMenu />
        <SearchBar />
        <AuthSection />
      </div>
    </motion.header>
  );
};

export default Header;
