const ProductDetails = ({ product, saleType }) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Brand:</span>
          <p className="font-medium">{product.brand}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Size:</span>
          <p className="font-medium">{product.size}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Condition:</span>
          <p className="font-medium">{product.condition}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Sale Type:</span>
          <p className="font-medium capitalize">{saleType}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
