import { Logo, CategoriesMenu, SearchBar, AuthSection } from './index';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm flex h-16 items-center">
      <div className="flex items-center justify-between w-full">
        <Logo />
        <CategoriesMenu />
        <SearchBar />
        <AuthSection />
      </div>
    </header>
  );
};

export default Header;
