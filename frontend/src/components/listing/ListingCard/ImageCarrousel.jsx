const ImageCarrousel = ({ imageUrls, currentIndex, setCurrentIndex, productName }) => {
  if (!imageUrls || imageUrls.length === 0) {
    return <img src="/placeholder.svg?height=300&width=300" alt="placeholder" />;
  }
  return (
    <div className="relative aspect-square overflow-hidden">
      <img
        src={imageUrls[currentIndex]}
        alt={productName}
        width={300}
        height={300}
        className="object-cover w-full h-full transition-transform duration-300"
      />
      {imageUrls.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {imageUrls.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                currentIndex === idx ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarrousel;
