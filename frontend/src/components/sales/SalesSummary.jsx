import { Card, CardContent } from '@/components/ui/card';

const SalesSummary = ({ saleStats }) => {
  const { totalSales, totalEarned, averageSale } = saleStats;
  console.log(saleStats);

  if (totalSales === 0) return null;

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalSales}</div>
            <div className="text-sm text-muted-foreground">Total Sales</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${totalEarned.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${averageSale.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Average Sale</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default SalesSummary;
