import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

const GridHeader = ({ searchTerm, setSearchTerm, sortBy, setSortBy, toggleFilters }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="relative flex-1 sm:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search listings..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div className="flex gap-2">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="ending-soon">Ending Soon</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={toggleFilters}>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default GridHeader;
