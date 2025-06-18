import { Card, CardContent } from '@/components/ui/card';

const OrderSummary = ({ orderStats }) => {
  const { totalOrders, totalSpent, averageOrder } = orderStats;

  if (totalOrders === 0) return null;

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${averageOrder.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Average Order</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderSummary;
