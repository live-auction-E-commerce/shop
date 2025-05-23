import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const FilterPanel = () => (
  <div className="mb-4 p-4 border rounded-md">
    <h3 className="font-medium mb-2">Filters</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sale Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="auction">Auction</SelectItem>
          <SelectItem value="buy-now">Buy Now</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default FilterPanel;
