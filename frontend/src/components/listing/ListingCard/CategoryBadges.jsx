import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { capitalize } from '@/lib/utils';

const CategoryBadges = ({ category, brand }) => (
  <div className="flex gap-1">
    <Badge variant="outline" className="flex items-center gap-0.5 text-xs px-1.5 py-0">
      <Tag className="h-2.5 w-2.5" />
      {capitalize(category)}
    </Badge>
    {brand && (
      <Badge variant="secondary" className="text-xs px-1.5 py-0">
        {capitalize(brand)}
      </Badge>
    )}
  </div>
);

export default CategoryBadges;
