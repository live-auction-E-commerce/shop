const HighestBidderIndicator = ({
  isVisible,
  title = 'You are the highest bidder!',
  className = '',
}) => {
  if (!isVisible) return null;

  return (
    <div className={`mb-6 mx-auto max-w-md ${className}`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg border-l-4 border-green-300">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-6 h-6 text-black" fill="black" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-lg text-black">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default HighestBidderIndicator;
