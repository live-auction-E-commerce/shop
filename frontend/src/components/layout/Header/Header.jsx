import { Logo, CategoriesMenu, SearchBar, AuthSection } from './index';

const Header = () => {
  const isLogged = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-rose-50 to-teal-50 shadow-sm flex h-16 items-center">
      <div className="flex items-center justify-between w-full">
        <Logo />
        <CategoriesMenu />
        <SearchBar />
        <AuthSection isLogged={isLogged} />
      </div>
    </header>
  );
};

export default Header;
