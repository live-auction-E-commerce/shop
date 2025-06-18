import { useState, useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const WinnerModal = ({ isVisible, winnerEmail, onClose }) => {
  const [show, setShow] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (isVisible) setShow(true);
  }, [isVisible]);

  if (!isVisible) return null;

  const isCurrentUserWinner = user?.email === winnerEmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Winner Card */}
      <div
        className={`
          relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full
          transform transition-all duration-300 ease-out
          ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🎉 {isCurrentUserWinner ? 'You won the auction!' : 'Auction Winner!'} 🎉
          </h3>

          <p className="text-lg font-semibold text-blue-600 mb-4">{winnerEmail}</p>

          <p className="text-gray-600 text-sm">
            {isCurrentUserWinner
              ? 'Congratulations! You placed the highest bid and won the item.'
              : 'The auction has ended. Better luck next time!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
