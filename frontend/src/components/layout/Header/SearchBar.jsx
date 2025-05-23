import { SearchInput } from '@/components/ui/search-input';
import { handleListingSearch } from '@/lib/utils';

const SearchBar = () => (
  <div className="hidden md:flex flex-1 items-center justify-center px-6">
    <div className="relative w-full max-w-sm">
      <SearchInput placeholder="Search your item..." searchFunction={handleListingSearch} />
    </div>
  </div>
);

export default SearchBar;
